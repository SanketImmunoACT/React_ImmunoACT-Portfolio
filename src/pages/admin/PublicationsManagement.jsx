import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useDebounceSearch } from '@/hooks/useDebounceSearch';
import PublicationForm from '@/components/admin/PublicationForm';
import toast from 'react-hot-toast';

const PublicationsManagement = () => {
  const { apiCall } = useAuth();
  const { searchInput, debouncedSearch, isSearching, setSearchInput, clearSearch } = useDebounceSearch();
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    status: '',
    search: '',
    category: '',
    journal: ''
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0
  });
  const [selectedItems, setSelectedItems] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingPublication, setEditingPublication] = useState(null);
  const [stats, setStats] = useState({
    totalPublications: 0,
    publishedPublications: 0,
    draftPublications: 0
  });

  // Update search filter when debounced search changes
  useEffect(() => {
    setFilters(prev => ({ ...prev, search: debouncedSearch }));
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  }, [debouncedSearch]);

  useEffect(() => {
    fetchPublications();
    fetchStats();
  }, [filters.status, filters.search, filters.category, filters.journal, pagination.currentPage]);

  const fetchPublications = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        page: pagination.currentPage,
        limit: 10,
        ...filters
      });

      const result = await apiCall(`/api/v1/publications?${queryParams}`);

      if (result.success) {
        setPublications(result.data.publications);
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
          // Keep existing publications if any, don't clear them
          if (publications.length === 0) {
            setPublications([]);
            setPagination({
              currentPage: 1,
              totalPages: 1,
              totalItems: 0
            });
          }
        } else {
          setError(result.error || 'Failed to load publications');
          toast.error('Failed to load publications');

          // Set empty state only for non-network errors
          setPublications([]);
          setPagination({
            currentPage: 1,
            totalPages: 1,
            totalItems: 0
          });
        }
      }
    } catch (error) {
      console.error('Error fetching publications:', error);

      // Handle network errors gracefully
      if (error.message.includes('CORS') ||
        error.message.includes('NetworkError') ||
        error.message.includes('Failed to fetch') ||
        error.name === 'TypeError') {
        console.log('Network error, keeping existing state');
        setError('');
        // Don't clear existing publications on network errors
        if (publications.length === 0) {
          setPublications([]);
          setPagination({
            currentPage: 1,
            totalPages: 1,
            totalItems: 0
          });
        }
      } else {
        setError('An error occurred while loading publications');
        toast.error('An error occurred while loading publications');

        // Set empty state
        setPublications([]);
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
      const result = await apiCall('/api/v1/publications/stats');
      if (result.success) {
        setStats(result.data);
      } else {
        console.warn('Failed to load publication stats:', result.error);
        // Set fallback stats
        setStats({
          totalPublications: 0,
          publishedPublications: 0,
          draftPublications: 0
        });
      }
    } catch (error) {
      console.error('Error fetching publication stats:', error);
      // Set fallback stats
      setStats({
        totalPublications: 0,
        publishedPublications: 0,
        draftPublications: 0
      });
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  const handleSelectItem = (id) => {
    setSelectedItems(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedItems.length === publications.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(publications.map(item => item.id));
    }
  };

  const handleBulkStatusUpdate = async (status) => {
    if (selectedItems.length === 0) return;

    const result = await apiCall('/api/v1/publications/bulk-update', {
      method: 'PATCH',
      body: JSON.stringify({
        ids: selectedItems,
        status
      })
    });

    if (result.success) {
      setSelectedItems([]);
      fetchPublications();
      fetchStats();
      toast.success(`${selectedItems.length} publication(s) updated to ${status}`);
    } else {
      setError(result.error);
      toast.error('Failed to update publications');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this publication?')) return;

    const result = await apiCall(`/api/v1/publications/${id}`, {
      method: 'DELETE'
    });

    if (result.success) {
      fetchPublications();
      fetchStats();
      toast.success('Publication deleted successfully');
    } else {
      setError(result.error);
      toast.error('Failed to delete publication');
    }
  };

  const handleEdit = (publication) => {
    setEditingPublication(publication);
  };

  const handleFormSave = (savedPublication) => {
    setShowCreateModal(false);
    setEditingPublication(null);
    fetchPublications();
    fetchStats();
    toast.success(savedPublication ? 'Publication updated successfully' : 'Publication created successfully');
  };

  const handleFormCancel = () => {
    setShowCreateModal(false);
    setEditingPublication(null);
  };

  const getStatusBadge = (status) => {
    const colors = {
      draft: 'bg-yellow-100 text-yellow-800 border border-yellow-300',
      published: 'bg-green-100 text-green-800 border border-green-300',
      archived: 'bg-slate-100 text-slate-800 border border-slate-300'
    };
    return (
      <span className={`inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full border ${colors[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getCategoryBadge = (category) => {
    const colors = {
      'Poster': 'bg-blue-100 text-blue-800 border border-blue-200',
      'Article': 'bg-purple-100 text-purple-800 border border-purple-200',
      'Review': 'bg-indigo-100 text-indigo-800 border border-indigo-200',
      'Conference': 'bg-pink-100 text-pink-800 border border-pink-200',
      'Research Paper': 'bg-emerald-100 text-emerald-800 border border-emerald-200'
    };
    return `inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full ${colors[category] || 'bg-slate-100 text-slate-800 border border-slate-200'}`;
  };

  if (loading && publications.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="relative">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-slate-200"></div>
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-emerald-500 border-t-transparent absolute top-0 left-0"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header with Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Publications Management</h1>
          <p className="text-slate-600 mt-1">Manage research publications and scientific papers</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-4 text-sm">
            <div className="bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-soft">
              <span className="text-slate-500">Total:</span>
              <span className="font-semibold text-slate-900 ml-1">{stats.totalPublications}</span>
            </div>
            <div className="bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-soft">
              <span className="text-slate-500">Published:</span>
              <span className="font-semibold text-green-600 ml-1">{stats.publishedPublications}</span>
            </div>
            <div className="bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-soft">
              <span className="text-slate-500">Draft:</span>
              <span className="font-semibold text-yellow-600 ml-1">{stats.draftPublications}</span>
            </div>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold rounded-xl shadow-medium hover:shadow-strong transition-all duration-200 hover:-translate-y-0.5"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Publication
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
      <div className="bg-white shadow-soft rounded-2xl p-6 border border-slate-200/60">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                {isSearching ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-slate-300 border-t-emerald-500"></div>
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
                placeholder="Search publications..."
                className="w-full pl-10 pr-3 py-2.5 border border-slate-300/60 rounded-xl bg-white/50 backdrop-blur-sm placeholder-slate-400 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all duration-200"
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
              className="w-full px-3 py-2.5 border border-slate-300/60 rounded-xl bg-white/50 backdrop-blur-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all duration-200"
            >
              <option value="">All Status</option>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Category
            </label>
            <input
              type="text"
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              placeholder="Filter by category..."
              className="w-full px-3 py-2.5 border border-slate-300/60 rounded-xl bg-white/50 backdrop-blur-sm placeholder-slate-400 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all duration-200"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Journal
            </label>
            <input
              type="text"
              value={filters.journal}
              onChange={(e) => handleFilterChange('journal', e.target.value)}
              placeholder="Filter by journal..."
              className="w-full px-3 py-2.5 border border-slate-300/60 rounded-xl bg-white/50 backdrop-blur-sm placeholder-slate-400 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all duration-200"
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={() => {
                clearSearch(); // Clear search input
                setFilters({ status: '', search: '', category: '', journal: '' });
                setPagination(prev => ({ ...prev, currentPage: 1 }));
              }}
              className="px-4 py-2.5 text-slate-700 bg-slate-100 hover:text-slate-900 hover:bg-slate-200 rounded-xl transition-colors font-medium"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedItems.length > 0 && (
        <div className="bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200/60 p-6 rounded-2xl shadow-soft animate-slide-down">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="h-10 w-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center text-white font-bold text-sm mr-4">
                {selectedItems.length}
              </div>
              <div>
                <span className="text-emerald-900 font-semibold">
                  {selectedItems.length} publication{selectedItems.length > 1 ? 's' : ''} selected
                </span>
                <p className="text-emerald-700 text-sm">Choose an action to apply to selected items</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => handleBulkStatusUpdate('published')}
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium rounded-lg text-sm transition-all duration-200 hover:-translate-y-0.5 shadow-medium"
              >
                <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Publish
              </button>
              <button
                onClick={() => handleBulkStatusUpdate('draft')}
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-medium rounded-lg text-sm transition-all duration-200 hover:-translate-y-0.5 shadow-medium"
              >
                <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Draft
              </button>
              <button
                onClick={() => handleBulkStatusUpdate('archived')}
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-slate-500 to-slate-600 hover:from-slate-600 hover:to-slate-700 text-white font-medium rounded-lg text-sm transition-all duration-200 hover:-translate-y-0.5 shadow-medium"
              >
                <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8l6 6m0 0l6-6m-6 6V4" />
                </svg>
                Archive
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Publications List */}
      <div className="bg-white shadow-soft rounded-2xl overflow-hidden border border-slate-200/60">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200/60">
            <thead className="bg-gradient-to-r from-slate-50 to-slate-100/50">
              <tr>
                <th className="px-6 py-4 text-left">
                  <input
                    type="checkbox"
                    checked={selectedItems.length === publications.length && publications.length > 0}
                    onChange={handleSelectAll}
                    className="rounded cursor-pointer border-slate-300 text-emerald-600 focus:ring-emerald-500"
                  />
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Publication
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Journal
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Published Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200/60">
              {publications.map((item, index) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors animate-slide-up" style={{ animationDelay: `${index * 50}ms` }}>
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item.id)}
                      onChange={() => handleSelectItem(item.id)}
                      className="rounded cursor-pointer border-slate-300 text-emerald-600 focus:ring-emerald-500"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="max-w-xs">
                      <div className="text-sm font-semibold text-slate-900 truncate">
                        {item.title}
                      </div>
                      <div className="text-sm text-slate-500 truncate mt-1">
                        {item.authors}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-900">
                    <div className="max-w-xs truncate">
                      {item.journal}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={getCategoryBadge(item.category)}>
                      {item.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(item.status)}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-900">
                    {new Date(item.publishedDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors"
                      >
                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        View
                      </a>
                      <button
                        onClick={() => handleEdit(item)}
                        className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-emerald-700 bg-emerald-100 hover:bg-emerald-200 rounded-lg transition-colors"
                      >
                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
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
      </div>

      {/* Create/Edit Modal */}
      {(showCreateModal || editingPublication) && (
        <PublicationForm
          publication={editingPublication}
          onSave={handleFormSave}
          onCancel={handleFormCancel}
        />
      )}
    </div>
  );
};

export default PublicationsManagement;