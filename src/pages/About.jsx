import PageBanner from '@/components/PageBanner'

const About = () => {
  const teamMembers = [
    {
      description: "Leading immunologist with 15+ years of experience in CAR-T cell therapy research.",
      image: "/api/placeholder/300/300",
      name: "Dr. Rahul Purwar",
      position: "Founder & CEO"
    },
    {
      description: "Expert in cell and gene therapy with extensive clinical trial experience.",
      image: "/api/placeholder/300/300",
      name: "Dr. Priya Sharma",
      position: "Chief Scientific Officer"
    },
    {
      description: "Specialist in GMP manufacturing and quality control for cell therapies.",
      image: "/api/placeholder/300/300",
      name: "Dr. Amit Kumar",
      position: "Head of Manufacturing"
    },
    {
      description: "Oncologist with expertise in CAR-T cell therapy clinical applications.",
      image: "/api/placeholder/300/300",
      name: "Dr. Sneha Patel",
      position: "Clinical Director"
    }
  ]

  return (
    // <div className="min-h-screen bg-gray-50 font-futura">
    //   {/* Hero Section */}
    //   <PageBanner 
    //     title="About Us" 
    //     subtitle="Pioneering India's first indigenous CAR-T cell therapy company, dedicated to making advanced cancer treatment accessible to all."
    //   />

    //   {/* Who We Are Section */}
    //   <section className="py-16 bg-white">
    //     <div className="max-w-[1216px] mx-auto px-4 sm:px-6 lg:px-8">
    //       <div className="max-w-4xl mx-auto">
    //         <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">Who We Are</h2>
            
    //         <div className="mb-12">
    //           <h3 className="text-2xl font-bold text-gray-800 mb-6">Our Mission</h3>
    //           <p className="text-lg text-gray-600 leading-relaxed mb-8">
    //             ImmunoACT is India's pioneering CAR-T cell therapy company, committed to transforming 
    //             cancer treatment through innovative, accessible, and affordable immunotherapy solutions. 
    //             We believe that every patient deserves access to cutting-edge treatment, regardless of 
    //             their economic background.
    //           </p>
    //         </div>

    //         <div className="mb-12">
    //           <h3 className="text-2xl font-bold text-gray-800 mb-6">Our Vision</h3>
    //           <p className="text-lg text-gray-600 leading-relaxed mb-8">
    //             To become the leading provider of CAR-T cell therapies in India and beyond, 
    //             making advanced cancer treatment accessible to patients worldwide while maintaining 
    //             the highest standards of safety and efficacy.
    //           </p>
    //         </div>

    //         <div className="mb-12">
    //           <h3 className="text-2xl font-bold text-gray-800 mb-6">Our Values</h3>
    //           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    //             <div className="bg-orange-50 p-6 rounded-lg">
    //               <h4 className="text-xl font-bold text-orange-600 mb-3">Innovation</h4>
    //               <p className="text-gray-600">Continuously pushing the boundaries of medical science to develop breakthrough treatments.</p>
    //             </div>
    //             <div className="bg-teal-50 p-6 rounded-lg">
    //               <h4 className="text-xl font-bold text-teal-600 mb-3">Accessibility</h4>
    //               <p className="text-gray-600">Making advanced treatments available to patients across all economic backgrounds.</p>
    //             </div>
    //             <div className="bg-blue-50 p-6 rounded-lg">
    //               <h4 className="text-xl font-bold text-blue-600 mb-3">Excellence</h4>
    //               <p className="text-gray-600">Maintaining the highest standards in research, manufacturing, and patient care.</p>
    //             </div>
    //             <div className="bg-purple-50 p-6 rounded-lg">
    //               <h4 className="text-xl font-bold text-purple-600 mb-3">Compassion</h4>
    //               <p className="text-gray-600">Putting patients first in everything we do, with empathy and understanding.</p>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </section>

    //   {/* Our Team Section */}
    //   <section className="py-16 bg-gray-50">
    //     <div className="max-w-[1216px] mx-auto px-4 sm:px-6 lg:px-8">
    //       <div className="text-center mb-12">
    //         <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Team</h2>
    //         <p className="text-lg text-gray-600 max-w-3xl mx-auto">
    //           Meet the dedicated professionals driving innovation in CAR-T cell therapy and transforming cancer treatment in India.
    //         </p>
    //       </div>

    //       <div className="text-center mb-12">
    //         <h3 className="text-3xl font-bold text-gray-800 mb-4">Leadership Team</h3>
    //         <p className="text-lg text-gray-600 max-w-3xl mx-auto">
    //           Our team combines decades of experience in immunology, oncology, 
    //           manufacturing, and clinical research to deliver breakthrough treatments.
    //         </p>
    //       </div>

    //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
    //         {teamMembers.map((member, index) => (
    //           <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
    //             <div className="aspect-square bg-gray-200 flex items-center justify-center">
    //               <span className="text-gray-500">Photo Coming Soon</span>
    //             </div>
    //             <div className="p-6">
    //               <h4 className="text-xl font-bold text-gray-800 mb-2">{member.name}</h4>
    //               <p className="text-orange-600 font-semibold mb-3">{member.position}</p>
    //               <p className="text-gray-600 text-sm leading-relaxed">{member.description}</p>
    //             </div>
    //           </div>
    //         ))}
    //       </div>

    //       {/* Advisory Board */}
    //       <div>
    //         <h3 className="text-3xl font-bold text-gray-800 text-center mb-8">Advisory Board</h3>
    //         <div className="bg-gradient-to-r from-orange-50 to-teal-50 p-8 rounded-xl">
    //           <p className="text-lg text-gray-600 text-center leading-relaxed">
    //             Our advisory board includes renowned oncologists, immunologists, and industry experts 
    //             who guide our research and development efforts. Their expertise ensures we maintain 
    //             the highest standards in scientific rigor and clinical excellence.
    //           </p>
    //         </div>
    //       </div>
    //     </div>
    //   </section>
    // </div>
    <p>Hello world</p>
  )
}

export default About