import React, { useState } from 'react';
import { MapPin, Phone, Mail, Globe, Navigation, Star, Clock, Filter } from 'lucide-react';
import hospitalService from '../services/hospitalService';

const HospitalResults = ({ 
  hospitals = [], 
  searchLocation = null,
  onHospitalSelect,
  selectedHospital = null,
  showDistance = true,
  className = ''
}) => {
  const [sortBy, setSortBy] = useState('distance'); // distance, name, rating
  const [filterBy, setFilterBy] = useState('all'); // all, government, private
  const [showFilters, setShowFilters] = useState(false);

  // Sort hospitals
  const sortedHospitals = React.useMemo(() => {
    let sorted = [...hospitals];
    
    switch (sortBy) {
      case 'distance':
        sorted.sort((a, b) => (a.distance || 0) - (b.distance || 0));
        break;
      case 'name':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'rating':
        sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      default:
        break;
    }

    // Apply filters
    if (filterBy !== 'all') {
      sorted = sorted.filter(hospital => 
        hospital.type?.toLowerCase() === filterBy.toLowerCase()
      );
    }

    return sorted;
  }, [hospitals, sortBy, filterBy]);

  // Handle hospital selection
  const handleHospitalClick = (hospital) => {
    if (onHospitalSelect) {
      onHospitalSelect(hospital);
    }
  };

  // Get directions to hospital
  const getDirections = (hospital) => {
    const lat = hospital.latitude || hospital.coordinates?.lat;
    const lng = hospital.longitude || hospital.coordinates?.lng;
    
    if (lat && lng) {
      const url = `https://maps.google.com/maps?daddr=${lat},${lng}`;
      window.open(url, '_blank');
    }
  };

  // Format operating hours
  const formatOperatingHours = (hours) => {
    if (!hours || typeof hours !== 'object') return 'Contact for hours';
    
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    const todayHours = hours[today];
    
    if (todayHours) {
      return `Today: ${todayHours}`;
    }
    
    return 'Contact for hours';
  };

  // Render rating stars
  const renderRating = (rating) => {
    if (!rating) return null;
    
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
      );
    }
    
    if (hasHalfStar) {
      stars.push(
        <Star key="half" className="h-4 w-4 text-yellow-400 fill-current opacity-50" />
      );
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className="h-4 w-4 text-gray-300" />
      );
    }
    
    return (
      <div className="flex items-center">
        <div className="flex">{stars}</div>
        <span className="ml-1 text-sm text-gray-600">
          {rating.toFixed(1)}
        </span>
      </div>
    );
  };

  if (!hospitals.length) {
    return (
      <div className={`bg-white rounded-lg shadow-lg p-8 text-center ${className}`}>
        <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-800 mb-2">No Hospitals Found</h3>
        <p className="text-gray-600">
          Try expanding your search radius or searching for a different location.
        </p>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg shadow-lg ${className}`}>
      {/* Header with filters */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">
            Treatment Centers ({sortedHospitals.length})
          </h3>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center text-sm text-gray-600 hover:text-gray-800"
          >
            <Filter className="h-4 w-4 mr-1" />
            Filters
          </button>
        </div>

        {/* Filter Controls */}
        {showFilters && (
          <div className="flex flex-wrap gap-4 items-center">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Sort by
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-sm border border-gray-300 rounded px-3 py-1 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="distance">Distance</option>
                <option value="name">Name</option>
                <option value="rating">Rating</option>
              </select>
            </div>
            
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Type
              </label>
              <select
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
                className="text-sm border border-gray-300 rounded px-3 py-1 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="all">All Types</option>
                <option value="government">Government</option>
                <option value="private">Private</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Hospital List */}
      <div className="max-h-96 overflow-y-auto">
        {sortedHospitals.map((hospital, index) => (
          <div
            key={hospital.id || index}
            className={`p-4 border-b border-gray-100 cursor-pointer transition-all hover:bg-gray-50 ${
              selectedHospital?.id === hospital.id ? 'bg-orange-50 border-orange-200' : ''
            }`}
            onClick={() => handleHospitalClick(hospital)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                {/* Hospital Name and Type */}
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-gray-800 truncate pr-2">
                    {hospital.name}
                  </h4>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {hospital.type && (
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        hospital.type.toLowerCase() === 'government' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {hospital.type}
                      </span>
                    )}
                    {showDistance && hospital.distance !== undefined && (
                      <span className="px-2 py-1 text-xs bg-orange-100 text-orange-800 rounded-full">
                        {hospitalService.formatDistance(hospital.distance)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Address */}
                <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                  {hospital.address}
                </p>

                {/* City and State */}
                <p className="text-sm text-gray-500 mb-2">
                  {hospital.city}{hospital.state && `, ${hospital.state}`}
                </p>

                {/* Rating */}
                {hospital.rating && (
                  <div className="mb-2">
                    {renderRating(hospital.rating)}
                    {hospital.totalReviews && (
                      <span className="text-xs text-gray-500 ml-2">
                        ({hospital.totalReviews} reviews)
                      </span>
                    )}
                  </div>
                )}

                {/* Services */}
                {hospital.services && hospital.services.length > 0 && (
                  <div className="mb-2">
                    <div className="flex flex-wrap gap-1">
                      {hospital.services.slice(0, 3).map((service, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded"
                        >
                          {service}
                        </span>
                      ))}
                      {hospital.services.length > 3 && (
                        <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                          +{hospital.services.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Operating Hours */}
                {hospital.operatingHours && (
                  <div className="flex items-center text-xs text-gray-500 mb-2">
                    <Clock className="h-3 w-3 mr-1" />
                    {formatOperatingHours(hospital.operatingHours)}
                  </div>
                )}

                {/* Contact Information */}
                <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                  {hospital.phone && (
                    <div className="flex items-center">
                      <Phone className="h-3 w-3 mr-1" />
                      <span>{hospital.phone}</span>
                    </div>
                  )}
                  {hospital.email && (
                    <div className="flex items-center">
                      <Mail className="h-3 w-3 mr-1" />
                      <span className="truncate">{hospital.email}</span>
                    </div>
                  )}
                  {hospital.website && (
                    <div className="flex items-center">
                      <Globe className="h-3 w-3 mr-1" />
                      <a
                        href={hospital.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-orange-600 hover:text-orange-800"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Website
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2 ml-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    getDirections(hospital);
                  }}
                  className="flex items-center justify-center px-3 py-1 text-xs bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors"
                  title="Get directions"
                >
                  <Navigation className="h-3 w-3 mr-1" />
                  Directions
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      {searchLocation && (
        <div className="p-4 bg-gray-50 text-center text-sm text-gray-600">
          Showing results near {searchLocation.address || 'your search location'}
        </div>
      )}
    </div>
  );
};

export default HospitalResults;