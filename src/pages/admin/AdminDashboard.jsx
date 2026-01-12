import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const { user, apiCall, isSuperAdmin, isOfficeExecutive, isHRManager } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    contacts: { total: 0, pending: 0 },
    media: { total: 0, published: 0 },
    publications: { total: 0, published: 0 },
    careers: { total: 0, active: 0 }
  });
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState({});

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    setLoading(true);

    // Fetch different stats based on user role
    const promises = [];

    if (isSuperAdmin) {
      promises.push(
        apiCall('/api/v1/media/stats'),
        apiCall('/api/v1/publications/stats'),
        apiCall('/api/v1/careers/stats'),
        apiCall('/api/v1/contact/admin/stats')
      );
    } else if (isOfficeExecutive) {
      promises.push(
        apiCall('/api/v1/media/stats'),
        apiCall('/api/v1/publications/stats'),
        apiCall('/api/v1/contact/admin/stats')
      );
    } else if (isHRManager) {
      promises.push(
        apiCall('/api/v1/careers/stats'),
        apiCall('/api/v1/contact/admin/stats')
      );
    }

    try {
      const results = await Promise.allSettled(promises);

      if (isSuperAdmin) {
        if (results[0]?.value?.success) {
          const actualData = results[0].value.data.data || results[0].value.data;
          setStats(prev => ({ ...prev, media: actualData }));
        }
        if (results[1]?.value?.success) {
          const actualData = results[1].value.data.data || results[1].value.data;
          setStats(prev => ({ ...prev, publications: actualData }));
        }
        if (results[2]?.value?.success) {
          const actualData = results[2].value.data.data || results[2].value.data;
          setStats(prev => ({ ...prev, careers: actualData }));
        }
        if (results[3]?.value?.success) {
          const actualData = results[3].value.data.data || results[3].value.data;
          setStats(prev => ({ ...prev, contacts: actualData }));
        }
      } else if (isOfficeExecutive) {
        if (results[0]?.value?.success) {
          const actualData = results[0].value.data.data || results[0].value.data;
          setStats(prev => ({ ...prev, media: actualData }));
        }
        if (results[1]?.value?.success) {
          const actualData = results[1].value.data.data || results[1].value.data;
          setStats(prev => ({ ...prev, publications: actualData }));
        }
        if (results[2]?.value?.success) {
          const actualData = results[2].value.data.data || results[2].value.data;
          setStats(prev => ({ ...prev, contacts: actualData }));
        }
      } else if (isHRManager) {
        if (results[0]?.value?.success) {
          const actualData = results[0].value.data.data || results[0].value.data;
          setStats(prev => ({ ...prev, careers: actualData }));
        }
        if (results[1]?.value?.success) {
          const actualData = results[1].value.data.data || results[1].value.data;
          setStats(prev => ({ ...prev, contacts: actualData }));
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

  // Dynamic action handlers
  const handleQuickAction = async (actionType) => {
    setActionLoading(prev => ({ ...prev, [actionType]: true }));

    try {
      switch (actionType) {
        case 'add-media':
          toast.success('Opening media creation...', {
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z" />
              </svg>
            ),
            duration: 2000
          });
          // Navigate to media management with create action
          navigate('/admin/media?action=create');
          break;

        case 'add-publication':
          toast.success('Opening publication creation...', {
            icon: (

              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
              </svg>
            ),
            duration: 2000
          });
          // Navigate to publications with create action
          navigate('/admin/publications?action=create');
          break;

        case 'post-job':
          toast.success('Opening job posting creation...', {
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.0" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" />
              </svg>

            ),
            duration: 2000
          });
          // Navigate to careers with create action
          navigate('/admin/careers?action=create');
          break;

        case 'view-contacts':
          toast.success('Loading recent contact inquiries...', {
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.0" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
              </svg>
            ),
            duration: 2000
          });
          // Navigate to contacts with pending filter
          navigate('/admin/contacts?status=pending');
          break;

        default:
          toast.error('Action not implemented yet');
      }
    } catch (error) {
      toast.error('Failed to perform action');
    } finally {
      setTimeout(() => {
        setActionLoading(prev => ({ ...prev, [actionType]: false }));
      }, 1500);
    }
  };

  const getQuickActions = () => {
    const actions = [];

    if (isOfficeExecutive || isSuperAdmin) {
      actions.push(
        {
          name: 'Add Media Article',
          actionType: 'add-media',
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
          actionType: 'add-publication',
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
          actionType: 'post-job',
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

    actions.push(
      {
        name: 'View Contacts',
        actionType: 'view-contacts',
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
                Welcome back, {user?.firstName}{user?.lastName}! 👋
              </h1>
              <p className="text-slate-600 text-lg">
                {getRoleBasedWelcome()} Dashboard
              </p>
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
        {(isOfficeExecutive || isSuperAdmin) && (
          <>
            <StatCard
              title="Media Articles"
              value={stats.media.totalMedia || 0}
              icon={(
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              )}
              gradient="from-purple-500 to-purple-600"
            />
            <StatCard
              title="Publications"
              value={stats.publications.totalPublications || 0}
              icon={(
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              )}
              gradient="from-indigo-500 to-indigo-600"
            />
          </>
        )}

        {(isHRManager || isSuperAdmin) && (
          <StatCard
            title="Job Postings"
            value={stats.careers.totalCareers || 0}
            icon={(
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            )}
            gradient="from-amber-500 to-amber-600"
          />
        )}

        <StatCard
          title="Contact Forms"
          value={stats.contacts?.totalSubmissions || 0}
          icon={(
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          )}
          gradient="from-rose-500 to-rose-600"
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
            <button
              key={action.name}
              onClick={() => handleQuickAction(action.actionType)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleQuickAction(action.actionType);
                }
              }}
              disabled={actionLoading[action.actionType]}
              className="group relative overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100/50 hover:from-white hover:to-slate-50 border border-slate-200/60 rounded-xl p-6 transition-all duration-300 hover:shadow-medium hover:-translate-y-1 animate-slide-up disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-left w-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
              style={{ animationDelay: `${index * 100}ms` }}
              aria-label={`${action.name} - ${action.description}`}
              title={actionLoading[action.actionType] ? 'Loading...' : `Click to ${action.description.toLowerCase()}`}
            >
              <div className="flex items-center">
                <div className={`flex-shrink-0 w-12 h-12 bg-gradient-to-br ${action.gradient || 'from-slate-400 to-slate-600'} rounded-xl flex items-center justify-center text-white shadow-medium group-hover:scale-110 transition-transform duration-300 ${actionLoading[action.actionType] ? 'animate-pulse' : ''}`}>
                  {actionLoading[action.actionType] ? (
                    <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
                  ) : (
                    action.icon
                  )}
                </div>
                <div className="ml-4 flex-1">
                  <p className="font-semibold text-slate-900 group-hover:text-slate-800 transition-colors">
                    {action.name}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    {actionLoading[action.actionType] ? 'Loading...' : action.description}
                  </p>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-white/20 to-transparent rounded-full -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-500"></div>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      {/* <div className="bg-white shadow-soft rounded-2xl p-8 border border-slate-200/60">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Recent Activity</h2>
            <p className="text-slate-600 text-sm mt-1">Latest system activities and updates</p>
          </div>
          <button
            onClick={() => window.location.href = '/admin/activity-log'}
            className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
          >
            View All
          </button>
        </div>
        <RecentActivityFeed />
      </div> */}
    </div>
  );
};

// New component for Recent Activity Feed
const RecentActivityFeed = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const { apiCall } = useAuth();

  useEffect(() => {
    fetchRecentActivity();
  }, []);

  const fetchRecentActivity = async () => {
    try {
      // Temporarily disabled - uncomment when backend is ready
      // const result = await apiCall('/api/v1/admin/recent-activity?limit=5');
      // if (result.success) {
      //   const actualData = result.data.data || result.data;
      //   setActivities(actualData.activities || []);
      // }
    } catch (error) {
      console.error('Failed to fetch recent activity:', error);
    } finally {
      // Use mock data for now
      setActivities([
        { action: 'New contact form submitted', user: 'System', time: '2 minutes ago', type: 'contact', id: 1 },
        { action: 'Media article published', user: 'Admin', time: '15 minutes ago', type: 'media', id: 2 },
        { action: 'Publication updated', user: 'Editor', time: '1 hour ago', type: 'publication', id: 3 },
        { action: 'Job posting created', user: 'HR Manager', time: '2 hours ago', type: 'career', id: 4 },
      ]);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="animate-pulse flex items-center p-4 bg-slate-50/50 rounded-xl">
            <div className="w-10 h-10 bg-slate-200 rounded-full"></div>
            <div className="ml-4 flex-1">
              <div className="h-4 bg-slate-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-slate-200 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {activities.map((activity, index) => (
        <div key={activity.id || index} className="flex items-center p-4 bg-slate-50/50 rounded-xl hover:bg-slate-100/50 transition-colors animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${activity.type === 'user' ? 'bg-blue-100 text-blue-600' :
            activity.type === 'media' ? 'bg-purple-100 text-purple-600' :
              activity.type === 'contact' ? 'bg-rose-100 text-rose-600' :
                activity.type === 'publication' ? 'bg-indigo-100 text-indigo-600' :
                  'bg-amber-100 text-amber-600'
            }`}>
            {activity.type === 'user' ? '👤' :
              activity.type === 'media' ? '📰' :
                activity.type === 'contact' ? '📧' :
                  activity.type === 'publication' ? '📚' :
                    '💼'}
          </div>
          <div className="ml-4 flex-1">
            <p className="text-sm font-medium text-slate-900">{activity.action}</p>
            <p className="text-xs text-slate-500">by {activity.user} • {activity.time}</p>
          </div>
          <div className="w-2 h-2 bg-slate-300 rounded-full"></div>
        </div>
      ))}
    </div>
  );
};

const StatCard = ({ title, value, icon, gradient }) => (
  <div className="group relative overflow-hidden bg-white shadow-soft hover:shadow-medium rounded-2xl p-6 border border-slate-200/60 transition-all duration-300 hover:-translate-y-1 animate-slide-up">
    <div className="flex items-center justify-between">
      <div className="flex-1">
        <div className="flex items-center mb-4">
          <div className={`w-12 h-12 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center text-white shadow-medium group-hover:scale-110 transition-transform duration-300`}>
            {icon}
          </div>
        </div>
        <div>
          <h3 className="text-sm font-medium text-slate-600 mb-1">{title}</h3>
          <div className="text-2xl font-bold text-slate-900">{value.toLocaleString()}</div>
        </div>
      </div>
    </div>
    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-white/10 to-transparent rounded-full -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-500"></div>
  </div>
);

export default AdminDashboard;