import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { AlertCircle, CheckCircle } from 'lucide-react';
import PageBanner from '@/components/PageBanner';
import { FooterYouTube, FooterMeta, FooterLinkedIn, FooterTwitter, FooterInstagram, FooterMap, FooterMail } from '@/assets/svg/Icons';

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
      'Research & Development',
      'Product Access',
      'Philanthropy',
      'Investment'
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
    'Research & Development',
    'Product Access',
    'Philanthropy',
    'Investment'
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
      <section className="py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left Column - Form */}
            <div className="space-y-8 text-[#363636]">
              <h3 className="text-2xl font-semibold mb-8">For inquiries contact:</h3>

              {/* Address Card */}
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 border border-gray-200">
                <div className="flex items-start space-x-4">
                  <div className="border-2 p-3 rounded-full">
                    <FooterMap />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Address</h4>
                    <p className="text-gray-600 leading-relaxed">
                      22WL+JVT, S Central Rd, MIDC Industrial Area,<br />
                      Shiravane, Nerul, Navi Mumbai,<br />
                      Maharashtra 400705 India.
                    </p>
                    <button
                      onClick={() => window.open('https://www.google.com/maps/place/ImmunoACT+-+Nerul+Office/@19.0470006,73.0295354,784m/data=!3m2!1e3!4b1!4m6!3m5!1s0x3be7c345b209413d:0xe678d636977d38e1!8m2!3d19.0469955!4d73.0321103!16s%2Fg%2F11l2n422vj?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoKLDEwMDc5MjA3M0gBUAM%3D', '_blank')}
                      className="mt-3 inline-flex items-center text-[#47A178] hover:text-[#3a8a66] font-medium text-sm transition-colors duration-200"
                    >
                      <span>View on Map</span>
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Email Card */}
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 border border-blue-200">
                <div className="flex items-start space-x-4">
                  <div className="border-2 p-3 rounded-full">
                    <FooterMail />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Email Address</h4>
                    <a
                      href="mailto:helpdesk@immunoact.com"
                      className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200 inline-flex items-center"
                    >
                      helpdesk@immunoact.com
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                    <p className="text-gray-600 text-sm mt-2">We respond within 2-3 business days</p>
                  </div>
                </div>
              </div>

              {/* Social Media Section */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Connect with us</h4>
                <div className="flex space-x-4">
                  <a
                    href="https://www.facebook.com/people/Immunoadoptive-Cell/pfbid07T31Ez4ULUrLEvo1Q87XFnY8ZPTXR5DCFoR1n47BeepmJ3S3jv7PuMquhcisPG81l/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white p-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 hover:bg-blue-50 group"
                    title="Facebook"
                  >
                    <div className="text-gray-600 group-hover:text-blue-600 transition-colors duration-200">
                      <FooterMeta />
                    </div>
                  </a>
                  <a
                    href="https://www.instagram.com/actimmuno/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white p-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 hover:bg-pink-50 group"
                    title="Instagram"
                  >
                    <div className="text-gray-600 group-hover:text-pink-600 transition-colors duration-200">
                      <FooterInstagram />
                    </div>
                  </a>
                  <a
                    href="https://x.com/ActImmuno"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white p-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 hover:bg-gray-50 group"
                    title="Twitter"
                  >
                    <div className="text-gray-600 group-hover:text-gray-800 transition-colors duration-200">
                      <FooterTwitter />
                    </div>
                  </a>
                  <a
                    href="https://www.linkedin.com/company/immunoact/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white p-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 hover:bg-blue-50 group"
                    title="LinkedIn"
                  >
                    <div className="text-gray-600 group-hover:text-blue-700 transition-colors duration-200">
                      <FooterLinkedIn />
                    </div>
                  </a>
                  <a
                    href="https://www.youtube.com/@immunoact4858"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white p-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 hover:bg-red-50 group"
                    title="YouTube"
                  >
                    <div className="text-gray-600 group-hover:text-red-600 transition-colors duration-200">
                      <FooterYouTube />
                    </div>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column - Contact Information */}
            <div id="contact-form" className="bg-white p-6 md:p-8 rounded-xl border border-gray-200 text-base md:text-lg order-2 lg:order-1 scroll-mt-24">
              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-green-800 font-medium text-sm md:text-base">Thank you for your submission!</p>
                    <p className="text-green-700 text-xs md:text-sm">We will contact you within 2-3 business days.</p>
                  </div>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-red-800 font-medium text-sm md:text-base">There was an error submitting your form</p>
                    <p className="text-red-700 text-xs md:text-sm">Please check the fields below and try again.</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
                {/* Honeypot field - hidden from users */}
                <input
                  type="text"
                  {...register('website')}
                  style={{ display: 'none' }}
                  tabIndex="-1"
                  autoComplete="off"
                />

                {/* First Name and Last Name */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      {...register('firstName')}
                      className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#47A178] focus:border-transparent outline-none transition-colors ${errors.firstName ? 'border-red-500' : ''
                        }`}
                      placeholder="First Name"
                    />
                    {errors.firstName && (
                      <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
                    )}
                  </div>
                  <div>
                    <input
                      type="text"
                      {...register('lastName')}
                      className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#47A178] focus:border-transparent outline-none transition-colors ${errors.lastName ? 'border-red-500' : ''
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
                  <input
                    type="text"
                    {...register('institution')}
                    className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#47A178] focus:border-transparent outline-none transition-colors ${errors.institution ? 'border-red-500' : ''
                      }`}
                    placeholder="Institution"
                  />
                  {errors.institution && (
                    <p className="mt-1 text-sm text-red-600">{errors.institution.message}</p>
                  )}
                </div>

                {/* Partnering Category */}
                <div>
                  <select
                    {...register('partneringCategory')}
                    className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#47A178] focus:border-transparent outline-none transition-colors text-gray-700 cursor-pointer ${errors.partneringCategory ? 'border-red-500' : ''
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

                {/* Phone Number */}
                <div>
                  <input
                    type="tel"
                    {...register('phone')}
                    className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#47A178] focus:border-transparent outline-none transition-colors ${errors.phone ? 'border-red-500' : ''
                      }`}
                    placeholder="Phone No."
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                  )}
                </div>

                {/* Email Address */}
                <div>
                  <input
                    type="email"
                    {...register('email')}
                    className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#47A178] focus:border-transparent outline-none transition-colors ${errors.email ? 'border-red-500' : ''
                      }`}
                    placeholder="Email Address"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <div className="relative">
                    <textarea
                      rows="4"
                      {...register('message')}
                      className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#47A178] focus:border-transparent outline-none transition-colors resize-none ${errors.message ? 'border-red-500' : ''
                        }`}
                      placeholder="Message *"
                    />
                    <span className={`absolute bottom-2 right-2 text-xs ${messageValue.length > 2000 ? 'text-red-600' : 'text-gray-500'}`}>
                      {messageValue.length}/2000
                    </span>
                  </div>
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
                  )}
                </div>

                {/* Consent Checkbox */}
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    {...register('consentGiven')}
                    className="mt-1 w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                  />
                  <label className="text-sm text-gray-700">
                    I consent to the processing of my personal data for the purpose of responding to my inquiry. *
                  </label>
                </div>
                {errors.consentGiven && (
                  <p className="text-sm text-red-600">{errors.consentGiven.message}</p>
                )}

                {/* Submit Button */}
                <div className="flex justify-center">
                  <button
                    type="submit"
                    disabled={isSubmitting || !isValid}
                    className='bg-[#FFBF00] hover:bg-[#E6AC00] disabled:bg-gray-300 disabled:cursor-not-allowed text-[#363636] text-lg font-medium px-4 py-3 rounded-full transition-colors duration-300 w-full max-w-[150px] mt-8'
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Form'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps?q=19.0473,73.0320&hl=en&z=16&output=embed"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="ImmunoACT Nerul Office Location"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;