import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useCookies } from '@/contexts/CookieContext'

/**
 * Analytics Tracker Component
 * Handles Google Analytics and other tracking with proper consent management
 */
const AnalyticsTracker = () => {
  const location = useLocation()
  const { canUseAnalytics, trackEvent, isLoading } = useCookies()

  // Track page views
  useEffect(() => {
    if (!isLoading && canUseAnalytics()) {
      // Track page view with Google Analytics
      if (window.gtag) {
        window.gtag('config', 'GA_MEASUREMENT_ID', {
          page_path: location.pathname + location.search,
          page_title: document.title
        })
      }

      // Track with other analytics services if needed
      // Example: Facebook Pixel
      if (window.fbq) {
        window.fbq('track', 'PageView')
      }
    }
  }, [location, canUseAnalytics, isLoading])

  // Track custom events
  useEffect(() => {
    const handleCustomEvent = (event) => {
      if (canUseAnalytics()) {
        trackEvent(event.detail.name, event.detail.data)
      }
    }

    // Listen for custom tracking events
    window.addEventListener('trackAnalytics', handleCustomEvent)
    
    return () => {
      window.removeEventListener('trackAnalytics', handleCustomEvent)
    }
  }, [canUseAnalytics, trackEvent])

  // This component doesn't render anything
  return null
}

// Utility function to dispatch tracking events from anywhere in the app
export const dispatchTrackingEvent = (eventName, eventData = {}) => {
  window.dispatchEvent(new CustomEvent('trackAnalytics', {
    detail: {
      name: eventName,
      data: eventData
    }
  }))
}

// Common tracking functions
export const trackButtonClick = (buttonName, location = '') => {
  dispatchTrackingEvent('button_click', {
    category: 'engagement',
    label: buttonName,
    location
  })
}

export const trackFormSubmission = (formName, success = true) => {
  dispatchTrackingEvent('form_submit', {
    category: 'form',
    label: formName,
    value: success ? 1 : 0
  })
}

export const trackDownload = (fileName, fileType = '') => {
  dispatchTrackingEvent('file_download', {
    category: 'download',
    label: fileName,
    file_type: fileType
  })
}

export const trackVideoPlay = (videoTitle, duration = 0) => {
  dispatchTrackingEvent('video_play', {
    category: 'video',
    label: videoTitle,
    value: duration
  })
}

export const trackSearch = (searchTerm, resultsCount = 0) => {
  dispatchTrackingEvent('search', {
    category: 'search',
    label: searchTerm,
    value: resultsCount
  })
}

export default AnalyticsTracker