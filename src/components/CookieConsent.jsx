import { useState, useEffect } from 'react'
import { X } from 'lucide-react'

/**
 * Cookie Consent Banner Component
 * Handles GDPR/CCPA compliance with granular cookie preferences
 * Styled to match ImmunoACT website design
 */
const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [showMoreInfo, setShowMoreInfo] = useState(false)
  const [preferences, setPreferences] = useState({
    necessary: true, // Always true, can't be disabled
    functional: false,
    performance: false,
    targeting: false
  })

  // Check if user has already made a choice
  useEffect(() => {
    const consent = localStorage.getItem('immunoact_cookie_consent')
    if (!consent) {
      // Show banner after a short delay for better UX
      const timer = setTimeout(() => setShowBanner(true), 1000)
      return () => clearTimeout(timer)
    } else {
      // Load saved preferences
      try {
        const savedPrefs = JSON.parse(consent)
        setPreferences(savedPrefs)
        applyCookieSettings(savedPrefs)
      } catch (error) {
        console.error('Error loading cookie preferences:', error)
      }
    }
  }, [])

  // Apply cookie settings to the application
  const applyCookieSettings = (prefs) => {
    // Set global cookie preferences
    window.cookiePreferences = prefs

    // Handle Google Analytics
    if (prefs.performance) {
      // Enable Google Analytics if you have it
      if (window.gtag) {
        window.gtag('consent', 'update', {
          analytics_storage: 'granted'
        })
      }
    } else {
      // Disable Google Analytics
      if (window.gtag) {
        window.gtag('consent', 'update', {
          analytics_storage: 'denied'
        })
      }
    }

    // Handle marketing cookies
    if (prefs.targeting) {
      // Enable marketing cookies (Facebook Pixel, etc.)
      if (window.gtag) {
        window.gtag('consent', 'update', {
          ad_storage: 'granted',
          ad_user_data: 'granted',
          ad_personalization: 'granted'
        })
      }
    } else {
      // Disable marketing cookies
      if (window.gtag) {
        window.gtag('consent', 'update', {
          ad_storage: 'denied',
          ad_user_data: 'denied',
          ad_personalization: 'denied'
        })
      }
    }

    // Dispatch custom event for other components to listen to
    window.dispatchEvent(new CustomEvent('cookiePreferencesUpdated', {
      detail: prefs
    }))
  }

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      functional: true,
      performance: true,
      targeting: true
    }

    setPreferences(allAccepted)
    localStorage.setItem('immunoact_cookie_consent', JSON.stringify(allAccepted))
    applyCookieSettings(allAccepted)
    setShowBanner(false)

    // Track consent (if analytics are enabled)
    if (window.gtag) {
      window.gtag('event', 'cookie_consent', {
        event_category: 'engagement',
        event_label: 'accept_all'
      })
    }
  }

  const handleRejectAll = () => {
    const onlyNecessary = {
      necessary: true,
      functional: false,
      performance: false,
      targeting: false
    }

    setPreferences(onlyNecessary)
    localStorage.setItem('immunoact_cookie_consent', JSON.stringify(onlyNecessary))
    applyCookieSettings(onlyNecessary)
    setShowBanner(false)
  }

  const handleSavePreferences = () => {
    localStorage.setItem('immunoact_cookie_consent', JSON.stringify(preferences))
    applyCookieSettings(preferences)
    setShowBanner(false)
    setShowDetails(false)

    // Track custom preferences
    if (window.gtag && preferences.performance) {
      window.gtag('event', 'cookie_consent', {
        event_category: 'engagement',
        event_label: 'custom_preferences'
      })
    }
  }

  const handlePreferenceChange = (type) => {
    if (type === 'necessary') return // Can't disable necessary cookies

    setPreferences(prev => ({
      ...prev,
      [type]: !prev[type]
    }))
  }

  if (!showBanner) return null

  return (
    <>
      {!showDetails ? (
        // Simple Cookie Notice Banner (matches your first image)
        <div className="fixed bottom-0 left-0 right-0 z-50 transform transition-transform duration-300 translate-y-0 border-t-[1px] bg-white shadow-[0_-1px_10px_0_#acabab4d]">
          <div className="px-6 py-4">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-[#212121] mb-2">
                  Cookie Notice
                </h3>
                <p className="text-[#212121] text-sm leading-relaxed">
                  We use cookies to offer you a better browsing experience. By clicking “Accept All Cookies”, you agree to the storing of cookies on your device to enhance site navigation, analyze site usage, and assist in our marketing efforts. If you click on the "Reject" button, the cookie categories that require consent will be deactivated.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 lg:ml-6">
                <button
                  onClick={() => setShowDetails(true)}
                  className="px-6 py-2 text-sm font-medium text-black bg-white border border-gray-300 hover:bg-gray-50 rounded transition-colors duration-200"
                >
                  Manage Cookies Setting
                </button>
                <button
                  onClick={handleRejectAll}
                  className="px-6 py-2 text-sm font-medium text-black bg-[#C6CAC6] border border-gray-300 hover:bg-gray-50 rounded transition-colors duration-200"
                >
                  Reject All
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="px-6 py-2 text-sm font-medium text-black bg-[#ffbf00] hover:bg-orange-600 rounded transition-colors duration-200"
                >
                  Accept All Cookies
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Privacy Preference Center Modal (matches your second/third images)
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40" />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-[0_-1px_10px_0_#acabab4d] max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-[#212121]">Privacy Preference Center</h2>
                <button
                  onClick={() => setShowDetails(false)}
                  className="p-2 text-gray-400 hover:text-[#212121] rounded-lg hover:bg-gray-100"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-[#212121] text-sm mb-4">
                  We use cookies to help you navigate efficiently and perform certain functions. You will find detailed information about all cookies under each consent category below.
                </p>

                <div className="text-[#212121] text-sm mb-4">
                  <p className="mb-2">
                    The cookies that are categorised as "Necessary" are stored on your browser as they are essential for enabling the basic functionalities of the site.
                  </p>

                  {showMoreInfo && (
                    <div className="mt-3 space-y-3">
                      <p>
                        We also use third-party cookies that help us analyse how you use this website, store your preferences, and provide the content and advertisements that are relevant to you. These cookies will only be stored in your browser with your prior consent.
                      </p>
                      <p>
                        You can choose to enable or disable some or all of these cookies but disabling some of them may affect your browsing experience.
                      </p>
                    </div>
                  )}

                  <button
                    onClick={() => setShowMoreInfo(!showMoreInfo)}
                    className="text-blue-600 hover:underline mt-2"
                  >
                    {showMoreInfo ? 'Show less' : 'Show more'}
                  </button>
                </div>

                <p className="text-[#212121] text-sm mb-6">
                  For more information on how Google's third-party cookies operate and handle your data, see:{' '}
                  <a href="#" className="text-blue-600 hover:underline">Google Privacy Policy</a>
                </p>

                {/* Cookie Categories */}
                <div className="space-y-6">
                  {/* Necessary Cookies */}
                  <div className="border-b border-gray-200 pb-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-bold text-[#212121]">Necessary</h3>
                      <span className="px-3 py-1 text-sm font-bold text-[#008000] ">
                        Always Active
                      </span>
                    </div>
                    <p className="text-[#212121] text-sm">
                      Necessary cookies are required to enable the basic features of this site, such as providing secure log-in or adjusting your consent preferences. These cookies do not store any personally identifiable data.
                    </p>
                  </div>

                  {/* Functional Cookies */}
                  <div className="border-b border-gray-200 pb-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-bold text-[#212121]">Functional Cookies</h3>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={preferences.functional}
                          onChange={() => handlePreferenceChange('functional')}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                      </label>
                    </div>
                    <p className="text-[#212121] text-sm">
                      These cookies enable the site to provide enhanced functionality and personalization. They may be set by us or by third party providers whose services we have added to our pages. If you do not allow these cookies, some or all of these services may not function properly.
                    </p>
                  </div>

                  {/* Performance Cookies */}
                  <div className="border-b border-gray-200 pb-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-bold text-[#212121]">Performance Cookies</h3>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={preferences.performance}
                          onChange={() => handlePreferenceChange('performance')}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                      </label>
                    </div>
                    <p className="text-[#212121] text-sm">
                      These cookies allow us to count visits, collect analytics, and traffic sources so we can measure and improve the performance of our site. They help us to know which pages are the most and least popular and see how visitors move around the site. In certain countries prior to banner acceptance, performance cookies may be sent to your browser. You may clear these cookies in your browser settings so that we will not know when you have visited our site and will not be able to monitor its performance.
                    </p>
                  </div>

                  {/* Targeting Cookies */}
                  <div className="pb-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-bold text-[#212121]">Targeting Cookies</h3>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={preferences.targeting}
                          onChange={() => handlePreferenceChange('targeting')}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                      </label>
                    </div>
                    <p className="text-[#212121] text-sm">
                      These cookies may be implemented through our site by our advertising partners. They may be used by those companies to build a profile of your interests and show you relevant ads on other sites. They are based on uniquely identifying your browser and internet device, but they do not store personal information that directly identifies you. If you do not allow these cookies, you will experience less targeted advertising.
                    </p>
                  </div>
                </div>
              </div>

              {/* Footer Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 p-6 border-t border-gray-200">
                <button
                  onClick={handleRejectAll}
                  className="flex-1 px-6 py-3 text-sm font-medium text-[#212121] bg-gray-200 hover:bg-gray-300 rounded transition-colors duration-200"
                >
                  Reject All
                </button>
                <button
                  onClick={handleSavePreferences}
                  className="flex-1 px-6 py-3 text-sm font-medium text-[#212121] bg-white border-2 border-[#ffbf00] hover:bg-orange-50 rounded transition-colors duration-200"
                >
                  Save My Preferences
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="flex-1 px-6 py-3 text-sm font-medium text-black bg-[#ffbf00] hover:bg-orange-600 rounded transition-colors duration-200"
                >
                  Accept All Cookies
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default CookieConsent