import { useState } from 'react'
import KuldeepStoryImg from '@/assets/images/patients/Kuldeep_story.png'

const PatientTestimonial = () => {
  const [showVideo, setShowVideo] = useState(false)

  const handlePlayVideo = () => {
    setShowVideo(true)
  }

  return (
    <section className="">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center">
          <h2 className="text-[38px] font-normal text-[#47A178] font-futura">
            Real Stories of Hope
          </h2>
          <p className="text-lg text-[#363636] mt-4 mb-9 text-center">
            At ImmunoACT, we believe that every patient story matters. Our CAR-T cell therapies are transforming lives—bringing hope where options were once limited. These powerful testimonials reflect not only the resilience of our patients but also the impact of cutting-edge, gene-modified cell therapy. As we work alongside leading healthcare institutions, academic collaborators, and strategic partners, our mission remains clear: to expand equitable access to advanced immunotherapies and redefine cancer care in India and beyond.
          </p>
        </div>

        {/* Video Banner Section */}
        <div className="relative max-w-7xl mx-auto">
          {!showVideo ? (
            /* Video Thumbnail with Play Button */
            <div
              className="relative cursor-pointer group overflow-hidden rounded-2xl shadow-2xl"
              onClick={handlePlayVideo}
            >
              {/* Image with subtle hover effect */}
              <img
                src={KuldeepStoryImg}
                alt="Kuldeep's Journey with NexCAR19"
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
                src="https://www.youtube.com/embed/Ve90D82fEL0?si=EZ5zpJavJva42dgx&autoplay=1"
                title="Kuldeep's Journey - YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          )}
        </div>

        {/* Bottom Divider Line */}
        <div className="mt-20 flex justify-center">
          <div className="w-full max-w-[650px] h-[1px] bg-[#FFBF00] mx-4"></div>
        </div>
      </div>
    </section>
  )
}

export default PatientTestimonial