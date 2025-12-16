import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, ExternalLink, Filter, Search } from 'lucide-react'
import PageBanner from '@/components/PageBanner'

const Publications = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('date-desc')
  const [filterBy, setFilterBy] = useState('all')
  const [showFilters, setShowFilters] = useState(false)

  // Dummy publications data - this will be managed by admin dashboard
  const publicationsData = [
    {
      id: 1,
      category: "Clinical Research",
      createdAt: "2022-06-12T10:00:00Z",
      date: "2022-06-12",
      isActive: true,
      journal: "European Hematology Association Congress",
      tags: ["CAR-T Therapy", "Real World Data", "B-ALL"],
      title: "Real World Data of the safety and efficacy of Teclistamab Autologous Humanized CD19 CAR-T in relapsed / refractory B-cell acute lymphoblastic leukemia from India",
      type: "Poster",
      updatedAt: "2022-06-12T10:00:00Z",
      year: "2022"
    },
    {
      id: 2,
      category: "Clinical Research",
      createdAt: "2022-06-12T09:30:00Z",
      date: "2022-06-12",
      isActive: true,
      journal: "European Hematology Association Congress",
      tags: ["Safety", "Efficacy", "Bridging Therapy"],
      title: "Safety And Efficacy Of Polyclonally Activated Plus Obinutuzumab As Bridging Therapy Prior To Teclistamab Autologous Humanized For Relapsed/Refractory B-cell Lymphoma",
      type: "Poster",
      updatedAt: "2022-06-12T09:30:00Z",
      year: "2022"
    },
    {
      id: 3,
      category: "Clinical Research",
      createdAt: "2022-06-12T14:20:00Z",
      date: "2022-06-12",
      isActive: true,
      journal: "European Hematology Association Congress",
      tags: ["Immunoads", "Integration", "R/R B-ALL"],
      title: "Bridging the Gap: Immunoads Integration Prior To Teclistamab Autologous In R/R B-ALL",
      type: "Poster",
      updatedAt: "2022-06-12T14:20:00Z",
      year: "2022"
    },
    {
      id: 4,
      category: "Clinical Research",
      createdAt: "2022-05-10T11:45:00Z",
      date: "2022-05-10",
      isActive: true,
      journal: "International Society for Cell and Gene Therapy",
      tags: ["Development", "Clinical Trial", "Affordable CAR-T"],
      title: "Development and clinical trial of nationwide implementation of affordable CAR-T cell therapy in India: a real-world experience",
      type: "Poster",
      updatedAt: "2022-05-10T11:45:00Z",
      year: "2022"
    },
    {
      id: 5,
      category: "Clinical Research",
      createdAt: "2022-05-10T16:30:00Z",
      date: "2022-05-10",
      isActive: true,
      journal: "Cytotherapy",
      tags: ["Development", "Clinical Trial", "Real-World"],
      title: "Development and clinical trial of nationwide implementation of affordable CAR-T cell therapy in India: a real-world experience",
      type: "Article",
      updatedAt: "2022-05-10T16:30:00Z",
      year: "2022"
    },
    {
      id: 6,
      category: "Clinical Research",
      createdAt: "2022-04-24T13:15:00Z",
      date: "2022-04-24",
      isActive: true,
      journal: "Article",
      tags: ["CD19 CAR-T", "Psychosocial", "Pediatric"],
      title: "Novel CD19 CAR-T Cells: Psychosocial, psychological, Educational needs in relapsed/refractory pediatric B acute lymphoblastic leukemia: an open-label single arm phase I/II study",
      type: "Article",
      updatedAt: "2022-04-24T13:15:00Z",
      year: "2022"
    },
    {
      id: 6,
      category: "Quality Control",
      createdAt: "2023-07-12T13:15:00Z",
      date: "2023-07-12",
      isActive: true,
      journal: "Cytotherapy",
      tags: ["Quality Control", "Manufacturing", "GMP"],
      title: "Quality control measures in CAR-T cell manufacturing: Indian perspective",
      type: "Review Article",
      updatedAt: "2023-07-12T13:15:00Z",
      year: "2023"
    }
  ]
  // Filter and sort logic
  const filteredAndSortedPublications = useMemo(() => {
    let filtered = publicationsData.filter(item => item.isActive)

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.journal.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    // Apply category filter
    if (filterBy !== 'all') {
      filtered = filtered.filter(item => {
        switch (filterBy) {
          case 'recent':
            return new Date(item.date) >= new Date(Date.now() - 365 * 24 * 60 * 60 * 1000) // Last year
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
          return new Date(b.date) - new Date(a.date)
        case 'date-asc':
          return new Date(a.date) - new Date(b.date)
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <PageBanner 
        title="Publications" 
        subtitle="Discover our latest research findings and clinical data published in leading scientific journals worldwide."
      />

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
              Showing {filteredAndSortedPublications.length} of {publicationsData.filter(item => item.isActive).length} publications
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
                        {publication.type}
                      </span>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(publication.date)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Section - Fixed at bottom */}
                  <div className="mt-auto space-y-3">
                    {/* Organization/Journal */}
                    <div className="text-sm text-gray-600 line-clamp-2 min-h-[2.5rem] flex items-center">
                      {publication.journal}
                    </div>

                    {/* View Button */}
                    <Link
                      to={`/publications/${publication.id}`}
                      className="block w-full bg-[#FFBF00] hover:bg-yellow-500 text-black text-center py-2 px-4 rounded-3xl font-medium transition-colors text-sm"
                    >
                      View Poster
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* No Results */}
          {filteredAndSortedPublications.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No publications found</h3>
              <p className="text-gray-500">Try adjusting your search terms or filters</p>
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