import PageBanner from '@/components/PageBanner'

const Science = () => {
  const researchAreas = [
    {
      description: "Developing next-generation CAR constructs with improved safety and efficacy profiles.",
      icon: "🧬",
      title: "CAR-T Cell Engineering"
    },
    {
      description: "Optimizing production processes to reduce costs and improve scalability.",
      icon: "🏭",
      title: "Manufacturing Innovation"
    },
    {
      description: "Conducting rigorous clinical trials to validate safety and efficacy.",
      icon: "🔬",
      title: "Clinical Development"
    },
    {
      description: "Identifying predictive biomarkers for patient selection and monitoring.",
      icon: "📊",
      title: "Biomarker Discovery"
    }
  ]

  const pipeline = [
    {
      indication: "B-cell Malignancies",
      product: "NexCAR19™",
      stage: "Approved",
      status: "Commercial"
    },
    {
      indication: "Multiple Myeloma",
      product: "NexCAR-BCMA",
      stage: "Phase II",
      status: "Clinical Trial"
    },
    {
      indication: "Hodgkin Lymphoma",
      product: "NexCAR-CD30",
      stage: "Phase I",
      status: "Clinical Trial"
    },
    {
      indication: "Solid Tumors",
      product: "NexCAR-Solid",
      stage: "Preclinical",
      status: "Research"
    }
  ]

  const publications = [
    {
      journal: "Nature Medicine",
      title: "Safety and efficacy of NexCAR19 in pediatric and young adult patients",
      year: "2024"
    },
    {
      journal: "Cell Therapy and Transplantation",
      title: "Manufacturing optimization of CAR-T cells for improved scalability",
      year: "2024"
    },
    {
      journal: "Indian Journal of Hematology",
      title: "Real-world evidence of CAR-T cell therapy outcomes in Indian patients",
      year: "2023"
    }
  ]

  return (
    // <div className="min-h-screen bg-gray-50 font-futura">
    //   {/* Hero Section */}
    //   <PageBanner 
    //     title="Science" 
    //     subtitle="Advancing the frontiers of CAR-T cell therapy through innovative research and development."
    //   />

    //   {/* Research Focus Section */}
    //   <section className="py-16 bg-white">
    //     <div className="max-w-[1216px] mx-auto px-4 sm:px-6 lg:px-8">
    //       <div className="text-center mb-12">
    //         <h2 className="text-4xl font-bold text-gray-800 mb-6">Our Research Focus</h2>
    //         <p className="text-lg text-gray-600 max-w-4xl mx-auto">
    //           Our research team is dedicated to developing next-generation CAR-T cell therapies 
    //           that are more effective, safer, and accessible to patients worldwide.
    //         </p>
    //       </div>

    //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
    //         {researchAreas.map((area, index) => (
    //           <div key={index} className="bg-gradient-to-br from-blue-50 to-teal-50 p-6 rounded-xl text-center">
    //             <div className="text-4xl mb-4">{area.icon}</div>
    //             <h3 className="text-xl font-bold text-gray-800 mb-3">{area.title}</h3>
    //             <p className="text-gray-600">{area.description}</p>
    //           </div>
    //         ))}
    //       </div>
    //     </div>
    //   </section>

    //   {/* Pipeline Section */}
    //   <section className="py-16 bg-gray-50">
    //     <div className="max-w-[1216px] mx-auto px-4 sm:px-6 lg:px-8">
    //       <div className="text-center mb-12">
    //         <h2 className="text-4xl font-bold text-gray-800 mb-6">Our Pipeline</h2>
    //         <p className="text-lg text-gray-600 max-w-3xl mx-auto">
    //           A robust pipeline of CAR-T cell therapies targeting various cancer types, 
    //           from approved treatments to cutting-edge research programs.
    //         </p>
    //       </div>

    //       <div className="overflow-x-auto">
    //         <table className="w-full bg-white rounded-lg shadow-sm overflow-hidden">
    //           <thead className="bg-gray-800 text-white">
    //             <tr>
    //               <th className="px-6 py-4 text-left">Product</th>
    //               <th className="px-6 py-4 text-left">Indication</th>
    //               <th className="px-6 py-4 text-left">Stage</th>
    //               <th className="px-6 py-4 text-left">Status</th>
    //             </tr>
    //           </thead>
    //           <tbody>
    //             {pipeline.map((item, index) => (
    //               <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
    //                 <td className="px-6 py-4 font-semibold text-gray-800">{item.product}</td>
    //                 <td className="px-6 py-4 text-gray-600">{item.indication}</td>
    //                 <td className="px-6 py-4">
    //                   <span className={`px-3 py-1 rounded-full text-sm font-medium ${
    //                     item.stage === 'Approved' ? 'bg-green-100 text-green-800' :
    //                     item.stage === 'Phase II' ? 'bg-blue-100 text-blue-800' :
    //                     item.stage === 'Phase I' ? 'bg-yellow-100 text-yellow-800' :
    //                     'bg-gray-100 text-gray-800'
    //                   }`}>
    //                     {item.stage}
    //                   </span>
    //                 </td>
    //                 <td className="px-6 py-4 text-gray-600">{item.status}</td>
    //               </tr>
    //             ))}
    //           </tbody>
    //         </table>
    //       </div>
    //     </div>
    //   </section>

    //   {/* Process Section */}
    //   <section className="py-16 bg-white">
    //     <div className="max-w-[1216px] mx-auto px-4 sm:px-6 lg:px-8">
    //       <div className="text-center mb-12">
    //         <h2 className="text-4xl font-bold text-gray-800 mb-6">Our Process</h2>
    //         <p className="text-lg text-gray-600 max-w-3xl mx-auto">
    //           From concept to clinic, our rigorous development process ensures the highest standards 
    //           of safety and efficacy in every CAR-T cell therapy we develop.
    //         </p>
    //       </div>

    //       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    //         <div className="text-center">
    //           <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
    //             1
    //           </div>
    //           <h3 className="text-xl font-bold text-gray-800 mb-3">Discovery & Design</h3>
    //           <p className="text-gray-600">
    //             Identifying target antigens and designing optimal CAR constructs through 
    //             computational modeling and laboratory validation.
    //           </p>
    //         </div>
    //         <div className="text-center">
    //           <div className="w-16 h-16 bg-teal-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
    //             2
    //           </div>
    //           <h3 className="text-xl font-bold text-gray-800 mb-3">Preclinical Testing</h3>
    //           <p className="text-gray-600">
    //             Extensive preclinical studies to evaluate safety, efficacy, and optimal 
    //             manufacturing conditions before clinical trials.
    //           </p>
    //         </div>
    //         <div className="text-center">
    //           <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
    //             3
    //           </div>
    //           <h3 className="text-xl font-bold text-gray-800 mb-3">Clinical Development</h3>
    //           <p className="text-gray-600">
    //             Rigorous clinical trials conducted in compliance with international 
    //             standards to validate safety and efficacy in patients.
    //           </p>
    //         </div>
    //       </div>
    //     </div>
    //   </section>

    //   {/* Publications Section */}
    //   <section className="py-16 bg-gray-50">
    //     <div className="max-w-[1216px] mx-auto px-4 sm:px-6 lg:px-8">
    //       <div className="text-center mb-12">
    //         <h2 className="text-4xl font-bold text-gray-800 mb-6">Recent Publications</h2>
    //         <p className="text-lg text-gray-600 max-w-3xl mx-auto">
    //           Our research findings published in leading scientific journals, 
    //           contributing to the global advancement of CAR-T cell therapy.
    //         </p>
    //       </div>

    //       <div className="space-y-6">
    //         {publications.map((pub, index) => (
    //           <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
    //             <h3 className="text-lg font-semibold text-gray-800 mb-2">{pub.title}</h3>
    //             <p className="text-gray-600">
    //               <span className="font-medium">{pub.journal}</span> • {pub.year}
    //             </p>
    //           </div>
    //         ))}
    //       </div>

    //       <div className="text-center mt-8">
    //         <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
    //           View All Publications
    //         </button>
    //       </div>
    //     </div>
    //   </section>
    // </div>
    <p>Hello world</p>
  )
}

export default Science