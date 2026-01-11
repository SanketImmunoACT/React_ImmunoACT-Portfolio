import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import HospitalForm from '@/components/admin/HospitalForm';
import toast from 'react-hot-toast';

// Dropdown menu component for actions
const ActionDropdown = ({ hospital, onEdit, onDelete, onHardDelete }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleEdit = () => {
    onEdit(hospital);
    setIsOpen(false);
  };

  const handleDelete = () => {
    onDelete(hospital.id);
    setIsOpen(false);
  };

  const handleHardDelete = () => {
    if (confirm(`⚠️ PERMANENT DELETE WARNING ⚠️\n\nThis will PERMANENTLY remove "${hospital.name}" from the database.\n\nThis action CANNOT be undone!\n\nAre you absolutely sure?`)) {
      if (confirm(`Final confirmation: Delete "${hospital.name}" FOREVER?`)) {
        onHardDelete(hospital.id);
      }
    }
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center justify-center w-8 h-8 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
        </svg>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-lg border border-slate-200 z-20">
            <div className="py-1">
              <button
                onClick={handleEdit}
                className="flex items-center w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <svg className="w-4 h-4 mr-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit Hospital
              </button>

              {hospital.website && (
                <a
                  href={hospital.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <svg className="w-4 h-4 mr-3 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Visit Website
                </a>
              )}

              {hospital.latitude && hospital.longitude && (
                <a
                  href={`https://maps.google.com/maps?q=${hospital.latitude},${hospital.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <svg className="w-4 h-4 mr-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  View on Map
                </a>
              )}

              <div className="border-t border-slate-100 my-1" />

              <button
                onClick={handleDelete}
                className="flex items-center w-full px-4 py-2 text-sm text-orange-600 hover:bg-orange-50 transition-colors"
              >
                <svg className="w-4 h-4 mr-3 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Delete (Recoverable)
              </button>

              <button
                onClick={handleHardDelete}
                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                Delete Forever
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const AdminHospitals = () => {
  const { apiCall } = useAuth();
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [exportLoading, setExportLoading] = useState(false);
  const [refreshLoading, setRefreshLoading] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [searchInput, setSearchInput] = useState(''); // Separate search input state
  const [isSearching, setIsSearching] = useState(false); // Loading indicator for search
  const [filters, setFilters] = useState({
    search: '',
    state: '',
    type: ''
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0
  });
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingHospital, setEditingHospital] = useState(null);
  const [stats, setStats] = useState({
    totalHospitals: 0,
    privateHospitals: 0,
    governmentHospitals: 0
  });

  // Debounce search input
  useEffect(() => {
    if (searchInput !== filters.search) {
      setIsSearching(true);
    }

    const timeoutId = setTimeout(() => {
      setFilters(prev => ({ ...prev, search: searchInput }));
      setPagination(prev => ({ ...prev, currentPage: 1 }));
      setIsSearching(false);
    }, 500); // Wait 500ms after user stops typing

    return () => clearTimeout(timeoutId);
  }, [searchInput]);

  useEffect(() => {
    fetchHospitals();
    fetchStats();
  }, [filters.state, filters.type, filters.search, pagination.currentPage, sortConfig]); // Add sortConfig to dependencies

  const fetchHospitals = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        page: pagination.currentPage,
        limit: 10,
        ...filters
      });

      // Add sorting parameters
      if (sortConfig.key && sortConfig.direction) {
        queryParams.append('sortBy', sortConfig.key);
        queryParams.append('sortOrder', sortConfig.direction);
      }

      const result = await apiCall(`/api/v1/hospitals?${queryParams}`);

      console.log('API Result:', result); // Debug log

      if (result.success && result.data) {
        let apiData;
        let hospitalsArray;

        // Handle different response structures
        if (result.data.data) {
          // Nested structure: { success: true, data: { data: { hospitals: [...] } } }
          apiData = result.data.data;
          hospitalsArray = apiData.hospitals || [];
        } else if (Array.isArray(result.data)) {
          // Direct array: { success: true, data: [...] }
          hospitalsArray = result.data;
          apiData = { hospitals: result.data, total: result.data.length, currentPage: 1, totalPages: 1 };
        } else if (result.data.hospitals) {
          // Direct object: { success: true, data: { hospitals: [...] } }
          apiData = result.data;
          hospitalsArray = apiData.hospitals || [];
        } else {
          // Fallback
          hospitalsArray = [];
          apiData = { hospitals: [], total: 0, currentPage: 1, totalPages: 1 };
        }

        console.log('Processed API Data:', apiData); // Debug log
        console.log('Hospitals Array:', hospitalsArray); // Debug log

        setHospitals(hospitalsArray);
        setPagination({
          currentPage: apiData.currentPage || 1,
          totalPages: apiData.totalPages || 1,
          totalItems: apiData.totalItems || apiData.total || hospitalsArray.length,
          hasNext: apiData.hasNext || false,
          hasPrev: apiData.hasPrev || false
        });
        setError('');
      } else {
        console.warn('Failed to load hospitals:', result.error || 'No data received');
        console.log('Full result object:', result); // Debug log

        // Don't show error for network/CORS issues
        if (result.error && (
          result.error.includes('Network error') ||
          result.error.includes('CORS') ||
          result.error.includes('Failed to fetch') ||
          result.error.includes('An error occurred while fetching hospitals')
        )) {
          setError('Unable to connect to the server. Please check if the backend server is running and the database is properly configured.');
          // Keep existing hospitals if any, don't clear them
          if (hospitals.length === 0) {
            setHospitals([]);
            setPagination({
              currentPage: 1,
              totalPages: 1,
              totalItems: 0,
              hasNext: false,
              hasPrev: false
            });
          }
        } else {
          setError(result.error || 'Failed to load hospitals');
          toast.error('Failed to load hospitals');

          // Set fallback data only for non-network errors
          setHospitals([]);
          setPagination({
            currentPage: 1,
            totalPages: 1,
            totalItems: 0,
            hasNext: false,
            hasPrev: false
          });
        }
      }
    } catch (error) {
      console.error('Error fetching hospitals:', error);

      // Handle network errors gracefully
      if (error.message.includes('CORS') ||
        error.message.includes('NetworkError') ||
        error.message.includes('Failed to fetch') ||
        error.name === 'TypeError') {
        console.log('Network error, keeping existing state');
        setError('Unable to connect to the server. Please check if the backend server is running and the database is properly configured.');
        // Don't clear existing hospitals on network errors
        if (hospitals.length === 0) {
          setHospitals([]);
          setPagination({
            currentPage: 1,
            totalPages: 1,
            totalItems: 0,
            hasNext: false,
            hasPrev: false
          });
        }
      } else {
        setError('An error occurred while loading hospitals');
        toast.error('An error occurred while loading hospitals');

        // Set fallback data
        setHospitals([]);
        setPagination({
          currentPage: 1,
          totalPages: 1,
          totalItems: 0,
          hasNext: false,
          hasPrev: false
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const result = await apiCall('/api/v1/hospitals/stats');
      console.log('Hospital stats result:', result); // Debug log

      if (result.success && result.data) {
        // Handle the correct data structure
        const actualData = result.data.data || result.data;
        console.log('Setting stats:', actualData); // Debug log
        console.log('Debug info:', result.debug); // Debug log
        setStats(actualData);
      } else {
        console.warn('Failed to load hospital stats:', result.error || 'No data received');
        console.log('Full result object:', result); // Debug log
        // Set fallback stats
        setStats({
          totalHospitals: 0,
          privateHospitals: 0,
          governmentHospitals: 0
        });
      }
    } catch (error) {
      console.error('Error fetching hospital stats:', error);
      // Set fallback stats
      setStats({
        totalHospitals: 0,
        privateHospitals: 0,
        governmentHospitals: 0
      });
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  const handleFormSave = (savedHospital) => {
    setShowCreateModal(false);
    setEditingHospital(null);
    fetchHospitals();
    fetchStats(); // Refresh stats after create/update
    toast.success(savedHospital ? 'Hospital updated successfully' : 'Hospital created successfully');
  };

  const handleFormCancel = () => {
    setShowCreateModal(false);
    setEditingHospital(null);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this hospital? (It can be restored later)')) return;

    const result = await apiCall(`/api/v1/hospitals/${id}`, {
      method: 'DELETE'
    });

    if (result.success) {
      fetchHospitals();
      fetchStats(); // Refresh stats after delete
      toast.success('Hospital deleted successfully (can be restored)');
    } else {
      setError(result.error);
      toast.error('Failed to delete hospital');
    }
  };

  const handleHardDelete = async (id) => {
    const result = await apiCall(`/api/v1/hospitals/${id}?permanent=true`, {
      method: 'DELETE'
    });

    if (result.success) {
      fetchHospitals();
      fetchStats(); // Refresh stats after delete
      toast.success('Hospital permanently deleted from database');
    } else {
      setError(result.error);
      toast.error('Failed to permanently delete hospital');
    }
  };

  const handleEdit = (hospital) => {
    setEditingHospital(hospital);
  };

  const handleRefresh = async () => {
    setRefreshLoading(true);
    try {
      await Promise.all([fetchHospitals(), fetchStats()]);
      toast.success('Hospital data refreshed successfully');
    } catch (error) {
      toast.error('Failed to refresh data');
    } finally {
      setRefreshLoading(false);
    }
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    } else if (sortConfig.key === key && sortConfig.direction === 'desc') {
      direction = null;
    }
    
    setSortConfig({ key, direction });
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  const getSortIcon = (columnKey) => {
    if (sortConfig.key !== columnKey) {
      return (
        <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
        </svg>
      );
    }
    
    if (sortConfig.direction === 'asc') {
      return (
        <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      );
    }
    
    if (sortConfig.direction === 'desc') {
      return (
        <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      );
    }
    
    return null;
  };

  const exportToCSV = async () => {
    setExportLoading(true);
    try {
      // Fetch ALL hospitals (not just current page) with current filters
      const queryParams = new URLSearchParams({
        limit: 10000, // Large number to get all records
        ...filters
      });

      const result = await apiCall(`/api/v1/hospitals?${queryParams}`);
      
      if (result.success && result.data) {
        let allHospitals = [];
        
        // Handle different response structures
        if (result.data.data) {
          allHospitals = result.data.data.hospitals || [];
        } else if (Array.isArray(result.data)) {
          allHospitals = result.data;
        } else if (result.data.hospitals) {
          allHospitals = result.data.hospitals || [];
        }

        if (allHospitals.length === 0) {
          toast.error('No hospitals found to export');
          return;
        }

        const csvContent = [
          ['ID', 'Hospital Name', 'Type', 'Contact Email', 'Contact Phone', 'Address', 'City', 'State', 'Country', 'Postal Code', 'Website'],
          ...allHospitals.map(h => [
            h.id,
            h.name,
            h.type || 'Private',
            h.email || '',
            h.phone || '',
            h.address,
            h.city,
            h.state,
            h.country || 'India',
            h.zipCode || '',
            h.website || ''
          ])
        ].map(row => row.map(field => `"${field}"`).join(',')).join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `hospitals_complete_${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);

        toast.success(`Successfully exported ${allHospitals.length} hospitals`);
      } else {
        toast.error('Failed to fetch hospitals for export');
      }
    } catch (error) {
      console.error('Export error:', error);
      toast.error('An error occurred while exporting data');
    } finally {
      setExportLoading(false);
    }
  };

  const getTypeBadge = (type) => {
    const colors = {
      'Government': 'bg-blue-100 text-blue-800 border border-blue-200',
      'Private': 'bg-green-100 text-green-800 border border-green-200'
    };
    return `inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full ${colors[type] || 'bg-slate-100 text-slate-800 border border-slate-200'}`;
  };

  if (loading && (hospitals || []).length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="relative">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-slate-200"></div>
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent absolute top-0 left-0"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header with Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Hospital Management</h1>
          <p className="text-slate-600 mt-1">Manage partnered hospitals and treatment centers</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-4 text-sm">
            <div className="bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-soft">
              <span className="text-slate-500">Total:</span>
              <span className="font-semibold text-slate-900 ml-1">{stats?.totalHospitals || 0}</span>
            </div>
            <div className="bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-soft">
              <span className="text-slate-500">Private:</span>
              <span className="font-semibold text-green-600 ml-1">{stats?.privateHospitals || 0}</span>
            </div>
            <div className="bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-soft">
              <span className="text-slate-500">Government:</span>
              <span className="font-semibold text-blue-600 ml-1">{stats?.governmentHospitals || 0}</span>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={handleRefresh}
              disabled={refreshLoading}
              className="inline-flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-xl shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-50"
              title="Refresh hospital data"
            >
              <svg className={`w-4 h-4 mr-2 ${refreshLoading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              {refreshLoading ? 'Refreshing...' : 'Refresh'}
            </button>
            <button
              onClick={exportToCSV}
              disabled={exportLoading}
              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium rounded-xl shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-50"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              {exportLoading ? 'Exporting...' : 'Export Data'}
            </button>
            <button
              onClick={() => setShowCreateModal(true)}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-xl shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add Hospital
            </button>
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Search
            </label>
            <div className="relative">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search hospitals..."
                className="w-full px-3 py-2.5 border border-slate-300/60 rounded-xl bg-white/50 backdrop-blur-sm placeholder-slate-400 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200"
              />
              {isSearching && (
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-slate-300 border-t-blue-500"></div>
                </div>
              )}
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              State
            </label>
            <select
              value={filters.state}
              onChange={(e) => handleFilterChange('state', e.target.value)}
              className="w-full px-3 py-2.5 border border-slate-300/60 rounded-xl bg-white/50 backdrop-blur-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200"
            >
              <option value="">All States</option>
              <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
              <option value="Andhra Pradesh">Andhra Pradesh</option>
              <option value="Arunachal Pradesh">Arunachal Pradesh</option>
              <option value="Assam">Assam</option>
              <option value="Bihar">Bihar</option>
              <option value="Chandigarh">Chandigarh</option>
              <option value="Chhattisgarh">Chhattisgarh</option>
              <option value="Dadra and Nagar Haveli and Daman and Diu">Dadra and Nagar Haveli and Daman and Diu</option>
              <option value="Delhi">Delhi</option>
              <option value="Goa">Goa</option>
              <option value="Gujarat">Gujarat</option>
              <option value="Haryana">Haryana</option>
              <option value="Himachal Pradesh">Himachal Pradesh</option>
              <option value="Jammu and Kashmir">Jammu and Kashmir</option>
              <option value="Jharkhand">Jharkhand</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Kerala">Kerala</option>
              <option value="Ladakh">Ladakh</option>
              <option value="Lakshadweep">Lakshadweep</option>
              <option value="Madhya Pradesh">Madhya Pradesh</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Manipur">Manipur</option>
              <option value="Meghalaya">Meghalaya</option>
              <option value="Mizoram">Mizoram</option>
              <option value="Nagaland">Nagaland</option>
              <option value="Odisha">Odisha</option>
              <option value="Puducherry">Puducherry</option>
              <option value="Punjab">Punjab</option>
              <option value="Rajasthan">Rajasthan</option>
              <option value="Sikkim">Sikkim</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Telangana">Telangana</option>
              <option value="Tripura">Tripura</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
              <option value="Uttarakhand">Uttarakhand</option>
              <option value="West Bengal">West Bengal</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Type
            </label>
            <select
              value={filters.type}
              onChange={(e) => handleFilterChange('type', e.target.value)}
              className="w-full px-3 py-2.5 border border-slate-300/60 rounded-xl bg-white/50 backdrop-blur-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200"
            >
              <option value="">All Types</option>
              <option value="Private">Private</option>
              <option value="Government">Government</option>
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={() => {
                setSearchInput(''); // Clear search input
                setFilters({ search: '', state: '', type: '' });
                setSortConfig({ key: null, direction: null }); // Clear sorting
                setPagination(prev => ({ ...prev, currentPage: 1 }));
              }}
              className="px-4 py-2.5 text-slate-700 bg-slate-100 hover:text-slate-900 hover:bg-slate-200 rounded-xl transition-all duration-200 font-medium shadow-sm hover:shadow-md"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Hospitals List */}
      <div className="bg-white shadow-soft rounded-2xl overflow-hidden border border-slate-200/60">
        <div className="">
          <table className="min-w-full divide-y divide-slate-200/60">
            <thead className="bg-gradient-to-r from-slate-50 to-slate-100/50">
              <tr>
                <th className="px-4 py-4 text-center text-xs font-bold text-slate-700 uppercase tracking-wider w-1/4">
                  <button
                    onClick={() => handleSort('name')}
                    className="flex items-center justify-center space-x-1 w-full hover:text-slate-900 transition-colors"
                  >
                    <span>Hospital</span>
                    {getSortIcon('name')}
                  </button>
                </th>
                <th className="px-4 py-4 text-center text-xs font-bold text-slate-700 uppercase tracking-wider w-1/4">
                  <button
                    onClick={() => handleSort('city')}
                    className="flex items-center justify-center space-x-1 w-full hover:text-slate-900 transition-colors"
                  >
                    <span>Location</span>
                    {getSortIcon('city')}
                  </button>
                </th>
                <th className="px-4 py-4 text-center text-xs font-bold text-slate-700 uppercase tracking-wider w-1/4">
                  Contact
                </th>
                <th className="px-4 py-4 text-center text-xs font-bold text-slate-700 uppercase tracking-wider w-1/6">
                  <button
                    onClick={() => handleSort('type')}
                    className="flex items-center justify-center space-x-1 w-full hover:text-slate-900 transition-colors"
                  >
                    <span>Type</span>
                    {getSortIcon('type')}
                  </button>
                </th>
                <th className="px-4 py-4 text-center text-xs font-bold text-slate-700 uppercase tracking-wider w-1/6">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200/60">
              {(hospitals || []).map((hospital, index) => (
                <tr key={hospital.id} className="hover:bg-slate-50/50 transition-colors animate-slide-up" style={{ animationDelay: `${index * 50}ms` }}>
                  <td className="px-4 py-4 text-center">
                    <div>
                      <div className="text-sm font-semibold text-slate-900 truncate">
                        {hospital.name}
                      </div>
                      <div className="text-xs text-slate-500">
                        ID: {hospital.id}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <div className="text-sm text-slate-900">
                      {hospital.city}, {hospital.state}
                    </div>
                    <div className="text-xs text-slate-500 max-w-xs truncate mx-auto">
                      {hospital.address}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <div className="text-xs text-slate-900 space-y-1">
                      {hospital.email && (
                        <div className="truncate" title={hospital.email}>
                          {hospital.email}
                        </div>
                      )}
                      {hospital.phone && (
                        <div className="truncate" title={hospital.phone}>
                          {hospital.phone}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <div className="flex justify-center">
                      <span className={getTypeBadge(hospital.type)}>
                        {hospital.type || 'Private'}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <ActionDropdown
                      hospital={hospital}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                      onHardDelete={handleHardDelete}
                    />
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
                  {/* First page button */}
                  <button
                    onClick={() => setPagination(prev => ({ ...prev, currentPage: 1 }))}
                    disabled={pagination.currentPage === 1}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-slate-300 bg-white text-sm font-medium text-slate-500 hover:bg-slate-50 disabled:opacity-50"
                    title="First page"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                    </svg>
                  </button>
                  
                  {/* Previous button */}
                  <button
                    onClick={() => setPagination(prev => ({ ...prev, currentPage: prev.currentPage - 1 }))}
                    disabled={!pagination.hasPrev}
                    className="relative inline-flex items-center px-2 py-2 border border-slate-300 bg-white text-sm font-medium text-slate-500 hover:bg-slate-50 disabled:opacity-50"
                  >
                    Previous
                  </button>
                  
                  {/* Page numbers */}
                  {(() => {
                    const pages = [];
                    const current = pagination.currentPage;
                    const total = pagination.totalPages;
                    
                    // Always show first page
                    if (current > 3) {
                      pages.push(
                        <button
                          key={1}
                          onClick={() => setPagination(prev => ({ ...prev, currentPage: 1 }))}
                          className="relative inline-flex items-center px-3 py-2 border border-slate-300 bg-white text-sm font-medium text-slate-700 hover:bg-slate-50"
                        >
                          1
                        </button>
                      );
                      
                      if (current > 4) {
                        pages.push(
                          <span key="ellipsis1" className="relative inline-flex items-center px-3 py-2 border border-slate-300 bg-white text-sm font-medium text-slate-700">
                            ...
                          </span>
                        );
                      }
                    }
                    
                    // Show pages around current page
                    for (let i = Math.max(1, current - 2); i <= Math.min(total, current + 2); i++) {
                      pages.push(
                        <button
                          key={i}
                          onClick={() => setPagination(prev => ({ ...prev, currentPage: i }))}
                          className={`relative inline-flex items-center px-3 py-2 border text-sm font-medium ${
                            i === current
                              ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                              : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          {i}
                        </button>
                      );
                    }
                    
                    // Always show last page
                    if (current < total - 2) {
                      if (current < total - 3) {
                        pages.push(
                          <span key="ellipsis2" className="relative inline-flex items-center px-3 py-2 border border-slate-300 bg-white text-sm font-medium text-slate-700">
                            ...
                          </span>
                        );
                      }
                      
                      pages.push(
                        <button
                          key={total}
                          onClick={() => setPagination(prev => ({ ...prev, currentPage: total }))}
                          className="relative inline-flex items-center px-3 py-2 border border-slate-300 bg-white text-sm font-medium text-slate-700 hover:bg-slate-50"
                        >
                          {total}
                        </button>
                      );
                    }
                    
                    return pages;
                  })()}
                  
                  {/* Next button */}
                  <button
                    onClick={() => setPagination(prev => ({ ...prev, currentPage: prev.currentPage + 1 }))}
                    disabled={!pagination.hasNext}
                    className="relative inline-flex items-center px-2 py-2 border border-slate-300 bg-white text-sm font-medium text-slate-500 hover:bg-slate-50 disabled:opacity-50"
                  >
                    Next
                  </button>
                  
                  {/* Last page button */}
                  <button
                    onClick={() => setPagination(prev => ({ ...prev, currentPage: pagination.totalPages }))}
                    disabled={pagination.currentPage === pagination.totalPages}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-slate-300 bg-white text-sm font-medium text-slate-500 hover:bg-slate-50 disabled:opacity-50"
                    title="Last page"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                    </svg>
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}

        {(hospitals || []).length === 0 && !loading && (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <p className="text-slate-500 text-lg mt-4">No hospitals found matching your criteria.</p>
            <button
              onClick={() => {
                setSearchInput(''); // Clear search input
                setFilters({ search: '', state: '', type: '' });
                setPagination(prev => ({ ...prev, currentPage: 1 }));
              }}
              className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>

      {/* Create/Edit Modal */}
      {(showCreateModal || editingHospital) && (
        <HospitalForm
          hospital={editingHospital}
          onSave={handleFormSave}
          onCancel={handleFormCancel}
        />
      )}
    </div>
  );
};

export default AdminHospitals;