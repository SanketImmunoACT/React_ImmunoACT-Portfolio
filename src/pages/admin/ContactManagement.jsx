import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useDebounceSearch } from '@/hooks/useDebounceSearch';
import toast from 'react-hot-toast';

const ContactManagement = () => {
  const { apiCall } = useAuth();
  const { searchInput, debouncedSearch, isSearching, setSearchInput, clearSearch } = useDebounceSearch();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    status: '',
    search: '',
    partneringCategory: ''
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0
  });
  const [selectedContact, setSelectedContact] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [stats, setStats] = useState({
    totalSubmissions: 0,
    pendingCount: 0,
    thisMonth: 0
  });
  const [exportLoading, setExportLoading] = useState(false);
  const [showExportOptions, setShowExportOptions] = useState(false);

  // Update search filter when debounced search changes
  useEffect(() => {
    setFilters(prev => ({ ...prev, search: debouncedSearch }));
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  }, [debouncedSearch]);

  useEffect(() => {
    fetchContacts();
    fetchStats();
  }, [filters.status, filters.search, filters.partneringCategory, pagination.currentPage]);

  // Close export options when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showExportOptions && !event.target.closest('.export-dropdown')) {
        setShowExportOptions(false);
      }
      if (openMenuId && !event.target.closest('.action-menu')) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showExportOptions, openMenuId]);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        page: pagination.currentPage,
        limit: 10,
        ...filters
      });

      const result = await apiCall(`/api/v1/contact/admin/forms?${queryParams}`);

      if (result.success && result.data) {
        // The apiCall wraps the response, so the actual data is at result.data.data
        const actualData = result.data.data || result.data;
        const contactsData = actualData.contacts || [];
        setContacts(contactsData);

        // Safely update pagination with fallback values
        if (actualData.pagination) {
          setPagination(prev => ({
            ...prev,
            ...actualData.pagination
          }));
        } else {
          // Fallback pagination if API doesn't return pagination data
          setPagination(prev => ({
            ...prev,
            totalPages: 1,
            totalItems: contactsData.length,
            hasNext: false,
            hasPrev: false
          }));
        }
        setError('');
      } else {
        // Don't show error for network/CORS issues, just show loading state
        if (result.error && (
          result.error.includes('Network error') ||
          result.error.includes('CORS') ||
          result.error.includes('Failed to fetch')
        )) {
          setError('');
          // Keep existing contacts if any, don't clear them
          if (contacts.length === 0) {
            setContacts([]);
            setPagination(prev => ({
              ...prev,
              totalPages: 1,
              totalItems: 0,
              hasNext: false,
              hasPrev: false
            }));
          }
        } else {
          setError(result.error || 'Failed to load contacts');
          toast.error('Failed to load contacts');

          // Set empty state only for non-network errors
          setContacts([]);
          setPagination(prev => ({
            ...prev,
            totalPages: 1,
            totalItems: 0,
            hasNext: false,
            hasPrev: false
          }));
        }
      }
    } catch (error) {
      // Handle network errors gracefully
      if (error.message.includes('CORS') ||
        error.message.includes('NetworkError') ||
        error.message.includes('Failed to fetch') ||
        error.name === 'TypeError') {
        setError('');
        // Don't clear existing contacts on network errors
        if (contacts.length === 0) {
          setContacts([]);
          setPagination(prev => ({
            ...prev,
            totalPages: 1,
            totalItems: 0,
            hasNext: false,
            hasPrev: false
          }));
        }
      } else {
        setError('An error occurred while loading contacts');
        toast.error('An error occurred while loading contacts');

        // Set empty state
        setContacts([]);
        setPagination(prev => ({
          ...prev,
          totalPages: 1,
          totalItems: 0,
          hasNext: false,
          hasPrev: false
        }));
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const result = await apiCall('/api/v1/contact/admin/stats');
      if (result.success && result.data) {
        // Handle the same nested structure as contacts
        const actualData = result.data.data || result.data;
        setStats(actualData);
      } else {
        // Set fallback stats
        setStats({
          totalSubmissions: 0,
          pendingCount: 0,
          reviewedCount: 0,
          respondedCount: 0,
          thisMonth: 0
        });
      }
    } catch (error) {
      // Set fallback stats
      setStats({
        totalSubmissions: 0,
        pendingCount: 0,
        reviewedCount: 0,
        respondedCount: 0,
        thisMonth: 0
      });
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      const result = await apiCall(`/api/v1/contact/admin/forms/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status: newStatus })
      });

      if (result.success) {
        setContacts(prev =>
          prev.map(contact =>
            contact.id === id ? { ...contact, status: newStatus } : contact
          )
        );
        toast.success('Status updated successfully');
        fetchStats(); // Refresh stats
      } else {
        toast.error(result.error || 'Failed to update status');
      }
    } catch (error) {
      toast.error('Network error: Failed to update status');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this contact? This action cannot be undone.')) {
      return;
    }

    try {
      const result = await apiCall(`/api/v1/contact/admin/forms/${id}`, {
        method: 'DELETE'
      });

      if (result.success) {
        setContacts(prev => prev.filter(contact => contact.id !== id));
        toast.success('Contact deleted successfully');
        fetchStats(); // Refresh stats
        // Close modal if the deleted contact was being viewed
        if (selectedContact && selectedContact.id === id) {
          setSelectedContact(null);
        }
      } else {
        toast.error(result.error || 'Failed to delete contact');
      }
    } catch (error) {
      toast.error('Network error: Failed to delete contact');
    }
  };

  const handleExportCSV = async (filtered = false) => {
    setExportLoading(true);
    try {
      // Determine which contacts to export
      let contactsToExport;
      let filename;

      if (filtered && (filters.status || filters.search || filters.partneringCategory)) {
        // Export filtered results
        contactsToExport = contacts;
        filename = `contact-forms-filtered-${new Date().toISOString().split('T')[0]}.csv`;
      } else {
        // Export all contacts
        const result = await apiCall('/api/v1/contact/admin/forms?limit=10000');
        if (!result.success || !result.data) {
          toast.error('Failed to fetch contacts for export');
          return;
        }
        const actualData = result.data.data || result.data;
        if (!actualData.contacts) {
          toast.error('Failed to fetch contacts for export');
          return;
        }
        contactsToExport = actualData.contacts;
        filename = `contact-forms-all-${new Date().toISOString().split('T')[0]}.csv`;
      }

      // Define CSV headers - all 13 columns including timestamps
      const headers = [
        'id',
        'first_name',
        'last_name',
        'email',
        'phone',
        'institution',
        'partnership_category',
        'message',
        'status',
        'consent_given',
        'submission_date',
        'created_at',
        'updated_at'
      ];

      // Convert contacts to CSV format
      const csvContent = [
        headers.join(','),
        ...contactsToExport.map(contact => [
          contact.id,
          `"${(contact.firstName || '').replace(/"/g, '""')}"`,
          `"${(contact.lastName || '').replace(/"/g, '""')}"`,
          `"${(contact.email || '').replace(/"/g, '""')}"`,
          `"${(contact.phone || '').replace(/"/g, '""')}"`,
          `"${(contact.institution || '').replace(/"/g, '""')}"`,
          `"${(contact.partneringCategory || '').replace(/"/g, '""')}"`,
          `"${(contact.message || '').replace(/"/g, '""').replace(/\n/g, ' ')}"`,
          contact.status,
          contact.consentGiven ? 'Yes' : 'No',
          new Date(contact.submissionDate).toISOString().split('T')[0], // YYYY-MM-DD format
          contact.createdAt ? new Date(contact.createdAt).toISOString().split('T')[0] : '',
          contact.updatedAt ? new Date(contact.updatedAt).toISOString().split('T')[0] : ''
        ].join(','))
      ].join('\n');

      // Create and download CSV file
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success(`Exported ${contactsToExport.length} contact forms to CSV`);
      setShowExportOptions(false);
    } catch (error) {
      toast.error('Failed to export contacts');
    } finally {
      setExportLoading(false);
    }
  };

  const handleViewDetails = async (contact) => {
    try {
      const result = await apiCall(`/api/v1/contact/admin/forms/${contact.id}`);
      if (result.success && result.data) {
        const actualData = result.data.data || result.data;
        setSelectedContact(actualData.contact);
      } else {
        toast.error(result.error || 'Failed to load contact details');
      }
    } catch (error) {
      toast.error('Network error: Failed to load contact details');
    }
  };

  const getStatusBadge = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      reviewed: 'bg-blue-100 text-blue-800',
      responded: 'bg-green-100 text-green-800',
      archived: 'bg-gray-100 text-gray-800'
    };
    return `px-2 py-1 text-xs font-medium rounded-full ${colors[status]}`;
  };

  const getCategoryBadge = (category) => {
    const colors = {
      'Clinical Collaboration': 'bg-blue-100 text-blue-800',
      'Research Partnership': 'bg-green-100 text-green-800',
      'Technology Licensing': 'bg-purple-100 text-purple-800',
      'Manufacturing Partnership': 'bg-orange-100 text-orange-800',
      'Investment Opportunity': 'bg-red-100 text-red-800',
      'Media Inquiry': 'bg-pink-100 text-pink-800',
      'General Inquiry': 'bg-gray-100 text-gray-800'
    };
    return `px-2 py-1 text-xs font-medium rounded-full ${colors[category] || 'bg-gray-100 text-gray-800'}`;
  };

  if (loading && contacts.length === 0) {
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
          <h1 className="text-3xl font-bold text-slate-900">Contact Management</h1>
          <p className="text-slate-600 mt-1">Manage contact form submissions and inquiries</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-4 text-sm">
            <div className="bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-soft">
              <span className="text-slate-500">Total:</span>
              <span className="font-semibold text-slate-900 ml-1">{stats.totalSubmissions}</span>
            </div>
            <div className="bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-soft">
              <span className="text-slate-500">Pending:</span>
              <span className="font-semibold text-orange-600 ml-1">{stats.pendingCount}</span>
            </div>
            <div className="bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-soft">
              <span className="text-slate-500">Reviewed:</span>
              <span className="font-semibold text-blue-600 ml-1">{stats.reviewedCount || 0}</span>
            </div>
            <div className="bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-soft">
              <span className="text-slate-500">Responded:</span>
              <span className="font-semibold text-green-600 ml-1">{stats.respondedCount || 0}</span>
            </div>
          </div>
          <button
            onClick={() => {
              fetchContacts();
              fetchStats();
            }}
            className="inline-flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-xl shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
            title="Refresh data"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh
          </button>
          <div className="relative export-dropdown">
            <button
              onClick={() => setShowExportOptions(!showExportOptions)}
              disabled={exportLoading}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold rounded-xl shadow-medium hover:shadow-strong transition-all duration-200 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:transform-none"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              {exportLoading ? 'Exporting...' : 'Export CSV'}
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {showExportOptions && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-strong border border-slate-200/60 z-10">
                <div className="p-2">
                  <button
                    onClick={() => handleExportCSV(false)}
                    disabled={exportLoading}
                    className="w-full text-left px-4 py-3 text-slate-700 hover:bg-slate-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div className="font-medium">Export All Contacts</div>
                    <div className="text-sm text-slate-500">Download all contact submissions</div>
                  </button>
                  <button
                    onClick={() => handleExportCSV(true)}
                    disabled={exportLoading || (!filters.status && !filters.search && !filters.partneringCategory)}
                    className="w-full text-left px-4 py-3 text-slate-700 hover:bg-slate-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div className="font-medium">Export Filtered Results</div>
                    <div className="text-sm text-slate-500">
                      {(!filters.status && !filters.search && !filters.partneringCategory)
                        ? 'Apply filters first'
                        : `Export current filtered view (${contacts.length} items)`
                      }
                    </div>
                  </button>
                </div>
              </div>
            )}
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
                placeholder="Search contacts..."
                className="w-full px-3 py-2.5 border border-slate-300/60 rounded-xl bg-white/50 backdrop-blur-sm placeholder-slate-400 text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all duration-200"
              />
              {isSearching && (
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-slate-300 border-t-orange-500"></div>
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
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="reviewed">Reviewed</option>
              <option value="responded">Responded</option>
              <option value="archived">Archived</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Category
            </label>
            <select
              value={filters.partneringCategory}
              onChange={(e) => handleFilterChange('partneringCategory', e.target.value)}
              className="w-full px-3 py-2.5 border border-slate-300/60 rounded-xl bg-white/50 backdrop-blur-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all duration-200"
            >
              <option value="">All Categories</option>
              <option value="Clinical Collaboration">Clinical Collaboration</option>
              <option value="Research Partnership">Research Partnership</option>
              <option value="Technology Licensing">Technology Licensing</option>
              <option value="Manufacturing Partnership">Manufacturing Partnership</option>
              <option value="Distribution Partnership">Distribution Partnership</option>
              <option value="Investment Opportunity">Investment Opportunity</option>
              <option value="Media Inquiry">Media Inquiry</option>
              <option value="General Inquiry">General Inquiry</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={() => {
                clearSearch(); // Clear search input
                setFilters({ status: '', search: '', partneringCategory: '' });
                setPagination(prev => ({ ...prev, currentPage: 1 }));
              }}
              className="px-6 py-2.5 text-slate-700 bg-white border border-slate-300 hover:text-slate-900 hover:bg-slate-50 hover:border-slate-400 rounded-xl transition-all duration-200 font-medium shadow-sm hover:shadow-md"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Contacts List */}
      <div className="bg-white shadow-soft rounded-2xl overflow-hidden border border-slate-200/60">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200/60">
            <thead className="bg-gradient-to-r from-slate-50 to-slate-100/50">
              <tr>
                <th className="px-6 py-4 text-center text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-4 text-center text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Institution
                </th>
                <th className="px-6 py-4 text-center text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-4 text-center text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-center text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Submitted
                </th>
                <th className="px-6 py-4 text-center text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200/60">
              {contacts && contacts.length > 0 ? contacts.map((contact, index) => (
                <tr key={contact.id} className="hover:bg-slate-50/50 transition-colors animate-slide-up" style={{ animationDelay: `${index * 50}ms` }}>
                  <td className="px-6 py-4 text-center">
                    <div>
                      <div className="text-sm font-semibold text-slate-900">
                        {contact.firstName} {contact.lastName}
                      </div>
                      <div className="text-sm text-slate-500">
                        {contact.email}
                      </div>
                      {contact.phone && (
                        <div className="text-sm text-slate-500">
                          {contact.phone}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-900 text-center">
                    {contact.institution || 'Not specified'}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={getCategoryBadge(contact.partneringCategory)}>
                      {contact.partneringCategory}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <select
                      value={contact.status}
                      onChange={(e) => handleStatusUpdate(contact.id, e.target.value)}
                      className="text-xs font-medium rounded-full border-0 focus:ring-2 focus:ring-orange-500 px-3 py-1.5 bg-white shadow-sm cursor-pointer transition-all duration-200 hover:shadow-md focus:shadow-lg"
                      style={{
                        backgroundColor: contact.status === 'pending' ? '#fef3c7' : 
                                       contact.status === 'reviewed' ? '#dbeafe' :
                                       contact.status === 'responded' ? '#d1fae5' : '#f3f4f6',
                        color: contact.status === 'pending' ? '#92400e' : 
                               contact.status === 'reviewed' ? '#1e40af' :
                               contact.status === 'responded' ? '#065f46' : '#374151',
                        border: contact.status === 'pending' ? '1px solid #f59e0b' : 
                               contact.status === 'reviewed' ? '1px solid #3b82f6' :
                               contact.status === 'responded' ? '1px solid #10b981' : '1px solid #6b7280'
                      }}
                    >
                      <option value="pending">Pending</option>
                      <option value="reviewed">Reviewed</option>
                      <option value="responded">Responded</option>
                      <option value="archived">Archived</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-900 text-center">
                    {new Date(contact.submissionDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="relative action-menu">
                      <button
                        onClick={() => setOpenMenuId(openMenuId === contact.id ? null : contact.id)}
                        className="inline-flex items-center justify-center w-8 h-8 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                        </svg>
                      </button>
                      
                      {openMenuId === contact.id && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-strong border border-slate-200/60 z-10">
                          <div className="p-1">
                            <button
                              onClick={() => {
                                handleViewDetails(contact);
                                setOpenMenuId(null);
                              }}
                              className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg transition-colors flex items-center"
                            >
                              <svg className="w-4 h-4 mr-3 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                              View Details
                            </button>
                            <button
                              onClick={() => {
                                handleDelete(contact.id);
                                setOpenMenuId(null);
                              }}
                              className="w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-red-50 rounded-lg transition-colors flex items-center"
                            >
                              <svg className="w-4 h-4 mr-3 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                              Delete Contact
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-slate-500">
                    {loading ? 'Loading contacts...' : 'No contacts found'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-slate-200/60">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => setPagination(prev => ({ ...prev, currentPage: (prev?.currentPage || 1) - 1 }))}
                disabled={!pagination?.hasPrev}
                className="relative inline-flex items-center px-4 py-2 border border-slate-300 text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50 disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={() => setPagination(prev => ({ ...prev, currentPage: (prev?.currentPage || 1) + 1 }))}
                disabled={!pagination?.hasNext}
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-slate-300 text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50 disabled:opacity-50"
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-slate-700">
                  Showing page {pagination?.currentPage || 1} of {pagination?.totalPages || 1} ({pagination?.totalItems || 0} total)
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                  <button
                    onClick={() => setPagination(prev => ({ ...prev, currentPage: (prev?.currentPage || 1) - 1 }))}
                    disabled={!pagination?.hasPrev}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-slate-300 bg-white text-sm font-medium text-slate-500 hover:bg-slate-50 disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setPagination(prev => ({ ...prev, currentPage: (prev?.currentPage || 1) + 1 }))}
                    disabled={!pagination?.hasNext}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-slate-300 bg-white text-sm font-medium text-slate-500 hover:bg-slate-50 disabled:opacity-50"
                  >
                    Next
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Contact Details Modal */}
      {selectedContact && (
        <div className="fixed inset-0 bg-slate-600/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full mx-4 max-h-screen overflow-y-auto shadow-strong border border-slate-200/60">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-slate-900">Contact Details</h3>
                <button
                  onClick={() => setSelectedContact(null)}
                  className="text-slate-400 hover:text-slate-600 transition-colors p-2 hover:bg-slate-100 rounded-lg"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Name</label>
                    <p className="text-sm text-slate-900 bg-slate-50 px-3 py-2 rounded-lg">{selectedContact.firstName} {selectedContact.lastName}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Email</label>
                    <p className="text-sm text-slate-900 bg-slate-50 px-3 py-2 rounded-lg">{selectedContact.email}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Phone</label>
                    <p className="text-sm text-slate-900 bg-slate-50 px-3 py-2 rounded-lg">{selectedContact.phone || 'Not provided'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Institution</label>
                    <p className="text-sm text-slate-900 bg-slate-50 px-3 py-2 rounded-lg">{selectedContact.institution || 'Not provided'}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Partnership Category</label>
                  <span className={getCategoryBadge(selectedContact.partneringCategory)}>
                    {selectedContact.partneringCategory}
                  </span>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Message</label>
                  <div className="mt-1 p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <p className="text-sm text-slate-900 whitespace-pre-wrap">{selectedContact.message}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Status</label>
                    <span className={getStatusBadge(selectedContact.status)}>
                      {selectedContact.status}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Submitted</label>
                    <p className="text-sm text-slate-900 bg-slate-50 px-3 py-2 rounded-lg">
                      {new Date(selectedContact.submissionDate).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Consent</label>
                  <p className="text-sm text-slate-900 bg-slate-50 px-3 py-2 rounded-lg">
                    {selectedContact.consentGiven ? 'Consent given for data processing' : '❌ No consent provided'}
                  </p>
                </div>
              </div>

              <div className="mt-8 flex justify-end space-x-3">
                <button
                  onClick={() => setSelectedContact(null)}
                  className="px-6 py-2.5 bg-white border border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 hover:border-slate-400 transition-all duration-200 font-medium shadow-sm hover:shadow-md"
                >
                  Close
                </button>
                <button
                  onClick={() => handleDelete(selectedContact.id)}
                  className="px-6 py-2.5 bg-red-50 border border-red-200 text-red-700 rounded-xl hover:bg-red-100 hover:border-red-300 transition-all duration-200 font-medium shadow-sm hover:shadow-md"
                >
                  Delete Contact
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const getStatusBadge = (status) => {
  const colors = {
    pending: 'bg-yellow-100 text-yellow-800 border border-yellow-200',
    reviewed: 'bg-blue-100 text-blue-800 border border-blue-200',
    responded: 'bg-green-100 text-green-800 border border-green-200',
    archived: 'bg-slate-100 text-slate-800 border border-slate-200'
  };
  return `inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full ${colors[status]}`;
};

const getCategoryBadge = (category) => {
  const colors = {
    'Clinical Collaboration': 'bg-blue-100 text-blue-800 border border-blue-200',
    'Research Partnership': 'bg-green-100 text-green-800 border border-green-200',
    'Technology Licensing': 'bg-purple-100 text-purple-800 border border-purple-200',
    'Manufacturing Partnership': 'bg-orange-100 text-orange-800 border border-orange-200',
    'Distribution Partnership': 'bg-indigo-100 text-indigo-800 border border-indigo-200',
    'Investment Opportunity': 'bg-red-100 text-red-800 border border-red-200',
    'Media Inquiry': 'bg-pink-100 text-pink-800 border border-pink-200',
    'General Inquiry': 'bg-slate-100 text-slate-800 border border-slate-200',
    'Other': 'bg-slate-100 text-slate-800 border border-slate-200'
  };
  return `inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full ${colors[category] || 'bg-slate-100 text-slate-800 border border-slate-200'}`;
};

export default ContactManagement;