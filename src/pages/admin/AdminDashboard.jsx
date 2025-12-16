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
        { name: 'Add Media Article', href: '/admin/media/new', icon: '📰', color: 'bg-blue-500' },
        { name: 'Add Publication', href: '/admin/publications/new', icon: '📚', color: 'bg-green-500' }
      );
    }
    
    if (isHRManager || isSuperAdmin) {
      actions.push(
        { name: 'Post New Job', href: '/admin/careers/new', icon: '💼', color: 'bg-purple-500' }
      );
    }
    
    if (isSuperAdmin) {
      actions.push(
        { name: 'Add User', href: '/admin/users/new', icon: '👤', color: 'bg-orange-500' }
      );
    }
    
    actions.push(
      { name: 'View Contacts', href: '/admin/contacts', icon: '📧', color: 'bg-gray-500' }
    );
    
    return actions;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {user?.firstName}!
        </h1>
        <p className="text-gray-600 mt-1">
          {getRoleBasedWelcome()} Dashboard
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {isSuperAdmin && (
          <>
            <StatCard
              title="Total Users"
              value={stats.users.totalUsers || 0}
              subtitle={`${stats.users.activeUsers || 0} active`}
              icon="👥"
              color="bg-blue-500"
            />
            <StatCard
              title="User Roles"
              value={stats.users.roleDistribution?.length || 0}
              subtitle="Different roles"
              icon="🔐"
              color="bg-green-500"
            />
          </>
        )}
        
        {(isOfficeExecutive || isSuperAdmin) && (
          <>
            <StatCard
              title="Media Articles"
              value={stats.media.totalMedia || 0}
              subtitle={`${stats.media.publishedMedia || 0} published`}
              icon="📰"
              color="bg-purple-500"
            />
            <StatCard
              title="Publications"
              value={stats.publications.totalPublications || 0}
              subtitle={`${stats.publications.publishedPublications || 0} published`}
              icon="📚"
              color="bg-indigo-500"
            />
          </>
        )}
        
        {(isHRManager || isSuperAdmin) && (
          <StatCard
            title="Job Postings"
            value={stats.careers.totalCareers || 0}
            subtitle={`${stats.careers.activeCareers || 0} active`}
            icon="💼"
            color="bg-yellow-500"
          />
        )}
        
        <StatCard
          title="Contact Forms"
          value={stats.contacts.total}
          subtitle={`${stats.contacts.pending} pending`}
          icon="📧"
          color="bg-red-500"
        />
      </div>

      {/* Quick Actions */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {getQuickActions().map((action) => (
            <a
              key={action.name}
              href={action.href}
              className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className={`flex-shrink-0 w-10 h-10 ${action.color} rounded-lg flex items-center justify-center text-white text-lg`}>
                {action.icon}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">{action.name}</p>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Recent Activity - Placeholder for now */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h2>
        <div className="text-gray-500 text-center py-8">
          <p>Recent activity will be displayed here</p>
          <p className="text-sm mt-2">This feature will be implemented with audit logs</p>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, subtitle, icon, color }) => (
  <div className="bg-white overflow-hidden shadow rounded-lg">
    <div className="p-5">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <div className={`w-8 h-8 ${color} rounded-md flex items-center justify-center text-white text-lg`}>
            {icon}
          </div>
        </div>
        <div className="ml-5 w-0 flex-1">
          <dl>
            <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
            <dd className="text-lg font-medium text-gray-900">{value}</dd>
            {subtitle && (
              <dd className="text-sm text-gray-500">{subtitle}</dd>
            )}
          </dl>
        </div>
      </div>
    </div>
  </div>
);

export default AdminDashboard;