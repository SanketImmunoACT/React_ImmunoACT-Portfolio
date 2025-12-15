const FeatureCards = () => {
  const cards = [
    {
      id: 1,
      title: "Our Science",
      description: "Pioneering India's first indigenous CAR-T therapies, we are advancing innovative treatments to combat cancer with targeted, life-saving solutions.",
      bgColor: "bg-teal-500",
      textColor: "text-white"
    },
    {
      id: 2,
      title: "Our Platform", 
      description: "Our proprietary technology platform enables efficient CAR-T cell production with in-house LV & plasmid manufacturing, giving us complete control over every aspect of creating an effective product.",
      bgColor: "bg-purple-600",
      textColor: "text-white"
    },
    {
      id: 3,
      title: "NexCAR19: The Living Drug",
      description: "NexCAR19, India's first approved CAR-T therapy, transforms patients' immune cells into living cancer-fighting agents, offering hope where conventional treatments fail.",
      bgColor: "bg-blue-500", 
      textColor: "text-white"
    }
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">CAR-T Cell Therapy</h2>
          <h3 className="text-2xl text-gray-600 mb-8">
            Harnessing Your Immune System to Fight Cancer Safely
          </h3>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              India faces a growing cancer burden, ranking second globally in cancer mortality. 
              For aggressive B-cell malignancies like Acute Lymphoblastic Leukemia (blood cancer) 
              and Large B-cell Lymphoma (lymph node cancer), over 40% of patients relapse or 
              resist chemotherapy and other standard treatments.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              ImmunoACT brings revolutionary CAR-T cell therapy for cancer treatment in India, 
              where a patient's own immune cells are genetically modified to recognize and 
              destroy cancer cells. This groundbreaking approach has demonstrated remarkable 
              improvements in overall survival and offers new hope for patients seeking 
              advanced CAR-T therapy in India with limited treatment options.
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card) => (
            <div 
              key={card.id} 
              className={`${card.bgColor} ${card.textColor} p-8 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300`}
            >
              <h4 className="text-2xl font-bold mb-4">{card.title}</h4>
              <p className="text-lg leading-relaxed opacity-90">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeatureCards