import React, { useCallback, useEffect, useState } from 'react';
import { Wrapper } from '@googlemaps/react-wrapper';
import { MapPin } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import PageBanner from '@/components/PageBanner';
import UnifiedSearch from '@/components/UnifiedSearch';

// Validation schema for collaboration form
const collaborationSchema = yup.object({
  firstName: yup
    .string()
    .required('First name is required')
    .max(50, 'First name must not exceed 50 characters')
    .matches(/^[\w\s'-]+$/u, 'First name can only contain letters, spaces, hyphens, and apostrophes'),

  lastName: yup
    .string()
    .required('Last name is required')
    .max(50, 'Last name must not exceed 50 characters')
    .matches(/^[\w\s'-]+$/u, 'Last name can only contain letters, spaces, hyphens, and apostrophes'),

  email: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email address')
    .max(100, 'Email must not exceed 100 characters'),

  phone: yup
    .string()
    .matches(/^[\+]?[1-9][\d]{0,15}$/, 'Please provide a valid phone number')
    .nullable()
    .transform((value) => value === '' ? null : value),

  institution: yup
    .string()
    .max(200, 'Institution name must not exceed 200 characters')
    .matches(/^[\w\s\-.,&()]*$/u, 'Institution name contains invalid characters')
    .nullable()
    .transform((value) => value === '' ? null : value),

  partneringCategory: yup
    .string()
    .required('Please select a partnering category')
    .oneOf([
      'Clinical Collaboration',
      'Research Partnership',
      'Technology Licensing',
      'Manufacturing Partnership',
      'Distribution Partnership',
      'Investment Opportunity',
      'Hospital Partnership',
      'Other'
    ], 'Please select a valid partnering category'),

  message: yup
    .string()
    .required('Message is required')
    .min(10, 'Message must be at least 10 characters long')
    .max(2000, 'Message must not exceed 2000 characters')
    .matches(/^[\w\s\-.,!?()'"@#$%&*+=\n\r]+$/u, 'Message contains invalid characters'),

  consentGiven: yup
    .boolean()
    .oneOf([true], 'You must consent to data processing to submit this form'),

  website: yup.string().max(0, 'Bot detected') // Honeypot field
});

// Import real hospital data - will be replaced by API call
// import hospitalData from '../data/allHospitalsData.js';

// Hospital Service for API calls
const hospitalService = {
  async searchByLocation(location, radius = 50, limit = 100) {
    try {
      const params = new URLSearchParams({
        location: location.trim(),
        radius: radius.toString(),
        limit: limit.toString()
      });

      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/v1/hospitals/search?${params}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to search hospitals');
      }

      return {
        success: true,
        ...data.data,
        message: data.message
      };
    } catch (error) {
      console.error('Hospital search error:', error);
      return {
        success: false,
        error: error.message,
        hospitals: [],
        totalFound: 0
      };
    }
  },

  formatDistance(distance) {
    if (distance < 1) {
      return `${Math.round(distance * 1000)}m`;
    } else if (distance < 10) {
      return `${distance.toFixed(1)}km`;
    } else {
      return `${Math.round(distance)}km`;
    }
  }
};

// Utility function to calculate distance between two coordinates using Haversine formula
const calculateDistance = (lat1, lng1, lat2, lng2) => {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in kilometers
};

// Map component
const Map = ({ hospitals, onHospitalSelect, selectedHospital, radiusCenter, radiusKm, onRadiusChange }) => {
  const mapRef = React.useRef(null);
  const [map, setMap] = React.useState(null);
  const markersRef = React.useRef([]);
  const radiusCircleRef = React.useRef(null);

  const initializeMap = useCallback(() => {
    if (!mapRef.current) return;

    try {
      const mapInstance = new window.google.maps.Map(mapRef.current, {
        center: { lat: 20.5937, lng: 78.9629 }, // Center of India
        zoom: 5,
        styles: [
          {
            elementType: "geometry",
            featureType: "water",
            stylers: [{ color: "#e9e9e9" }, { lightness: 17 }]
          },
          {
            elementType: "geometry",
            featureType: "landscape",
            stylers: [{ color: "#f5f5f5" }, { lightness: 20 }]
          }
        ]
      });

      setMap(mapInstance);
    } catch (error) {
      console.error('Error initializing Google Maps:', error);
    }
  }, []);



  // Memoize the SVG icons to prevent recreation
  const svgIcon = React.useMemo(() => {
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none">
        <path d="M12 1.5C7.85953 1.5 4.5 4.52391 4.5 8.25C4.5 14.25 12 22.5 12 22.5C12 22.5 19.5 14.25 19.5 8.25C19.5 4.52391 16.1405 1.5 12 1.5ZM12 12C11.4067 12 10.8266 11.8241 10.3333 11.4944C9.83994 11.1648 9.45542 10.6962 9.22836 10.1481C9.0013 9.59987 8.94189 8.99667 9.05764 8.41473C9.1734 7.83279 9.45912 7.29824 9.87868 6.87868C10.2982 6.45912 10.8328 6.1734 11.4147 6.05764C11.9967 5.94189 12.5999 6.0013 13.148 6.22836C13.6962 6.45542 14.1648 6.83994 14.4944 7.33329C14.8241 7.82664 15 8.40666 15 9C14.9991 9.79538 14.6828 10.5579 14.1204 11.1204C13.5579 11.6828 12.7954 11.9991 12 12Z" fill="#f97316" stroke="#ffffff" stroke-width="1"/>
      </svg>
    `)}`;
  }, []);

  // Selected hospital icon (highlighted)
  const selectedSvgIcon = React.useMemo(() => {
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="11" fill="#ffffff" stroke="#f97316" stroke-width="2" opacity="0.9"/>
        <path d="M12 1.5C7.85953 1.5 4.5 4.52391 4.5 8.25C4.5 14.25 12 22.5 12 22.5C12 22.5 19.5 14.25 19.5 8.25C19.5 4.52391 16.1405 1.5 12 1.5ZM12 12C11.4067 12 10.8266 11.8241 10.3333 11.4944C9.83994 11.1648 9.45542 10.6962 9.22836 10.1481C9.0013 9.59987 8.94189 8.99667 9.05764 8.41473C9.1734 7.83279 9.45912 7.29824 9.87868 6.87868C10.2982 6.45912 10.8328 6.1734 11.4147 6.05764C11.9967 5.94189 12.5999 6.0013 13.148 6.22836C13.6962 6.45542 14.1648 6.83994 14.4944 7.33329C14.8241 7.82664 15 8.40666 15 9C14.9991 9.79538 14.6828 10.5579 14.1204 11.1204C13.5579 11.6828 12.7954 11.9991 12 12Z" fill="#dc2626" stroke="#ffffff" stroke-width="1"/>
      </svg>
    `)}`;
  }, []);



  useEffect(() => {
    if (window.google && window.google.maps) {
      initializeMap();
    }
  }, [initializeMap]);

  // Store callback refs to avoid dependency issues
  const onHospitalSelectRef = React.useRef(onHospitalSelect);
  const onRadiusChangeRef = React.useRef(onRadiusChange);

  // Update refs when props change
  React.useEffect(() => {
    onHospitalSelectRef.current = onHospitalSelect;
    onRadiusChangeRef.current = onRadiusChange;
  });

  // Handle markers updates
  useEffect(() => {
    if (!map || !hospitals.length) return;

    console.log('Updating markers, hospital count:', hospitals.length); // Debug log

    // Clear existing markers
    markersRef.current.forEach(marker => marker.setMap(null));

    // Filter hospitals within radius if radiusCenter is set
    let filteredHospitals = hospitals;
    if (radiusCenter) {
      filteredHospitals = hospitals.filter(hospital => {
        const distance = calculateDistance(
          radiusCenter.lat,
          radiusCenter.lng,
          hospital.coordinates.lat,
          hospital.coordinates.lng
        );
        return distance <= radiusKm;
      });
    }

    const newMarkers = filteredHospitals.map(hospital => {
      // Determine if this hospital is selected
      const isSelected = selectedHospital && selectedHospital.id === hospital.id;

      // Create marker with proper configuration
      const marker = new window.google.maps.Marker({
        position: hospital.coordinates,
        map: map,
        title: hospital.name,
        icon: {
          url: isSelected ? selectedSvgIcon : svgIcon,
          scaledSize: new window.google.maps.Size(isSelected ? 40 : 32, isSelected ? 40 : 32),
          anchor: new window.google.maps.Point(isSelected ? 20 : 16, isSelected ? 40 : 32)
        },
        clickable: true,
        optimized: false, // This helps with custom icons and click events
        zIndex: isSelected ? 1000 : 1 // Selected marker appears on top
      });

      // Create info window with enhanced content for selected hospital
      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div style="padding: 0px 12px 12px; max-width: 300px;">
            <h3 style="font-size: 18px; color: #1f2937; margin-bottom: 12px; ${isSelected ? 'color: #363636; font-weight: bold;' : ''}">${hospital.name}</h3>
            <p style="font-size: 14px; font-weight: normal; color: #363636; margin-bottom: 12px;">${hospital.address}</p>
            ${hospital.distance ? `<p style="font-size: 12px; color: #000000; margin-bottom: 8px;">📍 ${hospitalService.formatDistance(hospital.distance)} away</p>` : ''}
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
            <span style="font-size: 12px;">Email ID:</span>
              <span style="font-size: 14px; color: #000000;">${hospital.email || 'Contact info not available'}</span>
            </div>
            <button 
              onclick="window.open('https://maps.google.com/maps?daddr=${hospital.coordinates.lat},${hospital.coordinates.lng}', '_blank')"
              style="background-color: #FFBF00; color: #363636; padding: 8px 12px; border-radius: 24px; font-size: 14px; border: none; cursor: pointer; font-weight: 500; transition: all 0.2s ease;"
              onmouseover="this.style.backgroundColor='#E6AC00'; this.style.transform='translateY(-1px)'; this.style.boxShadow='0 4px 8px rgba(255, 191, 0, 0.3)';"
              onmouseout="this.style.backgroundColor='#FFBF00'; this.style.transform='translateY(0)'; this.style.boxShadow='none';"
            >
              Get Directions
            </button>
          </div>
        `
      });

      // Add hover event listener to open info window
      let hoverTimeout = null;
      let isHovering = false;

      try {
        marker.addListener('mouseover', (event) => {
          console.log('Marker hovered:', hospital.name);

          // Clear any pending close timeout
          if (hoverTimeout) {
            clearTimeout(hoverTimeout);
            hoverTimeout = null;
          }

          isHovering = true;

          // Close any open info windows first
          if (window.currentInfoWindow) {
            window.currentInfoWindow.close();
          }

          // Open new info window
          infoWindow.open(map, marker);
          window.currentInfoWindow = infoWindow;
          window.currentInfoWindowHospitalId = hospital.id;
        });

        // Add click event listener with error handling
        marker.addListener('click', (event) => {
          console.log('Marker clicked:', hospital.name);

          // Clear any pending close timeout
          if (hoverTimeout) {
            clearTimeout(hoverTimeout);
            hoverTimeout = null;
          }

          // Close any open info windows first
          if (window.currentInfoWindow) {
            window.currentInfoWindow.close();
          }

          // Open new info window
          infoWindow.open(map, marker);
          window.currentInfoWindow = infoWindow;
          window.currentInfoWindowHospitalId = hospital.id;

          // Call parent callback
          if (onHospitalSelectRef.current) {
            onHospitalSelectRef.current(hospital);
          }
        });

        // Close info window when mouse leaves (with improved logic)
        marker.addListener('mouseout', () => {
          isHovering = false;

          // Clear any existing timeout
          if (hoverTimeout) {
            clearTimeout(hoverTimeout);
          }

          // Set a timeout to close the info window
          hoverTimeout = setTimeout(() => {
            // Only close if:
            // 1. We're not hovering anymore
            // 2. This is the current info window
            // 3. Either no hospital is selected OR this isn't the selected hospital's info window
            if (!isHovering &&
              window.currentInfoWindow &&
              window.currentInfoWindowHospitalId === hospital.id &&
              (!selectedHospital || selectedHospital.id !== hospital.id)) {
              window.currentInfoWindow.close();
              window.currentInfoWindow = null;
              window.currentInfoWindowHospitalId = null;
            }
          }, 800); // Reduced delay for better responsiveness
        });

        // Also listen for mouseover on the info window itself to prevent closing
        infoWindow.addListener('domready', () => {
          const infoWindowElement = document.querySelector('.gm-style-iw');
          if (infoWindowElement) {
            infoWindowElement.addEventListener('mouseover', () => {
              if (hoverTimeout) {
                clearTimeout(hoverTimeout);
                hoverTimeout = null;
              }
              isHovering = true;
            });

            infoWindowElement.addEventListener('mouseout', () => {
              isHovering = false;
              if (hoverTimeout) {
                clearTimeout(hoverTimeout);
              }

              hoverTimeout = setTimeout(() => {
                if (!isHovering &&
                  window.currentInfoWindow &&
                  window.currentInfoWindowHospitalId === hospital.id &&
                  (!selectedHospital || selectedHospital.id !== hospital.id)) {
                  window.currentInfoWindow.close();
                  window.currentInfoWindow = null;
                  window.currentInfoWindowHospitalId = null;
                }
              }, 800);
            });
          }
        });

      } catch (error) {
        console.error('Error adding event listeners to marker:', error);
      }

      return marker;
    });

    markersRef.current = newMarkers;

    // Notify parent component about filtered hospitals
    if (onRadiusChangeRef.current) {
      onRadiusChangeRef.current(filteredHospitals);
    }
  }, [map, hospitals, radiusCenter, radiusKm, svgIcon, selectedSvgIcon, selectedHospital]);

  // Handle radius circle updates
  useEffect(() => {
    if (!map || !radiusCenter) return;

    // Clear existing circle
    if (radiusCircleRef.current) {
      radiusCircleRef.current.setMap(null);
    }

    // Create new circle
    const circle = new window.google.maps.Circle({
      strokeColor: '#f97316',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#f97316',
      fillOpacity: 0.1,
      map: map,
      center: radiusCenter,
      radius: radiusKm * 1000, // Convert km to meters
    });

    radiusCircleRef.current = circle;
  }, [map, radiusCenter, radiusKm]);

  // Focus on selected hospital
  useEffect(() => {
    if (selectedHospital && map) {
      map.setCenter(selectedHospital.coordinates);
      map.setZoom(12);
    }
  }, [selectedHospital, map]);

  // Cleanup markers on unmount
  useEffect(() => {
    return () => {
      markersRef.current.forEach(marker => marker.setMap(null));
      if (radiusCircleRef.current) {
        radiusCircleRef.current.setMap(null);
      }
      // Clear any pending info window timeouts
      if (window.currentInfoWindow) {
        window.currentInfoWindow.close();
        window.currentInfoWindow = null;
        window.currentInfoWindowHospitalId = null;
      }
    };
  }, []);

  return <div ref={mapRef} className="w-full h-full" />;
};

// Hospital list component
const HospitalList = ({ hospitals, onHospitalSelect, selectedHospital }) => {
  const selectedHospitalRef = React.useRef(null);

  // Scroll selected hospital into view
  React.useEffect(() => {
    if (selectedHospital && selectedHospitalRef.current) {
      selectedHospitalRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  }, [selectedHospital]);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 h-full overflow-y-auto">
      <h3 className="text-lg text-gray-800 mb-4">
        Partnered Treatment Centers ({hospitals.length})
        {selectedHospital && (
          <span className="ml-2 text-sm text-red-600 font-normal">
            • {selectedHospital.name} selected
          </span>
        )}
      </h3>

      <div className="space-y-3">
        {hospitals.map(hospital => (
          <div
            key={hospital.id}
            ref={selectedHospital?.id === hospital.id ? selectedHospitalRef : null}
            className={`p-3 border rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md transform hover:scale-[1.02] ${selectedHospital?.id === hospital.id
              ? 'border-red-500 bg-red-50 shadow-md'
              : 'border-gray-200 hover:border-gray-300'
              }`}
            onClick={() => onHospitalSelect(hospital)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className={`font-semibold ${selectedHospital?.id === hospital.id ? 'text-red-700' : 'text-gray-800'}`}>
                    {hospital.name}
                  </h4>
                  {selectedHospital?.id === hospital.id && (
                    <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full font-medium animate-pulse">
                      Selected
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-2">{hospital.address}</p>

                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span className="px-2 py-1 bg-gray-100 rounded">
                    {hospital.type}
                  </span>
                  {hospital.distance && (
                    <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded">
                      📍 {hospitalService.formatDistance(hospital.distance)}
                    </span>
                  )}
                </div>
              </div>

              <MapPin
                size={20}
                className={`transition-colors duration-200 ${selectedHospital?.id === hospital.id ? 'text-red-500' : 'text-gray-400'
                  }`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Filter component (simplified - search moved to UnifiedSearch)
const FilterPanel = ({
  filteredHospitals,
  hospitals,
  onStateChange,
  onTypeChange,
  selectedState,
  selectedType
}) => {
  const states = [...new Set(hospitals.map(h => h.state))];
  const types = [...new Set(hospitals.map(h => h.type))];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
      <div className="flex flex-wrap gap-4 items-center">
        <div className="text-sm font-medium text-gray-700">
          Filter Results:
        </div>

        {/* State Filter */}
        <select
          value={selectedState}
          onChange={(e) => onStateChange(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        >
          <option value="">All States</option>
          {states.map(state => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>

        {/* Type Filter */}
        <select
          value={selectedType}
          onChange={(e) => onTypeChange(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        >
          <option value="">All Types</option>
          {types.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>

        <div className="text-sm text-gray-600 ml-auto">
          Showing {filteredHospitals.length} of {hospitals.length} hospitals
        </div>
      </div>
    </div>
  );
};

const PartneredHospitals = () => {
  const [hospitals, setHospitals] = useState([]);
  const [filteredHospitals, setFilteredHospitals] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [selectedState, setSelectedState] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [isLoadingHospitals, setIsLoadingHospitals] = useState(true);

  // Radius functionality
  const [radiusKm, setRadiusKm] = useState(1500);
  const [radiusCenter, setRadiusCenter] = useState({ lat: 20.5937, lng: 78.9629 }); // Center of India initially
  const [radiusFilteredHospitals, setRadiusFilteredHospitals] = useState([]);

  // Unified search functionality
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [useApiData, setUseApiData] = useState(false);
  const [currentSearchQuery, setCurrentSearchQuery] = useState('');

  // Fetch hospitals from API on component mount
  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        setIsLoadingHospitals(true);
        const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/v1/hospitals?limit=100`);
        const data = await response.json();

        if (data.success && data.data.hospitals) {
          // Convert API format to match existing format
          const convertedHospitals = data.data.hospitals.map(hospital => ({
            id: hospital.id,
            name: hospital.name,
            address: hospital.address,
            city: hospital.city,
            state: hospital.state,
            coordinates: {
              lat: parseFloat(hospital.latitude),
              lng: parseFloat(hospital.longitude)
            },
            phone: hospital.phone || '',
            email: hospital.email || '',
            website: hospital.website || '',
            type: hospital.type || 'Private'
          }));

          setHospitals(convertedHospitals);
        } else {
          console.error('Failed to fetch hospitals:', data.message);
          // Fallback to static data if API fails
          const { default: fallbackData } = await import('../data/allHospitalsData.js');
          setHospitals(fallbackData);
        }
      } catch (error) {
        console.error('Error fetching hospitals:', error);
        // Fallback to static data if API fails
        try {
          const { default: fallbackData } = await import('../data/allHospitalsData.js');
          setHospitals(fallbackData);
        } catch (fallbackError) {
          console.error('Error loading fallback data:', fallbackError);
          setHospitals([]);
        }
      } finally {
        setIsLoadingHospitals(false);
      }
    };

    fetchHospitals();
  }, []);

  // Initialize radius filtered hospitals on mount
  useEffect(() => {
    if (hospitals.length > 0) {
      const filtered = hospitals.filter(hospital => {
        const distance = calculateDistance(
          radiusCenter.lat,
          radiusCenter.lng,
          hospital.coordinates.lat,
          hospital.coordinates.lng
        );
        return distance <= radiusKm;
      });
      setRadiusFilteredHospitals(filtered);
    }
  }, [hospitals, radiusCenter, radiusKm]);

  // Handle hospital selection and radius center change
  const handleHospitalSelect = (hospital) => {
    setSelectedHospital(hospital);
    setRadiusCenter(hospital.coordinates);
  };

  // Handle radius change
  const handleRadiusChange = (newRadius) => {
    setRadiusKm(newRadius);

    // Clear any existing search errors when radius changes
    if (searchError) {
      setSearchError('');
    }

    // If there's an active location search, automatically re-search with new radius
    if (useApiData && currentSearchQuery.trim()) {
      // Delay the search slightly to allow state to update
      setTimeout(() => {
        handleLocationSearch(currentSearchQuery);
      }, 100);
    }
  };

  // Handle radius reset to center of India
  const handleResetRadius = () => {
    setSelectedHospital(null);
    setRadiusCenter({ lat: 20.5937, lng: 78.9629 });
  };

  // Handle radius filtered hospitals update from Map component
  const handleRadiusFilteredHospitals = (hospitals) => {
    setRadiusFilteredHospitals(hospitals);
  };

  // Handle location search (from unified search)
  const handleLocationSearch = async (location) => {
    if (!location.trim()) {
      setSearchError('Please enter a location');
      return;
    }

    setIsSearching(true);
    setSearchError('');
    setCurrentSearchQuery(location);

    // Clear previous results immediately to prevent showing stale data
    setSearchResults([]);
    setUseApiData(false);

    try {
      const results = await hospitalService.searchByLocation(location, radiusKm);

      if (results.success && results.hospitals && results.hospitals.length > 0) {
        // Convert API hospital format to match existing format
        const convertedHospitals = results.hospitals.map(hospital => ({
          id: hospital.id,
          name: hospital.name,
          address: hospital.address,
          city: hospital.city,
          state: hospital.state,
          coordinates: {
            lat: parseFloat(hospital.latitude),
            lng: parseFloat(hospital.longitude)
          },
          phone: hospital.phone || '',
          email: hospital.email || '',
          website: hospital.website || '',
          type: hospital.type || 'Private',
          distance: hospital.distance
        }));

        setSearchResults(convertedHospitals);
        setUseApiData(true);

        // Update radius center to search location
        if (results.searchLocation) {
          setRadiusCenter({
            lat: results.searchLocation.latitude,
            lng: results.searchLocation.longitude
          });
        }

        setSearchError('');
      } else {
        setSearchError(results.message || `No hospitals found within ${radiusKm}km of ${location}. Try expanding your search radius or searching for a different location.`);
        setUseApiData(false);
        setSearchResults([]);
      }
    } catch (error) {
      console.error('Search error:', error);
      setSearchError('Failed to search hospitals. Please try again.');
      setUseApiData(false);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  // Handle hospital name filtering (from unified search)
  const handleHospitalFilter = (hospitalName) => {
    setCurrentSearchQuery(hospitalName);
    setUseApiData(false);
    setSearchResults([]);
    setSearchError('');

    // Filter hospitals by name from the current dataset
    const baseHospitals = radiusFilteredHospitals;
    const filtered = baseHospitals.filter(hospital =>
      hospital.name.toLowerCase().includes(hospitalName.toLowerCase()) ||
      hospital.city.toLowerCase().includes(hospitalName.toLowerCase()) ||
      hospital.address.toLowerCase().includes(hospitalName.toLowerCase())
    );

    if (filtered.length > 0) {
      setSearchResults(filtered);
    } else {
      setSearchError(`No hospitals found matching "${hospitalName}". Try a different search term.`);
      setSearchResults([]);
    }
  };

  // Handle clear search (from unified search)
  const handleClearSearch = () => {
    setCurrentSearchQuery('');
    setSearchError('');
    setUseApiData(false);
    setSearchResults([]);
    setRadiusCenter({ lat: 20.5937, lng: 78.9629 });
  };

  // Filter hospitals based on filters (applied to search results or radius-filtered hospitals)
  useEffect(() => {
    let baseHospitals = [];

    if (searchResults.length > 0) {
      // Use search results as base
      baseHospitals = searchResults;
    } else if (useApiData) {
      // If we have API data but no results, use empty array
      baseHospitals = [];
    } else {
      // Use radius-filtered hospitals as base
      baseHospitals = radiusFilteredHospitals;
    }

    let filtered = [...baseHospitals];

    if (selectedState) {
      filtered = filtered.filter(hospital => hospital.state === selectedState);
    }

    if (selectedType) {
      filtered = filtered.filter(hospital => hospital.type === selectedType);
    }

    setFilteredHospitals(filtered);
  }, [radiusFilteredHospitals, searchResults, useApiData, selectedState, selectedType]);

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      {/* Hero Section */}
      <PageBanner
        title="Partnered Hospitals"
      // subtitle={`Our strong association with ${hospitals.length} leading hospitals across India has contributed to our customers' access to advanced cancer treatments.`}
      />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {isLoadingHospitals ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading hospitals...</p>
            </div>
          </div>
        ) : (
          <>
            {/* Unified Smart Search */}
            <UnifiedSearch
              onLocationSearch={handleLocationSearch}
              onHospitalFilter={handleHospitalFilter}
              onClear={handleClearSearch}
              radiusKm={radiusKm}
              onRadiusChange={handleRadiusChange}
              isSearching={isSearching}
              searchError={searchError}
              searchResults={searchResults}
              hospitals={hospitals}
            />

            <FilterPanel
              hospitals={hospitals}
              filteredHospitals={filteredHospitals}
              selectedState={selectedState}
              onStateChange={setSelectedState}
              selectedType={selectedType}
              onTypeChange={setSelectedType}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Hospital List */}
              <div className="lg:col-span-1 order-2 lg:order-1">
                <div className="h-[400px] lg:h-[600px]">
                  <HospitalList
                    hospitals={filteredHospitals}
                    onHospitalSelect={handleHospitalSelect}
                    selectedHospital={selectedHospital}
                  />
                </div>
              </div>

              {/* Map */}
              <div className="lg:col-span-2 order-1 lg:order-2">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden h-[400px] lg:h-[600px] w-full relative">
                  {import.meta.env.VITE_GOOGLE_MAPS_API_KEY ? (
                    <Wrapper
                      apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
                      render={(status) => {
                        if (status === 'LOADING') {
                          return (
                            <div className="flex items-center justify-center h-full">
                              <div className="text-center">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
                                <p className="text-gray-600">Loading map...</p>
                              </div>
                            </div>
                          );
                        }
                        if (status === 'FAILURE') {
                          return (
                            <div className="flex items-center justify-center h-full">
                              <div className="text-center text-red-500">
                                <p className="text-lg font-semibold mb-2">Error loading map</p>
                                <p className="text-sm">Please check your internet connection and try again.</p>
                              </div>
                            </div>
                          );
                        }
                        return (
                          <Map
                            hospitals={searchResults.length > 0 ? searchResults : hospitals}
                            selectedHospital={selectedHospital}
                            onHospitalSelect={handleHospitalSelect}
                            radiusCenter={radiusCenter}
                            radiusKm={radiusKm}
                            onRadiusChange={handleRadiusFilteredHospitals}
                          />
                        );
                      }}
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full bg-gray-100">
                      <div className="text-center text-gray-600">
                        <p className="text-lg font-semibold mb-2">Map Configuration Required</p>
                        <p className="text-sm">Please configure Google Maps API key to view the map.</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Collaborate with Us Section */}
      <section id='collaborateUs' className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column - Content */}
            <div>
              <h2 className="text-4xl font-normal text-[#47A178] font-futura mb-8">
                Collaborate with Us
              </h2>

              <p className="text-2xl font-medium text-[#363636] mb-7">
                To co-develop the next generation of our cellular therapies or to broaden access in your territories.
              </p>

              <ul className="space-y-3 text-[#363636] text-lg">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-[#47A178] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Research & Development of innovative cellular therapies.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-[#47A178] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Expanding Product Access to underserved regions.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-[#47A178] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Philanthropic initiatives to support global health equity.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-[#47A178] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Investment opportunities to advance therapeutic solutions.</span>
                </li>
              </ul>
            </div>

            {/* Right Column - Form */}
            <div className="bg-white p-8 rounded-xl border border-gray-200 text-lg">
              <form className="space-y-6">
                {/* First Name and Last Name */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#47A178] focus:border-transparent outline-none transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#47A178] focus:border-transparent outline-none transition-colors"
                      required
                    />
                  </div>
                </div>

                {/* Institution */}
                <div>
                  <input
                    type="text"
                    name="institution"
                    placeholder="Institution"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#47A178] focus:border-transparent outline-none transition-colors"
                    required
                  />
                </div>

                {/* Partnering Category */}
                <div>
                  <select
                    name="partneringCategory"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#47A178] focus:border-transparent outline-none transition-colors text-gray-700 cursor-pointer"
                    required
                  >
                    <option value="">- Select - Partnering Category</option>
                    <option value="research-development">Research & Development</option>
                    <option value="product-access">Product Access</option>
                    <option value="philanthropic">Philanthropic Initiatives</option>
                    <option value="investment">Investment Opportunities</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Phone Number */}
                <div>
                  <input
                    type="tel"
                    name="phoneNumber"
                    placeholder="Phone No."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#47A178] focus:border-transparent outline-none transition-colors"
                    required
                  />
                </div>

                {/* Email Address */}
                <div>
                  <input
                    type="email"
                    name="emailAddress"
                    placeholder="Email Address"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#47A178] focus:border-transparent outline-none transition-colors"
                    required
                  />
                </div>

                {/* Message */}
                <div>
                  <textarea
                    name="message"
                    placeholder="Message *"
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#47A178] focus:border-transparent outline-none transition-colors resize-none"
                    required
                  ></textarea>
                </div>

                {/* Submit Button */}
                <div className="flex justify-center">
                  <button className='bg-[#FFBF00] hover:bg-[#E6AC00] text-[#363636] text-lg font-medium px-4 py-3 rounded-full transition-colors duration-300 w-full max-w-[150px] mt-8'>
                    Submit Form
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PartneredHospitals;