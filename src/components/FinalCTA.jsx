import WorldMapImg from '@/assets/images/locations/world-map.png'

const FinalCTA = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-[linear-gradient(#47a178,#2c634a)] rounded-3xl p-8 md:p-12 overflow-hidden">
          {/* World Map Background Image */}
          <div className="absolute inset-0 flex items-center justify-end pr-8">
            <img
              src={WorldMapImg}
              alt="World Map"
              className="h-full w-auto opacity-30 object-contain"
            />
          </div>

          {/* Content */}
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-white leading-[1.4] text-[38px]">
              Harnessing Your Immune System<br />
              to Fight Cancer Safely
            </h2>
            <p className="text-lg mt-4 mb-8 text-white font-futura">
              Begin Your Personalized Cancer Treatment Journey
            </p>
            <button className="bg-[#FFBF00] hover:bg-yellow-500 text-[#363636] font-medium px-[18px] py-[9px] rounded-full transition-colors text-[18px]">
              Discuss Treatment Options
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FinalCTA