import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

const CareerForm = ({ career = null, onSave, onCancel }) => {
  const { apiCall } = useAuth();
  const [formData, setFormData] = useState({
    title: career?.title || '',
    department: career?.department || '',
    employmentType: career?.employmentType || 'full-time',
    experienceLevel: career?.experienceLevel || 'mid-level',
    responsibilities: career?.responsibilities ? career.responsibilities.join('\n') : '',
    desiredQualities: career?.requirements ? career.requirements.join('\n') : '',
    qualifications: career?.qualifications ? career.qualifications.join('\n') : '',
    status: career?.status || 'draft',
    tags: career?.tags ? career.tags.join(', ') : '',
    urgency: career?.urgency || 'medium',
    workSchedule: career?.workSchedule || '',
    travelRequired: career?.travelRequired || false
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.department.trim()) {
      newErrors.department = 'Department is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    setErrors({}); // Clear previous errors

    try {
      const submitData = {
        ...formData,
        responsibilities: formData.responsibilities ? formData.responsibilities.split('\n').map(item => item.trim()).filter(item => item) : [],
        requirements: formData.desiredQualities ? formData.desiredQualities.split('\n').map(item => item.trim()).filter(item => item) : [],
        qualifications: formData.qualifications ? formData.qualifications.split('\n').map(item => item.trim()).filter(item => item) : [],
        tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag) : []
      };

      const endpoint = career ? `/api/v1/careers/${career.id}` : '/api/v1/careers';
      const method = career ? 'PUT' : 'POST';

      const result = await apiCall(endpoint, {
        method,
        body: JSON.stringify(submitData)
      });

      if (result.success) {
        onSave(result.data.career);
      } else {
        // Handle validation errors from backend
        if (result.details && Array.isArray(result.details)) {
          const fieldErrors = {};
          result.details.forEach(error => {
            if (error.path) {
              fieldErrors[error.path] = error.msg;
            }
          });
          setErrors(fieldErrors);
        } else {
          setErrors({ submit: result.error || 'Failed to save job posting' });
        }
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setErrors({ submit: 'An unexpected error occurred. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full mx-4 max-h-screen overflow-y-auto">
        <div className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-6">
            {career ? 'Edit Job Posting' : 'Create Job Posting'}
          </h3>

          {errors.submit && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
              {errors.submit}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h4 className="text-md font-medium text-gray-900 border-b pb-2">Basic Information</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Job Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 ${
                      errors.title ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="e.g., Senior Manager"
                  />
                  {errors.title && (
                    <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Department *
                  </label>
                  <input
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 ${
                      errors.department ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="e.g., Clinical Research"
                  />
                  {errors.department && (
                    <p className="mt-1 text-sm text-red-600">{errors.department}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Employment Type
                  </label>
                  <select
                    name="employmentType"
                    value={formData.employmentType}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                  >
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
                    name="experienceLevel"
                    value={formData.experienceLevel}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                  >
                    <option value="entry-level">Entry Level</option>
                    <option value="mid-level">Mid Level</option>
                    <option value="senior-level">Senior Level</option>
                    <option value="executive">Executive</option>
                    <option value="internship">Internship</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                  >
                    <option value="draft">Draft</option>
                    <option value="active">Active</option>
                    <option value="paused">Paused</option>
                    <option value="closed">Closed</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Job Details */}
            <div className="space-y-4">
              <h4 className="text-md font-medium text-gray-900 border-b pb-2">Job Details</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Responsibilities
                  </label>
                  <textarea
                    name="responsibilities"
                    value={formData.responsibilities}
                    onChange={handleChange}
                    rows={5}
                    style={{ height: '120px', resize: 'none' }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 overflow-y-auto"
                    placeholder="Enter each responsibility on a new line"
                  />
                  <p className="mt-1 text-sm text-gray-500">One responsibility per line</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Desired Qualities
                  </label>
                  <textarea
                    name="desiredQualities"
                    value={formData.desiredQualities}
                    onChange={handleChange}
                    rows={5}
                    style={{ height: '120px', resize: 'none' }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 overflow-y-auto"
                    placeholder="Enter each desired quality on a new line"
                  />
                  <p className="mt-1 text-sm text-gray-500">One desired quality per line</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Qualifications
                </label>
                <textarea
                  name="qualifications"
                  value={formData.qualifications}
                  onChange={handleChange}
                  rows={4}
                  style={{ height: '100px', resize: 'none' }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 overflow-y-auto"
                  placeholder="Enter each qualification on a new line"
                />
                <p className="mt-1 text-sm text-gray-500">One qualification per line</p>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t">
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Saving...' : (career ? 'Update Job' : 'Create Job')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CareerForm;