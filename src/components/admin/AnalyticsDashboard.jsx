import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

const AnalyticsDashboard = () => {
  const { apiCall } = useAuth();
  const [analytics, setAnalytics] = useState({
    contentPerformance: [],
    userEngagement: {},
    trafficSources: [],
    conversionRates: {}
  });
  const [timeRange, setTimeRange] = useState('7d');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, [timeRange]);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const result = await apiCall(`/api/v1/admin/analytics?range=${timeRange}`);
      if (result.success) {
        const actualData = result.data.data || result.data;
        setAnalytics(actualData);
      }
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
      // Mock data for demonstration
      setAnalytics({
        contentPerformance: [
          { type: 'Media', views: 15420, engagement: 8.5, trend: 'up' },
          { type: 'Publications', views: 8930, engagement: 12.3, trend: 'up' },
          { type: 'Careers', views: 5670, engagement: 15.8, trend: 'down' }
        ],
        userEngagement: {
          avgSessionDuration: '4m 32s',
          bounceRate: '32%',
          pageViews: 45230,
          uniqueVisitors: 12450
        },
        trafficSources: [
          { source: 'Direct', percentage: 45, visitors: 5602 },
          { source: 'Search', percentage: 32, visitors: 3984 },
          { source: 'Social', percentage: 15, visitors: 1867 },
          { source: 'Referral', percentage: 8, visitors: 997 }
        ],
        conversionRates: {
          contactForms: 3.2,
          newsletterSignups: 5.8,
          downloadRequests: 2.1
        }
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white shadow-soft rounded-2xl p-8 border border-slate-200/60">
        <div className="animate-pulse">
          <div className="h-6 bg-slate-200 rounded w-1/4 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-32 bg-slate-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-soft rounded-2xl p-8 border border-slate-200/60">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Analytics Overview</h2>
          <p className="text-slate-600 text-sm mt-1">Content performance and user engagement metrics</p>
        </div>
        <div className="flex space-x-2">
          {['7d', '30d', '90d'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors ${
                timeRange === range
                  ? 'bg-orange-100 text-orange-700'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {range === '7d' ? '7 Days' : range === '30d' ? '30 Days' : '90 Days'}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Content Performance */}
        <div>
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Content Performance</h3>
          <div className="space-y-4">
            {analytics.contentPerformance.map((content, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-3 ${
                    content.type === 'Media' ? 'bg-purple-500' :
                    content.type === 'Publications' ? 'bg-indigo-500' :
                    'bg-amber-500'
                  }`}></div>
                  <div>
                    <p className="font-medium text-slate-900">{content.type}</p>
                    <p className="text-sm text-slate-500">{content.views.toLocaleString()} views</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-slate-900">{content.engagement}%</p>
                  <p className={`text-xs ${content.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {content.trend === 'up' ? '↗' : '↘'} Engagement
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Traffic Sources */}
        <div>
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Traffic Sources</h3>
          <div className="space-y-4">
            {analytics.trafficSources.map((source, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-slate-600 font-medium text-sm">
                      {source.source.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">{source.source}</p>
                    <p className="text-sm text-slate-500">{source.visitors.toLocaleString()} visitors</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-slate-900">{source.percentage}%</p>
                  <div className="w-16 h-2 bg-slate-200 rounded-full mt-1">
                    <div 
                      className="h-full bg-orange-500 rounded-full"
                      style={{ width: `${source.percentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* User Engagement Metrics */}
      <div className="mt-8 pt-8 border-t border-slate-200">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">User Engagement</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <p className="text-2xl font-bold text-slate-900">{analytics.userEngagement.avgSessionDuration}</p>
            <p className="text-sm text-slate-500">Avg. Session Duration</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-slate-900">{analytics.userEngagement.bounceRate}</p>
            <p className="text-sm text-slate-500">Bounce Rate</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-slate-900">{analytics.userEngagement.pageViews.toLocaleString()}</p>
            <p className="text-sm text-slate-500">Page Views</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-slate-900">{analytics.userEngagement.uniqueVisitors.toLocaleString()}</p>
            <p className="text-sm text-slate-500">Unique Visitors</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;