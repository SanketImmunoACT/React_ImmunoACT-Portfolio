import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { ImmunoActLogo } from '@/assets';

const EmployeeReferral = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [formData, setFormData] = useState({
    // Referrer Information
    referrerName: '',
    referrerEmail: '',
    referrerDepartment: '',
    referrerEmployeeId: '',

    // Job Information
    jobTitle: '',
    jobDescription: '',
    department: '',
    employmentType: 'Full-time',
    experienceLevel: 'Mid Level',

    // Candidate Information (Optional)
    candidateName: '',
    candidateEmail: '',
    candidatePhone: '',
    candidateNotes: ''
  });
  const [resumeFile, setResumeFile] = useState(null);

  const departments = [
    'Research & Development',
    'Clinical Affairs',
    'Manufacturing',
    'Quality Assurance',
    'Regulatory Affairs',
    'Business Development',
    'Marketing',
    'Human Resources',
    'Finance',
    'IT',
    'Operations',
    'Other'
  ];

  // Handle ESC key to close modal and focus management
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape' && showSuccessModal) {
        setShowSuccessModal(false);
      }
    };

    if (showSuccessModal) {
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleEscKey);
    } else {
      // Restore body scroll when modal is closed
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'unset';
    };
  }, [showSuccessModal]);

  // Test data function
  const fillTestData = () => {
    setFormData({
      referrerName: 'Rajesh Kumar',
      referrerEmail: 'rajesh.kumar@immunoact.com',
      referrerDepartment: 'Research & Development',
      referrerEmployeeId: 'EMP001',
      jobTitle: 'Senior Software Engineer - CAR-T Platform',
      jobDescription: 'We are looking for an experienced software engineer to join our CAR-T platform development team. The role involves developing scalable web applications for clinical trial management, patient data analysis, and regulatory compliance systems.\n\nKey Responsibilities:\n- Design and develop React-based frontend applications\n- Build robust Node.js backend APIs\n- Implement data visualization for clinical research\n- Ensure HIPAA compliance and data security\n- Collaborate with clinical and research teams\n\nRequired Skills:\n- 5+ years experience in full-stack development\n- Proficiency in React, Node.js, and databases\n- Experience with healthcare/clinical systems preferred\n- Strong understanding of data security and compliance',
      department: 'IT',
      employmentType: 'Full-time',
      experienceLevel: 'Senior Level',
      candidateName: 'Priya Sharma',
      candidateEmail: 'priya.sharma@techcompany.com',
      candidatePhone: '+91 87654 32109',
      candidateNotes: 'Priya is an excellent full-stack developer with 6 years of experience. She has worked on healthcare applications at her current company and has strong expertise in React and Node.js. She is looking for opportunities in the biotech/healthcare sector and would be a great fit for our CAR-T platform development team. She is available to join within 30 days.'
    });
    toast.success('Form filled with test data!');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        toast.error('Please upload only PDF, DOC, or DOCX files');
        return;
      }

      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size should be less than 5MB');
        return;
      }

      setResumeFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const submitData = new FormData();

      // Add all form data
      Object.keys(formData).forEach(key => {
        if (formData[key]) {
          submitData.append(key, formData[key]);
        }
      });

      // Add resume file if selected
      if (resumeFile) {
        submitData.append('candidateResume', resumeFile);
      }

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/job-referrals`, {
        method: 'POST',
        body: submitData
      });

      const result = await response.json();

      if (result.success) {
        // Show success modal
        setShowSuccessModal(true);
        
        // Reset form
        setFormData({
          referrerName: '',
          referrerEmail: '',
          referrerDepartment: '',
          referrerEmployeeId: '',
          jobTitle: '',
          jobDescription: '',
          department: '',
          employmentType: 'Full-time',
          experienceLevel: 'Mid Level',
          candidateName: '',
          candidateEmail: '',
          candidatePhone: '',
          candidateNotes: ''
        });
        setResumeFile(null);

      } else {
        toast.error(result.message || 'Failed to submit referral');
      }

    } catch (error) {
      console.error('Error submitting referral:', error);
      toast.error('Failed to submit referral. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white font-futura">
      {/* Header */}

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Employee Job Referral
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Help us find great talent! Submit job referrals and candidate recommendations to our HR team.
          </p>

          {/* Test Button - Only show in development */}
          {import.meta.env.VITE_NODE_ENV === 'development' && (
            <div className="mt-6">
              <button
                type="button"
                onClick={fillTestData}
                className="inline-flex items-center px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-medium rounded-lg transition-colors duration-200"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Fill Test Data
              </button>
            </div>
          )}
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <form onSubmit={handleSubmit} className="p-8 space-y-8">

            {/* Referrer Information */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                <div className="w-8 h-8 bg-[#E67E22] rounded-full flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                Your Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="referrerName"
                    value={formData.referrerName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E67E22] focus:border-[#E67E22] transition-colors"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="referrerEmail"
                    value={formData.referrerEmail}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E67E22] focus:border-[#E67E22] transition-colors"
                    placeholder="your.email@immunoact.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Department
                  </label>
                  <select
                    name="referrerDepartment"
                    value={formData.referrerDepartment}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E67E22] focus:border-[#E67E22] transition-colors"
                  >
                    <option value="">Select your department</option>
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Employee ID *
                  </label>
                  <input
                    type="text"
                    name="referrerEmployeeId"
                    value={formData.referrerEmployeeId}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E67E22] focus:border-[#E67E22] transition-colors"
                    placeholder="IA001"
                  />
                </div>
              </div>
            </div>

            {/* Job Information */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                <div className="w-8 h-8 bg-[#E67E22] rounded-full flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.0" stroke="currentColor" className="size-4 text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" />
                  </svg>
                </div>
                Job Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Job Title *
                  </label>
                  <input
                    type="text"
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E67E22] focus:border-[#E67E22] transition-colors"
                    placeholder="e.g., Senior Software Engineer"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Department *
                  </label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E67E22] focus:border-[#E67E22] transition-colors"
                  >
                    <option value="">Select department</option>
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Employment Type *
                  </label>
                  <select
                    name="employmentType"
                    value={formData.employmentType}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E67E22] focus:border-[#E67E22] transition-colors"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Experience Level *
                  </label>
                  <select
                    name="experienceLevel"
                    value={formData.experienceLevel}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E67E22] focus:border-[#E67E22] transition-colors"
                  >
                    <option value="Entry Level">Entry Level</option>
                    <option value="Mid Level">Mid Level</option>
                    <option value="Senior Level">Senior Level</option>
                    <option value="Executive">Executive</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Job Description
                  </label>
                  <textarea
                    name="jobDescription"
                    value={formData.jobDescription}
                    onChange={handleInputChange}
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E67E22] focus:border-[#E67E22] transition-colors"
                    placeholder="Describe the role, responsibilities, and requirements..."
                  />
                </div>
              </div>
            </div>

            {/* Candidate Information (Optional) */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                <div className="w-8 h-8 bg-[#E67E22] rounded-full flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                Candidate Information (Optional)
              </h2>
              <p className="text-sm text-gray-600 mb-6">
                If you have a specific candidate in mind, please provide their details below.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Candidate Name
                  </label>
                  <input
                    type="text"
                    name="candidateName"
                    value={formData.candidateName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E67E22] focus:border-[#E67E22] transition-colors"
                    placeholder="Enter candidate's full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Candidate Email
                  </label>
                  <input
                    type="email"
                    name="candidateEmail"
                    value={formData.candidateEmail}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E67E22] focus:border-[#E67E22] transition-colors"
                    placeholder="candidate@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Candidate Phone
                  </label>
                  <input
                    type="tel"
                    name="candidatePhone"
                    value={formData.candidatePhone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E67E22] focus:border-[#E67E22] transition-colors"
                    placeholder="+91 98765 43210"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Resume Upload
                  </label>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E67E22] focus:border-[#E67E22] transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-normal file:bg-[#FFBF00] file:text-black cursor-pointer hover:file:bg-[#E6AC00]"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    PDF, DOC, or DOCX files only. Max size: 5MB
                  </p>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Notes about Candidate
                  </label>
                  <textarea
                    name="candidateNotes"
                    value={formData.candidateNotes}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E67E22] focus:border-[#E67E22] transition-colors"
                    placeholder="Any additional information about the candidate's skills, experience, or why they'd be a good fit..."
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="px-6 py-3 border border-gray-300 rounded-full text-gray-700 font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="bg-[#FFBF00] hover:bg-[#E6AC00] disabled:bg-gray-300 disabled:cursor-not-allowed text-[#363636] text-lg font-medium px-4 py-3 rounded-full transition-colors duration-300 w-full max-w-[180px]"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  'Submit Referral'
                )}
              </button>
            </div>
          </form>
        </div>
      </main>

      {/* Success Modal */}
      {showSuccessModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          style={{
            animation: 'fadeIn 0.2s ease-out'
          }}
          onClick={(e) => {
            // Close modal when clicking on backdrop
            if (e.target === e.currentTarget) {
              setShowSuccessModal(false);
            }
          }}
        >
          <div 
            className="bg-white rounded-2xl max-w-md w-full mx-4 transform relative"
            style={{
              animation: 'scaleIn 0.3s ease-out'
            }}
          >
            {/* Close button */}
            <div className="absolute top-4 right-4 z-10">
              <button
                onClick={() => setShowSuccessModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
                aria-label="Close modal"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {/* Modal Header */}
            <div className="text-center p-8 pb-4">
              {/* Success Icon */}
              <div className="mx-auto flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              
              {/* Success Message */}
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                🎉 Success!
              </h3>
              <p className="text-gray-600 text-base leading-relaxed">
                Your job referral has been submitted successfully!
              </p>
            </div>

            {/* Modal Body */}
            <div className="px-8 pb-4">
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="w-5 h-5 text-orange-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h4 className="text-sm font-semibold text-orange-800 mb-1">
                      What happens next?
                    </h4>
                    <ul className="text-sm text-orange-700 space-y-1">
                      <li>• Our HR team will review your referral</li>
                      <li>• We'll get back to you within 2-3 business days</li>
                      <li>• Thank you for helping us find great talent!</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-8 pb-8">
              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    setShowSuccessModal(false);
                    navigate('/');
                  }}
                  className="flex-1 bg-[#FFBF00] hover:bg-[#E6AC00] text-[#363636] font-semibold py-3 px-4 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#FFBF00] focus:ring-offset-2"
                >
                  Go to Homepage
                </button>
                <button
                  onClick={() => setShowSuccessModal(false)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
                >
                  Submit Another
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add CSS animations */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          
          @keyframes scaleIn {
            from { 
              opacity: 0;
              transform: scale(0.9) translateY(-10px);
            }
            to { 
              opacity: 1;
              transform: scale(1) translateY(0);
            }
          }
        `
      }} />
    </div>
  );
};

export default EmployeeReferral;