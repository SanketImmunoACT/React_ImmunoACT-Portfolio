import PageBanner from '@/components/PageBanner'

const ForPatients = () => {
  const benefits = [
    {
      title: "90% Remission Rate",
      description: "Proven effectiveness in clinical trials with high success rates",
      icon: "📊"
    },
    {
      title: "~20 Days Process",
      description: "Fast vein-to-vein time from cell collection to infusion",
      icon: "⏱️"
    },
    {
      title: "Personalized Treatment",
      description: "Uses your own immune cells, modified to fight your specific cancer",
      icon: "🧬"
    },
    {
      title: "Hope for Relapsed Cases",
      description: "Effective for patients who haven't responded to traditional treatments",
      icon: "💪"
    }
  ]

  const process = [
    {
      step: "1",
      title: "Consultation",
      description: "Meet with our medical team to assess eligibility for NexCAR19 treatment"
    },
    {
      step: "2", 
      title: "Cell Collection",
      description: "Your T-cells are collected through a simple outpatient procedure"
    },
    {
      step: "3",
      title: "Manufacturing",
      description: "Your cells are genetically modified in our WHO-GMP certified facility"
    },
    {
      step: "4",
      title: "Infusion",
      description: "The modified CAR-T cells are infused back into your body"
    },
    {
      step: "5",
      title: "Monitoring",
      description: "Continuous monitoring and support throughout your recovery"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 font-futura">
      {/* Hero Section */}
      <PageBanner 
        title="NexCAR19™ for Patients" 
        subtitle="India's first approved CAR-T cell therapy, offering new hope for patients with relapsed or refractory B-cell malignancies."
      />
      
      {/* Action Buttons Section */}
      <section className="py-8 bg-white">
        <div className="max-w-[1216px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-3 rounded-full font-bold transition-colors">
              Find a Treatment Centre
            </button>
            <button className="border-2 border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white px-8 py-3 rounded-full font-bold transition-colors">
              Download Patient Guide
            </button>
          </div>
        </div>
      </section>

      {/* What is NexCAR19 */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">What is NexCAR19™?</h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                NexCAR19™ is a revolutionary CAR-T cell therapy that uses your own immune cells 
                to fight cancer. Your T-cells are collected, genetically modified in our laboratory 
                to better recognize and attack cancer cells, and then infused back into your body.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                This "living drug" continues to work in your body, providing long-lasting protection 
                against cancer recurrence.
              </p>
            </div>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-gradient-to-br from-orange-50 to-teal-50 p-6 rounded-xl text-center">
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Treatment Process */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Treatment Process</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Understanding your NexCAR19™ treatment journey from consultation to recovery.
            </p>
          </div>

          <div className="space-y-8">
            {process.map((item, index) => (
              <div key={index} className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center text-2xl font-bold">
                    {item.step}
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">{item.title}</h3>
                  <p className="text-lg text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-teal-500 to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-white">
            <h2 className="text-4xl font-bold mb-6">Ready to Start Your Journey?</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Take the first step towards your personalized cancer treatment. 
              Our medical team is here to guide you through every step.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-3 rounded-full font-bold transition-colors">
                Schedule Consultation
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-teal-600 px-8 py-3 rounded-full font-bold transition-colors">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ForPatients