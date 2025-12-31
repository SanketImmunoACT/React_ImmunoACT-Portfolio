import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

const AdminDashboard = () => {
  const { user, apiCall, isSuperAdmin, isOfficeExecutive, isHRManager } = useAuth();
  const [stats, setStats] = useState({
    users: { total: 0, active: 0 },
    contacts: { total: 0, pending: 0 },
    media: { total: 0, published: 0 },
    publications: { total: 0, published: 0 },
    careers: { total: 0, active: 0 }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    setLoading(true);
    
    // Fetch different stats based on user role
    const promises = [];
    
    if (isSuperAdmin) {
      promises.push(
        apiCall('/api/v1/users/stats'),
        apiCall('/api/v1/media/stats'),
        apiCall('/api/v1/publications/stats'),
        apiCall('/api/v1/careers/stats')
      );
    } else if (isOfficeExecutive) {
      promises.push(
        apiCall('/api/v1/media/stats'),
        apiCall('/api/v1/publications/stats')
      );
    } else if (isHRManager) {
      promises.push(
        apiCall('/api/v1/careers/stats')
      );
    }
    
    try {
      const results = await Promise.allSettled(promises);
      
      if (isSuperAdmin) {
        if (results[0]?.value?.success) {
          setStats(prev => ({ ...prev, users: results[0].value.data }));
        }
        if (results[1]?.value?.success) {
          setStats(prev => ({ ...prev, media: results[1].value.data }));
        }
        if (results[2]?.value?.success) {
          setStats(prev => ({ ...prev, publications: results[2].value.data }));
        }
        if (results[3]?.value?.success) {
          setStats(prev => ({ ...prev, careers: results[3].value.data }));
        }
      } else if (isOfficeExecutive) {
        if (results[0]?.value?.success) {
          setStats(prev => ({ ...prev, media: results[0].value.data }));
        }
        if (results[1]?.value?.success) {
          setStats(prev => ({ ...prev, publications: results[1].value.data }));
        }
      } else if (isHRManager) {
        if (results[0]?.value?.success) {
          setStats(prev => ({ ...prev, careers: results[0].value.data }));
        }
      }
    } catch (error) {
      console.error('Failed to fetch dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRoleBasedWelcome = () => {
    if (isSuperAdmin) return 'Super Administrator';
    if (isOfficeExecutive) return 'Office Executive';
    if (isHRManager) return 'HR Manager';
    return 'Administrator';
  };

  const getQuickActions = () => {
    const actions = [];
    
    if (isOfficeExecutive || isSuperAdmin) {
      actions.push(
        { 
          name: 'Add Media Article', 
          href: '/admin/media/new', 
          icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
          ), 
          gradient: 'from-blue-500 to-blue-600',
          description: 'Create new media content'
        },
        { 
          name: 'Add Publication', 
          href: '/admin/publications/new', 
          icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          ), 
          gradient: 'from-emerald-500 to-emerald-600',
          description: 'Publish research papers'
        }
      );
    }
    
    if (isHRManager || isSuperAdmin) {
      actions.push(
        { 
          name: 'Post New Job', 
          href: '/admin/careers/new', 
          icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          ), 
          gradient: 'from-purple-500 to-purple-600',
          description: 'Create job openings'
        }
      );
    }
    
    if (isSuperAdmin) {
      actions.push(
        { 
          name: 'Add User', 
          href: '/admin/users/new', 
          icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          ), 
          gradient: 'from-orange-500 to-orange-600',
          description: 'Manage system users'
        }
      );
    }
    
    actions.push(
      { 
        name: 'View Contacts', 
        href: '/admin/contacts', 
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        ), 
        gradient: 'from-slate-500 to-slate-600',
        description: 'Review inquiries'
      }
    );
    
    return actions;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="relative">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-slate-200"></div>
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent absolute top-0 left-0"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-white via-orange-50/30 to-orange-100/50 shadow-soft rounded-2xl p-8 border border-orange-100/50">
        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-gradient-to-br from-orange-400/20 to-orange-600/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-32 h-32 bg-gradient-to-tr from-orange-300/10 to-orange-500/10 rounded-full blur-2xl"></div>
        <div className="relative">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">
                Welcome back, {user?.firstName}! 👋
              </h1>
              <p className="text-slate-600 text-lg">
                {getRoleBasedWelcome()} Dashboard
              </p>
              <div className="mt-4 flex items-center space-x-4 text-sm text-slate-500">
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 9l6-6m0 0v6m0-6H6" />
                  </svg>
                  Last login: {new Date().toLocaleDateString()}
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                  System Status: Online
                </div>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-medium">
                {user?.firstName?.[0]}{user?.lastName?.[0]}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {isSuperAdmin && (
          <>
            <StatCard
              title="Total Users"
              value={stats.users.totalUsers || 0}
              subtitle={`${stats.users.activeUsers || 0} active`}
              icon={(
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              )}
              gradient="from-blue-500 to-blue-600"
              trend="+12%"
              trendUp={true}
            />
            <StatCard
              title="User Roles"
              value={stats.users.roleDistribution?.length || 3}
              subtitle="Different roles"
              icon={(
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              )}
              gradient="from-emerald-500 to-emerald-600"
              trend="Stable"
              trendUp={true}
            />
          </>
        )}
        
        {(isOfficeExecutive || isSuperAdmin) && (
          <>
            <StatCard
              title="Media Articles"
              value={stats.media.totalMedia || 0}
              subtitle={`${stats.media.publishedMedia || 0} published`}
              icon={(
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              )}
              gradient="from-purple-500 to-purple-600"
              trend="+8%"
              trendUp={true}
            />
            <StatCard
              title="Publications"
              value={stats.publications.totalPublications || 0}
              subtitle={`${stats.publications.publishedPublications || 0} published`}
              icon={(
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              )}
              gradient="from-indigo-500 to-indigo-600"
              trend="+15%"
              trendUp={true}
            />
          </>
        )}
        
        {(isHRManager || isSuperAdmin) && (
          <StatCard
            title="Job Postings"
            value={stats.careers.totalCareers || 0}
            subtitle={`${stats.careers.activeCareers || 0} active`}
            icon={(
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            )}
            gradient="from-amber-500 to-amber-600"
            trend="+5%"
            trendUp={true}
          />
        )}
        
        <StatCard
          title="Contact Forms"
          value={stats.contacts.total || 0}
          subtitle={`${stats.contacts.pending || 0} pending`}
          icon={(
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          )}
          gradient="from-rose-500 to-rose-600"
          trend="+23%"
          trendUp={true}
        />
      </div>

      {/* Quick Actions */}
      <div className="bg-white shadow-soft rounded-2xl p-8 border border-slate-200/60">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Quick Actions</h2>
            <p className="text-slate-600 text-sm mt-1">Frequently used actions for faster workflow</p>
          </div>
          <div className="h-10 w-10 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl flex items-center justify-center">
            <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {getQuickActions().map((action, index) => (
            <a
              key={action.name}
              href={action.href}
              className="group relative overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100/50 hover:from-white hover:to-slate-50 border border-slate-200/60 rounded-xl p-6 transition-all duration-300 hover:shadow-medium hover:-translate-y-1 animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center">
                <div className={`flex-shrink-0 w-12 h-12 bg-gradient-to-br ${action.gradient || 'from-slate-400 to-slate-600'} rounded-xl flex items-center justify-center text-white shadow-medium group-hover:scale-110 transition-transform duration-300`}>
                  {action.icon}
                </div>
                <div className="ml-4 flex-1">
                  <p className="font-semibold text-slate-900 group-hover:text-slate-800 transition-colors">
                    {action.name}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    {action.description}
                  </p>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-white/20 to-transparent rounded-full -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-500"></div>
            </a>
          ))}
        </div>
      </div>

      {/* Recent Activity & System Status */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="xl:col-span-2 bg-white shadow-soft rounded-2xl p-8 border border-slate-200/60">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Recent Activity</h2>
              <p className="text-slate-600 text-sm mt-1">Latest system activities and updates</p>
            </div>
            <button className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {[
              { action: 'New user registered', user: 'John Doe', time: '2 minutes ago', type: 'user' },
              { action: 'Media article published', user: 'Admin', time: '15 minutes ago', type: 'media' },
              { action: 'Contact form submitted', user: 'Jane Smith', time: '1 hour ago', type: 'contact' },
              { action: 'Job posting updated', user: 'HR Manager', time: '2 hours ago', type: 'career' },
            ].map((activity, index) => (
              <div key={index} className="flex items-center p-4 bg-slate-50/50 rounded-xl hover:bg-slate-100/50 transition-colors animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  activity.type === 'user' ? 'bg-blue-100 text-blue-600' :
                  activity.type === 'media' ? 'bg-purple-100 text-purple-600' :
                  activity.type === 'contact' ? 'bg-rose-100 text-rose-600' :
                  'bg-amber-100 text-amber-600'
                }`}>
                  {activity.type === 'user' ? '👤' : activity.type === 'media' ? '📰' : activity.type === 'contact' ? '📧' : '💼'}
                </div>
                <div className="ml-4 flex-1">
                  <p className="text-sm font-medium text-slate-900">{activity.action}</p>
                  <p className="text-xs text-slate-500">by {activity.user} • {activity.time}</p>
                </div>
                <div className="w-2 h-2 bg-slate-300 rounded-full"></div>
              </div>
            ))}
          </div>
        </div>

        {/* System Status */}
        <div className="bg-white shadow-soft rounded-2xl p-8 border border-slate-200/60">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900">System Status</h2>
              <p className="text-slate-600 text-sm mt-1">Current system health</p>
            </div>
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          </div>
          <div className="space-y-4">
            {[
              { name: 'API Server', status: 'Operational', uptime: '99.9%', color: 'green' },
              { name: 'Database', status: 'Operational', uptime: '99.8%', color: 'green' },
              { name: 'File Storage', status: 'Operational', uptime: '100%', color: 'green' },
              { name: 'Email Service', status: 'Degraded', uptime: '95.2%', color: 'yellow' },
            ].map((service, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-slate-50/50 rounded-lg animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="flex items-center">
                  <div className={`w-2 h-2 rounded-full mr-3 ${
                    service.color === 'green' ? 'bg-green-500' : 'bg-yellow-500'
                  }`}></div>
                  <span className="text-sm font-medium text-slate-900">{service.name}</span>
                </div>
                <div className="text-right">
                  <div className={`text-xs font-medium ${
                    service.color === 'green' ? 'text-green-600' : 'text-yellow-600'
                  }`}>
                    {service.status}
                  </div>
                  <div className="text-xs text-slate-500">{service.uptime}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, subtitle, icon, gradient, trend, trendUp }) => (
  <div className="group relative overflow-hidden bg-white shadow-soft hover:shadow-medium rounded-2xl p-6 border border-slate-200/60 transition-all duration-300 hover:-translate-y-1 animate-slide-up">
    <div className="flex items-center justify-between">
      <div className="flex-1">
        <div className="flex items-center justify-between mb-4">
          <div className={`w-12 h-12 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center text-white shadow-medium group-hover:scale-110 transition-transform duration-300`}>
            {icon}
          </div>
          {trend && (
            <div className={`flex items-center text-xs font-medium px-2 py-1 rounded-full ${
              trendUp ? 'text-green-700 bg-green-100' : 'text-red-700 bg-red-100'
            }`}>
              <svg className={`w-3 h-3 mr-1 ${trendUp ? '' : 'rotate-180'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l9.2-9.2M17 17V7H7" />
              </svg>
              {trend}
            </div>
          )}
        </div>
        <div>
          <h3 className="text-sm font-medium text-slate-600 mb-1">{title}</h3>
          <div className="text-2xl font-bold text-slate-900 mb-1">{value.toLocaleString()}</div>
          {subtitle && (
            <p className="text-sm text-slate-500">{subtitle}</p>
          )}
        </div>
      </div>
    </div>
    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-white/10 to-transparent rounded-full -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-500"></div>
  </div>
);

export default AdminDashboard;