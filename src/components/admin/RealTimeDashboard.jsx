import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

const RealTimeDashboard = () => {
  const { apiCall } = useAuth();
  const [realTimeData, setRealTimeData] = useState({
    activeUsers: 0,
    pendingActions: 0,
    systemAlerts: [],
    recentSubmissions: []
  });

  useEffect(() => {
    // Set up WebSocket connection for real-time updates
    const connectWebSocket = () => {
      const ws = new WebSocket(`${import.meta.env.VITE_WS_URL || 'ws://localhost:5000'}/admin-dashboard`);
      
      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        setRealTimeData(prev => ({
          ...prev,
          ...data
        }));
      };

      ws.onclose = () => {
        // Reconnect after 5 seconds
        setTimeout(connectWebSocket, 5000);
      };

      return ws;
    };

    const ws = connectWebSocket();
    
    // Fallback polling for real-time data
    const interval = setInterval(async () => {
      try {
        const result = await apiCall('/api/v1/admin/real-time-stats');
        if (result.success) {
          const actualData = result.data.data || result.data;
          setRealTimeData(actualData);
        }
      } catch (error) {
        console.error('Failed to fetch real-time data:', error);
      }
    }, 10000); // Poll every 10 seconds as fallback

    return () => {
      ws.close();
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-4 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-100 text-sm">Active Users</p>
            <p className="text-2xl font-bold">{realTimeData.activeUsers}</p>
          </div>
          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-4 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-orange-100 text-sm">Pending Actions</p>
            <p className="text-2xl font-bold">{realTimeData.pendingActions}</p>
          </div>
          {realTimeData.pendingActions > 0 && (
            <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
          )}
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-4 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-green-100 text-sm">System Health</p>
            <p className="text-2xl font-bold">98.5%</p>
          </div>
          <div className="w-3 h-3 bg-green-300 rounded-full animate-pulse"></div>
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-4 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-purple-100 text-sm">Today's Submissions</p>
            <p className="text-2xl font-bold">{realTimeData.recentSubmissions.length}</p>
          </div>
          <div className="w-3 h-3 bg-purple-300 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default RealTimeDashboard;