import { Link } from 'react-router-dom'

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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mediaItems.map((item, index) => (
              <article key={index} className="bg-white rounded-3xl border border-gray-200 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 overflow-hidden cursor-pointer">
                {/* Card Content with Flexbox for uniform height */}
                <div className="p-6 h-full flex flex-col min-h-[280px]">
                  {/* Top Section - Flexible */}
                  <div className="flex-1 mb-4">
                    <h3 className="text-lg text-[#363636] leading-tight mb-4 line-clamp-3">
                      {item.title}
                    </h3>
                  </div>

                  {/* Bottom Section - Fixed at bottom */}
                  <div className="mt-auto space-y-4">
                    {/* Source Tag and Date */}
                    <div className="flex items-center justify-between">
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                        {item.source}
                      </span>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <span>{item.date}</span>
                      </div>
                    </div>

                    {/* Read More Link */}
                    <Link
                      to="/news-media"
                      className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors text-sm"
                    >
                      Read Full Article
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="text-start mt-8">
            <Link 
              to="/news-media"
              className="inline-block bg-[#FFBF00] hover:bg-yellow-500 text-[#363636] font-medium px-[18px] py-[9px] rounded-full transition-colors text-[18px]"
            >
              View More
            </Link>
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {publications.map((pub, index) => (
              <article key={index} className="bg-white rounded-3xl border border-gray-200 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 overflow-hidden cursor-pointer">
                {/* Card Content with Flexbox for uniform height */}
                <div className="p-6 h-full flex flex-col min-h-[280px]">
                  {/* Top Section - Flexible */}
                  <div className="flex-1 mb-4">
                    <h3 className="text-lg text-[#363636] leading-tight mb-4 line-clamp-3">
                      {pub.title}
                    </h3>
                    
                    {/* Type Badge and Date */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded text-sm font-medium">
                        {pub.type}
                      </span>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <span>{pub.date}</span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Section - Fixed at bottom */}
                  <div className="mt-auto space-y-3">
                    {/* Organization/Journal */}
                    <div className="text-sm text-gray-600 line-clamp-2 min-h-[2.5rem] flex items-center">
                      {pub.journal}
                    </div>

                    {/* View Button */}
                    <Link
                      to="/publications"
                      className="block w-full bg-[#FFBF00] hover:bg-yellow-500 text-black text-center py-2 px-4 rounded-3xl font-medium transition-colors text-sm"
                    >
                      View Publication
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="text-start mt-8">
            <Link 
              to="/publications"
              className="inline-block bg-[#FFBF00] hover:bg-yellow-500 text-[#363636] font-medium px-[18px] py-[9px] rounded-full transition-colors text-[18px]"
            >
              View More
            </Link>
          </div>
        </div>


      </div>
    </section>
  )
}

export default MediaPublications