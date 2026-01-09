// Simple connection test utility
export const testBackendConnection = async () => {
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  
  try {
    const response = await fetch(`${API_URL}/api/v1/contact/health`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      mode: 'cors'
    });
    
    if (response.ok) {
      const data = await response.json();
      return {
        success: true,
        status: data.status,
        services: data.services
      };
    } else {
      return {
        success: false,
        error: `HTTP ${response.status}`
      };
    }
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
};