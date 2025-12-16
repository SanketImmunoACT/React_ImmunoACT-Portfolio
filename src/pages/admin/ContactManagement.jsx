import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

const ContactManagement = () => {
  const { apiCall } = useAuth();
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

  useEffect(() => {
    fetchContacts();
  }, [filters, pagination.currentPage]);

  const fetchContacts = async () => {
    setLoading(true);
    // Note: We'll need to create this endpoint
    const queryParams = new URLSearchParams({
      page: pagination.currentPage,
      limit: 10,
      ...filters
    });

    // For now, using mock data since we don't have the contact management API
    // In a real implementation, this would be: `/api/v1/contacts?${queryParams}`
    
    // Mock data for demonstration
    setTimeout(() => {
      setContacts([
        {
          id: 1,
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          phone: '+91-9876543210',
          institution: 'AIIMS Delhi',
          partneringCategory: 'Clinical Collaboration',
          message: 'Interested in CAR-T therapy collaboration...',
          status: 'pending',
          submissionDate: new Date().toISOString(),
          consentGiven: true
        },
        {
          id: 2,
          firstName: 'Jane',
          lastName: 'Smith',
          email: 'jane.smith@hospital.com',
          phone: '+91-9876543211',
          institution: 'Tata Memorial Hospital',
          partneringCategory: 'Research Partnership',
          message: 'Looking for research collaboration opportunities...',
          status: 'reviewed',
          submissionDate: new Date(Date.now() - 86400000).toISOString(),
          consentGiven: true
        }
      ]);
      setPagination({
        currentPage: 1,
        totalPages: 1,
        totalItems: 2,
        hasNext: false,
        hasPrev: false
      });
      setLoading(false);
    }, 1000);
  };

  const handleStatusUpdate = async (id, newStatus) => {
    // Mock implementation - in real app, this would call the API
    setContacts(prev => 
      prev.map(contact => 
        contact.id === id ? { ...contact, status: newStatus } : contact
      )
    );
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
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Contact Management</h1>
          <p className="text-gray-600">Manage contact form submissions and inquiries</p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
          {error}
        </div>
      )}

      {/* Note about implementation */}
      <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-md">
        <p className="text-sm">
          📝 <strong>Note:</strong> This is a demo interface. The contact management API endpoints need to be implemented 
          to connect with the existing ContactForm model in the backend.
        </p>
      </div>

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
              onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
              placeholder="Search contacts..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              value={filters.status}
              onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="reviewed">Reviewed</option>
              <option value="responded">Responded</option>
              <option value="archived">Archived</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              value={filters.partneringCategory}
              onChange={(e) => setFilters(prev => ({ ...prev, partneringCategory: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="">All Categories</option>
              <option value="Clinical Collaboration">Clinical Collaboration</option>
              <option value="Research Partnership">Research Partnership</option>
              <option value="Technology Licensing">Technology Licensing</option>
              <option value="Manufacturing Partnership">Manufacturing Partnership</option>
              <option value="Investment Opportunity">Investment Opportunity</option>
              <option value="Media Inquiry">Media Inquiry</option>
              <option value="General Inquiry">General Inquiry</option>
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={() => setFilters({ status: '', search: '', partneringCategory: '' })}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Contacts List */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Institution
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Submitted
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {contacts.map((contact) => (
                <tr key={contact.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {contact.firstName} {contact.lastName}
                      </div>
                      <div className="text-sm text-gray-500">
                        {contact.email}
                      </div>
                      {contact.phone && (
                        <div className="text-sm text-gray-500">
                          {contact.phone}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {contact.institution || 'Not specified'}
                  </td>
                  <td className="px-6 py-4">
                    <span className={getCategoryBadge(contact.partneringCategory)}>
                      {contact.partneringCategory}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={contact.status}
                      onChange={(e) => handleStatusUpdate(contact.id, e.target.value)}
                      className={`text-xs font-medium rounded-full border-0 focus:ring-2 focus:ring-orange-500 ${getStatusBadge(contact.status)}`}
                    >
                      <option value="pending">Pending</option>
                      <option value="reviewed">Reviewed</option>
                      <option value="responded">Responded</option>
                      <option value="archived">Archived</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {new Date(contact.submissionDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">
                    <button
                      onClick={() => setSelectedContact(contact)}
                      className="text-orange-600 hover:text-orange-900"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Contact Details Modal */}
      {selectedContact && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-screen overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Contact Details</h3>
                <button
                  onClick={() => setSelectedContact(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <span className="text-2xl">&times;</span>
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <p className="text-sm text-gray-900">{selectedContact.firstName} {selectedContact.lastName}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <p className="text-sm text-gray-900">{selectedContact.email}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <p className="text-sm text-gray-900">{selectedContact.phone || 'Not provided'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Institution</label>
                    <p className="text-sm text-gray-900">{selectedContact.institution || 'Not provided'}</p>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Partnership Category</label>
                  <span className={getCategoryBadge(selectedContact.partneringCategory)}>
                    {selectedContact.partneringCategory}
                  </span>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Message</label>
                  <div className="mt-1 p-3 bg-gray-50 rounded-md">
                    <p className="text-sm text-gray-900">{selectedContact.message}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <span className={getStatusBadge(selectedContact.status)}>
                      {selectedContact.status}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Submitted</label>
                    <p className="text-sm text-gray-900">
                      {new Date(selectedContact.submissionDate).toLocaleString()}
                    </p>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Consent</label>
                  <p className="text-sm text-gray-900">
                    {selectedContact.consentGiven ? '✅ Consent given' : '❌ No consent'}
                  </p>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setSelectedContact(null)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
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

export default ContactManagement;