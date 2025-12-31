const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

class HospitalService {
  /**
   * Search hospitals by location and radius
   * @param {string} location - City, address, or location name
   * @param {number} radius - Search radius in kilometers (default: 50)
   * @param {number} limit - Maximum number of results (default: 20)
   * @param {Array} services - Optional array of services to filter by
   * @returns {Promise<Object>} - Search results with hospitals and metadata
   */
  async searchByLocation(location, radius = 50, limit = 20, services = []) {
    try {
      const params = new URLSearchParams({
        location: location.trim(),
        radius: radius.toString(),
        limit: limit.toString()
      });

      // Add services if provided
      if (services.length > 0) {
        services.forEach(service => params.append('services', service));
      }

      const response = await fetch(`${API_BASE_URL}/api/v1/hospitals/search?${params}`, {
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
  }

  /**
   * Get all hospitals with optional filters
   * @param {Object} filters - Filter options
   * @returns {Promise<Object>} - All hospitals with filters applied
   */
  async getAllHospitals(filters = {}) {
    try {
      const params = new URLSearchParams();
      
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          if (Array.isArray(value)) {
            value.forEach(v => params.append(key, v));
          } else {
            params.append(key, value.toString());
          }
        }
      });

      const response = await fetch(`${API_BASE_URL}/api/v1/hospitals?${params}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch hospitals');
      }

      return {
        success: true,
        ...data.data
      };
    } catch (error) {
      console.error('Get hospitals error:', error);
      return {
        success: false,
        error: error.message,
        hospitals: [],
        total: 0
      };
    }
  }

  /**
   * Get hospital by ID
   * @param {number} id - Hospital ID
   * @returns {Promise<Object>} - Hospital details
   */
  async getHospitalById(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/hospitals/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Hospital not found');
      }

      return {
        success: true,
        hospital: data.data
      };
    } catch (error) {
      console.error('Get hospital error:', error);
      return {
        success: false,
        error: error.message,
        hospital: null
      };
    }
  }

  /**
   * Calculate distance between two coordinates using Haversine formula
   * @param {number} lat1 - Latitude of first point
   * @param {number} lon1 - Longitude of first point
   * @param {number} lat2 - Latitude of second point
   * @param {number} lon2 - Longitude of second point
   * @returns {number} - Distance in kilometers
   */
  calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in kilometers
    const dLat = this.toRadians(lat2 - lat1);
    const dLon = this.toRadians(lon2 - lon1);
    
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRadians(lat1)) * Math.cos(this.toRadians(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    
    return Math.round(distance * 100) / 100; // Round to 2 decimal places
  }

  /**
   * Convert degrees to radians
   * @param {number} degrees 
   * @returns {number}
   */
  toRadians(degrees) {
    return degrees * (Math.PI / 180);
  }

  /**
   * Format distance for display
   * @param {number} distance - Distance in kilometers
   * @returns {string} - Formatted distance string
   */
  formatDistance(distance) {
    if (distance < 1) {
      return `${Math.round(distance * 1000)}m`;
    } else if (distance < 10) {
      return `${distance.toFixed(1)}km`;
    } else {
      return `${Math.round(distance)}km`;
    }
  }

  /**
   * Get popular search locations (for autocomplete/suggestions)
   * @returns {Array} - Array of popular location names
   */
  getPopularLocations() {
    return [
      'Mumbai',
      'Delhi',
      'Bangalore',
      'Chennai',
      'Hyderabad',
      'Pune',
      'Kolkata',
      'Ahmedabad',
      'Jaipur',
      'Lucknow',
      'Kanpur',
      'Nagpur',
      'Indore',
      'Thane',
      'Bhopal',
      'Visakhapatnam',
      'Pimpri-Chinchwad',
      'Patna',
      'Vadodara',
      'Ghaziabad',
      'Ludhiana',
      'Agra',
      'Nashik',
      'Faridabad',
      'Meerut',
      'Rajkot',
      'Kalyan-Dombivali',
      'Vasai-Virar',
      'Varanasi',
      'Srinagar'
    ];
  }

  /**
   * Validate location input
   * @param {string} location - Location string to validate
   * @returns {Object} - Validation result
   */
  validateLocation(location) {
    if (!location || typeof location !== 'string') {
      return {
        isValid: false,
        error: 'Location is required'
      };
    }

    const trimmed = location.trim();
    
    if (trimmed.length < 2) {
      return {
        isValid: false,
        error: 'Location must be at least 2 characters long'
      };
    }

    if (trimmed.length > 200) {
      return {
        isValid: false,
        error: 'Location must not exceed 200 characters'
      };
    }

    // Basic validation for valid characters
    const validPattern = /^[a-zA-Z0-9\s\-.,()]+$/;
    if (!validPattern.test(trimmed)) {
      return {
        isValid: false,
        error: 'Location contains invalid characters'
      };
    }

    return {
      isValid: true,
      location: trimmed
    };
  }

  /**
   * Validate radius input
   * @param {number} radius - Radius to validate
   * @returns {Object} - Validation result
   */
  validateRadius(radius) {
    const numRadius = parseFloat(radius);
    
    if (isNaN(numRadius)) {
      return {
        isValid: false,
        error: 'Radius must be a valid number'
      };
    }

    if (numRadius <= 0) {
      return {
        isValid: false,
        error: 'Radius must be greater than 0'
      };
    }

    if (numRadius > 500) {
      return {
        isValid: false,
        error: 'Radius cannot exceed 500 km'
      };
    }

    return {
      isValid: true,
      radius: numRadius
    };
  }
}

export default new HospitalService();