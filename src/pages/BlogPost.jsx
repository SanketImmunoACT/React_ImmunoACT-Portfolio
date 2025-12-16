import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Calendar, ExternalLink, Share2, Clock, Tag } from 'lucide-react'
import BG1 from '@/assets/images/background/BG-1.png'

const BlogPost = () => {
  const { id } = useParams()
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)

  // Dummy article data - this will be replaced with API call later
  const articleData = {
    1: {
      id: 1,
      title: "PM Modi Unveils India's First Indigenous CAR-T Cancer Therapy 'NexCAR19'",
      excerpt: "Prime Minister Narendra Modi unveiled India's first indigenous CAR-T cell therapy for cancer treatment, marking a significant milestone in the country's healthcare sector.",
      content: `
        <p>In a groundbreaking moment for India's healthcare sector, Prime Minister Narendra Modi unveiled the country's first indigenous CAR-T cell therapy, NexCAR19, marking a revolutionary step in cancer treatment accessibility and affordability.</p>
        
        <h2>A Historic Milestone</h2>
        <p>The launch of NexCAR19 represents more than just a medical breakthrough; it symbolizes India's growing prowess in biotechnology and its commitment to making advanced healthcare accessible to its citizens. This indigenous CAR-T cell therapy has been developed through years of dedicated research and collaboration between leading Indian institutions.</p>
        
        <h2>What is CAR-T Cell Therapy?</h2>
        <p>Chimeric Antigen Receptor T-cell (CAR-T) therapy is a revolutionary form of immunotherapy that uses a patient's own immune cells to fight cancer. The process involves:</p>
        <ul>
          <li>Extracting T-cells from the patient's blood</li>
          <li>Genetically modifying them in the laboratory to better recognize and attack cancer cells</li>
          <li>Multiplying these enhanced cells</li>
          <li>Infusing them back into the patient</li>
        </ul>
        
        <h2>The NexCAR19 Advantage</h2>
        <p>NexCAR19 offers several significant advantages over imported alternatives:</p>
        <ul>
          <li><strong>Cost-Effective:</strong> Priced at a fraction of international alternatives, making it accessible to a broader patient population</li>
          <li><strong>Locally Developed:</strong> Designed specifically for Indian patients and healthcare infrastructure</li>
          <li><strong>High Efficacy:</strong> Clinical trials have shown a 73% response rate in blood cancer patients</li>
          <li><strong>Quality Assured:</strong> Developed under stringent quality controls and regulatory oversight</li>
        </ul>
        
        <h2>Impact on Indian Healthcare</h2>
        <p>The introduction of NexCAR19 is expected to transform cancer treatment in India by:</p>
        <ul>
          <li>Reducing dependency on expensive imported therapies</li>
          <li>Making advanced cancer treatment accessible to middle-class families</li>
          <li>Establishing India as a leader in biotechnology innovation</li>
          <li>Creating a foundation for future indigenous medical breakthroughs</li>
        </ul>
        
        <h2>Looking Forward</h2>
        <p>This milestone represents just the beginning of India's journey toward becoming a global leader in biotechnology and personalized medicine. The success of NexCAR19 paves the way for more indigenous medical innovations that can serve not just India, but the global community.</p>
        
        <p>As Prime Minister Modi emphasized during the launch, this achievement demonstrates India's capability to develop world-class medical solutions that are both effective and affordable, truly embodying the vision of 'Atmanirbhar Bharat' in healthcare.</p>
      `,
      source: "Voice of Healthcare",
      category: "The Hindu Bureau",
      date: "2024-11-08",
      createdAt: "2024-11-08T10:43:00Z",
      updatedAt: "2024-11-08T10:43:00Z",
      readTime: "5 min read",
      author: "Healthcare Correspondent",
      image: "/api/placeholder/800/400",
      tags: ["CAR-T Therapy", "Healthcare", "Innovation", "Government", "NexCAR19", "Cancer Treatment"],
      relatedArticles: [2, 3, 4]
    },
    // Add more dummy articles as needed
    2: {
      id: 2,
      title: "Indian-Made Gene Therapy For Blood Cancer Shows 73% Response Rate in Clinical Trials",
      excerpt: "Clinical trials of India's indigenous CAR-T cell therapy show promising results with 73% response rate in blood cancer patients.",
      content: `
        <p>India's indigenous CAR-T cell therapy has achieved remarkable success in clinical trials, demonstrating a 73% response rate in blood cancer patients. This breakthrough represents a significant milestone in the country's journey toward medical self-reliance.</p>
        
        <h2>Clinical Trial Results</h2>
        <p>The comprehensive clinical trials conducted across multiple centers in India have yielded encouraging results:</p>
        <ul>
          <li>73% overall response rate in treated patients</li>
          <li>Significant improvement in patient quality of life</li>
          <li>Manageable side effect profile</li>
          <li>Sustained remission in majority of responders</li>
        </ul>
        
        <h2>Patient Success Stories</h2>
        <p>The trials included patients with various forms of blood cancer, including acute lymphoblastic leukemia (ALL) and diffuse large B-cell lymphoma (DLBCL). Many patients who had exhausted conventional treatment options found new hope through this innovative therapy.</p>
        
        <h2>Global Comparison</h2>
        <p>The 73% response rate achieved by the Indian CAR-T therapy is comparable to, and in some cases superior to, international alternatives, while being significantly more affordable.</p>
      `,
      source: "The Economic Times",
      category: "Medtech",
      date: "2024-10-17",
      createdAt: "2024-10-17T09:30:00Z",
      updatedAt: "2024-10-17T09:30:00Z",
      readTime: "4 min read",
      author: "Medical Correspondent",
      image: "/api/placeholder/800/400",
      tags: ["Clinical Trials", "Blood Cancer", "Gene Therapy", "Success Rate"],
      relatedArticles: [1, 3, 5]
    }
  }

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const foundArticle = articleData[id]
      setArticle(foundArticle)
      setLoading(false)
    }, 500)
  }, [id])

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.excerpt,
        url: window.location.href,
      })
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading article...</p>
        </div>
      </div>
    )
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Article Not Found</h1>
          <p className="text-gray-600 mb-6">The article you're looking for doesn't exist.</p>
          <Link
            to="/news-media"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Media
          </Link>
        </div>
      </div>
    )
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
          <div className="border-2 border-white rounded-3xl py-20 sm:py-32 lg:py-40 px-6 sm:px-8 lg:px-12 text-center backdrop-blur-sm">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Article</h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              {article?.title || 'Loading article...'}
            </p>
          </div>
        </div>
      </div>

      {/* Back Navigation */}
      <div className="bg-white border-b">
        <div className="max-w-[1216px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            to="/news-media"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Media
          </Link>
        </div>
      </div>

      {/* Article Content */}
      <div className="py-8">
        <div className="max-w-[1216px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {/* Article Content */}
            <div className="p-8">
            {/* Category Badge */}
            <div className="mb-4">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                {article.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              {article.title}
            </h1>

            {/* Article Meta */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-6 pb-6 border-b">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(article.date)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{article.readTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <span>By {article.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <span>Source: {article.source}</span>
              </div>
              <button
                onClick={handleShare}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
              >
                <Share2 className="w-4 h-4" />
                Share
              </button>
            </div>

            {/* Article Content */}
            <div 
              className="prose prose-lg max-w-none mb-8"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Tags */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Tag className="w-5 h-5" />
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors cursor-pointer"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* External Link */}
            <div className="bg-blue-50 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Read Original Article</h3>
              <p className="text-gray-600 mb-4">
                This article was originally published by {article.source}. Click below to read the full original article.
              </p>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Read on {article.source}
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            {/* Related Articles */}
            {article.relatedArticles && article.relatedArticles.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6">Related Articles</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {article.relatedArticles.slice(0, 2).map((relatedId) => {
                    const relatedArticle = articleData[relatedId]
                    if (!relatedArticle) return null
                    
                    return (
                      <Link
                        key={relatedId}
                        to={`/news-media/${relatedId}`}
                        className="block bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors"
                      >
                        <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                          {relatedArticle.title}
                        </h4>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                          {relatedArticle.excerpt}
                        </p>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>{relatedArticle.source}</span>
                          <span>{formatDate(relatedArticle.date)}</span>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </div>
            )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogPost