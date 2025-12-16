import React, { useState, useEffect, useCallback } from 'react';
import { Wrapper } from '@googlemaps/react-wrapper';
import { MapPin, Phone, Mail, Navigation, Filter, Search, AlertCircle, CheckCircle, Shield } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import PageBanner from '@/components/PageBanner';

// Validation schema for collaboration form
const collaborationSchema = yup.object({
  firstName: yup
    .string()
    .required('First name is required')
    .max(50, 'First name must not exceed 50 characters')
    .matches(/^[a-zA-Z\s'-]+$/, 'First name can only contain letters, spaces, hyphens, and apostrophes'),
  
  lastName: yup
    .string()
    .required('Last name is required')
    .max(50, 'Last name must not exceed 50 characters')
    .matches(/^[a-zA-Z\s'-]+$/, 'Last name can only contain letters, spaces, hyphens, and apostrophes'),
  
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
    .matches(/^[a-zA-Z0-9\s\-.,&()]*$/, 'Institution name contains invalid characters')
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
    .matches(/^[a-zA-Z0-9\s\-.,!?()'"@#$%&*+=\n\r]+$/, 'Message contains invalid characters'),
  
  consentGiven: yup
    .boolean()
    .oneOf([true], 'You must consent to data processing to submit this form'),
  
  website: yup.string().max(0, 'Bot detected') // Honeypot field
});

// Sample hospital data - you'll replace this with your actual data
const sampleHospitals = [
  {
    id: 1,
    name: "AIIMS, Mumbai",
    address: "Bandra East, Mumbai, Maharashtra 400051",
    phone: "+91-22-2659-8000",
    email: "info@aiimsmumbai.edu.in",
    city: "Mumbai",
    state: "Maharashtra",
    coordinates: { lat: 19.0760, lng: 72.8777 },
    type: "Government"
  },
  {
    id: 2,
    name: "Apollo Hospitals, Mumbai",
    address: "Sector 15, CBD Belapur, Navi Mumbai, Maharashtra 400614",
    phone: "+91-22-3982-3982",
    email: "info@apollohospitals.com",
    city: "Mumbai",
    state: "Maharashtra",
    coordinates: { lat: 19.0330, lng: 73.0297 },
    type: "Private"
  },
  {
    id: 3,
    name: "Tata Memorial Hospital, Mumbai",
    address: "Dr. E Borges Road, Parel, Mumbai, Maharashtra 400012",
    phone: "+91-22-2417-7000",
    email: "info@tmc.gov.in",
    city: "Mumbai",
    state: "Maharashtra",
    coordinates: { lat: 19.0176, lng: 72.8562 },
    type: "Government"
  }
];

// Map component
const Map = ({ hospitals, selectedHospital, onHospitalSelect }) => {
  const mapRef = React.useRef(null);
  const [map, setMap] = React.useState(null);
  const [markers, setMarkers] = React.useState([]);

  const initializeMap = useCallback(() => {
    if (!mapRef.current) return;

    const mapInstance = new window.google.maps.Map(mapRef.current, {
      center: { lat: 20.5937, lng: 78.9629 }, // Center of India
      zoom: 5,
      styles: [
        {
          featureType: "water",
          elementType: "geometry",
          stylers: [{ color: "#e9e9e9" }, { lightness: 17 }]
        },
        {
          featureType: "landscape",
          elementType: "geometry",
          stylers: [{ color: "#f5f5f5" }, { lightness: 20 }]
        }
      ]
    });

    setMap(mapInstance);
  }, []);

  const createMarkers = useCallback(() => {
    if (!map || !hospitals.length) return;

    // Clear existing markers
    markers.forEach(marker => marker.setMap(null));

    const newMarkers = hospitals.map(hospital => {
      const marker = new window.google.maps.Marker({
        position: hospital.coordinates,
        map: map,
        title: hospital.name,
        icon: {
          url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
            <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
              <circle cx="16" cy="16" r="12" fill="#f97316" stroke="#fff" stroke-width="2"/>
              <path d="M16 8v8m-4-4h8" stroke="#fff" stroke-width="2" stroke-linecap="round"/>
            </svg>
          `),
          scaledSize: new window.google.maps.Size(32, 32),
          anchor: new window.google.maps.Point(16, 16)
        }
      });

      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div class="p-3 max-w-xs">
            <h3 class="font-bold text-lg text-gray-800 mb-2">${hospital.name}</h3>
            <p class="text-sm text-gray-600 mb-2">${hospital.address}</p>
            <div class="flex items-center gap-2 mb-1">
              <span class="text-xs text-gray-500">📞</span>
              <span class="text-sm text-gray-700">${hospital.phone}</span>
            </div>
            <div class="flex items-center gap-2 mb-3">
              <span class="text-xs text-gray-500">✉️</span>
              <span class="text-sm text-gray-700">${hospital.email}</span>
            </div>
            <button 
              onclick="window.open('https://maps.google.com/maps?daddr=${hospital.coordinates.lat},${hospital.coordinates.lng}', '_blank')"
              class="bg-orange-500 text-white px-3 py-1 rounded text-sm hover:bg-orange-600 transition-colors"
            >
              Get Directions
            </button>
          </div>
        `
      });

      marker.addListener('click', () => {
        infoWindow.open(map, marker);
        onHospitalSelect(hospital);
      });

      return marker;
    });

    setMarkers(newMarkers);
  }, [map, hospitals, onHospitalSelect]);

  useEffect(() => {
    if (window.google && window.google.maps) {
      initializeMap();
    }
  }, [initializeMap]);

  useEffect(() => {
    createMarkers();
  }, [createMarkers]);

  // Focus on selected hospital
  useEffect(() => {
    if (selectedHospital && map) {
      map.setCenter(selectedHospital.coordinates);
      map.setZoom(12);
    }
  }, [selectedHospital, map]);

  return <div ref={mapRef} className="w-full h-full" />;
};

// Hospital list component
const HospitalList = ({ hospitals, onHospitalSelect, selectedHospital }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 h-full overflow-y-auto">
      <h3 className="text-lg font-bold text-gray-800 mb-4">
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
                  <span className="flex items-center gap-1">
                    <Phone size={12} />
                    {hospital.phone}
                  </span>
                  <span className="px-2 py-1 bg-gray-100 rounded">
                    {hospital.type}
                  </span>
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

// Filter component
const FilterPanel = ({ 
  hospitals, 
  filteredHospitals, 
  onFilterChange, 
  searchTerm, 
  onSearchChange,
  selectedState,
  onStateChange,
  selectedType,
  onTypeChange 
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

        <div className="text-sm text-gray-600">
          Showing {filteredHospitals.length} of {hospitals.length} hospitals
        </div>
      </div>
    </div>
  );
};

// Collaborate Section Component
const CollaborateSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null

  const partneringCategories = [
    'Clinical Collaboration',
    'Research Partnership',
    'Technology Licensing',
    'Manufacturing Partnership',
    'Distribution Partnership',
    'Investment Opportunity',
    'Hospital Partnership',
    'Other'
  ];

  // Initialize React Hook Form
  const {
    formState: { errors, isValid },
    handleSubmit,
    register,
    reset,
    watch
  } = useForm({
    resolver: yupResolver(collaborationSchema),
    mode: 'onChange',
    defaultValues: {
      consentGiven: false,
      email: '',
      firstName: '',
      institution: '',
      lastName: '',
      message: '',
      partneringCategory: '',
      phone: '',
      website: '' // Honeypot field
    }
  });

  // Watch message field for character counter
  const messageValue = watch('message', '');

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/v1/contact/submit`, {
        body: JSON.stringify({
          ...data,
          formType: 'collaboration' // Add form type to distinguish from contact form
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      });

      const responseData = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        reset();
      } else {
        setSubmitStatus('error');
        console.error('Submission error:', responseData);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Collaborate with Us</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              To co-develop the next generation of our cellular therapies or to broaden access to your territories.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Side - Information */}
            <div>
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">For Healthcare Providers</h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start">
                      <span className="text-orange-500 mr-2">•</span>
                      Research & Development of innovative cellular therapies
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-500 mr-2">•</span>
                      Expanding Patient Access to advanced cancer treatments
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-500 mr-2">•</span>
                      Developing solutions to advance global health equity
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-500 mr-2">•</span>
                      Exploring opportunities to advance therapeutic solutions
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Partnership Benefits</h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start">
                      <span className="text-orange-500 mr-2">•</span>
                      Access to cutting-edge CAR-T cell therapy
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-500 mr-2">•</span>
                      Comprehensive training and support
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-500 mr-2">•</span>
                      Clinical research collaboration opportunities
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-500 mr-2">•</span>
                      Enhanced patient care capabilities
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Right Side - Form */}
            <div>
              <div className="bg-white rounded-lg shadow-lg p-8">
                {submitStatus === 'success' && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="text-green-800 font-medium">Thank you for your submission!</p>
                      <p className="text-green-700 text-sm">We will contact you within 2-3 business days.</p>
                    </div>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-3">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                    <div>
                      <p className="text-red-800 font-medium">There was an error submitting your form</p>
                      <p className="text-red-700 text-sm">Please check the fields below and try again.</p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Honeypot field */}
                  <input
                    type="text"
                    {...register('website')}
                    style={{ display: 'none' }}
                    tabIndex="-1"
                    autoComplete="off"
                  />

                  {/* Name Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <input
                        type="text"
                        {...register('firstName')}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                          errors.firstName ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="First Name *"
                      />
                      {errors.firstName && (
                        <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
                      )}
                    </div>

                    <div>
                      <input
                        type="text"
                        {...register('lastName')}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                          errors.lastName ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Last Name *"
                      />
                      {errors.lastName && (
                        <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Institution */}
                  <div>
                    <input
                      type="text"
                      {...register('institution')}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                        errors.institution ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Institution"
                    />
                    {errors.institution && (
                      <p className="mt-1 text-sm text-red-600">{errors.institution.message}</p>
                    )}
                  </div>

                  {/* Partnering Category */}
                  <div>
                    <select
                      {...register('partneringCategory')}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                        errors.partneringCategory ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">- Select - Partnering Category *</option>
                      {partneringCategories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                    {errors.partneringCategory && (
                      <p className="mt-1 text-sm text-red-600">{errors.partneringCategory.message}</p>
                    )}
                  </div>

                  {/* Contact Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <input
                        type="tel"
                        {...register('phone')}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                          errors.phone ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Phone No."
                      />
                      {errors.phone && (
                        <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                      )}
                    </div>

                    <div>
                      <input
                        type="email"
                        {...register('email')}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                          errors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Email Address *"
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <div className="relative">
                      <textarea
                        rows={4}
                        {...register('message')}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                          errors.message ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Message *"
                      />
                      <span className={`absolute bottom-2 right-2 text-xs ${messageValue.length > 2000 ? 'text-red-600' : 'text-gray-500'}`}>
                        {messageValue.length}/2000
                      </span>
                    </div>
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
                    )}
                  </div>

                  {/* Consent Checkbox */}
                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      {...register('consentGiven')}
                      className="mt-1 w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                    />
                    <label className="text-sm text-gray-700">
                      I consent to the processing of my personal data for the purpose of responding to my inquiry. *
                    </label>
                  </div>
                  {errors.consentGiven && (
                    <p className="text-sm text-red-600">{errors.consentGiven.message}</p>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting || !isValid}
                    className="w-full bg-yellow-400 hover:bg-yellow-500 disabled:bg-gray-300 disabled:cursor-not-allowed text-black font-medium py-3 px-6 rounded-lg transition-colors"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Form'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PartneredHospitals = () => {
  const [hospitals] = useState(sampleHospitals);
  const [filteredHospitals, setFilteredHospitals] = useState(sampleHospitals);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedType, setSelectedType] = useState('');

  // Filter hospitals based on search and filters
  useEffect(() => {
    let filtered = hospitals;

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
  }, [hospitals, searchTerm, selectedState, selectedType]);

  const render = (status) => {
    if (status === 'LOADING') return <div className="flex items-center justify-center h-96">Loading...</div>;
    if (status === 'FAILURE') return <div className="flex items-center justify-center h-96 text-red-500">Error loading map</div>;
    return (
      <Map 
        hospitals={filteredHospitals} 
        selectedHospital={selectedHospital}
        onHospitalSelect={setSelectedHospital}
      />
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <PageBanner 
        title="Partnered Hospitals" 
        subtitle="Our strong association with over 50+ leading hospitals in India and around the world has contributed to our customers."
      />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
          {/* Hospital List */}
          <div className="lg:col-span-1">
            <HospitalList
              hospitals={filteredHospitals}
              onHospitalSelect={setSelectedHospital}
              selectedHospital={selectedHospital}
            />
          </div>

          {/* Map */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full">
              <Wrapper 
                apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "YOUR_API_KEY_HERE"} 
                render={render}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Collaborate Section */}
      <CollaborateSection />
    </div>
  );
};

export default PartneredHospitals;