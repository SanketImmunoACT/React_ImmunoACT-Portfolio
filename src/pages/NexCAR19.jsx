import PageBanner from '@/components/PageBanner'

const NexCAR19 = () => {
  const benefits = [
    {
      description: "Proven effectiveness in clinical trials with high success rates",
      icon: "📊",
      title: "90% Remission Rate"
    },
    {
      description: "Fast vein-to-vein time from cell collection to infusion",
      icon: "⏱️",
      title: "~20 Days Process"
    },
    {
      description: "Uses your own immune cells, modified to fight your specific cancer",
      icon: "🧬",
      title: "Personalized Treatment"
    },
    {
      description: "Effective for patients who haven't responded to traditional treatments",
      icon: "💪",
      title: "Hope for Relapsed Cases"
    }
  ]

  const process = [
    {
      description: "Meet with our medical team to assess eligibility for NexCAR19 treatment",
      step: "1",
      title: "Consultation"
    },
    {
      description: "Your T-cells are collected through a simple outpatient procedure", 
      step: "2",
      title: "Cell Collection"
    },
    {
      description: "Your cells are genetically modified in our WHO-GMP certified facility",
      step: "3",
      title: "Manufacturing"
    },
    {
      description: "The modified CAR-T cells are infused back into your body",
      step: "4",
      title: "Infusion"
    },
    {
      description: "Continuous monitoring and support throughout your recovery",
      step: "5",
      title: "Monitoring"
    }
  ]

  const clinicalData = [
    {
      followUp: "3 months",
      indication: "B-ALL (Pediatric)",
      patients: "50+",
      remissionRate: "73%"
    },
    {
      followUp: "3 months",
      indication: "B-NHL (Adult)", 
      patients: "100+",
      remissionRate: "68%"
    },
    {
      followUp: "Overall",
      indication: "Overall",
      patients: "200+",
      remissionRate: "90%"
    }
  ]

  const specifications = [
    {
      description: "From apheresis to infusion",
      parameter: "Vein-to-Vein Time",
      value: "~20 days"
    },
    {
      description: "Successful product generation",
      parameter: "Manufacturing Success Rate",
      value: ">95%"
    },
    {
      description: "Post-manufacturing viability",
      parameter: "Cell Viability",
      value: ">85%"
    },
    {
      description: "Cell expansion during manufacturing",
      parameter: "Expansion Fold",
      value: "100-1000x"
    }
  ]

  return (
    // <div className="min-h-screen bg-gray-50 font-futura">
    //   {/* Hero Section */}
    //   <PageBanner 
    //     title="NexCAR19™" 
    //     subtitle="India's first approved CAR-T cell therapy, offering new hope for patients with relapsed or refractory B-cell malignancies."
    //   />
      
    //   {/* Action Buttons Section */}
    //   <section className="py-8 bg-white">
    //     <div className="max-w-[1216px] mx-auto px-4 sm:px-6 lg:px-8">
    //       <div className="flex flex-col sm:flex-row gap-4 justify-center">
    //         <button className="bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-3 rounded-full font-bold transition-colors">
    //           Find a Treatment Centre
    //         </button>
    //         <button className="border-2 border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white px-8 py-3 rounded-full font-bold transition-colors">
    //           Download Patient Guide
    //         </button>
    //         <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-bold transition-colors">
    //           For Healthcare Professionals
    //         </button>
    //       </div>
    //     </div>
    //   </section>

    //   {/* What is NexCAR19 - For Patients */}
    //   <section className="py-16 bg-gray-50">
    //     <div className="max-w-[1216px] mx-auto px-4 sm:px-6 lg:px-8">
    //       <div className="text-center mb-12">
    //         <h2 className="text-4xl font-bold text-gray-800 mb-6">What is NexCAR19™?</h2>
    //         <div className="max-w-4xl mx-auto">
    //           <p className="text-lg text-gray-600 leading-relaxed mb-6">
    //             NexCAR19™ is a revolutionary CAR-T cell therapy that uses your own immune cells 
    //             to fight cancer. Your T-cells are collected, genetically modified in our laboratory 
    //             to better recognize and attack cancer cells, and then infused back into your body.
    //           </p>
    //           <p className="text-lg text-gray-600 leading-relaxed">
    //             This "living drug" continues to work in your body, providing long-lasting protection 
    //             against cancer recurrence.
    //           </p>
    //         </div>
    //       </div>

    //       {/* Benefits Grid */}
    //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
    //         {benefits.map((benefit, index) => (
    //           <div key={index} className="bg-white p-6 rounded-xl shadow-sm text-center">
    //             <div className="text-4xl mb-4">{benefit.icon}</div>
    //             <h3 className="text-xl font-bold text-gray-800 mb-3">{benefit.title}</h3>
    //             <p className="text-gray-600">{benefit.description}</p>
    //           </div>
    //         ))}
    //       </div>
    //     </div>
    //   </section>

    //   {/* Treatment Process - For Patients */}
    //   <section className="py-16 bg-white">
    //     <div className="max-w-[1216px] mx-auto px-4 sm:px-6 lg:px-8">
    //       <div className="text-center mb-12">
    //         <h2 className="text-4xl font-bold text-gray-800 mb-6">Treatment Process</h2>
    //         <p className="text-lg text-gray-600 max-w-3xl mx-auto">
    //           Understanding your NexCAR19™ treatment journey from consultation to recovery.
    //         </p>
    //       </div>

    //       <div className="space-y-8">
    //         {process.map((item, index) => (
    //           <div key={index} className="flex flex-col md:flex-row items-center gap-8">
    //             <div className="flex-shrink-0">
    //               <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center text-2xl font-bold">
    //                 {item.step}
    //               </div>
    //             </div>
    //             <div className="flex-1 text-center md:text-left">
    //               <h3 className="text-2xl font-bold text-gray-800 mb-3">{item.title}</h3>
    //               <p className="text-lg text-gray-600">{item.description}</p>
    //             </div>
    //           </div>
    //         ))}
    //       </div>
    //     </div>
    //   </section>

    //   {/* Clinical Efficacy - For HCP */}
    //   <section className="py-16 bg-gray-50">
    //     <div className="max-w-[1216px] mx-auto px-4 sm:px-6 lg:px-8">
    //       <div className="text-center mb-12">
    //         <h2 className="text-4xl font-bold text-gray-800 mb-6">Clinical Efficacy Data</h2>
    //         <p className="text-lg text-gray-600 max-w-3xl mx-auto">
    //           NexCAR19™ has demonstrated significant efficacy across multiple B-cell malignancies 
    //           in our clinical trials.
    //         </p>
    //       </div>

    //       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    //         {clinicalData.map((data, index) => (
    //           <div key={index} className="bg-white p-8 rounded-xl shadow-sm">
    //             <h3 className="text-2xl font-bold text-blue-600 mb-4">{data.indication}</h3>
    //             <div className="space-y-3">
    //               <div className="flex justify-between">
    //                 <span className="text-gray-600">Remission Rate:</span>
    //                 <span className="font-bold text-gray-800">{data.remissionRate}</span>
    //               </div>
    //               <div className="flex justify-between">
    //                 <span className="text-gray-600">Follow-up:</span>
    //                 <span className="font-bold text-gray-800">{data.followUp}</span>
    //               </div>
    //               <div className="flex justify-between">
    //                 <span className="text-gray-600">Patients:</span>
    //                 <span className="font-bold text-gray-800">{data.patients}</span>
    //               </div>
    //             </div>
    //           </div>
    //         ))}
    //       </div>
    //     </div>
    //   </section>

    //   {/* Product Specifications - For HCP */}
    //   <section className="py-16 bg-white">
    //     <div className="max-w-[1216px] mx-auto px-4 sm:px-6 lg:px-8">
    //       <div className="text-center mb-12">
    //         <h2 className="text-4xl font-bold text-gray-800 mb-6">Product Specifications</h2>
    //         <p className="text-lg text-gray-600 max-w-3xl mx-auto">
    //           Technical specifications and manufacturing parameters for NexCAR19™.
    //         </p>
    //       </div>

    //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
    //         {specifications.map((spec, index) => (
    //           <div key={index} className="bg-gray-50 p-6 rounded-xl text-center">
    //             <h3 className="text-lg font-bold text-gray-800 mb-2">{spec.parameter}</h3>
    //             <div className="text-3xl font-bold text-teal-600 mb-2">{spec.value}</div>
    //             <p className="text-sm text-gray-600">{spec.description}</p>
    //           </div>
    //         ))}
    //       </div>
    //     </div>
    //   </section>

    //   {/* Safety Profile - For HCP */}
    //   <section className="py-16 bg-gray-50">
    //     <div className="max-w-[1216px] mx-auto px-4 sm:px-6 lg:px-8">
    //       <div className="text-center mb-12">
    //         <h2 className="text-4xl font-bold text-gray-800 mb-6">Safety Profile</h2>
    //       </div>

    //       <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
    //         <div>
    //           <h3 className="text-2xl font-bold text-gray-800 mb-6">Adverse Events</h3>
    //           <div className="space-y-4">
    //             <div className="bg-yellow-50 p-4 rounded-lg">
    //               <h4 className="font-bold text-yellow-800 mb-2">Cytokine Release Syndrome (CRS)</h4>
    //               <p className="text-yellow-700">Grade 1-2: 60%, Grade 3-4: 15%</p>
    //             </div>
    //             <div className="bg-blue-50 p-4 rounded-lg">
    //               <h4 className="font-bold text-blue-800 mb-2">Neurological Events</h4>
    //               <p className="text-blue-700">Grade 1-2: 25%, Grade 3-4: 5%</p>
    //             </div>
    //             <div className="bg-green-50 p-4 rounded-lg">
    //               <h4 className="font-bold text-green-800 mb-2">Manageable Profile</h4>
    //               <p className="text-green-700">All events were manageable with standard protocols</p>
    //             </div>
    //           </div>
    //         </div>

    //         <div>
    //           <h3 className="text-2xl font-bold text-gray-800 mb-6">Monitoring Guidelines</h3>
    //           <div className="space-y-4">
    //             <div className="border-l-4 border-orange-500 pl-4">
    //               <h4 className="font-bold text-gray-800">Pre-infusion</h4>
    //               <p className="text-gray-600">Complete blood count, metabolic panel, coagulation studies</p>
    //             </div>
    //             <div className="border-l-4 border-teal-500 pl-4">
    //               <h4 className="font-bold text-gray-800">Post-infusion</h4>
    //               <p className="text-gray-600">Daily monitoring for first 7 days, then weekly for 4 weeks</p>
    //             </div>
    //             <div className="border-l-4 border-blue-500 pl-4">
    //               <h4 className="font-bold text-gray-800">Long-term</h4>
    //               <p className="text-gray-600">Monthly follow-up for first year, then quarterly</p>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </section>

    //   {/* CTA Section */}
    //   <section className="py-16 bg-gradient-to-r from-teal-500 to-blue-600">
    //     <div className="max-w-[1216px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
    //       <div className="text-white">
    //         <h2 className="text-4xl font-bold mb-6">Ready to Learn More?</h2>
    //         <p className="text-xl mb-8 max-w-3xl mx-auto">
    //           Whether you're a patient seeking treatment or a healthcare professional looking for resources, 
    //           we're here to support you every step of the way.
    //         </p>
    //         <div className="flex flex-col sm:flex-row gap-4 justify-center">
    //           <button className="bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-3 rounded-full font-bold transition-colors">
    //             Schedule Consultation
    //           </button>
    //           <button className="border-2 border-white text-white hover:bg-white hover:text-teal-600 px-8 py-3 rounded-full font-bold transition-colors">
    //             Contact Us
    //           </button>
    //         </div>
    //       </div>
    //     </div>
    //   </section>
    // </div>
    <p>Hello world</p>
  )
}

export default NexCAR19