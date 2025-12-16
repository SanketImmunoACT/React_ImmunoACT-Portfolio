import { useState } from 'react'
import { ChevronDown, Upload, X } from 'lucide-react'
import BG1 from '@/assets/images/background/BG-1.png'

const Careers = () => {
  const [showApplicationModal, setShowApplicationModal] = useState(false)
  const [selectedJob, setSelectedJob] = useState(null)
  const [expandedJob, setExpandedJob] = useState(null)
  const [formData, setFormData] = useState({
    coverLetter: '',
    currentCTC: '',
    currentLocation: '',
    email: '',
    expectedCTC: '',
    experience: '',
    fullName: '',
    noticePeriod: '',
    phone: '',
    resume: null
  })

  // Dynamic job data - this will be managed by HR through admin dashboard
  const jobListings = [
    {
      id: 1,
      department: "HR & Admin",
      desiredQualities: [
        "Strong leadership and people management capabilities.",
        "Excellent organizational and multitasking skills.",
        "Effective negotiation and vendor management abilities.",
        "In-depth knowledge of office administration, facility management, and compliance processes.",
        "Proficiency in MS Office (Word, Excel, PowerPoint) and ERP systems (if applicable).",
        "Strong communication (written and verbal) skills."
      ],
      isActive: true,
      keyResponsibilities: [
        {
          items: [
            "Manage day-to-day office operations and ensure smooth functioning of all administrative activities.",
            "Oversee maintenance of office infrastructure, facilities, and equipment.",
            "Ensure proper housekeeping, security, and hygiene standards are consistently maintained."
          ],
          title: "Office Administration & Operations"
        },
        {
          items: [
            "Handle vendor negotiations, contracts, and relationships (stationary, travel, housekeeping, security, IT support, etc.).",
            "Monitor service-level agreements (SLAs) and ensure cost-effective, high-quality services."
          ],
          title: "Vendor & Facility Management"
        },
        {
          items: [
            "Ensure adherence to statutory compliances related to administration (health & safety, fire safety, applicable labor laws).",
            "Implement, maintain, and monitor administrative policies and procedures."
          ],
          title: "Compliance & Policies"
        },
        {
          items: [
            "Lead, mentor, and manage the administrative team (reception, office assistants, housekeeping staff, drivers, etc.).",
            "Organize training sessions to improve team productivity and compliance awareness."
          ],
          title: "People & Team Management"
        },
        {
          items: [
            "Oversee domestic and international travel arrangements (tickets, visas, hotels, transportation).",
            "Plan and execute office events, employee engagement activities, and corporate meetings."
          ],
          title: "Travel & Event Management"
        },
        {
          items: [
            "Prepare and manage the administration budget.",
            "Track expenses, control costs, and ensure timely processing of bills and vendor payments."
          ],
          title: "Budgeting & Cost Control"
        },
        {
          items: [
            "Serve as a key point of contact for management and employees regarding administrative queries.",
            "Support HR and other departments in logistics and administrative requirements."
          ],
          title: "Coordination & Support"
        }
      ],
      qualifications: [
        "Master's/Bachelor's degree in Business Administration, Management, or a related field.",
        "6-12 years of experience in administrative or office management role.",
        "Strong experience in facility management, vendor coordination, compliance, and general admin operations.",
        "Proven experience in office or administrative management roles.",
        "Strong leadership abilities with a demonstrated track record of managing teams.",
        "Excellent organizational and multitasking skills.",
        "Proficiency in MS Office, Google Workspace, and other administrative software/tools.",
        "Strong written and verbal communication skills.",
        "Ability to handle confidential information with discretion."
      ],
      title: "Admin Manager"
    },
    {
      id: 2,
      department: "Research & Development",
      desiredQualities: [
        "Experience with CAR-T cell therapy or immunotherapy research.",
        "Knowledge of regulatory requirements for cell and gene therapy products.",
        "Ability to work independently and as part of a multidisciplinary team.",
        "Strong problem-solving skills and analytical thinking.",
        "Commitment to maintaining high-quality standards in all work activities."
      ],
      isActive: true,
      keyResponsibilities: [
        {
          items: [
            "Perform cell culture techniques for CAR-T cell development and expansion.",
            "Maintain sterile conditions and follow GMP guidelines in laboratory operations.",
            "Execute cell harvesting, washing, and cryopreservation procedures."
          ],
          title: "Cell Culture & Processing"
        },
        {
          items: [
            "Conduct viability, purity, and potency testing of cell products.",
            "Perform flow cytometry analysis and interpret results.",
            "Document all testing procedures and maintain accurate records."
          ],
          title: "Quality Control Testing"
        },
        {
          items: [
            "Operate and maintain laboratory equipment including incubators, centrifuges, and flow cytometers.",
            "Perform routine calibration and maintenance of instruments.",
            "Troubleshoot equipment issues and coordinate repairs when necessary."
          ],
          title: "Equipment Management"
        },
        {
          items: [
            "Maintain detailed laboratory notebooks and electronic records.",
            "Ensure compliance with regulatory guidelines and standard operating procedures.",
            "Participate in internal and external audits as required."
          ],
          title: "Documentation & Compliance"
        }
      ],
      qualifications: [
        "Bachelor's degree in Life Sciences, Biotechnology, Microbiology, or related field.",
        "2-5 years of experience in cell culture and molecular biology techniques.",
        "Experience with flow cytometry, cell counting, and viability assays.",
        "Knowledge of GMP guidelines and laboratory safety protocols.",
        "Strong attention to detail and ability to work in a regulated environment.",
        "Proficiency in laboratory information management systems (LIMS).",
        "Excellent documentation and record-keeping skills."
      ],
      title: "Laboratory Technician"
    },
    {
      id: 3,
      department: "Sales & Marketing",
      desiredQualities: [
        "Experience in cell and gene therapy or advanced therapeutics.",
        "Established relationships with key opinion leaders in oncology.",
        "MBA or advanced degree in business or life sciences.",
        "Strong analytical skills and data-driven decision making.",
        "Cultural sensitivity and ability to work in diverse markets."
      ],
      isActive: true,
      keyResponsibilities: [
        {
          items: [
            "Develop and maintain relationships with key healthcare institutions and oncology centers.",
            "Identify new business opportunities and expand market presence.",
            "Negotiate contracts and pricing agreements with key accounts."
          ],
          title: "Account Management"
        },
        {
          items: [
            "Develop and implement strategic account plans to achieve sales targets.",
            "Present product information and clinical data to healthcare professionals.",
            "Coordinate with medical affairs team for scientific support."
          ],
          title: "Sales Strategy & Execution"
        },
        {
          items: [
            "Monitor competitive landscape and market trends in oncology.",
            "Provide feedback to product development and marketing teams.",
            "Analyze market data and prepare sales forecasts."
          ],
          title: "Market Intelligence"
        },
        {
          items: [
            "Provide ongoing support to customers regarding product usage and protocols.",
            "Address customer concerns and resolve issues promptly.",
            "Facilitate training programs for healthcare professionals."
          ],
          title: "Customer Support"
        }
      ],
      qualifications: [
        "Bachelor's degree in Business, Marketing, Life Sciences, or related field.",
        "5-8 years of experience in pharmaceutical or biotech sales.",
        "Strong understanding of oncology market and immunotherapy landscape.",
        "Proven track record in key account management and achieving sales targets.",
        "Excellent communication, presentation, and negotiation skills.",
        "Ability to understand and communicate complex scientific information.",
        "Willingness to travel extensively within assigned territory."
      ],
      title: "Key Account Manager"
    },
    {
      id: 4,
      department: "Clinical Research",
      desiredQualities: [
        "Experience in oncology or cell and gene therapy clinical trials.",
        "Clinical research certification (ACRP, SoCRA, or equivalent).",
        "Knowledge of FDA, EMA, and other regulatory agency requirements.",
        "Experience with adaptive trial designs and complex protocols.",
        "Multilingual capabilities for international studies."
      ],
      isActive: true,
      keyResponsibilities: [
        {
          items: [
            "Monitor clinical trial sites to ensure protocol compliance and data quality.",
            "Conduct site initiation, routine monitoring, and close-out visits.",
            "Review and verify source documents and case report forms."
          ],
          title: "Clinical Trial Monitoring"
        },
        {
          items: [
            "Ensure adherence to GCP guidelines and regulatory requirements.",
            "Maintain trial master files and essential documents.",
            "Support regulatory inspections and audits."
          ],
          title: "Regulatory Compliance"
        },
        {
          items: [
            "Build and maintain relationships with principal investigators and site staff.",
            "Provide training and support to clinical sites on study procedures.",
            "Monitor patient recruitment and enrollment progress."
          ],
          title: "Site Management"
        },
        {
          items: [
            "Review clinical data for accuracy, completeness, and consistency.",
            "Generate and follow up on data queries with clinical sites.",
            "Collaborate with data management team on database activities."
          ],
          title: "Data Management"
        }
      ],
      qualifications: [
        "Bachelor's degree in Life Sciences, Medicine, Nursing, or related field.",
        "3-6 years of clinical research experience in pharmaceutical or biotech industry.",
        "Strong knowledge of GCP, ICH guidelines, and regulatory requirements.",
        "Experience with clinical trial management systems and electronic data capture.",
        "Excellent organizational skills and attention to detail.",
        "Strong communication and interpersonal skills.",
        "Ability to travel frequently to clinical sites."
      ],
      title: "Clinical Research Associate"
    },
    {
      id: 5,
      department: "Regulatory Affairs",
      desiredQualities: [
        "Regulatory Affairs Certification (RAC) or equivalent professional certification.",
        "Experience with breakthrough therapy designations and accelerated approval pathways.",
        "Knowledge of CMC requirements for biological products.",
        "International regulatory experience across multiple jurisdictions.",
        "Strong analytical and problem-solving skills."
      ],
      isActive: true,
      keyResponsibilities: [
        {
          items: [
            "Develop regulatory strategies for product development and commercialization.",
            "Provide regulatory guidance to cross-functional teams throughout product lifecycle.",
            "Monitor regulatory landscape and assess impact on business operations."
          ],
          title: "Regulatory Strategy"
        },
        {
          items: [
            "Prepare and submit regulatory applications (IND, BLA, MAA) to health authorities.",
            "Coordinate with external consultants and regulatory agencies.",
            "Manage regulatory timelines and ensure compliance with submission requirements."
          ],
          title: "Regulatory Submissions"
        },
        {
          items: [
            "Ensure compliance with applicable regulations and guidelines.",
            "Maintain regulatory databases and tracking systems.",
            "Support regulatory inspections and respond to agency queries."
          ],
          title: "Compliance Management"
        },
        {
          items: [
            "Work closely with clinical, manufacturing, and quality teams.",
            "Provide regulatory input on product labeling and promotional materials.",
            "Support business development activities with regulatory assessments."
          ],
          title: "Cross-functional Collaboration"
        }
      ],
      qualifications: [
        "Master's degree in Life Sciences, Pharmacy, Law, or related field.",
        "4-7 years of regulatory affairs experience in biotechnology or pharmaceutical industry.",
        "Strong knowledge of FDA, EMA, and other international regulatory requirements.",
        "Experience with cell and gene therapy or advanced therapeutic products preferred.",
        "Excellent written and verbal communication skills.",
        "Strong project management and organizational abilities.",
        "Ability to work effectively in a fast-paced, dynamic environment."
      ],
      title: "Regulatory Affairs Specialist"
    },
    {
      id: 6,
      department: "Quality Assurance",
      desiredQualities: [
        "Experience with cell and gene therapy manufacturing and quality systems.",
        "Quality management certification (ASQ CQE, CQA, or equivalent).",
        "Experience with risk-based quality management approaches.",
        "Knowledge of international quality standards and regulations.",
        "Change management and organizational development experience."
      ],
      isActive: true,
      keyResponsibilities: [
        {
          items: [
            "Develop, implement, and maintain quality management systems.",
            "Ensure compliance with GMP, GLP, and other applicable quality standards.",
            "Lead quality system improvements and corrective/preventive actions."
          ],
          title: "Quality System Management"
        },
        {
          items: [
            "Plan and conduct internal quality audits across all functional areas.",
            "Support external audits and regulatory inspections.",
            "Manage audit findings and ensure timely resolution of issues."
          ],
          title: "Audit & Inspection Management"
        },
        {
          items: [
            "Lead and mentor quality assurance team members.",
            "Provide quality training and awareness programs to all staff.",
            "Foster a culture of quality and continuous improvement."
          ],
          title: "Team Leadership"
        },
        {
          items: [
            "Identify and assess quality risks throughout the organization.",
            "Implement risk mitigation strategies and monitoring systems.",
            "Investigate quality incidents and implement corrective measures."
          ],
          title: "Risk Management"
        }
      ],
      qualifications: [
        "Master's degree in Life Sciences, Engineering, or related field.",
        "8-12 years of quality assurance experience in pharmaceutical or biotech industry.",
        "Strong knowledge of GMP, ICH guidelines, and regulatory requirements.",
        "Experience in quality system implementation and management.",
        "Proven leadership and team management skills.",
        "Excellent analytical and problem-solving abilities.",
        "Strong communication and presentation skills."
      ],
      title: "Quality Assurance Manager"
    }
  ]

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
      coverLetter: '',
      currentCTC: '',
      currentLocation: '',
      email: '',
      expectedCTC: '',
      experience: '',
      fullName: '',
      noticePeriod: '',
      phone: '',
      resume: null
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

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission here - will integrate with backend API
    console.log('Application submitted:', formData)
    alert('Application submitted successfully!')
    handleCloseModal()
  }

  // Filter only active jobs (this will be managed by HR in admin dashboard)
  const activeJobs = jobListings.filter(job => job.isActive)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div
        className="relative h-[587px] bg-cover bg-center bg-no-repeat flex items-center justify-center"
        style={{
          backgroundImage: `url(${BG1})`
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'linear-gradient(120deg, #ffbf00, rgba(255, 72, 0, 0.67), rgba(20, 166, 42, 0.7))'
          }}
        ></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-2 border-white rounded-3xl py-20 sm:py-32 lg:py-40 px-6 sm:px-8 lg:px-12 text-center max-w-[1216px] mx-auto">
            <h1 className="text-5xl md:text-[80px] text-white opacity-[0.5] font-light">Careers</h1>
            <p className="text-4xl text-white max-w-3xl mx-auto mt-2">
              Your ambition, our opportunity to excel
            </p>
          </div>
        </div>
      </div>

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
          <div className="space-y-6">
            {activeJobs.map((job) => (
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
                    {/* Key Responsibilities */}
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 mb-4">Key Responsibilities</h4>
                      <div className="space-y-4">
                        {job.keyResponsibilities.map((section, index) => (
                          <div key={index}>
                            <h5 className="text-lg font-semibold text-gray-800 mb-2">
                              {index + 1}. {section.title}
                            </h5>
                            <ul className="space-y-2 ml-4">
                              {section.items.map((item, itemIndex) => (
                                <li key={itemIndex} className="flex items-start gap-2">
                                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                                  <span className="text-gray-700 text-sm leading-relaxed">{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Qualifications & Educational Requirements */}
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 mb-4">Qualifications & Educational Requirements</h4>
                      <ul className="space-y-2">
                        {job.qualifications.map((qualification, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                            <span className="text-gray-700 text-sm leading-relaxed">{qualification}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Desired Qualities */}
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 mb-4">Desired Qualities</h4>
                      <ul className="space-y-2">
                        {job.desiredQualities.map((quality, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                            <span className="text-gray-700 text-sm leading-relaxed">{quality}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

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
            ))}
          </div>
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
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
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

              {/* Experience */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Total Experience *
                </label>
                <select
                  name="experience"
                  value={formData.experience}
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

              {/* Current CTC */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current CTC
                </label>
                <input
                  type="text"
                  name="currentCTC"
                  value={formData.currentCTC}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your current CTC"
                />
              </div>

              {/* Expected CTC */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expected CTC
                </label>
                <input
                  type="text"
                  name="expectedCTC"
                  value={formData.expectedCTC}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your expected CTC"
                />
              </div>

              {/* Notice Period */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notice Period
                </label>
                <select
                  name="noticePeriod"
                  value={formData.noticePeriod}
                  onChange={handleInputChange}
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
                  Send
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