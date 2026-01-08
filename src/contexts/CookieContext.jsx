import { createContext, useContext, useState, useEffect } from 'react'

/**
 * Cookie Context for managing user cookie preferences
 * Provides utilities for checking consent and managing cookie settings
 */
const CookieContext = createContext()

export const useCookies = () => {
  const context = useContext(CookieContext)
  if (!context) {
    throw new Error('useCookies must be used within a CookieProvider')
  }
  return context
}

export const CookieProvider = ({ children }) => {
  const [preferences, setPreferences] = useState({
    necessary: true,
    functional: false,
    performance: false,
    targeting: false
  })
  const [hasConsent, setHasConsent] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Load preferences on mount
  useEffect(() => {
    const loadPreferences = () => {
      try {
        const saved = localStorage.getItem('immunoact_cookie_consent')
        if (saved) {
          const parsedPrefs = JSON.parse(saved)
          setPreferences(parsedPrefs)
          setHasConsent(true)
          
          // Set global preferences for other scripts
          window.cookiePreferences = parsedPrefs
        }
      } catch (error) {
        console.error('Error loading cookie preferences:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadPreferences()

    // Listen for preference updates
    const handlePreferenceUpdate = (event) => {
      setPreferences(event.detail)
      setHasConsent(true)
    }

    window.addEventListener('cookiePreferencesUpdated', handlePreferenceUpdate)
    
    return () => {
      window.removeEventListener('cookiePreferencesUpdated', handlePreferenceUpdate)
    }
  }, [])

  // Utility functions
  const canUseAnalytics = () => preferences.performance && hasConsent
  const canUseMarketing = () => preferences.targeting && hasConsent
  const canUseFunctional = () => preferences.functional && hasConsent

  // Set a cookie with consent check
  const setCookie = (name, value, options = {}) => {
    const {
      type = 'functional', // necessary, functional, analytics, marketing
      expires = 30, // days
      path = '/',
      secure = window.location.protocol === 'https:',
      sameSite = 'Lax'
    } = options

    // Always allow necessary cookies
    if (type === 'necessary' || preferences[type]) {
      const expirationDate = new Date()
      expirationDate.setTime(expirationDate.getTime() + (expires * 24 * 60 * 60 * 1000))
      
      let cookieString = `${name}=${encodeURIComponent(value)}`
      cookieString += `; expires=${expirationDate.toUTCString()}`
      cookieString += `; path=${path}`
      
      if (secure) cookieString += '; secure'
      cookieString += `; samesite=${sameSite}`
      
      document.cookie = cookieString
      return true
    }
    
    return false // Cookie not set due to consent
  }

  // Get a cookie value
  const getCookie = (name) => {
    const nameEQ = name + '='
    const ca = document.cookie.split(';')
    
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i]
      while (c.charAt(0) === ' ') c = c.substring(1, c.length)
      if (c.indexOf(nameEQ) === 0) {
        return decodeURIComponent(c.substring(nameEQ.length, c.length))
      }
    }
    return null
  }

  // Delete a cookie
  const deleteCookie = (name, path = '/') => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path};`
  }

  // Track event (only if analytics consent given)
  const trackEvent = (eventName, eventData = {}) => {
    if (canUseAnalytics() && window.gtag) {
      window.gtag('event', eventName, {
        event_category: eventData.category || 'engagement',
        event_label: eventData.label || '',
        value: eventData.value || 0,
        ...eventData
      })
    }
  }

  // Update preferences
  const updatePreferences = (newPreferences) => {
    const updatedPrefs = { ...preferences, ...newPreferences }
    setPreferences(updatedPrefs)
    localStorage.setItem('immunoact_cookie_consent', JSON.stringify(updatedPrefs))
    window.cookiePreferences = updatedPrefs
    
    // Dispatch event for other components
    window.dispatchEvent(new CustomEvent('cookiePreferencesUpdated', {
      detail: updatedPrefs
    }))
  }

  // Reset all preferences (for testing or user request)
  const resetPreferences = () => {
    localStorage.removeItem('immunoact_cookie_consent')
    setPreferences({
      necessary: true,
      functional: false,
      performance: false,
      targeting: false
    })
    setHasConsent(false)
    
    // Clear all non-necessary cookies
    const cookies = document.cookie.split(';')
    cookies.forEach(cookie => {
      const eqPos = cookie.indexOf('=')
      const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim()
      
      // Don't delete necessary cookies (you might want to customize this list)
      const necessaryCookies = ['immunoact_session', 'csrf_token', 'auth_token']
      if (!necessaryCookies.includes(name)) {
        deleteCookie(name)
      }
    })
  }

  const value = {
    preferences,
    hasConsent,
    isLoading,
    canUseAnalytics,
    canUseMarketing,
    canUseFunctional,
    setCookie,
    getCookie,
    deleteCookie,
    trackEvent,
    updatePreferences,
    resetPreferences
  }

  return (
    <CookieContext.Provider value={value}>
      {children}
    </CookieContext.Provider>
  )
}

export default CookieContext