const CARTTherapy = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">CAR-T Cell Therapy</h2>
          <h3 className="text-2xl text-gray-600">
            Harnessing Your Immune System to Fight Cancer Safely
          </h3>
        </div>
        
        <div className="space-y-12">
          <div className="max-w-4xl mx-auto space-y-6">
            <p className="text-lg text-gray-600 leading-relaxed">
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
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h4 className="text-xl font-bold text-primary-500 mb-4">Our Pipeline</h4>
              <p className="text-gray-600 leading-relaxed">
                Pioneering India's first indigenous CAR-T therapies, we are advancing 
                innovative treatments to combat cancer with targeted, life-saving solutions.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h4 className="text-xl font-bold text-primary-500 mb-4">Our Platform</h4>
              <p className="text-gray-600 leading-relaxed">
                Our proprietary technology platform enables efficient CAR-T cell production 
                with in-house LV & plasmid manufacturing, giving us complete control over 
                every aspect of creating an effective product.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h4 className="text-xl font-bold text-primary-500 mb-4">NexCAR19: The Living Drug</h4>
              <p className="text-gray-600 leading-relaxed">
                NexCAR19, India's first approved CAR-T therapy, transforms patients' immune 
                cells into living cancer-fighting agents, offering hope where conventional 
                treatments fail.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CARTTherapy