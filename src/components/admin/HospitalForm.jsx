import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import toast from 'react-hot-toast';

const HospitalForm = ({ hospital, onSave, onCancel }) => {
  const { apiCall } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'India',
    phone: '',
    email: '',
    website: '',
    type: 'Private'
  });

  const indianStates = [
    'Andaman and Nicobar Islands',
    'Andhra Pradesh', 
    'Arunachal Pradesh', 
    'Assam', 
    'Bihar', 
    'Chandigarh',
    'Chhattisgarh',
    'Dadra and Nagar Haveli and Daman and Diu',
    'Delhi', 
    'Goa', 
    'Gujarat', 
    'Haryana', 
    'Himachal Pradesh', 
    'Jammu and Kashmir',
    'Jharkhand',
    'Karnataka', 
    'Kerala', 
    'Ladakh',
    'Lakshadweep',
    'Madhya Pradesh', 
    'Maharashtra', 
    'Manipur',
    'Meghalaya', 
    'Mizoram', 
    'Nagaland', 
    'Odisha', 
    'Puducherry',
    'Punjab', 
    'Rajasthan',
    'Sikkim', 
    'Tamil Nadu', 
    'Telangana', 
    'Tripura', 
    'Uttar Pradesh',
    'Uttarakhand', 
    'West Bengal'
  ];

  useEffect(() => {
    if (hospital) {
      setFormData({
        name: hospital.name || '',
        address: hospital.address || '',
        city: hospital.city || '',
        state: hospital.state || '',
        zipCode: hospital.zipCode || '',
        country: hospital.country || 'India',
        phone: hospital.phone || '',
        email: hospital.email || '',
        website: hospital.website || '',
        type: hospital.type || 'Private'
      });
    }
  }, [hospital]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleServiceToggle = (service) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  const handleOperatingHoursChange = (day, field, value) => {
    setFormData(prev => ({
      ...prev,
      operatingHours: {
        ...prev.operatingHours,
        [day]: {
          ...prev.operatingHours[day],
          [field]: value
        }
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = hospital 
        ? `/api/v1/hospitals/${hospital.id}`
        : '/api/v1/hospitals';
      
      const method = hospital ? 'PUT' : 'POST';

      // Clean up empty strings to null for optional fields
      const cleanedData = {
        ...formData,
        phone: formData.phone.trim() || null,
        email: formData.email.trim() || null,
        website: formData.website.trim() || null,
        zipCode: formData.zipCode.trim() || null
      };

      const result = await apiCall(url, {
        method,
        body: JSON.stringify(cleanedData)
      });

      if (result.success) {
        toast.success(hospital ? 'Hospital updated successfully' : 'Hospital created successfully');
        onSave(result.data);
      } else {
        toast.error(result.error || 'Failed to save hospital');
      }
    } catch (error) {
      toast.error('An error occurred while saving the hospital');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900">
            {hospital ? 'Edit Hospital' : 'Add New Hospital'}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Hospital Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Type
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Private">Private</option>
                <option value="Government">Government</option>
              </select>
            </div>
          </div>

          {/* Address Information */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Address *
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
              rows={4}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-24"
              style={{ minHeight: '96px', maxHeight: '96px' }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                City *
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                State *
              </label>
              <select
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select State</option>
                {indianStates.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                ZIP Code
              </label>
              <input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Website
              </label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-slate-200">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 font-medium rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl disabled:opacity-50 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              {loading ? 'Saving...' : (hospital ? 'Update Hospital' : 'Create Hospital')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HospitalForm;