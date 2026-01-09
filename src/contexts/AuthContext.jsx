import { createContext, useContext, useState, useEffect } from 'react';

// Helper function to decode JWT token
const decodeToken = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

// Helper function to check if token is expired or will expire soon
const isTokenExpired = (token, bufferMinutes = 5) => {
  const decoded = decodeToken(token);
  if (!decoded || !decoded.exp) return true;
  
  const currentTime = Date.now() / 1000;
  const expirationTime = decoded.exp;
  const bufferTime = bufferMinutes * 60; // Convert minutes to seconds
  
  return currentTime >= (expirationTime - bufferTime);
};

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('adminToken'));
  const [tokenCheckInterval, setTokenCheckInterval] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  // Auto-logout function
  const autoLogout = (reason = 'Token expired') => {
    console.log(`Auto-logout triggered: ${reason}`);
    localStorage.removeItem('adminToken');
    setToken(null);
    setUser(null);
    
    // Clear the token check interval
    if (tokenCheckInterval) {
      clearInterval(tokenCheckInterval);
      setTokenCheckInterval(null);
    }
    
    // Redirect to login page
    window.location.href = '/admin/login';
  };

  // Setup token expiration monitoring
  const setupTokenMonitoring = (authToken) => {
    // Clear existing interval
    if (tokenCheckInterval) {
      clearInterval(tokenCheckInterval);
    }

    // Check token every minute
    const interval = setInterval(() => {
      if (!authToken || isTokenExpired(authToken)) {
        autoLogout('Token expired');
      }
    }, 60000); // Check every minute

    setTokenCheckInterval(interval);

    // Also check immediately if token is already expired
    if (isTokenExpired(authToken)) {
      autoLogout('Token already expired');
      return false;
    }

    return true;
  };

  // Check if user is authenticated on app load
  useEffect(() => {
    const checkAuth = async () => {
      const storedToken = localStorage.getItem('adminToken');
      
      if (!storedToken) {
        setLoading(false);
        return;
      }

      // Check if token is expired before making API call
      if (isTokenExpired(storedToken)) {
        console.log('Stored token is expired, removing it');
        localStorage.removeItem('adminToken');
        setToken(null);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${API_URL}/api/v1/auth/verify-token`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${storedToken}`,
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          mode: 'cors'
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
          setToken(storedToken);
          
          // Setup token monitoring for automatic logout
          setupTokenMonitoring(storedToken);
        } else {
          console.log('Token verification failed, removing token');
          localStorage.removeItem('adminToken');
          setToken(null);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        
        // Handle different types of errors
        if (error.message.includes('CORS') || error.message.includes('NetworkError')) {
          console.log('Network/CORS error during token verification, keeping token for retry');
          // Still setup monitoring even with network errors
          if (setupTokenMonitoring(storedToken)) {
            setToken(storedToken);
          }
        } else {
          localStorage.removeItem('adminToken');
          setToken(null);
        }
      } finally {
        setLoading(false);
      }
    };

    checkAuth();

    // Cleanup interval on unmount
    return () => {
      if (tokenCheckInterval) {
        clearInterval(tokenCheckInterval);
      }
    };
  }, [API_URL]);

  const login = async (credentials) => {
    try {
      const response = await fetch(`${API_URL}/api/v1/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Check if the received token is valid and not expired
      if (isTokenExpired(data.token)) {
        throw new Error('Received token is already expired');
      }

      // Store token and user data
      localStorage.setItem('adminToken', data.token);
      setToken(data.token);
      setUser(data.user);

      // Setup token monitoring for automatic logout
      setupTokenMonitoring(data.token);

      return { success: true, user: data.user };

    } catch (error) {
      console.error('Login error:', error);
      return { 
        success: false, 
        error: error.message || 'Login failed' 
      };
    }
  };

  const logout = async () => {
    try {
      if (token) {
        await fetch(`${API_URL}/api/v1/auth/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear local state regardless of API call success
      localStorage.removeItem('adminToken');
      setToken(null);
      setUser(null);
      
      // Clear the token check interval
      if (tokenCheckInterval) {
        clearInterval(tokenCheckInterval);
        setTokenCheckInterval(null);
      }
    }
  };

  const changePassword = async (passwordData) => {
    try {
      const response = await fetch(`${API_URL}/api/v1/auth/change-password`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(passwordData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Password change failed');
      }

      return { success: true, message: data.message };

    } catch (error) {
      console.error('Password change error:', error);
      return { 
        success: false, 
        error: error.message || 'Password change failed' 
      };
    }
  };

  // Helper function to make authenticated API calls
  const apiCall = async (endpoint, options = {}) => {
    const url = `${API_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...options.headers
      },
      ...options
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        // If unauthorized, logout user
        if (response.status === 401) {
          logout();
        }
        throw new Error(data.message || `HTTP ${response.status}`);
      }

      return { success: true, data };

    } catch (error) {
      console.error(`API call to ${endpoint} failed:`, error);
      return { 
        success: false, 
        error: error.message || 'API call failed' 
      };
    }
  };

  const value = {
    user,
    token,
    loading,
    isAuthenticated: !!user,
    login,
    logout,
    changePassword,
    apiCall,
    // Role-based access helpers
    isSuperAdmin: user?.role === 'super_admin',
    isOfficeExecutive: user?.role === 'office_executive',
    isHRManager: user?.role === 'hr_manager',
    hasRole: (roles) => {
      if (!user) return false;
      return Array.isArray(roles) ? roles.includes(user.role) : user.role === roles;
    }
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};