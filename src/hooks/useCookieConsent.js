import { useState, useEffect } from 'react'

/**
 * Custom hook for cookie consent management
 * Provides utilities for checking consent and managing cookies
 */
export const useCookieConsent = () => {
  const [hasConsent, setHasConsent] = useState(false)
  const [preferences, setPreferences] = useState({
    necessary: true,
    functional: false,
    performance: false,
    targeting: false
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load preferences from localStorage
    const loadPreferences = () => {
      try {
        const saved = localStorage.getItem('immunoact_cookie_consent')
        if (saved) {
          const parsedPrefs = JSON.parse(saved)
          setPreferences(parsedPrefs)
          setHasConsent(true)
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
  const canUse = (type) => {
    if (type === 'necessary') return true
    return preferences[type] && hasConsent
  }

  const canUseAnalytics = () => canUse('performance')
  const canUseMarketing = () => canUse('targeting')
  const canUseFunctional = () => canUse('functional')

  // Set cookie with consent check
  const setCookie = (name, value, options = {}) => {
    const {
      type = 'functional',
      expires = 30, // days
      path = '/',
      secure = window.location.protocol === 'https:',
      sameSite = 'Lax'
    } = options

    if (canUse(type)) {
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
    
    return false
  }

  // Get cookie value
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

  // Track analytics event
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

  // Track page view
  const trackPageView = (pagePath, pageTitle) => {
    if (canUseAnalytics() && window.gtag) {
      window.gtag('config', 'GA_MEASUREMENT_ID', {
        page_path: pagePath,
        page_title: pageTitle
      })
    }
  }

  return {
    hasConsent,
    preferences,
    isLoading,
    canUse,
    canUseAnalytics,
    canUseMarketing,
    canUseFunctional,
    setCookie,
    getCookie,
    trackEvent,
    trackPageView
  }
}

export default useCookieConsent