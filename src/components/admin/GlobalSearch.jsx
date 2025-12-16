import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';

const GlobalSearch = () => {
  const { apiCall } = useAuth();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);
  const resultsRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchRef.current && 
        !searchRef.current.contains(event.target) &&
        resultsRef.current &&
        !resultsRef.current.contains(event.target)
      ) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      if (query.trim().length >= 2) {
        performSearch();
      } else {
        setResults(null);
        setShowResults(false);
      }
    }, 300);

    return () => clearTimeout(delayedSearch);
  }, [query]);

  const performSearch = async () => {
    if (query.trim().length < 2) return;

    setLoading(true);
    const result = await apiCall(`/api/v1/search/global?q=${encodeURIComponent(query.trim())}&limit=5`);
    
    if (result.success) {
      setResults(result.data);
      setShowResults(true);
    } else {
      setResults(null);
      setShowResults(false);
    }
    setLoading(false);
  };

  const handleResultClick = (item) => {
    setShowResults(false);
    setQuery('');
    // Navigate to the item (you might want to use React Router here)
    window.location.href = item.url;
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'media': return '📰';
      case 'publication': return '📚';
      case 'career': return '💼';
      default: return '📄';
    }
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case 'media': return 'Media';
      case 'publication': return 'Publication';
      case 'career': return 'Career';
      default: return 'Content';
    }
  };

  const getStatusBadge = (status) => {
    const colors = {
      draft: 'bg-yellow-100 text-yellow-800',
      published: 'bg-green-100 text-green-800',
      active: 'bg-green-100 text-green-800',
      archived: 'bg-gray-100 text-gray-800',
      paused: 'bg-orange-100 text-orange-800',
      closed: 'bg-red-100 text-red-800'
    };
    return `px-2 py-1 text-xs font-medium rounded-full ${colors[status] || 'bg-gray-100 text-gray-800'}`;
  };

  return (
    <div className="relative" ref={searchRef}>
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.trim().length >= 2 && results && setShowResults(true)}
          placeholder="Search content..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {loading ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-400"></div>
          ) : (
            <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          )}
        </div>
      </div>

      {showResults && results && (
        <div 
          ref={resultsRef}
          className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-96 overflow-y-auto"
        >
          {results.totalResults === 0 ? (
            <div className="p-4 text-center text-gray-500">
              No results found for "{results.query}"
            </div>
          ) : (
            <div className="py-2">
              <div className="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                {results.totalResults} result{results.totalResults !== 1 ? 's' : ''} found
              </div>

              {/* Media Results */}
              {results.results.media.length > 0 && (
                <div>
                  <div className="px-4 py-2 text-xs font-medium text-gray-700 bg-gray-50">
                    Media ({results.counts.media})
                  </div>
                  {results.results.media.map((item) => (
                    <button
                      key={`media-${item.id}`}
                      onClick={() => handleResultClick(item)}
                      className="w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                    >
                      <div className="flex items-start space-x-3">
                        <span className="text-lg">{getTypeIcon(item.type)}</span>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-gray-900 truncate">
                            {item.title}
                          </div>
                          <div className="text-xs text-gray-500 truncate">
                            {item.sourceName} • {new Date(item.publishedDate).toLocaleDateString()}
                          </div>
                          <div className="flex items-center mt-1 space-x-2">
                            <span className="text-xs text-gray-400">{getTypeLabel(item.type)}</span>
                            <span className={getStatusBadge(item.status)}>{item.status}</span>
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* Publication Results */}
              {results.results.publications.length > 0 && (
                <div>
                  <div className="px-4 py-2 text-xs font-medium text-gray-700 bg-gray-50">
                    Publications ({results.counts.publications})
                  </div>
                  {results.results.publications.map((item) => (
                    <button
                      key={`publication-${item.id}`}
                      onClick={() => handleResultClick(item)}
                      className="w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                    >
                      <div className="flex items-start space-x-3">
                        <span className="text-lg">{getTypeIcon(item.type)}</span>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-gray-900 truncate">
                            {item.title}
                          </div>
                          <div className="text-xs text-gray-500 truncate">
                            {item.authors} • {item.journal}
                          </div>
                          <div className="flex items-center mt-1 space-x-2">
                            <span className="text-xs text-gray-400">{item.category}</span>
                            <span className={getStatusBadge(item.status)}>{item.status}</span>
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* Career Results */}
              {results.results.careers.length > 0 && (
                <div>
                  <div className="px-4 py-2 text-xs font-medium text-gray-700 bg-gray-50">
                    Careers ({results.counts.careers})
                  </div>
                  {results.results.careers.map((item) => (
                    <button
                      key={`career-${item.id}`}
                      onClick={() => handleResultClick(item)}
                      className="w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                    >
                      <div className="flex items-start space-x-3">
                        <span className="text-lg">{getTypeIcon(item.type)}</span>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-gray-900 truncate">
                            {item.title}
                          </div>
                          <div className="text-xs text-gray-500 truncate">
                            {item.department} • {item.location}
                          </div>
                          <div className="flex items-center mt-1 space-x-2">
                            <span className="text-xs text-gray-400">{item.employmentType}</span>
                            <span className={getStatusBadge(item.status)}>{item.status}</span>
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GlobalSearch;