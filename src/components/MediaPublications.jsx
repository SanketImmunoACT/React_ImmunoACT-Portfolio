const MediaPublications = () => {
  const mediaItems = [
    {
      category: "Media Coverage",
      date: "Nov 5, 2024",
      source: "Economic Times",
      title: "India Unveils Its First Indigenous CAR-T Cell Therapy"
    },
    {
      category: "Media Coverage",
      date: "Aug 21, 2024",
      source: "Times of India",
      title: "New Zealander picks Bangalore for cancer treatment"
    },
    {
      category: "Media Coverage",
      date: "Aug 18, 2024",
      source: "Times of Oman",
      title: "First successful CAR-T Cell therapy in Oman"
    }
  ]

  const publications = [
    {
      date: "Apr 24, 2024",
      journal: "Blood Cancer Journal",
      title: "Novel humanized CD19-CAR-T cells in pediatric B-acute lymphoblastic leukemia",
      type: "Research Article"
    },
    {
      date: "Apr 1, 2024",
      journal: "The Lancet Haematology",
      title: "Talicabtagene Autoleucel for Relapsed B-cell Malignancies",
      type: "Clinical Study"
    },
    {
      date: "Dec 9, 2023",
      journal: "American Society of Hematology",
      title: "Safety Profile of Novel Humanized CD19 CAR T-Cell Therapy",
      type: "Abstract"
    }
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Media Coverage */}
        <div className="mb-16">
          <div className="text-start">
            <h2 className="text-[38px] font-normal text-[#47A178] font-futura">Media Coverage</h2>
            <p className="text-lg text-[#363636] mt-4 mb-8">
              Our breakthrough CAR-T therapy has been featured in leading national and international news platforms.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {mediaItems.map((item, index) => (
              <div key={index} className="bg-gradient-to-br from-orange-50 to-yellow-50 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="mb-4">
                  <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                    {item.category}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3 leading-tight">{item.title}</h3>
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <span className="font-medium">{item.source}</span>
                  <span>{item.date}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-start mt-8">
            <button className="bg-[#FFBF00] hover:bg-yellow-500 text-[#363636] font-medium px-[18px] py-[9px] rounded-full transition-colors text-[18px]">
              View More
            </button>
          </div>
        </div>

        {/* Divider Line */}
        <div className="my-20 flex justify-center">
          <div className="w-full max-w-[650px] h-[1px] bg-[#FFBF00] mx-4"></div>
        </div>

        {/* Publications */}
        <div>
          <div className="mb-12">
            <h2 className="text-[38px] font-normal text-[#47A178] font-futura">Scientific Publications</h2>
            <p className="text-lg text-[#363636] mt-4 mb-8">
              Our research has been published in prestigious journals including The Lancet Haematology,
              Blood Cancer Journal, and presented at leading medical conferences.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {publications.map((pub, index) => (
              <div key={index} className="bg-gradient-to-br from-blue-50 to-teal-50 p-8 rounded-xl shadow-lg">
                <div className="mb-4">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {pub.type}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4 leading-tight">{pub.title}</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div><span className="font-medium">Journal:</span> {pub.journal}</div>
                  <div><span className="font-medium">Published:</span> {pub.date}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-start mt-8">
            <button className="bg-[#FFBF00] hover:bg-yellow-500 text-[#363636] font-medium px-[18px] py-[9px] rounded-full transition-colors text-[18px]">
              View More
            </button>
          </div>
        </div>


      </div>
    </section>
  )
}

export default MediaPublications