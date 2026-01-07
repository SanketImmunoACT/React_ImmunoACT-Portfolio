import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Building2, X, Loader2 } from 'lucide-react';

const UnifiedSearch = ({
  onLocationSearch,
  onHospitalFilter,
  onClear,
  radiusKm,
  onRadiusChange,
  isSearching,
  searchError,
  searchResults,
  hospitals
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('auto'); // 'auto', 'location', 'hospital'
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState(-1);
  const searchRef = useRef(null);
  const suggestionsRef = useRef(null);

  // Common Indian cities and areas for location suggestions
  const commonLocations = [
    'Mumbai', 'Delhi', 'Bengaluru', 'Chennai', 'Hyderabad', 'Pune', 'Kolkata', 'Ahmedabad',
    'Andheri', 'Bandra', 'Sion', 'Dadar', 'Worli', 'Powai', 'Thane', 'Navi Mumbai',
    'Gurgaon', 'Noida', 'Faridabad', 'Ghaziabad', 'Dwarka', 'Rohini',
    'Koramangala', 'Whitefield', 'Electronic City', 'Indiranagar', 'Jayanagar',
    'T. Nagar', 'Anna Nagar', 'Velachery', 'Adyar', 'Guindy'
  ];

  // Extract unique hospital names for suggestions
  const hospitalNames = [...new Set(hospitals.map(h => h.name))];

  // Detect search type based on query
  const detectSearchType = (query) => {
    const lowerQuery = query.toLowerCase();

    // Check if it matches hospital names
    const matchesHospital = hospitalNames.some(name =>
      name.toLowerCase().includes(lowerQuery)
    );

    // Check if it matches common locations
    const matchesLocation = commonLocations.some(location =>
      location.toLowerCase().includes(lowerQuery)
    );

    // If it matches both, prioritize based on length and exactness
    if (matchesHospital && matchesLocation) {
      const exactHospitalMatch = hospitalNames.some(name =>
        name.toLowerCase() === lowerQuery
      );
      const exactLocationMatch = commonLocations.some(location =>
        location.toLowerCase() === lowerQuery
      );

      if (exactHospitalMatch) return 'hospital';
      if (exactLocationMatch) return 'location';

      // If query is longer, likely a hospital name
      return query.length > 10 ? 'hospital' : 'location';
    }

    if (matchesHospital) return 'hospital';
    if (matchesLocation) return 'location';

    // Default heuristics
    if (lowerQuery.includes('hospital') || lowerQuery.includes('medical') ||
      lowerQuery.includes('apollo') || lowerQuery.includes('fortis') ||
      lowerQuery.includes('max') || lowerQuery.includes('tata')) {
      return 'hospital';
    }

    return 'location'; // Default to location search
  };

  // Generate suggestions based on query
  const generateSuggestions = (query) => {
    if (!query || query.length < 2) return [];

    const lowerQuery = query.toLowerCase();
    const suggestions = [];

    // Location suggestions
    const locationMatches = commonLocations
      .filter(location => location.toLowerCase().includes(lowerQuery))
      .slice(0, 5)
      .map(location => ({
        type: 'location',
        text: location,
        icon: MapPin,
        description: `Search hospitals near ${location}`
      }));

    // Hospital name suggestions
    const hospitalMatches = hospitalNames
      .filter(name => name.toLowerCase().includes(lowerQuery))
      .slice(0, 5)
      .map(name => ({
        type: 'hospital',
        text: name,
        icon: Building2,
        description: 'Hospital'
      }));

    // Combine and prioritize
    suggestions.push(...locationMatches, ...hospitalMatches);

    return suggestions.slice(0, 8); // Limit to 8 suggestions
  };

  // Handle input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (value.trim()) {
      const newSuggestions = generateSuggestions(value);
      setSuggestions(newSuggestions);
      setShowSuggestions(true);
      setSearchType(detectSearchType(value));
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
      setSearchType('auto');
    }

    setSelectedSuggestion(-1);
  };

  // Handle search execution
  const handleSearch = (query = searchQuery, type = searchType) => {
    if (!query.trim()) return;

    setShowSuggestions(false);

    if (type === 'location') {
      onLocationSearch(query.trim());
    } else if (type === 'hospital') {
      onHospitalFilter(query.trim());
    } else {
      // Auto-detect and search
      const detectedType = detectSearchType(query);
      if (detectedType === 'location') {
        onLocationSearch(query.trim());
      } else {
        onHospitalFilter(query.trim());
      }
    }
  };

  // Handle suggestion selection
  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion.text);
    setSearchType(suggestion.type);
    setShowSuggestions(false);
    handleSearch(suggestion.text, suggestion.type);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (!showSuggestions || suggestions.length === 0) {
      if (e.key === 'Enter') {
        handleSearch();
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedSuggestion(prev =>
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedSuggestion(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedSuggestion >= 0) {
          handleSuggestionClick(suggestions[selectedSuggestion]);
        } else {
          handleSearch();
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedSuggestion(-1);
        break;
    }
  };

  // Handle clear
  const handleClear = () => {
    setSearchQuery('');
    setSearchType('auto');
    setSuggestions([]);
    setShowSuggestions(false);
    setSelectedSuggestion(-1);
    onClear();
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
        setSelectedSuggestion(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Get search type indicator
  const getSearchTypeIndicator = () => {
    switch (searchType) {
      case 'location':
        return { icon: MapPin, text: 'Location', color: 'text-blue-600' };
      case 'hospital':
        return { icon: Building2, text: 'Hospital', color: 'text-green-600' };
      default:
        return { icon: Search, text: 'Smart', color: 'text-gray-600' };
    }
  };

  const typeIndicator = getSearchTypeIndicator();
  const TypeIcon = typeIndicator.icon;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4" ref={searchRef}>
      {/* Simplified Header */}
      <div className="flex items-center gap-2 mb-3">
        <h3 className="text-lg font-medium text-gray-700">
          Smart Search
        </h3>
        <p className="text-sm text-gray-500">(Find hospitals by location or name)</p>
        <div className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ml-auto ${searchType === 'location' ? 'bg-blue-50 text-blue-600' :
          searchType === 'hospital' ? 'bg-green-50 text-green-600' :
            'bg-gray-50 text-gray-600'
          }`}>
          <TypeIcon size={10} />
          <span>{typeIndicator.text}</span>
        </div>
      </div>

      <div className="relative">
        <div className="flex gap-2 items-center">
          <div className="flex-1 relative">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                value={searchQuery}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Search by location (Mumbai, Andheri) or hospital name (Apollo, Fortis)..."
                className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                disabled={isSearching}
              />
              {searchQuery && (
                <button
                  onClick={handleClear}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Compact Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div
                ref={suggestionsRef}
                className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto"
              >
                {suggestions.map((suggestion, index) => {
                  const SuggestionIcon = suggestion.icon;
                  return (
                    <button
                      key={`${suggestion.type}-${suggestion.text}`}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className={`w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3 border-b border-gray-100 last:border-b-0 ${index === selectedSuggestion ? 'bg-orange-50 border-orange-200' : ''
                        }`}
                    >
                      <SuggestionIcon
                        size={16}
                        className={suggestion.type === 'location' ? 'text-blue-500' : 'text-green-500'}
                      />
                      <div className="flex-1">
                        <div className="font-medium text-gray-800">{suggestion.text}</div>
                        <div className="text-xs text-gray-500">{suggestion.description}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Search radius dropdown */}
          <select
            value={radiusKm}
            onChange={(e) => onRadiusChange && onRadiusChange(parseInt(e.target.value))}
            className="px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm bg-white min-w-[100px]"
          >
            <option value={10}>10 km</option>
            <option value={20}>20 km</option>
            <option value={50}>50 km</option>
            <option value={100}>100 km</option>
            <option value={500}>500 km</option>
            <option value={1000}>1000 km</option>
            <option value={1500}>1500 km</option>
          </select>

          {/* Search button */}
          <button
            onClick={() => handleSearch()}
            disabled={isSearching || !searchQuery.trim()}
            className="bg-[#FFBF00] hover:bg-[#E6AC00] disabled:bg-gray-300 disabled:cursor-not-allowed text-[#363636] text-sm px-6 py-2.5 font-medium rounded-full transition-colors duration-300 flex items-center gap-2 whitespace-nowrap"
          >
            {isSearching ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Searching...
              </>
            ) : (
              <>
                <Search size={16} />
                Search
              </>
            )}
          </button>
        </div>

        {/* Simplified Search Results Info */}
        {searchResults && searchResults.length > 0 && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center justify-center w-5 h-5 bg-green-500 rounded-full">
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-green-800 font-medium">
                Found {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} for "{searchQuery}"
              </span>
              <span className="ml-auto text-green-700 text-sm">
                {searchResults.length} hospitals
              </span>
            </div>

            {searchResults.some(h => h.distance) && (
              <div className="flex items-center gap-2 text-green-700 text-sm">
                <MapPin className="w-4 h-4 text-green-600" />
                <span>Distances shown from your search location</span>
                <span className="ml-auto text-green-600 bg-green-100 px-2 py-1 rounded text-xs">
                  Within {radiusKm}km radius
                </span>
              </div>
            )}

            {searchResults.some(h => h.distance) && (
              <div className="mt-2 flex items-center gap-4 text-xs text-green-600">
                <span>Nearest: {Math.min(...searchResults.filter(h => h.distance).map(h => h.distance)).toFixed(1)}km</span>
                <span>Farthest: {Math.max(...searchResults.filter(h => h.distance).map(h => h.distance)).toFixed(1)}km</span>
                <span>{[...new Set(searchResults.map(h => h.state))].length} state{[...new Set(searchResults.map(h => h.state))].length !== 1 ? 's' : ''}</span>
              </div>
            )}
          </div>
        )}

        {/* Simplified Search Error */}
        {searchError && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center w-5 h-5 bg-red-500 rounded-full flex-shrink-0 mt-0.5">
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>

              <div className="flex-1">
                <div className="text-red-800 font-medium mb-1">
                  No results found
                </div>
                <div className="text-red-700 text-sm mb-3">
                  {searchError}
                </div>

                {/* Simple suggestions */}
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-red-700">Try:</span>
                  <button
                    onClick={() => {
                      setSearchQuery('Mumbai');
                      handleSearch('Mumbai', 'location');
                    }}
                    className="text-red-600 hover:text-red-800 underline"
                  >
                    Mumbai
                  </button>
                  <span className="text-red-400">•</span>
                  <button
                    onClick={() => {
                      setSearchQuery('Apollo');
                      handleSearch('Apollo', 'hospital');
                    }}
                    className="text-red-600 hover:text-red-800 underline"
                  >
                    Apollo
                  </button>
                  <span className="text-red-400">•</span>
                  <button
                    onClick={handleClear}
                    className="text-red-600 hover:text-red-800 underline"
                  >
                    Clear search
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UnifiedSearch;