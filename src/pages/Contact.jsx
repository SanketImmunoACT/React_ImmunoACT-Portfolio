import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { AlertCircle, CheckCircle, Clock, Mail, MapPin, Shield } from 'lucide-react';
import PageBanner from '@/components/PageBanner';

// Validation schema that matches backend validation
const validationSchema = yup.object({
  firstName: yup
    .string()
    .required('First name is required')
    .max(50, 'First name must not exceed 50 characters')
    .matches(/^[a-zA-Z\s'-]+$/, 'First name can only contain letters, spaces, hyphens, and apostrophes'),
  
  lastName: yup
    .string()
    .required('Last name is required')
    .max(50, 'Last name must not exceed 50 characters')
    .matches(/^[a-zA-Z\s'-]+$/, 'Last name can only contain letters, spaces, hyphens, and apostrophes'),
  
  email: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email address')
    .max(100, 'Email must not exceed 100 characters'),
  
  phone: yup
    .string()
    .matches(/^[\+]?[1-9][\d]{0,15}$/, 'Please provide a valid phone number')
    .nullable()
    .transform((value) => value === '' ? null : value),
  
  institution: yup
    .string()
    .max(200, 'Institution name must not exceed 200 characters')
    .matches(/^[a-zA-Z0-9\s\-.,&()]*$/, 'Institution name contains invalid characters')
    .nullable()
    .transform((value) => value === '' ? null : value),
  
  partneringCategory: yup
    .string()
    .required('Please select a partnering category')
    .oneOf([
      'Clinical Collaboration',
      'Research Partnership',
      'Technology Licensing',
      'Manufacturing Partnership',
      'Distribution Partnership',
      'Investment Opportunity',
      'Media Inquiry',
      'General Inquiry',
      'Other'
    ], 'Please select a valid partnering category'),
  
  message: yup
    .string()
    .required('Message is required')
    .min(10, 'Message must be at least 10 characters long')
    .max(2000, 'Message must not exceed 2000 characters')
    .matches(/^[a-zA-Z0-9\s\-.,!?()'"@#$%&*+=\n\r]+$/, 'Message contains invalid characters'),
  
  consentGiven: yup
    .boolean()
    .oneOf([true], 'You must consent to data processing to submit this form'),
  
  website: yup.string().max(0, 'Bot detected') // Honeypot field
});

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null

  const partneringCategories = [
    'Clinical Collaboration',
    'Research Partnership',
    'Technology Licensing',
    'Manufacturing Partnership',
    'Distribution Partnership',
    'Investment Opportunity',
    'Media Inquiry',
    'General Inquiry',
    'Other'
  ];

  // Initialize React Hook Form
  const {
    formState: { errors, isValid },
    handleSubmit,
    register,
    reset,
    watch
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onChange', // Validate on change for real-time feedback
    defaultValues: {
      consentGiven: false,
      email: '',
      firstName: '',
      institution: '',
      lastName: '',
      message: '',
      partneringCategory: '',
      phone: '',
      website: '' // Honeypot field
    }
  });

  // Watch message field for character counter
  const messageValue = watch('message', '');

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/v1/contact/submit`, {
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      });

      const responseData = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        reset(); // Reset form using React Hook Form
      } else {
        setSubmitStatus('error');
        // React Hook Form will handle validation errors automatically
        console.error('Submission error:', responseData);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <PageBanner 
        title="Contact Us" 
        subtitle="Contact us today, here to help."
      />

      {/* Main Content */}
      <div className="bg-white">
        <div className="max-w-[1216px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-lg p-8">
                {submitStatus === 'success' && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="text-green-800 font-medium">Thank you for your submission!</p>
                      <p className="text-green-700 text-sm">We will contact you within 2-3 business days.</p>
                    </div>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-3">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                    <div>
                      <p className="text-red-800 font-medium">There was an error submitting your form</p>
                      <p className="text-red-700 text-sm">Please check the fields below and try again.</p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Honeypot field - hidden from users */}
                  <input
                    type="text"
                    {...register('website')}
                    style={{ display: 'none' }}
                    tabIndex="-1"
                    autoComplete="off"
                  />

                  {/* Name Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        {...register('firstName')}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                          errors.firstName ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="First Name"
                      />
                      {errors.firstName && (
                        <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        {...register('lastName')}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                          errors.lastName ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Last Name"
                      />
                      {errors.lastName && (
                        <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Institution */}
                  <div>
                    <label htmlFor="institution" className="block text-sm font-medium text-gray-700 mb-2">
                      Institution
                    </label>
                    <input
                      type="text"
                      id="institution"
                      {...register('institution')}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                        errors.institution ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Hospital, University, Company, etc."
                    />
                    {errors.institution && (
                      <p className="mt-1 text-sm text-red-600">{errors.institution.message}</p>
                    )}
                  </div>

                  {/* Partnering Category */}
                  <div>
                    <label htmlFor="partneringCategory" className="block text-sm font-medium text-gray-700 mb-2">
                      Partnering Category *
                    </label>
                    <select
                      id="partneringCategory"
                      {...register('partneringCategory')}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                        errors.partneringCategory ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">- Select - Partnering Category</option>
                      {partneringCategories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                    {errors.partneringCategory && (
                      <p className="mt-1 text-sm text-red-600">{errors.partneringCategory.message}</p>
                    )}
                  </div>

                  {/* Contact Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone No.
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        {...register('phone')}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                          errors.phone ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Phone No."
                      />
                      {errors.phone && (
                        <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        {...register('email')}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                          errors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Email Address"
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                        Message *
                      </label>
                      <span className={`text-xs ${messageValue.length > 2000 ? 'text-red-600' : 'text-gray-500'}`}>
                        {messageValue.length}/2000
                      </span>
                    </div>
                    <textarea
                      id="message"
                      rows={6}
                      {...register('message')}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                        errors.message ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Please describe your inquiry... (minimum 10 characters)"
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
                    )}
                  </div>

                  {/* Consent Checkbox */}
                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      id="consentGiven"
                      {...register('consentGiven')}
                      className="mt-1 w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                    />
                    <label htmlFor="consentGiven" className="text-sm text-gray-700">
                      I consent to the processing of my personal data for the purpose of responding to my inquiry.
                      I understand that my data will be handled in accordance with healthcare privacy regulations and
                      will be securely stored and processed. *
                    </label>
                  </div>
                  {errors.consentGiven && (
                    <p className="text-sm text-red-600">{errors.consentGiven.message}</p>
                  )}

                  {/* HIPAA Notice */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-medium text-blue-800">Healthcare Data Protection</h4>
                        <p className="text-sm text-blue-700 mt-1">
                          Your information is protected by healthcare-grade security measures. All data is encrypted
                          and handled in compliance with HIPAA and international data protection standards.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting || !isValid}
                    className="w-full bg-yellow-400 hover:bg-yellow-500 disabled:bg-gray-300 disabled:cursor-not-allowed text-black font-medium py-3 px-6 rounded-lg transition-colors"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Form'}
                  </button>
                </form>
              </div>
            </div>

            {/* Contact Information Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-lg p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">For inquiries contact:</h3>

                <div className="space-y-6">
                  {/* Address */}
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-orange-600 mt-1" />
                    <div>
                      <p className="text-gray-900 font-medium">Address</p>
                      <p className="text-gray-600 text-sm mt-1">
                        1st Floor, Plot R-977,TTC Industrial<br />
                        Area, MIDC Rabale, Navi Mumbai<br />
                        400701 India.
                      </p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start space-x-3">
                    <Mail className="w-5 h-5 text-orange-600 mt-1" />
                    <div>
                      <p className="text-gray-900 font-medium">Email Address</p>
                      <a
                        href="mailto:helpdesk@immunoact.com"
                        className="text-orange-600 hover:text-orange-700 text-sm mt-1 block"
                      >
                        helpdesk@immunoact.com
                      </a>
                    </div>
                  </div>

                  {/* Response Time */}
                  <div className="flex items-start space-x-3">
                    <Clock className="w-5 h-5 text-orange-600 mt-1" />
                    <div>
                      <p className="text-gray-900 font-medium">Response Time</p>
                      <p className="text-gray-600 text-sm mt-1">
                        We aim to respond within 2-3 business days
                      </p>
                    </div>
                  </div>
                </div>

                {/* Social Media Links */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <p className="text-gray-900 font-medium mb-4">Follow us:</p>
                  <div className="flex space-x-4">
                    <a href="#" className="text-gray-400 hover:text-gray-600">
                      <span className="sr-only">Facebook</span>
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    </a>
                    <a href="#" className="text-gray-400 hover:text-gray-600">
                      <span className="sr-only">Instagram</span>
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987c6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297L3.488 17.328l1.637-1.637c-.807-.875-1.297-2.026-1.297-3.323s.49-2.448 1.297-3.323L3.488 7.408l1.637-1.637c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297l1.637 1.637-1.637 1.637c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323l1.637 1.637-1.637 1.637c-.875.807-2.026 1.297-3.323 1.297z" />
                      </svg>
                    </a>
                    <a href="#" className="text-gray-400 hover:text-gray-600">
                      <span className="sr-only">Twitter</span>
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                      </svg>
                    </a>
                    <a href="#" className="text-gray-400 hover:text-gray-600">
                      <span className="sr-only">LinkedIn</span>
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>
                    <a href="#" className="text-gray-400 hover:text-gray-600">
                      <span className="sr-only">YouTube</span>
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;