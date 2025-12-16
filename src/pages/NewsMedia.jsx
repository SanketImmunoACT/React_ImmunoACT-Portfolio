import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, ExternalLink, Filter, Search } from 'lucide-react'
import BG1 from '@/assets/images/background/BG-1.png'

const NewsMedia = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('date-desc')
  const [filterBy, setFilterBy] = useState('all')
  const [showFilters, setShowFilters] = useState(false)

  // Dummy media data - this will be replaced with API data later
  const mediaData = [
    {
      id: 1,
      category: "The Hindu Bureau",
      createdAt: "2024-11-08T10:43:00Z",
      date: "2024-11-08",
      excerpt: "Prime Minister Narendra Modi unveiled India's first indigenous CAR-T cell therapy for cancer treatment, marking a significant milestone in the country's healthcare sector.",
      link: "https://voiofhealthcare.com/news/policy/pm-modi-unveils-nexcar19",
      source: "Voice of Healthcare",
      tags: ["CAR-T Therapy", "Healthcare", "Innovation", "Government"],
      title: "PM Modi Unveils India's First Indigenous CAR-T Cancer Therapy 'NexCAR19'",
      updatedAt: "2024-11-08T10:43:00Z"
    },
    {
      id: 2,
      category: "Medtech",
      createdAt: "2024-10-17T09:30:00Z",
      date: "2024-10-17",
      excerpt: "Clinical trials of India's indigenous CAR-T cell therapy show promising results with 73% response rate in blood cancer patients.",
      link: "https://economictimes.indiatimes.com/industry/healthcare/biotech/healthcare/indian-made-gene-therapy-for-blood-cancer-shows-73-response-rate-in-clinical-trials/articleshow/114321567.cms",
      source: "The Economic Times",
      tags: ["Clinical Trials", "Blood Cancer", "Gene Therapy"],
      title: "Indian-Made Gene Therapy For Blood Cancer Shows 73% Response Rate in Clinical Trials",
      updatedAt: "2024-10-17T09:30:00Z"
    },
    {
      id: 3,
      category: "Medtech",
      createdAt: "2024-10-17T08:15:00Z",
      date: "2024-10-17",
      excerpt: "Revolutionary gene therapy developed in India demonstrates high success rate in treating blood cancer patients.",
      link: "https://www.hindustantimes.com/india-news/gene-therapy-for-blood-cancer-shows-73-per-cent-response-rate-in-clinical-trials-101729152345678.html",
      source: "Hindustan Times",
      tags: ["Gene Therapy", "Clinical Success", "Healthcare Innovation"],
      title: "Gene therapy for blood cancer shows 73 per cent response rate in clinical trials",
      updatedAt: "2024-10-17T08:15:00Z"
    },
    {
      id: 4,
      category: "Medtech",
      createdAt: "2024-09-12T14:20:00Z",
      date: "2024-09-12",
      excerpt: "ImmunoACT's breakthrough CAR-T cell therapy offers affordable treatment option for blood cancer patients in India.",
      link: "https://medwatchindia.com/affordable-cart-cell-therapy-nexcar19",
      source: "Medwatch India",
      tags: ["Affordable Healthcare", "CAR-T Therapy", "Blood Cancer"],
      title: "Affordable CAR-T Cell Therapy for Blood Cancers: ImmunoACT's NexCAR19",
      updatedAt: "2024-09-12T14:20:00Z"
    },
    {
      id: 5,
      category: "Onlymyhealth",
      createdAt: "2024-08-17T11:45:00Z",
      date: "2024-08-17",
      excerpt: "India's first CAR-T cell therapy demonstrates remarkable success in cancer treatment with 73% response rate.",
      link: "https://www.onlymyhealth.com/fight-against-cancer-indias-1st-car-t-cell-therapy-shows-73-success-rate-know-other-breakthrough-treatments-1723876543",
      source: "Onlymyhealth",
      tags: ["Cancer Treatment", "Medical Breakthrough", "Success Rate"],
      title: "Fight Against Cancer: India's 1st CAR-T Cell Therapy Shows 73% Success Rate; Know Other Breakthrough Treatments",
      updatedAt: "2024-08-17T11:45:00Z"
    }
  ]

  // Filter and sort logic
  const filteredAndSortedMedia = useMemo(() => {
    let filtered = mediaData

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    // Apply category filter
    if (filterBy !== 'all') {
      filtered = filtered.filter(item => {
        switch (filterBy) {
          case 'recent':
            return new Date(item.date) >= new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
          case 'clinical-trials':
            return item.tags.some(tag => tag.toLowerCase().includes('clinical') || tag.toLowerCase().includes('trial'))
          case 'car-t':
            return item.tags.some(tag => tag.toLowerCase().includes('car-t'))
          case 'collaboration':
            return item.category.toLowerCase().includes('collaboration') || item.tags.some(tag => tag.toLowerCase().includes('collaboration'))
          default:
            return true
        }
      })
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date-desc':
          return new Date(b.date) - new Date(a.date)
        case 'date-asc':
          return new Date(a.date) - new Date(b.date)
        case 'title-asc':
          return a.title.localeCompare(b.title)
        case 'title-desc':
          return b.title.localeCompare(a.title)
        case 'created-desc':
          return new Date(b.createdAt) - new Date(a.createdAt)
        case 'updated-desc':
          return new Date(b.updatedAt) - new Date(a.updatedAt)
        default:
          return 0
      }
    })

    return filtered
  }, [mediaData, searchTerm, filterBy, sortBy])

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div 
        className="relative h-[587px] bg-cover bg-center bg-no-repeat flex items-center justify-center"
        style={{
          backgroundImage: `url(${BG1})`
        }}
      >
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: 'linear-gradient(120deg, #ffbf00, rgba(255, 72, 0, 0.67), rgba(20, 166, 42, 0.7))'
          }}
        ></div>
        <div className="relative max-w-[1216px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-2 border-white rounded-3xl py-20 sm:py-32 lg:py-40 px-6 sm:px-8 lg:px-12 text-center">
            <h1 className="text-5xl md:text-[80px] text-white opacity-[0.5] font-light">Media</h1>
            {/* <p className="text-4xl text-white max-w-3xl mx-auto mt-2">
              Stay updated with our latest news, media coverage, and breakthrough announcements in cancer immunotherapy
            </p> */}
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search news, sources, or topics..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Filter and Sort Controls */}
              <div className="flex gap-4 items-center">
                {/* Filter Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Filter className="w-4 h-4" />
                    Filter
                  </button>
                  {showFilters && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-10">
                      <div className="p-2">
                        <button
                          onClick={() => { setFilterBy('all'); setShowFilters(false) }}
                          className={`w-full text-left px-3 py-2 rounded hover:bg-gray-50 ${filterBy === 'all' ? 'bg-blue-50 text-blue-600' : ''}`}
                        >
                          All Articles
                        </button>
                        <button
                          onClick={() => { setFilterBy('recent'); setShowFilters(false) }}
                          className={`w-full text-left px-3 py-2 rounded hover:bg-gray-50 ${filterBy === 'recent' ? 'bg-blue-50 text-blue-600' : ''}`}
                        >
                          Recent (30 days)
                        </button>
                        <button
                          onClick={() => { setFilterBy('clinical-trials'); setShowFilters(false) }}
                          className={`w-full text-left px-3 py-2 rounded hover:bg-gray-50 ${filterBy === 'clinical-trials' ? 'bg-blue-50 text-blue-600' : ''}`}
                        >
                          Clinical Trials
                        </button>
                        <button
                          onClick={() => { setFilterBy('car-t'); setShowFilters(false) }}
                          className={`w-full text-left px-3 py-2 rounded hover:bg-gray-50 ${filterBy === 'car-t' ? 'bg-blue-50 text-blue-600' : ''}`}
                        >
                          CAR-T Therapy
                        </button>
                        <button
                          onClick={() => { setFilterBy('collaboration'); setShowFilters(false) }}
                          className={`w-full text-left px-3 py-2 rounded hover:bg-gray-50 ${filterBy === 'collaboration' ? 'bg-blue-50 text-blue-600' : ''}`}
                        >
                          Collaborations
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Sort Dropdown */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="date-desc">Latest First</option>
                  <option value="date-asc">Oldest First</option>
                  <option value="title-asc">Title A-Z</option>
                  <option value="title-desc">Title Z-A</option>
                  <option value="created-desc">Recently Created</option>
                  <option value="updated-desc">Recently Updated</option>
                </select>
              </div>
            </div>

            {/* Results Count */}
            <div className="mt-4 text-sm text-gray-600">
              Showing {filteredAndSortedMedia.length} of {mediaData.length} articles
            </div>
          </div>

          {/* Media Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedMedia.map((item) => (
              <article key={item.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
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
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(item.date)}</span>
                      </div>
                    </div>

                    {/* Read More Button */}
                    <Link
                      to={`/news-media/${item.id}`}
                      className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors text-sm"
                    >
                      Read Full Article
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* No Results */}
          {filteredAndSortedMedia.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No articles found</h3>
              <p className="text-gray-500">Try adjusting your search terms or filters</p>
            </div>
          )}

          {/* Load More Button (for future pagination) */}
          {filteredAndSortedMedia.length > 0 && (
            <div className="text-center mt-12">
              <button className="bg-[#FFBF00] hover:bg-yellow-500 text-black px-[18px] py-[9px] rounded-[24px] transition-colors">
                Load More Articles
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default NewsMedia