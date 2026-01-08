import { useState, useEffect } from 'react'
import { Shield, Settings, BarChart3, Target, Cookie, Save, RotateCcw, Info } from 'lucide-react'
import { useCookies } from '@/contexts/CookieContext'
import toast from 'react-hot-toast'
import PageBanner from '@/components/PageBanner'

/**
 * Cookie Settings Page
 * Allows users to manage their cookie preferences after initial consent
 * Styled to match ImmunoACT website design
 */
const CookieSettings = () => {
  const { preferences, updatePreferences, resetPreferences } = useCookies()
  const [localPreferences, setLocalPreferences] = useState({
    necessary: true,
    functional: false,
    performance: false,
    targeting: false
  })
  const [hasChanges, setHasChanges] = useState(false)

  useEffect(() => {
    setLocalPreferences(preferences)
  }, [preferences])

  useEffect(() => {
    const hasChanges = JSON.stringify(localPreferences) !== JSON.stringify(preferences)
    setHasChanges(hasChanges)
  }, [localPreferences, preferences])

  const handlePreferenceChange = (type) => {
    if (type === 'necessary') return // Can't disable necessary cookies

    setLocalPreferences(prev => ({
      ...prev,
      [type]: !prev[type]
    }))
  }

  const handleSave = () => {
    updatePreferences(localPreferences)
    toast.success('Cookie preferences saved successfully!')
  }

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all cookie preferences? This will clear all non-essential cookies and require you to set your preferences again.')) {
      resetPreferences()
      toast.success('Cookie preferences have been reset')
    }
  }

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      functional: true,
      performance: true,
      targeting: true
    }
    setLocalPreferences(allAccepted)
  }

  const handleRejectAll = () => {
    const onlyNecessary = {
      necessary: true,
      functional: false,
      performance: false,
      targeting: false
    }
    setLocalPreferences(onlyNecessary)
  }

  const cookieTypes = [
    {
      key: 'necessary',
      title: 'Necessary',
      icon: Shield,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      description: 'Necessary cookies are required to enable the basic features of this site, such as providing secure log-in or adjusting your consent preferences. These cookies do not store any personally identifiable data.',
      alwaysActive: true
    },
    {
      key: 'functional',
      title: 'Functional Cookies',
      icon: Settings,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      description: 'These cookies enable the site to provide enhanced functionality and personalization. They may be set by us or by third party providers whose services we have added to our pages. If you do not allow these cookies, some or all of these services may not function properly.'
    },
    {
      key: 'performance',
      title: 'Performance Cookies',
      icon: BarChart3,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      description: 'These cookies allow us to count visits, collect analytics, and traffic sources so we can measure and improve the performance of our site. They help us to know which pages are the most and least popular and see how visitors move around the site.'
    },
    {
      key: 'targeting',
      title: 'Targeting Cookies',
      icon: Target,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      description: 'These cookies may be implemented through our site by our advertising partners. They may be used by those companies to build a profile of your interests and show you relevant ads on other sites.'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="">
        <PageBanner
          title="Cookie Settings"
          subtitle="Manage your cookie preferences and control how we use cookies to enhance your experience on our website."
        />
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Quick Actions */}
        <div className="bg-white rounded-xl border border-gray-200 p-8 mb-8">
          <h2 className="text-xl font-bold text-[#363636] mb-6 ">Quick Actions</h2>
          <div className="flex flex-col sm:flex-row gap-4 text-sm font-normal">
            <button
              onClick={handleAcceptAll}
              className="bg-[#FFBF00] hover:bg-[#E6AC00] text-[#363636] px-6 py-3 rounded-full transition-colors duration-300 flex-1 max-w-xs"
            >
              Accept All Cookies
            </button>
            <button
              onClick={handleRejectAll}
              className="bg-[#C6CAC6] hover:bg-[#B5B9B5] text-[#363636] px-6 py-3 rounded-full transition-colors duration-300 flex-1 max-w-xs"
            >
              Reject All Optional
            </button>
            <button
              onClick={handleReset}
              className="bg-red-100 hover:bg-red-200 text-red-700 px-6 py-3 rounded-full transition-colors duration-300 flex items-center justify-center gap-2 flex-1 max-w-xs"
            >
              <RotateCcw className="h-5 w-5" />
              Reset All
            </button>
          </div>
        </div>

        {/* Cookie Categories */}
        <div className="space-y-6 mb-8">
          {cookieTypes.map((cookieType) => {
            const Icon = cookieType.icon
            const isEnabled = localPreferences[cookieType.key]

            return (
              <div key={cookieType.key} className={`bg-white rounded-xl ${cookieType.borderColor} border-2 p-8 hover:shadow-lg transition-all duration-300`}>
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 ${cookieType.bgColor} rounded-xl`}>
                      <Icon className={`h-6 w-6 ${cookieType.color}`} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#363636] flex items-center gap-3">
                        {cookieType.title}
                        {cookieType.alwaysActive && (
                          <span className="px-3 py-1 text-sm font-bold text-[#008000] bg-green-100 rounded-full">
                            Always Active
                          </span>
                        )}
                      </h3>
                    </div>
                  </div>

                  {!cookieType.alwaysActive && (
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isEnabled}
                        onChange={() => handlePreferenceChange(cookieType.key)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FFBF00]"></div>
                    </label>
                  )}
                </div>

                <p className="text-[#363636] text-base leading-relaxed">
                  {cookieType.description}
                </p>
              </div>
            )
          })}
        </div>

        {/* Save Changes Banner */}
        {hasChanges && (
          <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border-2 border-orange-200 rounded-xl p-6 mb-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Info className="h-6 w-6 text-orange-600" />
                <p className="text-base text-[#363636] font-normal">
                  You have unsaved changes to your cookie preferences.
                </p>
              </div>
              <button
                onClick={handleSave}
                className="bg-[#FFBF00] hover:bg-[#E6AC00] text-[#363636] text-sm font-normal px-6 py-3 rounded-full transition-colors duration-300 flex items-center gap-2"
              >
                <Save className="h-5 w-5" />
                Save Changes
              </button>
            </div>
          </div>
        )}

        {/* Additional Information */}
        <div className="bg-white rounded-xl border border-gray-200 p-8">
          <h3 className="text-lg font-bold text-[#363636] mb-6">Additional Information</h3>
          <div className="grid md:grid-cols-2 gap-6 text-[#363636]">
            <div className="space-y-4">
              <div>
                <h4 className="text-base font-semibold mb-2">Data Protection</h4>
                <p className="text-gray-700 font-normal">
                  We are committed to protecting your privacy and complying with applicable data protection laws including GDPR and CCPA.
                </p>
              </div>
              <div>
                <h4 className="text-base font-semibold mb-2">Cookie Duration</h4>
                <p className="text-gray-700 font-medium">
                  Different cookies have different lifespans. Session cookies are deleted when you close your browser, while persistent cookies remain until they expire.
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="text-base font-semibold mb-2">Third-Party Cookies</h4>
                <p className="text-gray-700">
                  Some cookies are set by third-party services we use, such as analytics providers. These are governed by their respective privacy policies.
                </p>
              </div>
              <div>
                <h4 className="text-base font-semibold mb-2">Browser Settings</h4>
                <p className="text-gray-700">
                  You can also manage cookies through your browser settings, though this may affect website functionality.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <p className="text-gray-600">
              For more information about how we handle your data, please read our{' '}
              <a href="/privacy-policy" className="text-[#47A178] hover:text-[#3a8a66] font-medium transition-colors duration-200">
                Privacy Policy
              </a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CookieSettings