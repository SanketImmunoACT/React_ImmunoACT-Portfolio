import React, { useCallback, useEffect, useState } from 'react';
import { Wrapper } from '@googlemaps/react-wrapper';
import { AlertCircle, CheckCircle, Diameter, Filter, Mail, MapPin, Navigation, Phone, Search, Shield } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import PageBanner from '@/components/PageBanner';
import { LocationPin } from '@/assets/svg/Icons';

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

// Import real hospital data
import hospitalData from '../data/allHospitalsData.js';

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
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
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



  // Memoize the SVG icon to prevent recreation
  const svgIcon = React.useMemo(() => {
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none">
        <path d="M12 1.5C7.85953 1.5 4.5 4.52391 4.5 8.25C4.5 14.25 12 22.5 12 22.5C12 22.5 19.5 14.25 19.5 8.25C19.5 4.52391 16.1405 1.5 12 1.5ZM12 12C11.4067 12 10.8266 11.8241 10.3333 11.4944C9.83994 11.1648 9.45542 10.6962 9.22836 10.1481C9.0013 9.59987 8.94189 8.99667 9.05764 8.41473C9.1734 7.83279 9.45912 7.29824 9.87868 6.87868C10.2982 6.45912 10.8328 6.1734 11.4147 6.05764C11.9967 5.94189 12.5999 6.0013 13.148 6.22836C13.6962 6.45542 14.1648 6.83994 14.4944 7.33329C14.8241 7.82664 15 8.40666 15 9C14.9991 9.79538 14.6828 10.5579 14.1204 11.1204C13.5579 11.6828 12.7954 11.9991 12 12Z" fill="#f97316" stroke="#ffffff" stroke-width="1"/>
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
      // Create marker with proper configuration
      const marker = new window.google.maps.Marker({
        position: hospital.coordinates,
        map: map,
        title: hospital.name,
        icon: {
          url: svgIcon,
          scaledSize: new window.google.maps.Size(32, 32),
          anchor: new window.google.maps.Point(16, 32)
        },
        clickable: true,
        optimized: false // This helps with custom icons and click events
      });

      // Create info window
      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div style="padding: 12px; max-width: 300px;">
            <h3 style=" font-size: 18px; color: #1f2937; margin-bottom: 8px;">${hospital.name}</h3>
            <p style="font-size: 14px; color: #000000; margin-bottom: 8px;">${hospital.address}</p>
            ${hospital.distance ? `<p style="font-size: 12px; color: #f97316; margin-bottom: 8px;">📍 ${hospitalService.formatDistance(hospital.distance)} away</p>` : ''}
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
            <span style="font-size: 12px;">Email ID:</span>
              <span style="font-size: 14px; color: #000000;">${hospital.email || 'Contact info not available'}</span>
            </div>
            <button 
              onclick="window.open('https://maps.google.com/maps?daddr=${hospital.coordinates.lat},${hospital.coordinates.lng}', '_blank')"
              style="background-color: #f97316; color: white; padding: 8px 12px; border-radius: 24px; font-size: 14px; border: none; cursor: pointer;"
              onmouseover="this.style.backgroundColor='#ea580c'"
              onmouseout="this.style.backgroundColor='#f97316'"
            >
              Get Directions
            </button>
          </div>
        `
      });

      // Add click event listener with error handling
      try {
        marker.addListener('click', (event) => {
          console.log('Marker clicked:', hospital.name);
          
          // Close any open info windows first
          if (window.currentInfoWindow) {
            window.currentInfoWindow.close();
          }
          
          // Open new info window
          infoWindow.open(map, marker);
          window.currentInfoWindow = infoWindow;
          
          // Call parent callback
          if (onHospitalSelectRef.current) {
            onHospitalSelectRef.current(hospital);
          }
        });
      } catch (error) {
        console.error('Error adding click listener to marker:', error);
      }

      return marker;
    });

    markersRef.current = newMarkers;

    // Notify parent component about filtered hospitals
    if (onRadiusChangeRef.current) {
      onRadiusChangeRef.current(filteredHospitals);
    }
  }, [map, hospitals, radiusCenter, radiusKm, svgIcon]);

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
    };
  }, []);

  return <div ref={mapRef} className="w-full h-full" />;
};

// Hospital list component
const HospitalList = ({ hospitals, onHospitalSelect, selectedHospital }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 h-full overflow-y-auto">
      <h3 className="text-lg text-gray-800 mb-4">
        Partnered Treatment Centers ({hospitals.length})
      </h3>
      
      <div className="space-y-3">
        {hospitals.map(hospital => (
          <div
            key={hospital.id}
            className={`p-3 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
              selectedHospital?.id === hospital.id 
                ? 'border-orange-500 bg-orange-50' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => onHospitalSelect(hospital)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800 mb-1">{hospital.name}</h4>
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
                className={`${
                  selectedHospital?.id === hospital.id ? 'text-orange-500' : 'text-gray-400'
                }`} 
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Radius Control Component
const RadiusControl = ({ radiusKm, onRadiusChange, radiusCenter, selectedHospital, onResetRadius }) => {
  const radiusOptions = [
    { value: 10, label: '10 km' },
    { value: 20, label: '20 km' },
    { value: 50, label: '50 km' },
    { value: 100, label: '100 km' },
    { value: 500, label: '500 km' },
    { value: 1000, label: '1000 km' },
    { value: 1500, label: '1500 km' }
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 mb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h3 className="text-lg text-gray-800">Search Radius</h3>
          <select
            value={radiusKm}
            onChange={(e) => onRadiusChange(parseInt(e.target.value))}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            {radiusOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {selectedHospital && (
            <button
              onClick={onResetRadius}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm"
            >
              Reset to Center
            </button>
          )}
        </div>
        <div className="text-sm text-gray-600">
          {selectedHospital ? 
            `Showing hospitals within ${radiusKm}km of ${selectedHospital.name}` :
            `Showing hospitals within ${radiusKm}km of India center`
          }
        </div>
      </div>
    </div>
  );
};

// Filter component
const FilterPanel = ({ 
  filteredHospitals, 
  hospitals, 
  onFilterChange, 
  onSearchChange, 
  onStateChange,
  onTypeChange,
  searchTerm,
  selectedState,
  selectedType 
}) => {
  const states = [...new Set(hospitals.map(h => h.state))];
  const types = [...new Set(hospitals.map(h => h.type))];

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 mb-4">
      <div className="flex flex-wrap gap-4 items-center">
        {/* Search */}
        <div className="flex-1 min-w-64">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search hospitals..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
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

        {/* <div className="text-sm text-gray-600">
          Showing {filteredHospitals.length} of {hospitals.length} hospitals
        </div> */}
      </div>
    </div>
  );
};

// Collaborate Section Component
// const CollaborateSection = () => {
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null

//   const onSubmit = async (data) => {
//     setIsSubmitting(true);
//     setSubmitStatus(null);

//     try {
//       const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/v1/contact/submit`, {
//         body: JSON.stringify({
//           ...data,
//           formType: 'collaboration' // Add form type to distinguish from contact form
//         }),
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         method: 'POST',
//       });

//       const responseData = await response.json();

//       if (response.ok) {
//         setSubmitStatus('success');
//         reset();
//       } else {
//         setSubmitStatus('error');
//         console.error('Submission error:', responseData);
//       }
//     } catch (error) {
//       console.error('Form submission error:', error);
//       setSubmitStatus('error');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Initialize React Hook Form
//   const {
//     formState: { errors, isValid },
//     handleSubmit,
//     register,
//     reset,
//     watch
//   } = useForm({
//     defaultValues: {
//       consentGiven: false,
//       email: '',
//       firstName: '',
//       institution: '',
//       lastName: '',
//       message: '',
//       partneringCategory: '',
//       phone: '',
//       website: '' // Honeypot field
//     },
//     mode: 'onChange',
//     resolver: yupResolver(collaborationSchema)
//   });

//   // Watch message field for character counter
//   const messageValue = watch('message', '');

//   null

//   const partneringCategories = [
//     'Clinical Collaboration',
//     'Research Partnership',
//     'Technology Licensing',
//     'Manufacturing Partnership',
//     'Distribution Partnership',
//     'Investment Opportunity',
//     'Hospital Partnership',
//     'Other'
//   ];

//   return (
//     <div className="bg-gray-50 py-16">
//       <div className="container mx-auto px-4">
//         <div className="max-w-6xl mx-auto">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl font-bold text-gray-800 mb-4">Collaborate with Us</h2>
//             <p className="text-lg text-gray-600 max-w-3xl mx-auto">
//               To co-develop the next generation of our cellular therapies or to broaden access to your territories.
//             </p>
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
//             {/* Left Side - Information */}
//             <div>
//               <div className="space-y-8">
//                 <div>
//                   <h3 className="text-xl font-semibold text-gray-800 mb-4">For Healthcare Providers</h3>
//                   <ul className="space-y-3 text-gray-600">
//                     <li className="flex items-start">
//                       <span className="text-orange-500 mr-2">•</span>
//                       Research & Development of innovative cellular therapies
//                     </li>
//                     <li className="flex items-start">
//                       <span className="text-orange-500 mr-2">•</span>
//                       Expanding Patient Access to advanced cancer treatments
//                     </li>
//                     <li className="flex items-start">
//                       <span className="text-orange-500 mr-2">•</span>
//                       Developing solutions to advance global health equity
//                     </li>
//                     <li className="flex items-start">
//                       <span className="text-orange-500 mr-2">•</span>
//                       Exploring opportunities to advance therapeutic solutions
//                     </li>
//                   </ul>
//                 </div>
                
//                 <div>
//                   <h3 className="text-xl font-semibold text-gray-800 mb-4">Partnership Benefits</h3>
//                   <ul className="space-y-3 text-gray-600">
//                     <li className="flex items-start">
//                       <span className="text-orange-500 mr-2">•</span>
//                       Access to cutting-edge CAR-T cell therapy
//                     </li>
//                     <li className="flex items-start">
//                       <span className="text-orange-500 mr-2">•</span>
//                       Comprehensive training and support
//                     </li>
//                     <li className="flex items-start">
//                       <span className="text-orange-500 mr-2">•</span>
//                       Clinical research collaboration opportunities
//                     </li>
//                     <li className="flex items-start">
//                       <span className="text-orange-500 mr-2">•</span>
//                       Enhanced patient care capabilities
//                     </li>
//                   </ul>
//                 </div>
//               </div>
//             </div>

//             {/* Right Side - Form */}
//             <div>
//               <div className="bg-white rounded-lg shadow-lg p-8">
//                 {submitStatus === 'success' && (
//                   <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-3">
//                     <CheckCircle className="w-5 h-5 text-green-600" />
//                     <div>
//                       <p className="text-green-800 font-medium">Thank you for your submission!</p>
//                       <p className="text-green-700 text-sm">We will contact you within 2-3 business days.</p>
//                     </div>
//                   </div>
//                 )}

//                 {submitStatus === 'error' && (
//                   <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-3">
//                     <AlertCircle className="w-5 h-5 text-red-600" />
//                     <div>
//                       <p className="text-red-800 font-medium">There was an error submitting your form</p>
//                       <p className="text-red-700 text-sm">Please check the fields below and try again.</p>
//                     </div>
//                   </div>
//                 )}

//                 <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//                   {/* Honeypot field */}
//                   <input
//                     type="text"
//                     {...register('website')}
//                     style={{ display: 'none' }}
//                     tabIndex="-1"
//                     autoComplete="off"
//                   />

//                   {/* Name Fields */}
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <input
//                         type="text"
//                         {...register('firstName')}
//                         className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
//                           errors.firstName ? 'border-red-500' : 'border-gray-300'
//                         }`}
//                         placeholder="First Name *"
//                       />
//                       {errors.firstName && (
//                         <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
//                       )}
//                     </div>

//                     <div>
//                       <input
//                         type="text"
//                         {...register('lastName')}
//                         className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
//                           errors.lastName ? 'border-red-500' : 'border-gray-300'
//                         }`}
//                         placeholder="Last Name *"
//                       />
//                       {errors.lastName && (
//                         <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
//                       )}
//                     </div>
//                   </div>

//                   {/* Institution */}
//                   <div>
//                     <input
//                       type="text"
//                       {...register('institution')}
//                       className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
//                         errors.institution ? 'border-red-500' : 'border-gray-300'
//                       }`}
//                       placeholder="Institution"
//                     />
//                     {errors.institution && (
//                       <p className="mt-1 text-sm text-red-600">{errors.institution.message}</p>
//                     )}
//                   </div>

//                   {/* Partnering Category */}
//                   <div>
//                     <select
//                       {...register('partneringCategory')}
//                       className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
//                         errors.partneringCategory ? 'border-red-500' : 'border-gray-300'
//                       }`}
//                     >
//                       <option value="">- Select - Partnering Category *</option>
//                       {partneringCategories.map((category) => (
//                         <option key={category} value={category}>
//                           {category}
//                         </option>
//                       ))}
//                     </select>
//                     {errors.partneringCategory && (
//                       <p className="mt-1 text-sm text-red-600">{errors.partneringCategory.message}</p>
//                     )}
//                   </div>

//                   {/* Contact Information */}
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <input
//                         type="tel"
//                         {...register('phone')}
//                         className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
//                           errors.phone ? 'border-red-500' : 'border-gray-300'
//                         }`}
//                         placeholder="Phone No."
//                       />
//                       {errors.phone && (
//                         <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
//                       )}
//                     </div>

//                     <div>
//                       <input
//                         type="email"
//                         {...register('email')}
//                         className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
//                           errors.email ? 'border-red-500' : 'border-gray-300'
//                         }`}
//                         placeholder="Email Address *"
//                       />
//                       {errors.email && (
//                         <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
//                       )}
//                     </div>
//                   </div>

//                   {/* Message */}
//                   <div>
//                     <div className="relative">
//                       <textarea
//                         rows={4}
//                         {...register('message')}
//                         className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
//                           errors.message ? 'border-red-500' : 'border-gray-300'
//                         }`}
//                         placeholder="Message *"
//                       />
//                       <span className={`absolute bottom-2 right-2 text-xs ${messageValue.length > 2000 ? 'text-red-600' : 'text-gray-500'}`}>
//                         {messageValue.length}/2000
//                       </span>
//                     </div>
//                     {errors.message && (
//                       <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
//                     )}
//                   </div>

//                   {/* Consent Checkbox */}
//                   <div className="flex items-start space-x-3">
//                     <input
//                       type="checkbox"
//                       {...register('consentGiven')}
//                       className="mt-1 w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
//                     />
//                     <label className="text-sm text-gray-700">
//                       I consent to the processing of my personal data for the purpose of responding to my inquiry. *
//                     </label>
//                   </div>
//                   {errors.consentGiven && (
//                     <p className="text-sm text-red-600">{errors.consentGiven.message}</p>
//                   )}

//                   {/* Submit Button */}
//                   <button
//                     type="submit"
//                     disabled={isSubmitting || !isValid}
//                     className="w-full bg-yellow-400 hover:bg-yellow-500 disabled:bg-gray-300 disabled:cursor-not-allowed text-black font-medium py-3 px-6 rounded-lg transition-colors"
//                   >
//                     {isSubmitting ? 'Submitting...' : 'Submit Form'}
//                   </button>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

const PartneredHospitals = () => {
  const [hospitals] = useState(hospitalData);
  const [filteredHospitals, setFilteredHospitals] = useState(hospitalData);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedType, setSelectedType] = useState('');
  
  // Radius functionality
  const [radiusKm, setRadiusKm] = useState(1500);
  const [radiusCenter, setRadiusCenter] = useState({ lat: 20.5937, lng: 78.9629 }); // Center of India initially
  const [radiusFilteredHospitals, setRadiusFilteredHospitals] = useState([]);
  
  // Location search functionality
  const [locationSearch, setLocationSearch] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState('');
  const [apiHospitals, setApiHospitals] = useState([]);
  const [useApiData, setUseApiData] = useState(false);

  // Initialize radius filtered hospitals on mount
  useEffect(() => {
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
    if (useApiData && locationSearch.trim()) {
      // Delay the search slightly to allow state to update
      setTimeout(() => {
        handleLocationSearch();
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

  // Handle location search
  const handleLocationSearch = async () => {
    if (!locationSearch.trim()) {
      setSearchError('Please enter a location');
      return;
    }

    setIsSearching(true);
    setSearchError(''); // Clear error immediately when starting search
    
    // Clear previous results immediately to prevent showing stale data
    setApiHospitals([]);
    setUseApiData(false);

    try {
      const results = await hospitalService.searchByLocation(locationSearch, radiusKm);
      
      console.log('Search results:', results); // Debug log
      
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

        setApiHospitals(convertedHospitals);
        setUseApiData(true);
        
        // Update radius center to search location
        if (results.searchLocation) {
          setRadiusCenter({
            lat: results.searchLocation.latitude,
            lng: results.searchLocation.longitude
          });
        }
        
        // Explicitly clear error on success
        setSearchError('');
        console.log('Search successful, error cleared'); // Debug log
      } else {
        console.log('No results found:', results); // Debug log
        setSearchError(results.message || `No hospitals found within ${radiusKm}km of ${locationSearch}. Try expanding your search radius or searching for a different location.`);
        setUseApiData(false);
        setApiHospitals([]);
      }
    } catch (error) {
      console.error('Search error:', error); // Debug log
      setSearchError('Failed to search hospitals. Please try again.');
      setUseApiData(false);
      setApiHospitals([]);
    } finally {
      setIsSearching(false);
    }
  };

  // Handle clear search
  const handleClearSearch = () => {
    setLocationSearch('');
    setSearchError('');
    setUseApiData(false);
    setApiHospitals([]);
    setRadiusCenter({ lat: 20.5937, lng: 78.9629 });
  };

  // Filter hospitals based on search and filters (applied to radius-filtered hospitals or API data)
  useEffect(() => {
    let filtered = useApiData ? apiHospitals : radiusFilteredHospitals;

    if (searchTerm) {
      filtered = filtered.filter(hospital =>
        hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hospital.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hospital.address.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedState) {
      filtered = filtered.filter(hospital => hospital.state === selectedState);
    }

    if (selectedType) {
      filtered = filtered.filter(hospital => hospital.type === selectedType);
    }

    setFilteredHospitals(filtered);
  }, [radiusFilteredHospitals, apiHospitals, useApiData, searchTerm, selectedState, selectedType]);

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      {/* Hero Section */}
      <PageBanner 
        title="Partnered Hospitals" 
        // subtitle={`Our strong association with ${hospitals.length} leading hospitals across India has contributed to our customers' access to advanced cancer treatments.`}
      />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <RadiusControl
          radiusKm={radiusKm}
          onRadiusChange={handleRadiusChange}
          radiusCenter={radiusCenter}
          selectedHospital={selectedHospital}
          onResetRadius={handleResetRadius}
        />

        {/* Location Search Panel */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            🔍 Search by Location
          </h3>
          <div className="flex flex-wrap gap-4 items-end">
            <div className="flex-1 min-w-64">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location (City, Address, or Area)
              </label>
              <input
                type="text"
                value={locationSearch}
                onChange={(e) => setLocationSearch(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLocationSearch()}
                placeholder="e.g., Mumbai, Andheri, Thane..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                disabled={isSearching}
              />
            </div>
            
            <div className="text-sm text-gray-600 px-4 py-2 bg-gray-50 rounded-lg">
              Will search within <strong>{radiusKm}km</strong> radius
              <br />
              <span className="text-xs">Change radius using the control above</span>
            </div>
            
            <button
              onClick={handleLocationSearch}
              disabled={isSearching || !locationSearch.trim()}
              className="px-6 py-2 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors"
            >
              {isSearching ? 'Searching...' : 'Search'}
            </button>
            
            {useApiData && (
              <button
                onClick={handleClearSearch}
                className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white font-medium rounded-lg transition-colors"
              >
                Clear
              </button>
            )}
          </div>
          
          {/* Search Results Info */}
          {useApiData && apiHospitals.length > 0 && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800 font-medium">
                ✅ Found {apiHospitals.length} hospital{apiHospitals.length !== 1 ? 's' : ''} within {radiusKm}km of "{locationSearch}"
              </p>
              {apiHospitals.some(h => h.distance) && (
                <p className="text-green-700 text-sm mt-1">
                  Distances shown from your search location. Change the radius above to search in a different area.
                </p>
              )}
            </div>
          )}
          
          {/* Search Error - Only show if there's an error AND no results */}
          {searchError && (!useApiData || apiHospitals.length === 0) && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800 font-medium">❌ {searchError}</p>
              <p className="text-red-700 text-sm mt-1">
                Try increasing the search radius above or searching for a different location.
              </p>
            </div>
          )}
        </div>
        
        <FilterPanel
          hospitals={hospitals}
          filteredHospitals={filteredHospitals}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
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
                        hospitals={useApiData ? apiHospitals : hospitals}
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