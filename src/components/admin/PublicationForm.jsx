import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import toast from 'react-hot-toast';

const PublicationForm = ({ publication = null, onSave, onCancel }) => {
  const { apiCall } = useAuth();
  const [formData, setFormData] = useState({
    title: publication?.title || '',
    authors: publication?.authors || '',
    journal: publication?.journal || '',
    url: publication?.url || '',
    publishedDate: publication?.publishedDate ? new Date(publication.publishedDate).toISOString().split('T')[0] : '',
    category: publication?.category || '',
    buttonText: publication?.buttonText || 'View Publication',
    status: publication?.status || 'draft',
    abstract: publication?.abstract || '',
    tags: publication?.tags ? publication.tags.join(', ') : ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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

    if (!formData.authors.trim()) {
      newErrors.authors = 'Authors field is required';
    }

    if (!formData.journal.trim()) {
      newErrors.journal = 'Journal is required';
    }

    if (!formData.url.trim()) {
      newErrors.url = 'URL is required';
    } else if (!/^https?:\/\/.+/.test(formData.url)) {
      newErrors.url = 'URL must be a valid URL';
    }

    if (!formData.publishedDate) {
      newErrors.publishedDate = 'Published date is required';
    }

    if (!formData.category.trim()) {
      newErrors.category = 'Category is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);

    const submitData = {
      ...formData,
      tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag) : []
    };

    const endpoint = publication ? `/api/v1/publications/${publication.id}` : '/api/v1/publications';
    const method = publication ? 'PUT' : 'POST';

    const result = await apiCall(endpoint, {
      method,
      body: JSON.stringify(submitData)
    });

    if (result.success) {
      onSave(result.data.publication);
      toast.success(publication ? 'Publication updated successfully' : 'Publication created successfully');
    } else {
      setErrors({ submit: result.error });
      toast.error('Failed to save publication');
    }

    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-slate-600/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full mx-4 max-h-screen overflow-y-auto shadow-strong border border-slate-200/60">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-slate-900">
              {publication ? 'Edit Publication' : 'Add Publication'}
            </h3>
            <button
              onClick={onCancel}
              className="text-slate-400 hover:text-slate-600 transition-colors p-2 hover:bg-slate-100 rounded-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {errors.submit && (
            <div className="mb-6 bg-red-50/80 backdrop-blur-sm border border-red-200/60 text-red-700 px-4 py-3 rounded-xl animate-slide-down">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {errors.submit}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h4 className="text-md font-semibold text-slate-900 border-b border-slate-200 pb-2">Publication Information</h4>
              
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Title *
                </label>
                <textarea
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  rows={2}
                  className={`w-full px-4 py-3 border rounded-xl bg-white/50 backdrop-blur-sm placeholder-slate-400 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all duration-200 ${
                    errors.title ? 'border-red-300 focus:ring-red-500/50 focus:border-red-500' : 'border-slate-300/60'
                  }`}
                  placeholder="Enter publication title"
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600 animate-slide-down">{errors.title}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Authors *
                </label>
                <textarea
                  name="authors"
                  value={formData.authors}
                  onChange={handleChange}
                  rows={2}
                  className={`w-full px-4 py-3 border rounded-xl bg-white/50 backdrop-blur-sm placeholder-slate-400 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all duration-200 ${
                    errors.authors ? 'border-red-300 focus:ring-red-500/50 focus:border-red-500' : 'border-slate-300/60'
                  }`}
                  placeholder="Enter authors (comma-separated or formatted)"
                />
                {errors.authors && (
                  <p className="mt-1 text-sm text-red-600 animate-slide-down">{errors.authors}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Journal *
                  </label>
                  <input
                    type="text"
                    name="journal"
                    value={formData.journal}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-xl bg-white/50 backdrop-blur-sm placeholder-slate-400 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all duration-200 ${
                      errors.journal ? 'border-red-300 focus:ring-red-500/50 focus:border-red-500' : 'border-slate-300/60'
                    }`}
                    placeholder="Journal or publication venue"
                  />
                  {errors.journal && (
                    <p className="mt-1 text-sm text-red-600 animate-slide-down">{errors.journal}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Category *
                  </label>
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-xl bg-white/50 backdrop-blur-sm placeholder-slate-400 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all duration-200 ${
                      errors.category ? 'border-red-300 focus:ring-red-500/50 focus:border-red-500' : 'border-slate-300/60'
                    }`}
                    placeholder="e.g., Poster, Article, Review"
                  />
                  {errors.category && (
                    <p className="mt-1 text-sm text-red-600 animate-slide-down">{errors.category}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  URL *
                </label>
                <input
                  type="url"
                  name="url"
                  value={formData.url}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-xl bg-white/50 backdrop-blur-sm placeholder-slate-400 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all duration-200 ${
                    errors.url ? 'border-red-300 focus:ring-red-500/50 focus:border-red-500' : 'border-slate-300/60'
                  }`}
                  placeholder="https://example.com/publication.pdf"
                />
                {errors.url && (
                  <p className="mt-1 text-sm text-red-600 animate-slide-down">{errors.url}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Published Date *
                  </label>
                  <input
                    type="date"
                    name="publishedDate"
                    value={formData.publishedDate}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-xl bg-white/50 backdrop-blur-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all duration-200 ${
                      errors.publishedDate ? 'border-red-300 focus:ring-red-500/50 focus:border-red-500' : 'border-slate-300/60'
                    }`}
                  />
                  {errors.publishedDate && (
                    <p className="mt-1 text-sm text-red-600 animate-slide-down">{errors.publishedDate}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Button Text
                  </label>
                  <input
                    type="text"
                    name="buttonText"
                    value={formData.buttonText}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-slate-300/60 rounded-xl bg-white/50 backdrop-blur-sm placeholder-slate-400 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all duration-200"
                    placeholder="View Publication"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-slate-300/60 rounded-xl bg-white/50 backdrop-blur-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all duration-200"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Additional Details */}
            <div className="space-y-4">
              <h4 className="text-md font-semibold text-slate-900 border-b border-slate-200 pb-2">Additional Details</h4>
              
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Abstract
                </label>
                <textarea
                  name="abstract"
                  value={formData.abstract}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-slate-300/60 rounded-xl bg-white/50 backdrop-blur-sm placeholder-slate-400 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all duration-200"
                  placeholder="Publication abstract or summary"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Tags
                </label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-300/60 rounded-xl bg-white/50 backdrop-blur-sm placeholder-slate-400 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all duration-200"
                  placeholder="cancer, therapy, immunoact (comma separated)"
                />
                <p className="mt-1 text-sm text-slate-500">Separate tags with commas</p>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-6 border-t border-slate-200">
              <button
                type="button"
                onClick={onCancel}
                className="px-6 py-2.5 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-medium hover:shadow-strong transition-all duration-200 hover:-translate-y-0.5"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2 inline-block"></div>
                    Saving...
                  </>
                ) : (
                  publication ? 'Update Publication' : 'Create Publication'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PublicationForm;