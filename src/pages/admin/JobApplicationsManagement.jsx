import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import toast from 'react-hot-toast';

const JobApplicationsManagement = () => {
  const { apiCall } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    status: '',
    jobId: '',
    search: ''
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0
  });
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [stats, setStats] = useState({
    totalApplications: 0,
    newApplications: 0,
    shortlistedApplications: 0,
    hiredApplications: 0
  });

  useEffect(() => {
    fetchApplications();
    fetchJobs();
    fetchStats();
  }, [filters.status, filters.jobId, filters.search, pagination.currentPage]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Temporarily disable to test if this is causing the issue
      return;
      
      if (selectedApplication && !event.target.closest('.dropdown-container')) {
        // Use setTimeout to allow click events to complete first
        setTimeout(() => {
          setSelectedApplication(null);
        }, 0);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [selectedApplication]);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        page: pagination.currentPage,
        limit: 10,
        ...filters
      });

      const result = await apiCall(`/api/v1/job-applications?${queryParams}`);

      if (result.success) {
        setApplications(result.data.applications);
        setPagination(result.data.pagination);
        setError('');
      } else {
        console.error('API call failed:', result);
        
        // Handle different types of errors
        if (result.status === 401) {
          setError('Session expired. Please log in again.');
          toast.error('Session expired. Please log in again.');
        } else if (result.status === 403) {
          setError('You do not have permission to view applications.');
          toast.error('Access denied');
        } else if (result.status === 404) {
          setError('Applications endpoint not found.');
          toast.error('Service unavailable');
        } else if (result.error && (
          result.error.includes('Network error') ||
          result.error.includes('CORS') ||
          result.error.includes('Failed to fetch')
        )) {
          setError('');
          // Keep existing applications if any, don't clear them
          if (applications.length === 0) {
            setApplications([]);
            setPagination({
              currentPage: 1,
              totalPages: 1,
              totalItems: 0
            });
          }
        } else {
          setError(result.error || 'Failed to load applications');
          toast.error('Failed to load applications');
          
          // Set empty state only for non-network errors
          setApplications([]);
          setPagination({
            currentPage: 1,
            totalPages: 1,
            totalItems: 0
          });
        }
      }
    } catch (error) {
      console.error('Error fetching applications:', error);
      
      // Handle network errors gracefully
      if (error.message.includes('CORS') ||
        error.message.includes('NetworkError') ||
        error.message.includes('Failed to fetch') ||
        error.name === 'TypeError') {
        console.log('Network error, keeping existing state');
        setError('');
        // Don't clear existing applications on network errors
        if (applications.length === 0) {
          setApplications([]);
          setPagination({
            currentPage: 1,
            totalPages: 1,
            totalItems: 0
          });
        }
      } else {
        setError('An error occurred while loading applications');
        toast.error('An error occurred while loading applications');
        
        // Set empty state
        setApplications([]);
        setPagination({
          currentPage: 1,
          totalPages: 1,
          totalItems: 0
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchJobs = async () => {
    try {
      const result = await apiCall('/api/v1/careers?limit=100');
      if (result.success) {
        setJobs(result.data.careers);
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  const fetchStats = async () => {
    try {
      const result = await apiCall('/api/v1/job-applications/stats');
      if (result.success) {
        setStats(result.data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  const handleStatusUpdate = async (applicationId, newStatus) => {
    try {
      const result = await apiCall(`/api/v1/job-applications/${applicationId}/status`, {
        method: 'PUT',
        body: JSON.stringify({ status: newStatus })
      });

      if (result.success) {
        fetchApplications();
        fetchStats();
        toast.success(`Application status updated to ${newStatus}`);
        if (selectedApplication && selectedApplication.id === applicationId) {
          setSelectedApplication({ ...selectedApplication, status: newStatus });
        }
      } else {
        toast.error('Failed to update application status');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update application status');
    }
  };

  const handleDelete = async (applicationId) => {
    if (!confirm('Are you sure you want to delete this application?')) return;

    try {
      const result = await apiCall(`/api/v1/job-applications/${applicationId}`, {
        method: 'DELETE'
      });

      if (result.success) {
        fetchApplications();
        fetchStats();
        toast.success('Application deleted successfully');
        if (showDetailModal) {
          setShowDetailModal(false);
          setSelectedApplication(null);
        }
      } else {
        toast.error('Failed to delete application');
      }
    } catch (error) {
      console.error('Error deleting application:', error);
      toast.error('Failed to delete application');
    }
  };

  const handleViewDetails = async (applicationId) => {
    try {
      const result = await apiCall(`/api/v1/job-applications/${applicationId}`);
      if (result.success) {
        setSelectedApplication(result.data.application);
        setShowDetailModal(true);
      } else {
        toast.error('Failed to load application details');
      }
    } catch (error) {
      console.error('Error fetching application details:', error);
      toast.error('Failed to load application details');
    }
  };

  const handleDownloadResume = async (applicationId, applicantName) => {
    try {
      // Get the token from the auth context - it's stored as 'adminToken'
      const token = localStorage.getItem('adminToken') || sessionStorage.getItem('adminToken');
      
      if (!token) {
        toast.error('Authentication required. Please log in again.');
        return;
      }

      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/v1/job-applications/${applicationId}/resume`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = `${applicantName}_resume.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        toast.success('Resume downloaded successfully');
      } else {
        const errorData = await response.json().catch(() => ({}));
        toast.error(errorData.message || 'Failed to download resume');
      }
    } catch (error) {
      console.error('Error downloading resume:', error);
      toast.error('Failed to download resume');
    }
  };

  const getStatusBadge = (status) => {
    const colors = {
      'New': 'bg-blue-100 text-blue-800 border border-blue-300',
      'Reviewing': 'bg-yellow-100 text-yellow-800 border border-yellow-300',
      'Shortlisted': 'bg-green-100 text-green-800 border border-green-300',
      'Interviewed': 'bg-purple-100 text-purple-800 border border-purple-300',
      'Rejected': 'bg-red-100 text-red-800 border border-red-300',
      'Hired': 'bg-emerald-100 text-emerald-800 border border-emerald-300',
      'Withdrawn': 'bg-gray-100 text-gray-800 border border-gray-300'
    };
    return (
      <span className={`inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full ${colors[status]}`}>
        {status}
      </span>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading && applications.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="relative">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-slate-200"></div>
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-amber-500 border-t-transparent absolute top-0 left-0"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header with Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Job Applications</h1>
          <p className="text-slate-600 mt-1">Manage job applications and candidates</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-4 text-sm">
            <div className="bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-soft">
              <span className="text-slate-500">Total:</span>
              <span className="font-semibold text-slate-900 ml-1">{stats.totalApplications}</span>
            </div>
            <div className="bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-soft">
              <span className="text-slate-500">New:</span>
              <span className="font-semibold text-blue-600 ml-1">{stats.newApplications}</span>
            </div>
            <div className="bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-soft">
              <span className="text-slate-500">Shortlisted:</span>
              <span className="font-semibold text-green-600 ml-1">{stats.shortlistedApplications}</span>
            </div>
            <div className="bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-soft">
              <span className="text-slate-500">Hired:</span>
              <span className="font-semibold text-emerald-600 ml-1">{stats.hiredApplications}</span>
            </div>
          </div>
          <button
            onClick={() => {
              fetchApplications();
              fetchStats();
              toast.success('Data refreshed successfully');
            }}
            className="inline-flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-xl shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-50"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh
          </button>
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
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Search
            </label>
            <input
              type="text"
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              placeholder="Search by name, email..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="">All Status</option>
              <option value="New">New</option>
              <option value="Reviewing">Reviewing</option>
              <option value="Shortlisted">Shortlisted</option>
              <option value="Interviewed">Interviewed</option>
              <option value="Rejected">Rejected</option>
              <option value="Hired">Hired</option>
              <option value="Withdrawn">Withdrawn</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Job Position
            </label>
            <select
              value={filters.jobId}
              onChange={(e) => handleFilterChange('jobId', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="">All Positions</option>
              {jobs.map(job => (
                <option key={job.id} value={job.id}>{job.title}</option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={() => {
                setFilters({ status: '', jobId: '', search: '' });
                setPagination(prev => ({ ...prev, currentPage: 1 }));
              }}
              className="px-4 py-2.5 text-slate-700 bg-slate-100 hover:text-slate-900 hover:bg-slate-200 rounded-xl transition-colors font-medium"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Applicant Name
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Applied For
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Applied Date
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Current Designation
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Experience
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {applications.map((application) => (
                <tr key={application.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-center">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {application.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {application.email}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-gray-900">
                    {application.job?.title || 'N/A'}
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-gray-900">
                    {formatDate(application.appliedAt)}
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-gray-900">
                    {application.currentDesignation}
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-gray-900">
                    {application.totalExperience}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {getStatusBadge(application.status)}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="relative inline-block text-left dropdown-container">
                      <button
                        onClick={() => setSelectedApplication(selectedApplication?.id === application.id ? null : application)}
                        className="inline-flex items-center p-2 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-1 focus:ring-offset-2 rounded-full"
                        title="More actions"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                        </svg>
                      </button>
                      {selectedApplication?.id === application.id && (
                        <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                          <div className="py-1">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                console.log('View Details clicked for application:', application.id);
                                handleViewDetails(application.id);
                                setSelectedApplication(null);
                              }}
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                              View Details
                            </button>
                            {application.resumeUrl && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  console.log('Download Resume clicked for application:', application.id);
                                  handleDownloadResume(application.id, application.name);
                                  setSelectedApplication(null);
                                }}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              >
                                <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                Download Resume
                              </button>
                            )}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                console.log('Delete clicked for application:', application.id);
                                handleDelete(application.id);
                                setSelectedApplication(null);
                              }}
                              className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                            >
                              <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                              Delete Application
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
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => setPagination(prev => ({ ...prev, currentPage: prev.currentPage - 1 }))}
                disabled={!pagination.hasPrev}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={() => setPagination(prev => ({ ...prev, currentPage: prev.currentPage + 1 }))}
                disabled={!pagination.hasNext}
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing page {pagination.currentPage} of {pagination.totalPages} ({pagination.totalItems} total)
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                  <button
                    onClick={() => setPagination(prev => ({ ...prev, currentPage: prev.currentPage - 1 }))}
                    disabled={!pagination.hasPrev}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setPagination(prev => ({ ...prev, currentPage: prev.currentPage + 1 }))}
                    disabled={!pagination.hasNext}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                  >
                    Next
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Application Detail Modal */}
      {showDetailModal && selectedApplication && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full mx-4 max-h-screen overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-medium text-gray-900">
                  Application Details - {selectedApplication.name}
                </h3>
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <p className="text-sm text-gray-900">{selectedApplication.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <p className="text-sm text-gray-900">{selectedApplication.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <p className="text-sm text-gray-900">{selectedApplication.phone}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Current Location</label>
                    <p className="text-sm text-gray-900">{selectedApplication.currentLocation}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Current Designation</label>
                    <p className="text-sm text-gray-900">{selectedApplication.currentDesignation}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Current/Last Organisation</label>
                    <p className="text-sm text-gray-900">{selectedApplication.currentLastOrganisation}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Highest Education</label>
                    <p className="text-sm text-gray-900">{selectedApplication.highestEducation}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Notice Period</label>
                    <p className="text-sm text-gray-900">{selectedApplication.noticePeriod}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Comfortable to Relocate</label>
                    <p className="text-sm text-gray-900">{selectedApplication.comfortableToRelocate ? 'Yes' : 'No'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Total Experience</label>
                    <p className="text-sm text-gray-900">{selectedApplication.totalExperience}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Applied Date</label>
                    <p className="text-sm text-gray-900">{formatDate(selectedApplication.appliedAt)}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <div className="mt-1">
                      <select
                        value={selectedApplication.status}
                        onChange={(e) => handleStatusUpdate(selectedApplication.id, e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                      >
                        <option value="New">New</option>
                        <option value="Reviewing">Reviewing</option>
                        <option value="Shortlisted">Shortlisted</option>
                        <option value="Interviewed">Interviewed</option>
                        <option value="Rejected">Rejected</option>
                        <option value="Hired">Hired</option>
                        <option value="Withdrawn">Withdrawn</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {selectedApplication.reasonForJobChange && (
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Reason for Job Change</label>
                  <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-md">{selectedApplication.reasonForJobChange}</p>
                </div>
              )}

              {selectedApplication.coverLetter && (
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Cover Letter</label>
                  <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-md">{selectedApplication.coverLetter}</p>
                </div>
              )}

              <div className="flex justify-end space-x-3 pt-6 border-t mt-6">
                {selectedApplication.resumeUrl && (
                  <button
                    onClick={() => handleDownloadResume(selectedApplication.id, selectedApplication.name)}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                  >
                    Download Resume
                  </button>
                )}
                <button
                  onClick={() => handleDelete(selectedApplication.id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Delete Application
                </button>
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobApplicationsManagement;