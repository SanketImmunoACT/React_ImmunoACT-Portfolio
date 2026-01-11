import { useState, useEffect } from 'react'
import { ChevronDown, Upload, X } from 'lucide-react'
import BG1 from '@/assets/images/background/BG-1.png'
import PageBanner from '@/components/PageBanner'

const Careers = () => {
  const [showApplicationModal, setShowApplicationModal] = useState(false)
  const [selectedJob, setSelectedJob] = useState(null)
  const [expandedJob, setExpandedJob] = useState(null)
  const [jobListings, setJobListings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    currentLocation: '',
    currentDesignation: '',
    currentLastOrganisation: '',
    highestEducation: '',
    noticePeriod: '',
    comfortableToRelocate: false,
    totalExperience: '',
    reasonForJobChange: '',
    resume: null,
    coverLetter: ''
  })

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

  // Fetch jobs from API
  useEffect(() => {
    fetchJobs()
  }, [])

  const fetchJobs = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${API_URL}/api/v1/careers/public?limit=100`)
      const data = await response.json()
      
      if (response.ok) {
        setJobListings(data.careers || [])
        setError('')
      } else {
        setError(data.message || 'Failed to load job listings')
        setJobListings([])
      }
    } catch (err) {
      console.error('Failed to fetch jobs:', err)
      setError('Failed to load job listings')
      setJobListings([])
    }
    setLoading(false)
  }

  const toggleJobExpansion = (jobId) => {
    setExpandedJob(expandedJob === jobId ? null : jobId)
  }

  const handleApplyNow = (job) => {
    setSelectedJob(job)
    setShowApplicationModal(true)
  }

  const handleCloseModal = () => {
    setShowApplicationModal(false)
    setSelectedJob(null)
    setFormData({
      name: '',
      email: '',
      phone: '',
      currentLocation: '',
      currentDesignation: '',
      currentLastOrganisation: '',
      highestEducation: '',
      noticePeriod: '',
      comfortableToRelocate: false,
      totalExperience: '',
      reasonForJobChange: '',
      resume: null,
      coverLetter: ''
    })
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setFormData(prev => ({
      ...prev,
      resume: file
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!selectedJob) {
      alert('No job selected')
      return
    }

    // Create FormData for file upload
    const submitData = new FormData()
    submitData.append('jobId', selectedJob.id)
    submitData.append('name', formData.name)
    submitData.append('email', formData.email)
    submitData.append('phone', formData.phone)
    submitData.append('currentLocation', formData.currentLocation)
    submitData.append('currentDesignation', formData.currentDesignation)
    submitData.append('currentLastOrganisation', formData.currentLastOrganisation)
    submitData.append('highestEducation', formData.highestEducation)
    submitData.append('noticePeriod', formData.noticePeriod)
    submitData.append('comfortableToRelocate', formData.comfortableToRelocate)
    submitData.append('totalExperience', formData.totalExperience)
    submitData.append('reasonForJobChange', formData.reasonForJobChange)
    submitData.append('coverLetter', formData.coverLetter)
    
    if (formData.resume) {
      submitData.append('resume', formData.resume)
    }

    try {
      const response = await fetch(`${API_URL}/api/v1/job-applications/submit`, {
        method: 'POST',
        body: submitData
      })

      const result = await response.json()

      if (response.ok && result.success) {
        alert('Application submitted successfully!')
        handleCloseModal()
      } else {
        alert(result.message || 'Failed to submit application')
      }
    } catch (error) {
      console.error('Error submitting application:', error)
      alert('Failed to submit application. Please try again.')
    }
  }

  // Filter only active jobs from API (they should already be active from the public endpoint)
  const activeJobs = jobListings

  // Helper function to format job data for display
  const formatJobForDisplay = (job) => {
    // Process responsibilities
    let keyResponsibilities = []
    if (Array.isArray(job.responsibilities)) {
      keyResponsibilities = job.responsibilities
    } else if (typeof job.responsibilities === 'string') {
      keyResponsibilities = job.responsibilities.split('\n').filter(item => item.trim())
    } else {
      keyResponsibilities = job.responsibilities || []
    }

    // Process qualifications
    let qualifications = []
    if (Array.isArray(job.qualifications)) {
      qualifications = job.qualifications
    } else if (typeof job.qualifications === 'string') {
      qualifications = job.qualifications.split('\n').filter(item => item.trim())
    } else {
      qualifications = job.qualifications || []
    }

    // Process desiredQualities (renamed from requirements)
    let desiredQualities = []
    if (Array.isArray(job.requirements)) {
      desiredQualities = job.requirements
    } else if (typeof job.requirements === 'string') {
      desiredQualities = job.requirements.split('\n').filter(item => item.trim())
    } else {
      desiredQualities = job.requirements || []
    }

    return {
      ...job,
      keyResponsibilities,
      qualifications,
      desiredQualities
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <PageBanner title="Careers" subtitle="Your ambition, our opportunity to excel" />

      {/* Main Content */}
      <div className="py-12 bg-gray-50">
        <div className="max-w-[1216px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Join Our Team Section */}
          <div className="text-center">
            <h2 className="text-4xl text-[#47A178] mb-8">Join Our Team</h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-lg text-gray-700 max-w-7xl mx-auto mb-5">
                At ImmunoACT, we're more than a company—we're a vibrant community of curious minds, bold innovators, and passionate changemakers. As a young group of individuals united by a shared vision, we give each teammate{' '}
                <span className="font-semibold text-gray-900">wings to their ideas</span> and the{' '}
                <span className="font-semibold text-gray-900">freedom to bring them to life</span>. Here, your voice isn't just heard—it shapes the future of cell therapy and transforms patient care.
              </p>

              <div className="space-y-4">
                <p className="text-gray-700">
                  Visit us on{' '}
                  <a
                    href="https://linkedin.com/company/immunoact"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 font-medium underline"
                  >
                    LinkedIn
                  </a>
                </p>

                <p className="text-gray-700">
                  Email your resume on{' '}
                  <a
                    href="mailto:jobs@immunoact.com"
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    jobs@immunoact.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Job Listings */}
      <div className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="relative">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-slate-200"></div>
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-amber-500 border-t-transparent absolute top-0 left-0"></div>
              </div>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl max-w-md mx-auto">
                <p>{error}</p>
              </div>
            </div>
          ) : activeJobs.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-blue-50 border border-blue-200 text-blue-700 px-6 py-8 rounded-xl max-w-md mx-auto">
                <h3 className="text-lg font-semibold mb-2">No Open Positions</h3>
                <p>We don't have any open positions at the moment, but we're always looking for talented individuals!</p>
                <p className="mt-2">
                  Send your resume to{' '}
                  <a href="mailto:jobs@immunoact.com" className="text-blue-600 hover:text-blue-700 font-medium">
                    jobs@immunoact.com
                  </a>
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {activeJobs.map((job) => {
                const formattedJob = formatJobForDisplay(job)
                return (
                  <div
                    key={job.id}
                    className="bg-white rounded-[32px] border-2 overflow-hidden transition-all duration-300 hover:-translate-y-1"
                    style={{
                      boxShadow: '0 10px 15px -3px rgb(71 161 120 / 0.1), 0 4px 6px -4px rgb(71 161 120 / 0.1), 0 15px 20px -3px rgb(243 203 81 / 0.08), 0 8px 10px -4px rgb(243 203 81 / 0.08), 0px -1px 10px 2px rgb(71 161 120 / 0.1)'
                    }}
                  >
                    {/* Job Header */}
                    <div className="p-6 border-b border-gray-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-2xl text-[#363636] mb-1">{job.title}</h3>
                          <p className="text-[#9E9E9E] text-xl">{job.department}</p>
                          {job.employmentType && (
                            <span className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                              {job.employmentType.replace('-', ' ')}
                            </span>
                          )}
                        </div>
                        <button
                          onClick={() => toggleJobExpansion(job.id)}
                          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                          <ChevronDown
                            className={`w-6 h-6 text-gray-400 transition-transform ${expandedJob === job.id ? 'rotate-180' : ''
                              }`}
                          />
                        </button>
                      </div>
                    </div>

                    {/* Job Details */}
                    <div className={`transition-all duration-300 ${expandedJob === job.id ? 'block' : 'hidden'}`}>
                      <div className="p-6 space-y-8">
                        {/* Employment Type and Experience Level */}
                        {(job.employmentType || job.experienceLevel) && (
                          <div>
                            <h4 className="text-xl font-bold text-gray-900 mb-4">Position Details</h4>
                            <div className="space-y-2">
                              {job.employmentType && (
                                <p className="text-gray-700">
                                  <span className="font-semibold">Employment Type:</span> {job.employmentType.replace('-', ' ')}
                                </p>
                              )}
                              {job.experienceLevel && (
                                <p className="text-gray-700">
                                  <span className="font-semibold">Experience Level:</span> {job.experienceLevel.replace('-', ' ')}
                                </p>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Responsibilities */}
                        {formattedJob.keyResponsibilities.length > 0 && (
                          <div>
                            <h4 className="text-xl font-bold text-gray-900 mb-4">Responsibilities</h4>
                            <ul className="space-y-2">
                              {formattedJob.keyResponsibilities.map((responsibility, index) => (
                                <li key={index} className="flex items-start gap-2">
                                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                                  <span className="text-gray-700 text-sm leading-relaxed">{responsibility}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Desired Qualities */}
                        {formattedJob.desiredQualities.length > 0 && (
                          <div>
                            <h4 className="text-xl font-bold text-gray-900 mb-4">Desired Qualities</h4>
                            <ul className="space-y-2">
                              {formattedJob.desiredQualities.map((quality, index) => (
                                <li key={index} className="flex items-start gap-2">
                                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                                  <span className="text-gray-700 text-sm leading-relaxed">{quality}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Qualifications */}
                        {formattedJob.qualifications.length > 0 && (
                          <div>
                            <h4 className="text-xl font-bold text-gray-900 mb-4">Qualifications</h4>
                            <ul className="space-y-2">
                              {formattedJob.qualifications.map((qualification, index) => (
                                <li key={index} className="flex items-start gap-2">
                                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                                  <span className="text-gray-700 text-sm leading-relaxed">{qualification}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Apply Button */}
                        <div className="pt-4">
                          <button
                            onClick={() => handleApplyNow(job)}
                            className="bg-[#FFBF00] hover:bg-yellow-500 text-black px-[18px] py-[9px] rounded-[24px] transition-colors"
                          >
                            Apply →
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* Contact Information */}
      <div className="py-8 bg-gray-50">
        <div className="max-w-[1216px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <p className="text-center text-[#363636] text-xl">
              Don't see a position that fits? Send your resume to{' '}
              <a href="mailto:jobs@immunoact.com" className="text-blue-600 hover:text-blue-700 font-medium">
                jobs@immunoact.com
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Application Modal */}
      {showApplicationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <div className="text-center flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Let's Get in Touch with</h2>
                <div className="flex items-center justify-center gap-2">
                  <img src="/api/placeholder/120/40" alt="ImmunoACT" className="h-8" />
                </div>
                <p className="text-gray-600 mt-2">We're here to help you succeed</p>
                {selectedJob && (
                  <p className="text-sm text-blue-600 mt-1">Applying for: {selectedJob.title}</p>
                )}
              </div>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your full name"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your email address"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your phone number"
                />
              </div>

              {/* Current Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Location *
                </label>
                <input
                  type="text"
                  name="currentLocation"
                  value={formData.currentLocation}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your current location"
                />
              </div>

              {/* Current Designation */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Designation *
                </label>
                <input
                  type="text"
                  name="currentDesignation"
                  value={formData.currentDesignation}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your current job designation"
                />
              </div>

              {/* Current/Last Organisation */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current/Last Organisation *
                </label>
                <input
                  type="text"
                  name="currentLastOrganisation"
                  value={formData.currentLastOrganisation}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your current or last organization"
                />
              </div>

              {/* Highest Education */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Highest Education *
                </label>
                <input
                  type="text"
                  name="highestEducation"
                  value={formData.highestEducation}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your highest education qualification"
                />
              </div>

              {/* Notice Period */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notice Period *
                </label>
                <select
                  name="noticePeriod"
                  value={formData.noticePeriod}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                >
                  <option value="">Select notice period</option>
                  <option value="immediate">Immediate</option>
                  <option value="15-days">15 days</option>
                  <option value="1-month">1 month</option>
                  <option value="2-months">2 months</option>
                  <option value="3-months">3 months</option>
                </select>
              </div>

              {/* Comfortable to Relocate */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Comfortable to Relocate *
                </label>
                <select
                  name="comfortableToRelocate"
                  value={formData.comfortableToRelocate}
                  onChange={(e) => setFormData(prev => ({ ...prev, comfortableToRelocate: e.target.value === 'true' }))}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                >
                  <option value="">Select option</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>

              {/* Total Experience */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Total Experience *
                </label>
                <select
                  name="totalExperience"
                  value={formData.totalExperience}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                >
                  <option value="">Select experience</option>
                  <option value="0-1">0-1 years</option>
                  <option value="1-3">1-3 years</option>
                  <option value="3-5">3-5 years</option>
                  <option value="5-10">5-10 years</option>
                  <option value="10+">10+ years</option>
                </select>
              </div>

              {/* Reason for Job Change */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reason for Job Change *
                </label>
                <textarea
                  name="reasonForJobChange"
                  value={formData.reasonForJobChange}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
                  placeholder="Please explain your reason for job change..."
                />
              </div>

              {/* Resume Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Resume *
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600 mb-2">Click to upload or drag and drop</p>
                  <p className="text-sm text-gray-500">PDF, DOC, DOCX (max 5MB)</p>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    id="resume-upload"
                    required
                  />
                  <label
                    htmlFor="resume-upload"
                    className="inline-block mt-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg cursor-pointer transition-colors"
                  >
                    Choose File
                  </label>
                  {formData.resume && (
                    <p className="mt-2 text-sm text-green-600">
                      Selected: {formData.resume.name}
                    </p>
                  )}
                </div>
              </div>

              {/* Cover Letter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cover Letter
                </label>
                <textarea
                  name="coverLetter"
                  value={formData.coverLetter}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
                  placeholder="Tell us why you're interested in this position..."
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-4">
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Careers