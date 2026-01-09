import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useDebounceSearch } from '@/hooks/useDebounceSearch';
import toast from 'react-hot-toast';

const ReferralManagement = () => {
  const { apiCall, user, token } = useAuth();
  const { searchInput, debouncedSearch, isSearching, setSearchInput, clearSearch } = useDebounceSearch();
  const [referrals, setReferrals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    department: '',
    urgency: ''
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0
  });
  const [selectedReferral, setSelectedReferral] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [stats, setStats] = useState({
    totalReferrals: 0,
    pendingReferrals: 0,
    underReviewReferrals: 0,
    approvedReferrals: 0,
    convertedReferrals: 0,
    urgentReferrals: 0
  });

  // Simple direct data fetching
  const loadData = async () => {
    setLoading(true);
    
    try {
      // Fetch referrals
      const referralsResult = await apiCall('/api/v1/job-referrals?page=1&limit=10');
      
      if (referralsResult?.success && referralsResult?.data?.data?.referrals) {
        setReferrals(referralsResult.data.data.referrals);
        setPagination(referralsResult.data.data.pagination || {
          currentPage: 1,
          totalPages: 1,
          totalItems: 0,
          hasNext: false,
          hasPrev: false
        });
      }
      
      // Fetch stats
      const statsResult = await apiCall('/api/v1/job-referrals/stats');
      if (statsResult?.success && statsResult?.data) {
        setStats(statsResult.data);
      }
      
    } catch (error) {
      console.error('Error loading referral data:', error);
      setError('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  // Load data on mount
  useEffect(() => {
    loadData();
  }, []);

  // Update search filter when debounced search changes
  useEffect(() => {
    setFilters(prev => ({ ...prev, search: debouncedSearch }));
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  }, [debouncedSearch]);

  const fetchReferrals = async () => {
    await loadData();
  };

  const fetchStats = async () => {
    await loadData();
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  const handleStatusUpdate = async (referralId, newStatus, hrNotes = '', priority = 'Medium') => {
    try {
      const result = await apiCall(`/api/v1/job-referrals/${referralId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          status: newStatus,
          hrNotes,
          priority
        })
      });

      if (result.success) {
        toast.success('Referral status updated successfully');
        fetchReferrals();
        fetchStats();
        setShowDetailsModal(false);
      } else {
        toast.error(result.error || 'Failed to update status');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update status');
    }
  };

  const handleConvertToJob = async (referralId) => {
    if (!confirm('Are you sure you want to convert this referral to a job posting?')) return;

    try {
      const result = await apiCall(`/api/v1/job-referrals/${referralId}/convert`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          // You can customize the job data here if needed
        })
      });

      if (result.success) {
        toast.success('Referral converted to job posting successfully');
        fetchReferrals();
        fetchStats();
        setShowDetailsModal(false);
      } else {
        toast.error(result.error || 'Failed to convert referral');
      }
    } catch (error) {
      console.error('Error converting referral:', error);
      toast.error('Failed to convert referral');
    }
  };

  const handleDelete = async (referralId) => {
    if (!confirm('Are you sure you want to delete this referral?')) return;

    try {
      const result = await apiCall(`/api/v1/job-referrals/${referralId}`, {
        method: 'DELETE'
      });

      if (result.success) {
        toast.success('Referral deleted successfully');
        fetchReferrals();
        fetchStats();
      } else {
        toast.error(result.error || 'Failed to delete referral');
      }
    } catch (error) {
      console.error('Error deleting referral:', error);
      toast.error('Failed to delete referral');
    }
  };

  const getStatusBadge = (status) => {
    const colors = {
      'Pending': 'bg-yellow-100 text-yellow-800 border border-yellow-200',
      'Under Review': 'bg-blue-100 text-blue-800 border border-blue-200',
      'Approved': 'bg-green-100 text-green-800 border border-green-200',
      'Rejected': 'bg-red-100 text-red-800 border border-red-200',
      'Converted to Job': 'bg-purple-100 text-purple-800 border border-purple-200'
    };
    return `inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full ${colors[status] || 'bg-gray-100 text-gray-800 border border-gray-200'}`;
  };

  const getUrgencyBadge = (urgency) => {
    const colors = {
      'Low': 'bg-gray-100 text-gray-800',
      'Medium': 'bg-blue-100 text-blue-800',
      'High': 'bg-orange-100 text-orange-800',
      'Urgent': 'bg-red-100 text-red-800'
    };
    return `inline-flex items-center px-2 py-1 text-xs font-medium rounded ${colors[urgency] || 'bg-gray-100 text-gray-800'}`;
  };

  if (loading && referrals.length === 0) {
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
      {/* Header with Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Referral Management</h1>
          <p className="text-slate-600 mt-1">Manage employee job referrals and candidate recommendations</p>
        </div>
        <div className="flex items-center space-x-4">
          {/* Test Button - Only show in development */}
          {import.meta.env.VITE_NODE_ENV === 'development' && (
            <div className="flex items-center space-x-2">
              <button
                onClick={async () => {
                  console.log('=== SETTING UP REFERRALS TABLE ===');
                  const setupResult = await apiCall('/api/v1/setup/referrals-table', {
                    method: 'POST'
                  });
                  console.log('Setup Result:', setupResult);
                  if (setupResult.success) {
                    toast.success('Referrals table created successfully!');
                    fetchReferrals();
                    fetchStats();
                  } else {
                    toast.error('Failed to setup table: ' + setupResult.error);
                  }
                }}
                className="px-3 py-1 bg-green-200 hover:bg-green-300 text-green-800 rounded-lg text-xs font-medium"
              >
                Setup Table
              </button>
              <button
                onClick={async () => {
                  console.log('=== MANUAL REFERRAL API TEST ===');
                  const statsResult = await apiCall('/api/v1/job-referrals/stats');
                  console.log('Stats Result:', statsResult);
                  const referralsResult = await apiCall('/api/v1/job-referrals?limit=5');
                  console.log('Referrals Result:', referralsResult);
                }}
                className="px-3 py-1 bg-yellow-200 hover:bg-yellow-300 text-yellow-800 rounded-lg text-xs font-medium"
              >
                Test API
              </button>
            </div>
          )}
          <div className="flex items-center space-x-4 text-sm">
            <div className="bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-soft">
              <span className="text-slate-500">Total:</span>
              <span className="font-semibold text-slate-900 ml-1">{stats?.totalReferrals || 0}</span>
            </div>
            <div className="bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-soft">
              <span className="text-slate-500">Pending:</span>
              <span className="font-semibold text-yellow-600 ml-1">{stats?.pendingReferrals || 0}</span>
            </div>
            <div className="bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-soft">
              <span className="text-slate-500">Converted:</span>
              <span className="font-semibold text-purple-600 ml-1">{stats?.convertedReferrals || 0}</span>
            </div>
            <div className="bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-soft">
              <span className="text-slate-500">Urgent:</span>
              <span className="font-semibold text-red-600 ml-1">{stats?.urgentReferrals || 0}</span>
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-50/80 backdrop-blur-sm border border-red-200/60 text-red-700 px-4 py-3 rounded-xl animate-slide-down">
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {error}
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white shadow-soft rounded-2xl p-6 border border-slate-200/60">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                {isSearching ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-slate-300 border-t-orange-500"></div>
                ) : (
                  <svg className="h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                )}
              </div>
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search referrals..."
                className="w-full pl-10 pr-3 py-2.5 border border-slate-300/60 rounded-xl bg-white/50 backdrop-blur-sm placeholder-slate-400 text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all duration-200"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Status
            </label>
            <select
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              className="w-full px-3 py-2.5 border border-slate-300/60 rounded-xl bg-white/50 backdrop-blur-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all duration-200"
            >
              <option value="">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Under Review">Under Review</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
              <option value="Converted to Job">Converted to Job</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Department
            </label>
            <select
              value={filters.department}
              onChange={(e) => handleFilterChange('department', e.target.value)}
              className="w-full px-3 py-2.5 border border-slate-300/60 rounded-xl bg-white/50 backdrop-blur-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all duration-200"
            >
              <option value="">All Departments</option>
              <option value="Research & Development">Research & Development</option>
              <option value="Clinical Affairs">Clinical Affairs</option>
              <option value="Manufacturing">Manufacturing</option>
              <option value="Quality Assurance">Quality Assurance</option>
              <option value="Regulatory Affairs">Regulatory Affairs</option>
              <option value="Business Development">Business Development</option>
              <option value="Marketing">Marketing</option>
              <option value="Human Resources">Human Resources</option>
              <option value="Finance">Finance</option>
              <option value="IT">IT</option>
              <option value="Operations">Operations</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Urgency
            </label>
            <select
              value={filters.urgency}
              onChange={(e) => handleFilterChange('urgency', e.target.value)}
              className="w-full px-3 py-2.5 border border-slate-300/60 rounded-xl bg-white/50 backdrop-blur-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all duration-200"
            >
              <option value="">All Urgency</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Urgent">Urgent</option>
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={() => {
                clearSearch();
                setFilters({ search: '', status: '', department: '', urgency: '' });
                setPagination(prev => ({ ...prev, currentPage: 1 }));
              }}
              className="px-4 py-2.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors font-medium"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Referrals List */}
      <div className="bg-white shadow-soft rounded-2xl overflow-hidden border border-slate-200/60">
        <div className="">
          <table className="min-w-full divide-y divide-slate-200/60">
            <thead className="bg-gradient-to-r from-slate-50 to-slate-100/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Job Details
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Referrer
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Urgency
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200/60">
              {Array.isArray(referrals) && referrals.map((referral, index) => (
                <tr key={referral.id} className="hover:bg-slate-50/50 transition-colors animate-slide-up" style={{ animationDelay: `${index * 50}ms` }}>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-semibold text-slate-900">
                        {referral.jobTitle}
                      </div>
                      <div className="text-sm text-slate-500">
                        {referral.department} • {referral.location}
                      </div>
                      <div className="text-xs text-slate-400">
                        {referral.employmentType} • {referral.experienceLevel}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-slate-900">
                      {referral.referrerName}
                    </div>
                    <div className="text-sm text-slate-500">
                      {referral.referrerEmail}
                    </div>
                    {referral.referrerDepartment && (
                      <div className="text-xs text-slate-400">
                        {referral.referrerDepartment}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className={getStatusBadge(referral.status)}>
                      {referral.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={getUrgencyBadge(referral.urgency)}>
                      {referral.urgency}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-slate-900">
                      {new Date(referral.createdAt).toLocaleDateString()}
                    </div>
                    <div className="text-xs text-slate-500">
                      {new Date(referral.createdAt).toLocaleTimeString()}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => {
                          setSelectedReferral(referral);
                          setShowDetailsModal(true);
                        }}
                        className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors"
                      >
                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        View
                      </button>
                      {referral.status === 'Approved' && (
                        <button
                          onClick={() => handleConvertToJob(referral.id)}
                          className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-purple-700 bg-purple-100 hover:bg-purple-200 rounded-lg transition-colors"
                        >
                          <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                          </svg>
                          Convert
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(referral.id)}
                        className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-red-700 bg-red-100 hover:bg-red-200 rounded-lg transition-colors"
                      >
                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-slate-200/60">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => setPagination(prev => ({ ...prev, currentPage: prev.currentPage - 1 }))}
                disabled={!pagination.hasPrev}
                className="relative inline-flex items-center px-4 py-2 border border-slate-300 text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50 disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={() => setPagination(prev => ({ ...prev, currentPage: prev.currentPage + 1 }))}
                disabled={!pagination.hasNext}
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-slate-300 text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50 disabled:opacity-50"
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-slate-700">
                  Showing page {pagination.currentPage} of {pagination.totalPages} ({pagination.totalItems} total)
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                  <button
                    onClick={() => setPagination(prev => ({ ...prev, currentPage: prev.currentPage - 1 }))}
                    disabled={!pagination.hasPrev}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-slate-300 bg-white text-sm font-medium text-slate-500 hover:bg-slate-50 disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setPagination(prev => ({ ...prev, currentPage: prev.currentPage + 1 }))}
                    disabled={!pagination.hasNext}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-slate-300 bg-white text-sm font-medium text-slate-500 hover:bg-slate-50 disabled:opacity-50"
                  >
                    Next
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}

        {Array.isArray(referrals) && referrals.length === 0 && !loading && (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
            </svg>
            <p className="text-slate-500 text-lg mt-4">No referrals found matching your criteria.</p>
            <button
              onClick={() => {
                clearSearch();
                setFilters({ search: '', status: '', department: '', urgency: '' });
                setPagination(prev => ({ ...prev, currentPage: 1 }));
              }}
              className="mt-4 text-orange-600 hover:text-orange-800 font-medium"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>

      {/* Details Modal */}
      {showDetailsModal && selectedReferral && (
        <ReferralDetailsModal
          referral={selectedReferral}
          onClose={() => setShowDetailsModal(false)}
          onStatusUpdate={handleStatusUpdate}
          onConvertToJob={handleConvertToJob}
        />
      )}
    </div>
  );
};

// Referral Details Modal Component
const ReferralDetailsModal = ({ referral, onClose, onStatusUpdate, onConvertToJob }) => {
  const [status, setStatus] = useState(referral.status);
  const [hrNotes, setHrNotes] = useState(referral.hrNotes || '');
  const [priority, setPriority] = useState(referral.priority || 'Medium');

  const handleSubmit = (e) => {
    e.preventDefault();
    onStatusUpdate(referral.id, status, hrNotes, priority);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Referral Details</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Job Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Job Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Job Title</label>
                <p className="mt-1 text-sm text-gray-900">{referral.jobTitle}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Department</label>
                <p className="mt-1 text-sm text-gray-900">{referral.department}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Location</label>
                <p className="mt-1 text-sm text-gray-900">{referral.location}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Employment Type</label>
                <p className="mt-1 text-sm text-gray-900">{referral.employmentType}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Experience Level</label>
                <p className="mt-1 text-sm text-gray-900">{referral.experienceLevel}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Salary Range</label>
                <p className="mt-1 text-sm text-gray-900">{referral.salaryRange || 'Not specified'}</p>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Job Description</label>
                <p className="mt-1 text-sm text-gray-900 whitespace-pre-wrap">{referral.jobDescription}</p>
              </div>
            </div>
          </div>

          {/* Referrer Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Referrer Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <p className="mt-1 text-sm text-gray-900">{referral.referrerName}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <p className="mt-1 text-sm text-gray-900">{referral.referrerEmail}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <p className="mt-1 text-sm text-gray-900">{referral.referrerPhone || 'Not provided'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Department</label>
                <p className="mt-1 text-sm text-gray-900">{referral.referrerDepartment || 'Not specified'}</p>
              </div>
            </div>
          </div>

          {/* Candidate Information */}
          {(referral.candidateName || referral.candidateEmail) && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Candidate Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <p className="mt-1 text-sm text-gray-900">{referral.candidateName || 'Not provided'}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <p className="mt-1 text-sm text-gray-900">{referral.candidateEmail || 'Not provided'}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  <p className="mt-1 text-sm text-gray-900">{referral.candidatePhone || 'Not provided'}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Resume</label>
                  {referral.candidateResume ? (
                    <a
                      href={`${import.meta.env.VITE_API_URL}/${referral.candidateResume}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 text-sm text-blue-600 hover:text-blue-800"
                    >
                      Download Resume
                    </a>
                  ) : (
                    <p className="mt-1 text-sm text-gray-900">Not provided</p>
                  )}
                </div>
                {referral.candidateNotes && (
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Notes</label>
                    <p className="mt-1 text-sm text-gray-900 whitespace-pre-wrap">{referral.candidateNotes}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Status Update Form */}
          <form onSubmit={handleSubmit}>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Update Status</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="Pending">Pending</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">HR Notes</label>
                <textarea
                  value={hrNotes}
                  onChange={(e) => setHrNotes(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Add notes about this referral..."
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4 mt-6">
              {status === 'Approved' && (
                <button
                  type="button"
                  onClick={() => onConvertToJob(referral.id)}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Convert to Job
                </button>
              )}
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
              >
                Update Status
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReferralManagement;