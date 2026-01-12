import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useDebounceSearch } from '@/hooks/useDebounceSearch';
import toast from 'react-hot-toast';

const ReferralManagement = () => {
  const { apiCall, user, token } = useAuth();
  const { searchInput, debouncedSearch, setSearchInput, clearSearch } = useDebounceSearch();
  const [referrals, setReferrals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingData, setLoadingData] = useState(false);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    department: ''
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0
  });
  const [selectedReferral, setSelectedReferral] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [openMenuId, setOpenMenuId] = useState(null);

  // Check authentication
  useEffect(() => {
    if (!user || !token) {
      window.location.href = '/admin/login';
      return;
    }
  }, [user, token]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.kebab-menu')) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Simple direct data fetching
  const loadData = async () => {
    if (loadingData) {
      return;
    }
    
    setLoadingData(true);
    setLoading(true);
    
    try {
      // Check authentication first
      if (!token || !user) {
        window.location.href = '/admin/login';
        return;
      }

      // Build query parameters for filtering
      const queryParams = new URLSearchParams({
        page: pagination.currentPage.toString(),
        limit: '10'
      });

      // Add filters if they exist
      if (filters.search) {
        queryParams.append('search', filters.search);
      }
      if (filters.status) {
        queryParams.append('status', filters.status);
      }
      if (filters.department) {
        queryParams.append('department', filters.department);
      }

      // Fetch referrals with filters
      const referralsResult = await apiCall(`/api/v1/job-referrals?${queryParams.toString()}`);
      
      if (referralsResult?.success && referralsResult?.data?.data?.referrals) {
        setReferrals(referralsResult.data.data.referrals);
        setPagination(referralsResult.data.data.pagination || {
          currentPage: 1,
          totalPages: 1,
          totalItems: 0,
          hasNext: false,
          hasPrev: false
        });
      } else if (referralsResult?.status === 401) {
        toast.error('Session expired. Please log in again.');
        setTimeout(() => {
          window.location.href = '/admin/login';
        }, 2000);
        return;
      }
      
    } catch (error) {
      setError('Failed to load data');
    } finally {
      setLoading(false);
      setLoadingData(false);
    }
  };

  // Load data on mount and when filters/pagination change (like JobApplicationsManagement)
  useEffect(() => {
    if (user && token) {
      loadData();
    }
  }, [user, token, filters.status, filters.search, filters.department, pagination.currentPage]);

  // Update search filter when debounced search changes
  useEffect(() => {
    setFilters(prev => ({ ...prev, search: debouncedSearch }));
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  }, [debouncedSearch]);

  const fetchReferrals = async () => {
    await loadData();
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPagination(prev => ({ ...prev, currentPage: 1 }));
    // Data will be automatically loaded by useEffect watching filters
  };

  const handleStatusUpdate = async (referralId, newStatus, hrNotes = '', priority = 'Medium') => {
    try {
      if (!token) {
        toast.error('Authentication required. Please log in again.');
        return;
      }

      if (!user) {
        toast.error('User information not available. Please refresh and try again.');
        return;
      }

      const result = await apiCall(`/api/v1/job-referrals/${referralId}/status`, {
        method: 'PUT',
        body: JSON.stringify({
          status: newStatus,
          hrNotes,
          priority
        })
      });

      if (result.success) {
        toast.success('Referral status updated successfully');
        fetchReferrals();
        setShowDetailsModal(false);
      } else {
        // Handle different types of errors
        if (result.status === 401 || result.needsReauth) {
          toast.error('Your session has expired. Please log in again.');
          // Show a confirmation dialog before redirecting
          if (confirm('Your session has expired. Would you like to go to the login page now?')) {
            logout();
            window.location.href = '/admin/login';
          }
        } else if (result.status === 403) {
          toast.error('Access denied. You do not have permission to update referral status.');
        } else {
          toast.error(result.error || 'Failed to update status');
        }
      }
    } catch (error) {
      toast.error('Failed to update status: ' + error.message);
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
      } else {
        toast.error(result.error || 'Failed to delete referral');
      }
    } catch (error) {
      toast.error('Failed to delete referral');
    }
  };

  const getStatusBadge = (status) => {
    const colors = {
      'Pending': 'bg-yellow-100 text-yellow-800 border border-yellow-200',
      'Under Review': 'bg-blue-100 text-blue-800 border border-blue-200',
      'Approved': 'bg-green-100 text-green-800 border border-green-200',
      'Rejected': 'bg-red-100 text-red-800 border border-red-200'
    };
    return `inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full ${colors[status] || 'bg-gray-100 text-gray-800 border border-gray-200'}`;
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
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Referral Management</h1>
          <p className="text-slate-600 mt-1">Manage employee job referrals and candidate recommendations</p>
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Search
            </label>
            <div className="relative">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => {
                  e.preventDefault();
                  setSearchInput(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                  }
                }}
                placeholder="Search referrals..."
                className="w-full px-3 py-2.5 border border-slate-300/60 rounded-xl bg-white/50 backdrop-blur-sm placeholder-slate-400 text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all duration-200"
              />
              {(loadingData || searchInput !== debouncedSearch) && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-orange-500 border-t-transparent"></div>
                </div>
              )}
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
          <div className="flex items-end">
            <div className="flex space-x-2">
            <button
              onClick={() => {
                clearSearch();
                setFilters({ search: '', status: '', department: '' });
                setPagination(prev => ({ ...prev, currentPage: 1 }));
              }}
              className="px-4 py-2 bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900 rounded-lg transition-all duration-200 font-medium border border-slate-200 text-sm"
            >
              Clear Filters
            </button>
              <button
                onClick={async () => {
                  try {
                    await loadData();
                    toast.success('Data refreshed successfully');
                  } catch (error) {
                    toast.error('Failed to refresh data');
                  }
                }}
                disabled={loadingData}
                className="px-4 py-2 bg-orange-100 text-orange-700 hover:bg-orange-200 hover:text-orange-900 rounded-lg transition-all duration-200 font-medium border border-orange-200 disabled:opacity-50 text-sm"
              >
                {loadingData ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-orange-500 border-t-transparent mr-2"></div>
                    Refreshing...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Refresh
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Referrals List */}
      <div className="bg-white shadow-soft rounded-2xl overflow-hidden border border-slate-200/60">
        <div className="">
          <table className="min-w-full divide-y divide-slate-200/60">
            <thead className="bg-gradient-to-r from-slate-50 to-slate-100/50">
              <tr>
                <th className="px-6 py-4 text-center text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Job Details
                </th>
                <th className="px-6 py-4 text-center text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Referrer
                </th>
                <th className="px-6 py-4 text-center text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-center text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-4 text-center text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200/60">
              {Array.isArray(referrals) && referrals.map((referral, index) => (
                <tr key={referral.id} className="hover:bg-slate-50/50 transition-colors animate-slide-up" style={{ animationDelay: `${index * 50}ms` }}>
                  <td className="px-6 py-4 text-center">
                    <div>
                      <div className="text-sm font-semibold text-slate-900">
                        {referral.jobTitle}
                      </div>
                      <div className="text-sm text-slate-500">
                        {referral.department}
                      </div>
                      <div className="text-xs text-slate-400">
                        {referral.employmentType} • {referral.experienceLevel}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
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
                  <td className="px-6 py-4 text-center">
                    <span className={getStatusBadge(referral.status)} style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      padding: '4px 12px',
                      fontSize: '12px',
                      fontWeight: '600',
                      borderRadius: '9999px',
                      backgroundColor: referral.status === 'Pending' ? '#fef3c7' : 
                                     referral.status === 'Under Review' ? '#dbeafe' :
                                     referral.status === 'Approved' ? '#d1fae5' :
                                     referral.status === 'Rejected' ? '#fee2e2' : '#f3f4f6',
                      color: referral.status === 'Pending' ? '#92400e' : 
                             referral.status === 'Under Review' ? '#1e40af' :
                             referral.status === 'Approved' ? '#065f46' :
                             referral.status === 'Rejected' ? '#991b1b' : '#374151',
                      border: '1px solid',
                      borderColor: referral.status === 'Pending' ? '#fcd34d' : 
                                   referral.status === 'Under Review' ? '#60a5fa' :
                                   referral.status === 'Approved' ? '#34d399' :
                                   referral.status === 'Rejected' ? '#f87171' : '#d1d5db'
                    }}>
                      {referral.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="text-sm text-slate-900">
                      {new Date(referral.createdAt).toLocaleDateString()}
                    </div>
                    <div className="text-xs text-slate-500">
                      {new Date(referral.createdAt).toLocaleTimeString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="relative inline-block kebab-menu">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenMenuId(openMenuId === referral.id ? null : referral.id);
                        }}
                        className="inline-flex items-center justify-center w-8 h-8 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                        </svg>
                      </button>
                      {openMenuId === referral.id && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200 z-10">
                          <div className="py-1">
                            <button
                              onClick={() => {
                                setSelectedReferral(referral);
                                setShowDetailsModal(true);
                                setOpenMenuId(null);
                              }}
                              className="flex items-center w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                            >
                              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                              View Details
                            </button>
                            <button
                              onClick={() => {
                                handleDelete(referral.id);
                                setOpenMenuId(null);
                              }}
                              className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                            >
                              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                              Delete
                            </button>
                          </div>
                        </div>
                      )}
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
                setFilters({ search: '', status: '', department: '' });
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
        />
      )}
    </div>
  );
};

// Referral Details Modal Component
const ReferralDetailsModal = ({ referral, onClose, onStatusUpdate }) => {
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
                {/* <div>
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
                </div> */}
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