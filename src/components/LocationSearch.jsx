import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, AlertCircle, Loader2, Navigation } from 'lucide-react';
import hospitalService from '../services/hospitalService';

const LocationSearch = ({ 
  onSearchResults, 
  onLocationChange, 
  onRadiusChange,
  initialRadius = 50,
  className = '' 
}) => {
  const [location, setLocation] = useState('');
  const [radius, setRadius] = useState(initialRadius);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchResults, setSearchResults] = useState(null);
  
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);

  // Popular locations for suggestions
  const popularLocations = hospitalService.getPopularLocations();

  // Radius options
  const radiusOptions = [
    { value: 5, label: '5 km' },
    { value: 10, label: '10 km' },
    { value: 20, label: '20 km' },
    { value: 50, label: '50 km' },
    { value: 100, label: '100 km' },
    { value: 200, label: '200 km' },
    { value: 500, label: '500 km' }
  ];

  // Filter suggestions based on input
  useEffect(() => {
    if (location.length >= 2) {
      const filtered = popularLocations.filter(loc =>
        loc.toLowerCase().includes(location.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 5));
    } else {
      setSuggestions([]);
    }
  }, [location]);

  // Handle location input change
  const handleLocationChange = (value) => {
    setLocation(value);
    setError('');
    setShowSuggestions(true);
    
    if (onLocationChange) {
      onLocationChange(value);
    }
  };

  // Handle radius change
  const handleRadiusChange = (newRadius) => {
    setRadius(newRadius);
    
    if (onRadiusChange) {
      onRadiusChange(newRadius);
    }

    // Auto-search if location is already entered
    if (location.trim()) {
      handleSearch(location, newRadius);
    }
  };

  // Handle suggestion selection
  const handleSuggestionSelect = (suggestion) => {
    setLocation(suggestion);
    setShowSuggestions(false);
    handleSearch(suggestion, radius);
  };

  // Handle search
  const handleSearch = async (searchLocation = location, searchRadius = radius) => {
    // Validate inputs
    const locationValidation = hospitalService.validateLocation(searchLocation);
    if (!locationValidation.isValid) {
      setError(locationValidation.error);
      return;
    }

    const radiusValidation = hospitalService.validateRadius(searchRadius);
    if (!radiusValidation.isValid) {
      setError(radiusValidation.error);
      return;
    }

    setIsSearching(true);
    setError('');

    try {
      const results = await hospitalService.searchByLocation(
        locationValidation.location,
        radiusValidation.radius,
        50 // limit
      );

      if (results.success) {
        setSearchResults(results);
        
        if (onSearchResults) {
          onSearchResults(results);
        }

        // Show appropriate message based on results
        if (results.totalFound === 0) {
          setError(results.message || `No hospitals found within ${searchRadius}km of ${searchLocation}. Try expanding your search radius or searching for a different location.`);
        }
      } else {
        setError(results.error || 'Failed to search hospitals. Please try again.');
        setSearchResults(null);
      }
    } catch (err) {
      setError('An error occurred while searching. Please check your connection and try again.');
      setSearchResults(null);
    } finally {
      setIsSearching(false);
      setShowSuggestions(false);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        suggestionsRef.current && 
        !suggestionsRef.current.contains(event.target) &&
        !inputRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Get user's current location
  const handleGetCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by this browser');
      return;
    }

    setIsSearching(true);
    setError('');

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        try {
          // Use reverse geocoding to get location name
          // For now, we'll search using coordinates directly
          const locationString = `${latitude},${longitude}`;
          setLocation('Current Location');
          await handleSearch(locationString, radius);
        } catch (err) {
          setError('Failed to get your current location');
          setIsSearching(false);
        }
      },
      (error) => {
        setError('Unable to retrieve your location. Please enter a location manually.');
        setIsSearching(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    );
  };

  return (
    <div className={`bg-white rounded-lg shadow-lg p-6 ${className}`}>
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Find Treatment Centers Near You
        </h3>
        <p className="text-sm text-gray-600">
          Search for hospitals by location and customize your search radius
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Location Input */}
        <div className="relative">
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
            Location (City, Address, or Area)
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MapPin className="h-5 w-5 text-gray-400" />
            </div>
            <input
              ref={inputRef}
              type="text"
              id="location"
              value={location}
              onChange={(e) => handleLocationChange(e.target.value)}
              onFocus={() => setShowSuggestions(true)}
              placeholder="e.g., Mumbai, Andheri, Thane..."
              className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              disabled={isSearching}
            />
            <button
              type="button"
              onClick={handleGetCurrentLocation}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              disabled={isSearching}
              title="Use current location"
            >
              <Navigation className="h-5 w-5 text-gray-400 hover:text-orange-500" />
            </button>
          </div>

          {/* Suggestions Dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <div 
              ref={suggestionsRef}
              className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto"
            >
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleSuggestionSelect(suggestion)}
                  className="w-full px-4 py-2 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none first:rounded-t-lg last:rounded-b-lg"
                >
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-gray-800">{suggestion}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Radius Selection */}
        <div>
          <label htmlFor="radius" className="block text-sm font-medium text-gray-700 mb-1">
            Search Radius
          </label>
          <select
            id="radius"
            value={radius}
            onChange={(e) => handleRadiusChange(parseInt(e.target.value))}
            className="block w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            disabled={isSearching}
          >
            {radiusOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Search Button */}
        <button
          type="submit"
          disabled={isSearching || !location.trim()}
          className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
        >
          {isSearching ? (
            <>
              <Loader2 className="animate-spin h-5 w-5 mr-2" />
              Searching...
            </>
          ) : (
            <>
              <Search className="h-5 w-5 mr-2" />
              Search Hospitals
            </>
          )}
        </button>
      </form>

      {/* Error Message */}
      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
          <AlertCircle className="h-5 w-5 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-red-800 font-medium">Search Error</p>
            <p className="text-red-700 text-sm mt-1">{error}</p>
          </div>
        </div>
      )}

      {/* Search Results Summary */}
      {searchResults && searchResults.totalFound > 0 && (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-start">
            <MapPin className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-green-800 font-medium">
                Found {searchResults.totalFound} hospital{searchResults.totalFound !== 1 ? 's' : ''}
              </p>
              <p className="text-green-700 text-sm mt-1">
                Within {radius}km of {searchResults.searchLocation?.address || location}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationSearch;