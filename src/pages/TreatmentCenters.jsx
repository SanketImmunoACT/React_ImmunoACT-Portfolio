import React, { useState, useEffect } from 'react';
import { Wrapper } from '@googlemaps/react-wrapper';
import { AlertCircle, MapPin, Navigation, Loader2 } from 'lucide-react';
import PageBanner from '@/components/PageBanner';

// Import existing hospital data as fallback
import hospitalData from '@/data/allHospitalsData.js';

// Map component for displaying hospitals
const Map = ({ 
  hospitals, 
  onHospitalSelect, 
  selectedHospital, 
  searchLocation,
  radiusKm 
}) => {
  const mapRef = React.useRef(null);
  const [map, setMap] = React.useState(null);
  const markersRef = React.useRef([]);
  const radiusCircleRef = React.useRef(null);

  const initializeMap = React.useCallback(() => {
    if (!mapRef.current) return;

    try {
      const center = searchLocation 
        ? { lat: searchLocation.latitude, lng: searchLocation.longitude }
        : { lat: 20.5937, lng: 78.9629 }; // Center of India

      const mapInstance = new window.google.maps.Map(mapRef.current, {
        center: center,
        zoom: searchLocation ? 10 : 5,
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
  }, [searchLocation]);

  // Custom marker icon
  const svgIcon = React.useMemo(() => {
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none">
        <path d="M12 1.5C7.85953 1.5 4.5 4.52391 4.5 8.25C4.5 14.25 12 22.5 12 22.5C12 22.5 19.5 14.25 19.5 8.25C19.5 4.52391 16.1405 1.5 12 1.5ZM12 12C11.4067 12 10.8266 11.8241 10.3333 11.4944C9.83994 11.1648 9.45542 10.6962 9.22836 10.1481C9.0013 9.59987 8.94189 8.99667 9.05764 8.41473C9.1734 7.83279 9.45912 6.29824 9.87868 6.87868C10.2982 6.45912 10.8328 6.1734 11.4147 6.05764C11.9967 5.94189 12.5999 6.0013 13.148 6.22836C13.6962 6.45542 14.1648 6.83994 14.4944 7.33329C14.8241 7.82664 15 8.40666 15 9C14.9991 9.79538 14.6828 10.5579 14.1204 11.1204C13.5579 11.6828 12.7954 11.9991 12 12Z" fill="#f97316" stroke="#ffffff" stroke-width="1"/>
      </svg>
    `)}`;
  }, []);

  useEffect(() => {
    if (window.google && window.google.maps) {
      initializeMap();
    }
  }, [initializeMap]);

  // Handle markers updates
  useEffect(() => {
    if (!map || !hospitals.length) return;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.setMap(null));

    const newMarkers = hospitals.map(hospital => {
      const lat = hospital.latitude || hospital.coordinates?.lat;
      const lng = hospital.longitude || hospital.coordinates?.lng;
      
      if (!lat || !lng) return null;

      const marker = new window.google.maps.Marker({
        position: { lat, lng },
        map: map,
        title: hospital.name,
        icon: {
          url: svgIcon,
          scaledSize: new window.google.maps.Size(32, 32),
          anchor: new window.google.maps.Point(16, 32)
        },
        clickable: true,
        optimized: false
      });

      // Create info window
      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div style="padding: 12px; max-width: 300px;">
            <h3 style="font-weight: bold; font-size: 18px; color: #1f2937; margin-bottom: 8px;">${hospital.name}</h3>
            <p style="font-size: 14px; color: #6b7280; margin-bottom: 8px;">${hospital.address}</p>
            ${hospital.distance ? `<p style="font-size: 12px; color: #f97316; margin-bottom: 8px;">📍 ${hospital.distance.toFixed(1)}km away</p>` : ''}
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
              <span style="font-size: 12px;">✉️</span>
              <span style="font-size: 14px; color: #374151;">${hospital.email || 'Contact info not available'}</span>
            </div>
            <button 
              onclick="window.open('https://maps.google.com/maps?daddr=${lat},${lng}', '_blank')"
              style="background-color: #f97316; color: white; padding: 8px 12px; border-radius: 4px; font-size: 14px; border: none; cursor: pointer;"
              onmouseover="this.style.backgroundColor='#ea580c'"
              onmouseout="this.style.backgroundColor='#f97316'"
            >
              Get Directions
            </button>
          </div>
        `
      });

      // Add click event listener
      marker.addListener('click', () => {
        // Close any open info windows
        if (window.currentInfoWindow) {
          window.currentInfoWindow.close();
        }
        
        // Open new info window
        infoWindow.open(map, marker);
        window.currentInfoWindow = infoWindow;
        
        // Call parent callback
        if (onHospitalSelect) {
          onHospitalSelect(hospital);
        }
      });

      return marker;
    }).filter(Boolean);

    markersRef.current = newMarkers;
  }, [map, hospitals, svgIcon, onHospitalSelect]);

  // Handle radius circle
  useEffect(() => {
    if (!map || !searchLocation || !radiusKm) return;

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
      center: { lat: searchLocation.latitude, lng: searchLocation.longitude },
      radius: radiusKm * 1000 // Convert km to meters
    });

    radiusCircleRef.current = circle;
  }, [map, searchLocation, radiusKm]);

  // Focus on selected hospital
  useEffect(() => {
    if (selectedHospital && map) {
      const lat = selectedHospital.latitude || selectedHospital.coordinates?.lat;
      const lng = selectedHospital.longitude || selectedHospital.coordinates?.lng;
      
      if (lat && lng) {
        map.setCenter({ lat, lng });
        map.setZoom(12);
      }
    }
  }, [selectedHospital, map]);

  // Cleanup on unmount
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

const TreatmentCenters = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <PageBanner 
        title="Find Treatment Centers" 
        subtitle="Locate CAR-T cell therapy centers near you. Search by location and customize your radius to find the most convenient treatment options."
      />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <h3 className="text-lg font-medium text-gray-800 mb-2">
            Location Search Feature
          </h3>
          <p className="text-gray-600">
            The location-based hospital search is being loaded...
          </p>
        </div>
      </div>
    </div>
  );
};


export default TreatmentCenters;