import { useState } from 'react'
import ManufacturingImg from '@/assets/images/manufacturing/Manufacturing.jpg'

const Manufacturing = () => {
  const [showVideo, setShowVideo] = useState(false)

  const handlePlayVideo = () => {
    setShowVideo(true)
  }

  const features = [
    {
      description: "Compliant with global quality and safety standards to ensure purity, consistency, and efficacy in every therapy.",
      title: "WHO-Certified GMP Facility:"
    },
    {
      description: "Expanding from 750 to 1,500 patients per year to meet growing demand and reduce treatment wait times.",
      title: "Scalable Treatment Capacity:"
    },
    {
      description: "Fully integrated process from plasmid design to viral vector production and ex-VIVO cell engineering.",
      title: "End-to-End Manufacturing:"
    },
    {
      description: "Streamlined operations for fast turnaround, ensuring therapies reach patients when they need them most.",
      title: "Rapid & Reliable Delivery:"
    },
    {
      description: "Dedicated QC/QA units to rigorously test and validate each batch before release.",
      title: "Global-Standard Quality Control:"
    },
    {
      description: "Backed by experts in clinical trials, regulatory affairs, and treatment logistics to simplify doctor workflows.",
      title: "Clinician-Centric Support:"
    },
    {
      description: "Facility designed with one goal in mind: enabling safe, accessible, and effective therapies for every patient.",
      title: "Patient-Focused Outcomes:"
    }
  ]

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-start">
          <h2 className="text-[38px] font-normal text-[#47A178] font-futura">
            Our Manufacturing Facility
          </h2>
          <p className="text-lg text-[#363636] my-8">
            At ImmunoACT, our advanced manufacturing facility is purpose-built to deliver high-quality, safe, and scalable cell and gene therapies. With the capacity to treat up to 750 patients annually, we ensure timely and consistent access to life-saving treatments.
          </p>
        </div>

        {/* Video Banner Section */}
        <div className="relative max-w-7xl mx-auto mb-9">
          {!showVideo ? (
            /* Video Thumbnail with Play Button */
            <div
              className="relative cursor-pointer group overflow-hidden rounded-2xl shadow-2xl"
              onClick={handlePlayVideo}
            >
              {/* Image with subtle hover effect */}
              <img
                src={ManufacturingImg}
                alt="ImmunoACT Manufacturing Facility"
                className="w-full h-auto transition-all duration-500 ease-out group-hover:scale-105 group-hover:brightness-110"
              />

              {/* Clean overlay for better interactivity */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 rounded-2xl"></div>

              {/* Play Button with enhanced interactivity */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  {/* Pulsing ring effect */}
                  <div className="absolute inset-0 bg-yellow-400/30 rounded-full animate-ping group-hover:animate-none"></div>

                  {/* Main play button */}
                  <div className="relative bg-yellow-400 hover:bg-yellow-500 w-20 h-20 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 group-hover:scale-110 group-hover:shadow-3xl">
                    <svg
                      className="w-8 h-8 text-gray-800 ml-1 transition-transform duration-300 group-hover:scale-110"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Subtle border highlight on hover */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-yellow-400/50 transition-all duration-300"></div>
            </div>
          ) : (
            /* YouTube Video Embed */
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full rounded-2xl shadow-2xl"
                src="https://www.youtube.com/embed/AwroDnmW-Ds?si=LfRaYB4i5F2c8V01&autoplay=1"
                title="ImmunoACT Manufacturing Facility - YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          )}
        </div>

        {/* Features Grid */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#47A178]/20"
              >
                <div className="flex items-start space-x-4">
                  {/* Icon/Bullet */}
                  <div className="flex-shrink-0 w-3 h-3 bg-[#47A178] rounded-full mt-2"></div>

                  {/* Content */}
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-[#363636] mb-2 font-futura">
                      {feature.title}
                    </h4>
                    <p className="text-[#363636] text-lg">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Divider Line */}
        <div className="mt-20 flex justify-center">
          <div className="w-full max-w-[650px] h-[1px] bg-[#FFBF00] mx-4"></div>
        </div>
      </div>
    </section>
  )
}

export default Manufacturing