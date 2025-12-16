import PageBanner from '@/components/PageBanner'

const Team = () => {
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
    <div className="min-h-screen bg-gray-50 font-futura">
      {/* Hero Section */}
      <PageBanner 
        title="Our Team" 
        subtitle="Meet the dedicated professionals driving innovation in CAR-T cell therapy and transforming cancer treatment in India."
      />

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="max-w-[1216px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Leadership Team</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our team combines decades of experience in immunology, oncology, 
              manufacturing, and clinical research to deliver breakthrough treatments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="aspect-square bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">Photo Coming Soon</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{member.name}</h3>
                  <p className="text-orange-600 font-semibold mb-3">{member.position}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{member.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Advisory Board */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Advisory Board</h2>
            <div className="bg-gradient-to-r from-orange-50 to-teal-50 p-8 rounded-xl">
              <p className="text-lg text-gray-600 text-center leading-relaxed">
                Our advisory board includes renowned oncologists, immunologists, and industry experts 
                who guide our research and development efforts. Their expertise ensures we maintain 
                the highest standards in scientific rigor and clinical excellence.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Team