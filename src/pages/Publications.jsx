import { useMemo, useState, useEffect } from 'react'
import { Calendar, ExternalLink, Filter, Search } from 'lucide-react'
import PageBanner from '@/components/PageBanner'

const Publications = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('date-desc')
  const [filterBy, setFilterBy] = useState('all')
  const [showFilters, setShowFilters] = useState(false)
  const [publicationsData, setPublicationsData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

  // Fetch publications from API
  useEffect(() => {
    fetchPublications()
  }, [])

  const fetchPublications = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${API_URL}/api/v1/publications/public?limit=100`)
      const data = await response.json()
      
      if (response.ok) {
        setPublicationsData(data.publications || [])
        setError('')
      } else {
        setError(data.message || 'Failed to load publications')
        setPublicationsData([])
      }
    } catch (err) {
      console.error('Failed to fetch publications:', err)
      setError('Failed to load publications')
      setPublicationsData([])
    }
    setLoading(false)
  }
  // Filter and sort logic
  const filteredAndSortedPublications = useMemo(() => {
    let filtered = publicationsData.filter(item => item.isActive !== false)

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.journal.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.tags && item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
      )
    }

    // Apply category filter
    if (filterBy !== 'all') {
      filtered = filtered.filter(item => {
        switch (filterBy) {
          case 'recent':
            return new Date(item.date || item.publishedDate) >= new Date(Date.now() - 365 * 24 * 60 * 60 * 1000) // Last year
          case 'clinical-research':
            return item.category.toLowerCase().includes('clinical')
          case 'manufacturing':
            return item.category.toLowerCase().includes('manufacturing')
          case 'health-economics':
            return item.category.toLowerCase().includes('economics')
          default:
            return true
        }
      })
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date-desc':
          return new Date(b.date || b.publishedDate) - new Date(a.date || a.publishedDate)
        case 'date-asc':
          return new Date(a.date || a.publishedDate) - new Date(b.date || b.publishedDate)
        case 'title-asc':
          return a.title.localeCompare(b.title)
        case 'title-desc':
          return b.title.localeCompare(a.title)
        case 'journal-asc':
          return a.journal.localeCompare(b.journal)
        default:
          return 0
      }
    })

    return filtered
  }, [publicationsData, searchTerm, filterBy, sortBy])

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <PageBanner 
          title="Publications" 
          subtitle="Discover our latest research findings and clinical data published in leading scientific journals worldwide."
        />
        <div className="flex items-center justify-center h-64">
          <div className="relative">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-slate-200"></div>
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent absolute top-0 left-0"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <PageBanner 
        title="Publications" 
        subtitle="Discover our latest research findings and clinical data published in leading scientific journals worldwide."
      />

      {error && (
        <div className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {error}
              </div>
            </div>
          </div>
        </div>
      )}

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
                  placeholder="Search publications, journals, or topics..."
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
                          All Publications
                        </button>
                        <button
                          onClick={() => { setFilterBy('recent'); setShowFilters(false) }}
                          className={`w-full text-left px-3 py-2 rounded hover:bg-gray-50 ${filterBy === 'recent' ? 'bg-blue-50 text-blue-600' : ''}`}
                        >
                          Recent (Last Year)
                        </button>
                        <button
                          onClick={() => { setFilterBy('clinical-research'); setShowFilters(false) }}
                          className={`w-full text-left px-3 py-2 rounded hover:bg-gray-50 ${filterBy === 'clinical-research' ? 'bg-blue-50 text-blue-600' : ''}`}
                        >
                          Clinical Research
                        </button>
                        <button
                          onClick={() => { setFilterBy('manufacturing'); setShowFilters(false) }}
                          className={`w-full text-left px-3 py-2 rounded hover:bg-gray-50 ${filterBy === 'manufacturing' ? 'bg-blue-50 text-blue-600' : ''}`}
                        >
                          Manufacturing
                        </button>
                        <button
                          onClick={() => { setFilterBy('health-economics'); setShowFilters(false) }}
                          className={`w-full text-left px-3 py-2 rounded hover:bg-gray-50 ${filterBy === 'health-economics' ? 'bg-blue-50 text-blue-600' : ''}`}
                        >
                          Health Economics
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
                  <option value="journal-asc">Journal A-Z</option>
                </select>
              </div>
            </div>

            {/* Results Count */}
            <div className="mt-4 text-sm text-gray-600">
              Showing {filteredAndSortedPublications.length} of {publicationsData.length} publications
            </div>
          </div>

          {/* Publications Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedPublications.map((publication) => (
              <article key={publication.id} className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
                {/* Card Content with Flexbox for uniform height */}
                <div className="p-6 h-full flex flex-col min-h-[320px]">
                  {/* Top Section - Flexible */}
                  <div className="flex-1 mb-4">
                    <h3 className="text-lg text-[#363636] leading-tight mb-4 line-clamp-3">
                      {publication.title}
                    </h3>
                    
                    {/* Type Badge and Date */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded text-sm font-medium">
                        {publication.type || publication.buttonText || 'Publication'}
                      </span>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(publication.date || publication.publishedDate)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Section - Fixed at bottom */}
                  <div className="mt-auto space-y-3">
                    {/* Organization/Journal */}
                    <div className="text-sm text-gray-600 line-clamp-2 min-h-[2.5rem] flex items-center">
                      {publication.journal}
                    </div>

                    {/* View Button - Opens external link */}
                    <a
                      href={publication.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full bg-[#FFBF00] hover:bg-yellow-500 text-black text-center py-2 px-4 rounded-3xl font-medium transition-colors text-sm"
                    >
                      {publication.buttonText || 'View Publication'}
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* No Results */}
          {!loading && filteredAndSortedPublications.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                {publicationsData.length === 0 ? 'No publications available' : 'No publications found'}
              </h3>
              <p className="text-gray-500">
                {publicationsData.length === 0 
                  ? 'Check back later for the latest research publications' 
                  : 'Try adjusting your search terms or filters'
                }
              </p>
            </div>
          )}

          {/* Load More Button (for future pagination) */}
          {filteredAndSortedPublications.length > 0 && (
            <div className="text-center mt-12">
              <button className="bg-[#FFBF00] hover:bg-yellow-500 text-black px-[18px] py-[9px] rounded-[24px] transition-colors">
                Load More Publications
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Publications