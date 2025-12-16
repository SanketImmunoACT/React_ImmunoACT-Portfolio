import { Link } from 'react-router-dom'

const MediaSection = () => {
  const mediaItems = [
    {
      title: "India Unveils Its First Indigenous CAR-T Cell Therapy, Paving the Way for Affordable Cancer Immunotherapy",
      source: "Economic Times",
      date: "05 Nov 2025"
    },
    {
      title: "Last shot at life: New Zealander picks Bangaluru for cancer treatment post media reports; Hails CAR-T cell Therapy",
      source: "Times of India",
      date: "21 Aug 2025"
    },
    {
      title: "First successful CAR-T Cell therapy for cancer patients in Oman",
      source: "Times of Oman",
      date: "18 Aug 2025"
    }
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">Media</h2>
        
        <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
          Checkout our media coverage, showcased in leading national & international news platforms.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {mediaItems.map((item, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 leading-tight">{item.title}</h3>
              <div className="flex justify-between items-center text-sm text-gray-600">
                <span className="font-medium">{item.source}</span>
                <span>{item.date}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <Link 
            to="/news-media"
            className="border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white px-8 py-3 rounded-lg font-semibold transition-colors inline-block"
          >
            View More
          </Link>
        </div>
      </div>
    </section>
  )
}

export default MediaSection