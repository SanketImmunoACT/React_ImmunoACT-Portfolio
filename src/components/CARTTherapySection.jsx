import LabTestingImg from '@/assets/images/CartTherapy/Lab-Testing.jpeg'
import OurPlatformImg from '@/assets/images/CartTherapy/Our-Platform.png'
import TCellAntibodyImg from '@/assets/images/CartTherapy/T-Cell-Antibody.png'

const CARTTherapySection = () => {
  const cards = [
    {
      id: 1,
      bgColor: "bg-gradient-to-br from-teal-400 to-teal-600",
      buttonColor: "bg-yellow-400 hover:bg-yellow-500",
      description: "Pioneering India's first indigenous CAR-T therapies, we are advancing innovative treatments to combat cancer with targeted, life-saving solutions.",
      image: LabTestingImg,
      title: "Our Pipeline"
    },
    {
      id: 2,
      bgColor: "bg-gradient-to-br from-purple-600 to-purple-800",
      buttonColor: "bg-yellow-400 hover:bg-yellow-500",
      description: "Our proprietary technology platform enables efficient CAR-T cell production with in-house LV & plasmid manufacturing, giving us complete control over every aspect of creating an effective product.",
      image: OurPlatformImg,
      title: "Our Platform"
    },
    {
      id: 3,
      bgColor: "bg-gradient-to-br from-teal-500 to-green-500",
      buttonColor: "bg-yellow-400 hover:bg-yellow-500",
      description: "NexCAR19, India's first approved CAR-T therapy, transforms patients' immune cells into living cancer-fighting agents, offering hope where conventional treatments fail.",
      image: TCellAntibodyImg,
      title: "NexCAR19: The Living Drug"
    }
  ]

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-start">
          <h2 className="text-[38px] font-normal text-[#47A178] font-futura">
            CAR-T Cell Therapy
          </h2>
          <h3 className="text-[32px] text-[#363636] mt-[22px] font-futura">
            Harnessing Your Immune System to Fight Cancer Safely
          </h3>

          <div className="">
            <p className="text-lg text-[#363636] ">
              India faces a growing cancer burden, ranking second globally in cancer mortality. For aggressive B-cell malignancies like Acute Lymphoblastic Leukemia (blood cancer) and Large B-cell Lymphoma (lymph node cancer), over 40% of patients relapse or resist chemotherapy and other standard treatments.
            </p>
            <p className="text-lg text-[#363636] ">
              ImmunoACT brings revolutionary CAR-T cell therapy for cancer treatment in India, where a patient's own immune cells are genetically modified to recognize and destroy cancer cells. This groundbreaking approach has demonstrated remarkable improvements in overall survival and offers new hope for patients seeking advanced CAR-T therapy in India with limited treatment options.
            </p>
          </div>
        </div>

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-20">
          {cards.map((card) => (
            <div
              key={card.id}
              className={`${card.bgColor} rounded-2xl h-[565px] overflow-hidden shadow-xl transform hover:scale-105 transition-all duration-300 group flex flex-col`}
            >
              {/* Card Image - Made larger and more prominent */}
              <div className="h-80 bg-white/10 flex items-center justify-center overflow-hidden">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                />
              </div>

              {/* Card Content - Pushed to bottom */}
              <div className="p-6 text-white flex-1 flex flex-col justify-end">
                <div className="">
                  <h4 className="text-2xl mb-3">{card.title}</h4>
                  <p className="text-sm opacity-90">
                    {card.description}
                  </p>
                </div>

                {/* Arrow Button - Always at bottom */}
                <div className="flex justify-end mt-4">
                  <button className={`${card.buttonColor} w-10 h-10 rounded-full flex items-center justify-center text-gray-800 font-bold transition-all duration-300 hover:scale-110`}>
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Divider Line */}
        <div className="mt-20 flex justify-center">
          <div className="w-full max-w-[650px] h-[1px] bg-[#FFBF00] mx-4"></div>
        </div>
      </div>
    </section>
  )
}

export default CARTTherapySection