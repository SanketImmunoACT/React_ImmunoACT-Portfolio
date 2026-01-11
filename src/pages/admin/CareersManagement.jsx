import { useState, useEffect, useCallback, useMemo } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useDebounceSearch } from '@/hooks/useDebounceSearch';
import CareerForm from '@/components/admin/CareerForm';
import toast from 'react-hot-toast';

const CareersManagement = () => {
  const { apiCall } = useAuth();
  const { searchInput, debouncedSearch, isSearching, setSearchInput, clearSearch } = useDebounceSearch();
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [buttonLoading, setButtonLoading] = useState({});
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    status: '',
    search: '',
    department: '',
    employmentType: '',
    experienceLevel: ''
  });
  const [sorting, setSorting] = useState({
    field: 'createdAt',
    direction: 'DESC'
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0
  });
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedCareer, setSelectedCareer] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingCareer, setEditingCareer] = useState(null);
  const [stats, setStats] = useState({
    totalCareers: 0,
    activeCareers: 0,
    draftCareers: 0
  });

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectedCareer && !event.target.closest('.dropdown-container')) {
        setSelectedCareer(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [selectedCareer]);

  // Update search filter when debounced search changes
  useEffect(() => {
    setFilters(prev => ({ ...prev, search: debouncedSearch }));
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  }, [debouncedSearch]);

  useEffect(() => {
    fetchCareers();
    fetchStats();
  }, [filters.status, filters.search, filters.department, filters.employmentType, filters.experienceLevel, pagination.currentPage, sorting.field, sorting.direction]);

  const fetchCareers = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        page: pagination.currentPage,
        limit: 10,
        sortBy: sorting.field,
        sortOrder: sorting.direction,
        ...filters
      });

      const result = await apiCall(`/api/v1/careers?${queryParams}`);

      if (result.success) {
        setCareers(result.data.careers);
        setPagination(result.data.pagination);
        setError('');
      } else {
        console.error('API call failed:', result);

        // Don't show error for network/CORS issues
        if (result.error && (
          result.error.includes('Network error') ||
          result.error.includes('CORS') ||
          result.error.includes('Failed to fetch')
        )) {
          setError('');
          // Keep existing careers if any, don't clear them
          if (careers.length === 0) {
            setCareers([]);
            setPagination({
              currentPage: 1,
              totalPages: 1,
              totalItems: 0
            });
          }
        } else {
          setError(result.error || 'Failed to load careers');
          toast.error('Failed to load careers');

          // Set empty state only for non-network errors
          setCareers([]);
          setPagination({
            currentPage: 1,
            totalPages: 1,
            totalItems: 0
          });
        }
      }
    } catch (error) {
      console.error('Error fetching careers:', error);

      // Handle network errors gracefully
      if (error.message.includes('CORS') ||
        error.message.includes('NetworkError') ||
        error.message.includes('Failed to fetch') ||
        error.name === 'TypeError') {
        console.log('Network error, keeping existing state');
        setError('');
        // Don't clear existing careers on network errors
        if (careers.length === 0) {
          setCareers([]);
          setPagination({
            currentPage: 1,
            totalPages: 1,
            totalItems: 0
          });
        }
      } else {
        setError('An error occurred while loading careers');
        toast.error('An error occurred while loading careers');

        // Set empty state
        setCareers([]);
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

  const fetchStats = async () => {
    try {
      const result = await apiCall('/api/v1/careers/stats');
      if (result.success) {
        setStats(result.data);
      } else {
        console.warn('Failed to load career stats:', result.error);
        // Set fallback stats
        setStats({
          totalCareers: 0,
          activeCareers: 0,
          draftCareers: 0
        });
      }
    } catch (error) {
      console.error('Error fetching career stats:', error);
      // Set fallback stats
      setStats({
        totalCareers: 0,
        activeCareers: 0,
        draftCareers: 0
      });
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  const handleSort = (field) => {
    setSorting(prev => ({
      field,
      direction: prev.field === field && prev.direction === 'ASC' ? 'DESC' : 'ASC'
    }));
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  const getSortIcon = (field) => {
    if (sorting.field !== field) {
      return (
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
        </svg>
      );
    }
    
    return sorting.direction === 'ASC' ? (
      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
      </svg>
    ) : (
      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    );
  };

  const handleSelectItem = (id) => {
    setSelectedItems(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedItems.length === careers.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(careers.map(item => item.id));
    }
  };

  const handleBulkStatusUpdate = async (status) => {
    if (selectedItems.length === 0) return;

    setButtonLoading(prev => ({ ...prev, [`bulk-${status}`]: true }));

    const result = await apiCall('/api/v1/careers/bulk-update', {
      method: 'PATCH',
      body: JSON.stringify({
        ids: selectedItems,
        status
      })
    });

    if (result.success) {
      setSelectedItems([]);
      fetchCareers();
      fetchStats();
      toast.success(`${selectedItems.length} job(s) updated to ${status}`);
    } else {
      setError(result.error);
      toast.error('Failed to update jobs');
    }

    setButtonLoading(prev => ({ ...prev, [`bulk-${status}`]: false }));
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this job posting?')) return;

    setButtonLoading(prev => ({ ...prev, [`delete-${id}`]: true }));

    const result = await apiCall(`/api/v1/careers/${id}`, {
      method: 'DELETE'
    });

    if (result.success) {
      fetchCareers();
      fetchStats();
      toast.success('Job posting deleted successfully');
    } else {
      setError(result.error);
      toast.error('Failed to delete job posting');
    }

    setButtonLoading(prev => ({ ...prev, [`delete-${id}`]: false }));
  };

  const handleEdit = (career) => {
    setEditingCareer(career);
  };

  const handleFormSave = (savedCareer) => {
    setShowCreateModal(false);
    setEditingCareer(null);
    // Force refresh the careers list and stats
    fetchCareers();
    fetchStats();
    toast.success(savedCareer ? 'Job posting updated successfully' : 'Job posting created successfully');
  };

  const handleFormCancel = () => {
    setShowCreateModal(false);
    setEditingCareer(null);
  };

  // Memoize expensive calculations
  const filteredCareersCount = useMemo(() => careers.length, [careers]);
  
  // Memoize badge functions to prevent re-renders
  const getStatusBadge = useCallback((status) => {
    const colors = {
      draft: 'bg-yellow-100 text-yellow-800 border border-yellow-300',
      active: 'bg-green-100 text-green-800 border border-green-300',
      paused: 'bg-orange-100 text-orange-800 border border-orange-300',
      closed: 'bg-red-100 text-red-800 border border-red-300',
      archived: 'bg-slate-100 text-slate-800 border border-slate-300'
    };
    return (
      <span className={`inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full border ${colors[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  }, []);

  const getEmploymentTypeBadge = useCallback((type) => {
    const colors = {
      'full-time': 'bg-green-100 text-green-800 border border-green-200',
      'part-time': 'bg-blue-100 text-blue-800 border border-blue-200',
      'contract': 'bg-purple-100 text-purple-800 border border-purple-200',
      'internship': 'bg-pink-100 text-pink-800 border border-pink-200',
      'temporary': 'bg-slate-100 text-slate-800 border border-slate-200'
    };
    return `inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full ${colors[type]}`;
  }, []);

  if (loading && careers.length === 0) {
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
          <h1 className="text-3xl font-bold text-slate-900">Careers Management</h1>
          <p className="text-slate-600 mt-1">Manage job postings and career opportunities</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-4 text-sm">
            <div className="bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-soft">
              <span className="text-slate-500">Total:</span>
              <span className="font-semibold text-slate-900 ml-1">{stats.totalCareers}</span>
            </div>
            <div className="bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-soft">
              <span className="text-slate-500">Active:</span>
              <span className="font-semibold text-green-600 ml-1">{stats.activeCareers}</span>
            </div>
            <div className="bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-soft">
              <span className="text-slate-500">Draft:</span>
              <span className="font-semibold text-yellow-600 ml-1">{stats.draftCareers}</span>
            </div>
          </div>
          <button
            onClick={() => {
              fetchCareers();
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
          <button
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold rounded-xl shadow-medium hover:shadow-strong transition-all duration-200 hover:-translate-y-0.5"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Post New Job
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
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Search
              </label>
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                  }
                }}
                placeholder="Search jobs..."
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
              <option value="draft">Draft</option>
              <option value="active">Active</option>
              <option value="paused">Paused</option>
              <option value="closed">Closed</option>
              <option value="archived">Archived</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Department
            </label>
            <input
              type="text"
              value={filters.department}
              onChange={(e) => handleFilterChange('department', e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                }
              }}
              placeholder="Filter by department..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Employment Type
            </label>
            <select
              value={filters.employmentType}
              onChange={(e) => handleFilterChange('employmentType', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="">All Types</option>
              <option value="full-time">Full-time</option>
              <option value="part-time">Part-time</option>
              <option value="contract">Contract</option>
              <option value="internship">Internship</option>
              <option value="temporary">Temporary</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Experience Level
            </label>
            <select
              value={filters.experienceLevel}
              onChange={(e) => handleFilterChange('experienceLevel', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="">All Levels</option>
              <option value="entry-level">Entry Level</option>
              <option value="mid-level">Mid Level</option>
              <option value="senior-level">Senior Level</option>
              <option value="executive">Executive</option>
              <option value="internship">Internship</option>
            </select>
          </div>
          <div className="flex items-end">
            <button
              type="button"
              onClick={() => {
                clearSearch(); // Clear search input
                setFilters({ status: '', search: '', department: '', employmentType: '', experienceLevel: '' });
                setSorting({ field: 'createdAt', direction: 'DESC' });
                setPagination(prev => ({ ...prev, currentPage: 1 }));
              }}
              className="px-4 py-2.5 text-slate-700 bg-slate-100 hover:text-slate-900 hover:bg-slate-200 rounded-xl transition-colors font-medium"
            >
              Clear All
            </button>
          </div>
        </div>
        </form>
      </div>

      {/* Bulk Actions */}
      {selectedItems.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-blue-800">
              {selectedItems.length} item(s) selected
            </span>
            <div className="space-x-2">
              <button
                onClick={() => handleBulkStatusUpdate('active')}
                disabled={buttonLoading['bulk-active']}
                className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-medium rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md disabled:cursor-not-allowed"
              >
                {buttonLoading['bulk-active'] ? (
                  <svg className="w-4 h-4 mr-2 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
                Activate
              </button>
              <button
                onClick={() => handleBulkStatusUpdate('paused')}
                disabled={buttonLoading['bulk-paused']}
                className="inline-flex items-center px-4 py-2 bg-orange-600 hover:bg-orange-700 disabled:bg-orange-400 text-white font-medium rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md disabled:cursor-not-allowed"
              >
                {buttonLoading['bulk-paused'] ? (
                  <svg className="w-4 h-4 mr-2 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6" />
                  </svg>
                )}
                Pause
              </button>
              <button
                onClick={() => handleBulkStatusUpdate('closed')}
                disabled={buttonLoading['bulk-closed']}
                className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-medium rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md disabled:cursor-not-allowed"
              >
                {buttonLoading['bulk-closed'] ? (
                  <svg className="w-4 h-4 mr-2 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
                Close
              </button>
              <button
                onClick={() => handleBulkStatusUpdate('archived')}
                disabled={buttonLoading['bulk-archived']}
                className="inline-flex items-center px-4 py-2 bg-gray-600 hover:bg-gray-700 disabled:bg-gray-400 text-white font-medium rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md disabled:cursor-not-allowed"
              >
                {buttonLoading['bulk-archived'] ? (
                  <svg className="w-4 h-4 mr-2 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8l4 4-4 4m9-8h6" />
                  </svg>
                )}
                Archive
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Careers List */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-center">
                  <input
                    type="checkbox"
                    checked={selectedItems.length === careers.length && careers.length > 0}
                    onChange={handleSelectAll}
                    className="rounded cursor-pointer border-gray-300 text-orange-600 focus:ring-orange-500"
                  />
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button
                    onClick={() => handleSort('title')}
                    className="flex items-center justify-center space-x-1 hover:text-gray-700 transition-colors"
                  >
                    <span>Job Details</span>
                    {getSortIcon('title')}
                  </button>
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button
                    onClick={() => handleSort('department')}
                    className="flex items-center justify-center space-x-1 hover:text-gray-700 transition-colors"
                  >
                    <span>Department</span>
                    {getSortIcon('department')}
                  </button>
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button
                    onClick={() => handleSort('employmentType')}
                    className="flex items-center justify-center space-x-1 hover:text-gray-700 transition-colors"
                  >
                    <span>Employment Type</span>
                    {getSortIcon('employmentType')}
                  </button>
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button
                    onClick={() => handleSort('status')}
                    className="flex items-center justify-center space-x-1 hover:text-gray-700 transition-colors"
                  >
                    <span>Status</span>
                    {getSortIcon('status')}
                  </button>
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {careers.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-center">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item.id)}
                      onChange={() => handleSelectItem(item.id)}
                      className="rounded cursor-pointer border-gray-300 text-orange-600 focus:ring-orange-500"
                    />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="max-w-xs mx-auto">
                      <div className="text-sm font-medium text-gray-900 truncate">
                        {item.title}
                      </div>
                      <div className="text-sm text-gray-500 truncate">
                        {item.experienceLevel.replace('-', ' ')}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-gray-900">
                    {item.department}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={getEmploymentTypeBadge(item.employmentType)}>
                      {item.employmentType.replace('-', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    {getStatusBadge(item.status)}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="relative inline-block text-left dropdown-container">
                      <button
                        onClick={() => setSelectedCareer(selectedCareer?.id === item.id ? null : item)}
                        className="inline-flex items-center p-2 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 rounded-full hover:bg-gray-100 transition-colors"
                        title="More actions"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                        </svg>
                      </button>
                      {selectedCareer?.id === item.id && (
                        <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                          <div className="py-1">
                            <button
                              onClick={() => {
                                handleEdit(item);
                                setSelectedCareer(null);
                              }}
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              Edit Job
                            </button>
                            <button
                              onClick={() => {
                                handleDelete(item.id);
                                setSelectedCareer(null);
                              }}
                              className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                            >
                              Delete Job
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

      {/* Create/Edit Modal */}
      {(showCreateModal || editingCareer) && (
        <CareerForm
          career={editingCareer}
          onSave={handleFormSave}
          onCancel={handleFormCancel}
        />
      )}
    </div>
  );
};

export default CareersManagement;