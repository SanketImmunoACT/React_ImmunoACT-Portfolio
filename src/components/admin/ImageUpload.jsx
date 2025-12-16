import { useState, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';

const ImageUpload = ({ 
  onImageUploaded, 
  currentImageUrl = '', 
  uploadType = 'image', // 'image', 'media-image', 'publication-image', 'career-image'
  className = '',
  accept = 'image/*'
}) => {
  const { apiCall } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [previewUrl, setPreviewUrl] = useState(currentImageUrl);
  const fileInputRef = useRef(null);

  const handleFileSelect = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB');
      return;
    }

    setError('');
    setUploading(true);

    try {
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => setPreviewUrl(e.target.result);
      reader.readAsDataURL(file);

      // Upload file
      const formData = new FormData();
      const fieldName = uploadType === 'image' ? 'image' : uploadType.replace('-', '');
      formData.append(fieldName, file);

      const endpoint = `/api/v1/upload/${uploadType}`;
      
      const result = await apiCall(endpoint, {
        method: 'POST',
        body: formData,
        headers: {} // Don't set Content-Type, let browser set it for FormData
      });

      if (result.success) {
        const fullUrl = `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${result.data.file.url}`;
        setPreviewUrl(fullUrl);
        onImageUploaded(fullUrl);
      } else {
        setError(result.error);
        setPreviewUrl(currentImageUrl);
      }
    } catch (error) {
      console.error('Upload error:', error);
      setError('Upload failed. Please try again.');
      setPreviewUrl(currentImageUrl);
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = () => {
    setPreviewUrl('');
    onImageUploaded('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex items-center space-x-3">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
        >
          {uploading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600 mr-2"></div>
              Uploading...
            </>
          ) : (
            <>
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              Upload Image
            </>
          )}
        </button>

        {previewUrl && (
          <button
            type="button"
            onClick={handleRemoveImage}
            className="px-3 py-2 text-red-600 hover:text-red-800 text-sm"
          >
            Remove
          </button>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileSelect}
        className="hidden"
      />

      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}

      {previewUrl && (
        <div className="mt-3">
          <img
            src={previewUrl}
            alt="Preview"
            className="max-w-xs max-h-48 object-cover rounded-md border border-gray-300"
          />
        </div>
      )}

      <p className="text-xs text-gray-500">
        Supported formats: PNG, JPG, JPEG, GIF, WebP. Max size: 5MB
      </p>
    </div>
  );
};

export default ImageUpload;