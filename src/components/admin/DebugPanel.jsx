import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import toast from 'react-hot-toast';

const DebugPanel = () => {
  const { testConnection, apiCall } = useAuth();
  const [debugInfo, setDebugInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  const runConnectionTest = async () => {
    setLoading(true);
    try {
      const result = await testConnection();
      setDebugInfo({
        connectionTest: result,
        timestamp: new Date().toISOString()
      });
      
      if (result) {
        toast.success('Backend connection successful!');
      } else {
        toast.error('Backend connection failed!');
      }
    } catch (error) {
      setDebugInfo({
        connectionTest: false,
        error: error.message,
        timestamp: new Date().toISOString()
      });
      toast.error('Connection test failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const clearRateLimits = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/dev/clear-rate-limits');
      if (response.ok) {
        toast.success('Rate limits cleared successfully!');
      } else {
        toast.error('Failed to clear rate limits');
      }
    } catch (error) {
      toast.error('Error clearing rate limits: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const testApiCall = async () => {
    setLoading(true);
    try {
      const result = await apiCall('/api/v1/contact/health');
      setDebugInfo({
        apiTest: result,
        timestamp: new Date().toISOString()
      });
      
      if (result.success) {
        toast.success('API call successful!');
      } else {
        toast.error('API call failed: ' + result.error);
      }
    } catch (error) {
      setDebugInfo({
        apiTest: false,
        error: error.message,
        timestamp: new Date().toISOString()
      });
      toast.error('API test failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Only show in development
  if (import.meta.env.VITE_NODE_ENV === 'production') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white border border-gray-300 rounded-lg shadow-lg p-4 max-w-sm z-50">
      <h3 className="text-sm font-semibold text-gray-900 mb-3">Debug Panel</h3>
      
      <div className="space-y-2">
        <button
          onClick={runConnectionTest}
          disabled={loading}
          className="w-full px-3 py-2 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? 'Testing...' : 'Test Connection'}
        </button>
        
        <button
          onClick={testApiCall}
          disabled={loading}
          className="w-full px-3 py-2 text-xs bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
        >
          {loading ? 'Testing...' : 'Test API Call'}
        </button>
        
        <button
          onClick={clearRateLimits}
          disabled={loading}
          className="w-full px-3 py-2 text-xs bg-orange-500 text-white rounded hover:bg-orange-600 disabled:opacity-50"
        >
          {loading ? 'Clearing...' : 'Clear Rate Limits'}
        </button>
      </div>
      
      {debugInfo && (
        <div className="mt-3 p-2 bg-gray-100 rounded text-xs">
          <pre className="whitespace-pre-wrap">
            {JSON.stringify(debugInfo, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default DebugPanel;