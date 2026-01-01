import PageBanner from '@/components/PageBanner'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import ForPatients from './NexCAR19/ForPatients'
import ForHCP from './NexCAR19/ForHCP'

const NexCAR19 = () => {
  const location = useLocation()
  const navigate = useNavigate()

  // Determine initial view based on URL
  const [isHCPView, setIsHCPView] = useState(location.pathname === '/nexcar19-hcp')

  // Update URL when toggle changes
  useEffect(() => {
    const newPath = isHCPView ? '/nexcar19-hcp' : '/nexcar19'
    if (location.pathname !== newPath) {
      navigate(newPath, { replace: true })
    }
  }, [isHCPView, location.pathname, navigate])

  // Update state when URL changes (browser back/forward)
  useEffect(() => {
    setIsHCPView(location.pathname === '/nexcar19-hcp')
  }, [location.pathname])

  // Smooth scrolling functionality
  useEffect(() => {
    const hash = window.location.hash
    if (hash) {
      const element = document.querySelector(hash)
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          })
        }, 100)
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 font-futura">
      {/* Hero Section */}
      <PageBanner
        title="NexCAR19™"
        subtitle={isHCPView
          ? "A New Hope for Hard to Treat B-Cell Cancers"
          : "A New Hope for Hard to Treat B-Cell Cancers"
        }
      />

      {/* Toggle Section */}
      <section className="py-6 bg-white border-b">
        <div className="flex items-center justify-end  px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <div className="bg-gray-100 p-1 rounded-full flex">
              <button
                onClick={() => setIsHCPView(false)}
                className={`px-6 py-2 rounded-full font-bold transition-all ${!isHCPView
                    ? 'bg-orange-500 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-800'
                  }`}
              >
                For Patients
              </button>
              <button
                onClick={() => setIsHCPView(true)}
                className={`px-6 py-2 rounded-full font-bold transition-all ${isHCPView
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-800'
                  }`}
              >
                For Healthcare Professionals
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Action Buttons Section */}
      {/* <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {!isHCPView ? (
              <>
                <button className="bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-3 rounded-full font-bold transition-colors">
                  Find a Treatment Centre
                </button>
                <button className="border-2 border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white px-8 py-3 rounded-full font-bold transition-colors">
                  Download Patient Guide
                </button>
              </>
            ) : (
              <>
                <button className="bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-3 rounded-full font-bold transition-colors">
                  Download Clinical Data
                </button>
                <button className="border-2 border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white px-8 py-3 rounded-full font-bold transition-colors">
                  Request Training
                </button>
              </>
            )}
          </div>
        </div>
      </section> */}

      {/* Content Sections - Conditional Rendering */}
      {!isHCPView ? <ForPatients /> : <ForHCP />}

      {/* CTA Section */}
      {/* <section className="py-16 bg-gradient-to-r from-teal-500 to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-white">
            <h2 className="text-4xl font-bold mb-6">
              {isHCPView ? "Ready to Learn More?" : "Ready to Start Your Journey?"}
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              {isHCPView
                ? "Whether you need clinical data, training resources, or medical support, we're here to assist you in providing the best care for your patients."
                : "Take the first step towards your personalized cancer treatment. Our medical team is here to guide you through every step."
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-3 rounded-full font-bold transition-colors">
                {isHCPView ? "Schedule Training" : "Schedule Consultation"}
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-teal-600 px-8 py-3 rounded-full font-bold transition-colors">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  )
}

export default NexCAR19