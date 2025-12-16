import PageBanner from '@/components/PageBanner'
import { Eye, FileText, Lock, Mail, Shield, Users } from 'lucide-react'

const PrivacyPolicy = () => {
  const lastUpdated = "December 16, 2024"

  return (
    // <div className="min-h-screen bg-gray-50 font-futura">
    //   {/* Hero Section */}
    //   <PageBanner 
    //     title="Privacy Policy" 
    //     subtitle="Your privacy is important to us. Learn how we collect, use, and protect your personal information."
    //   />

    //   {/* Content Section */}
    //   <section className="py-16 bg-white">
    //     <div className="max-w-[1216px] mx-auto px-4 sm:px-6 lg:px-8">
    //       <div className="max-w-4xl mx-auto">
    //         {/* Last Updated */}
    //         <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
    //           <p className="text-blue-800 font-medium">
    //             Last updated: {lastUpdated}
    //           </p>
    //         </div>

    //         {/* Introduction */}
    //         <div className="mb-12">
    //           <h2 className="text-3xl font-bold text-gray-800 mb-6">Introduction</h2>
    //           <p className="text-lg text-gray-600 leading-relaxed mb-6">
    //             ImmunoACT Pvt. Ltd. ("we," "our," or "us") is committed to protecting your privacy. 
    //             This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
    //             when you visit our website, use our services, or interact with us.
    //           </p>
    //           <p className="text-gray-600 leading-relaxed">
    //             Please read this Privacy Policy carefully. If you do not agree with the terms of this 
    //             Privacy Policy, please do not access or use our services.
    //           </p>
    //         </div>

    //         {/* Information We Collect */}
    //         <div className="mb-12">
    //           <div className="flex items-center gap-3 mb-6">
    //             <FileText className="w-6 h-6 text-blue-600" />
    //             <h2 className="text-3xl font-bold text-gray-800">Information We Collect</h2>
    //           </div>
              
    //           <div className="space-y-6">
    //             <div>
    //               <h3 className="text-xl font-semibold text-gray-800 mb-3">Personal Information</h3>
    //               <p className="text-gray-600 mb-3">
    //                 We may collect personal information that you voluntarily provide to us, including:
    //               </p>
    //               <ul className="text-gray-600 space-y-2 ml-6">
    //                 <li>• Name, email address, and contact information</li>
    //                 <li>• Professional credentials and medical license information (for healthcare providers)</li>
    //                 <li>• Medical history and treatment information (for patients, with consent)</li>
    //                 <li>• Employment information (for job applicants)</li>
    //                 <li>• Communication preferences and feedback</li>
    //               </ul>
    //             </div>

    //             <div>
    //               <h3 className="text-xl font-semibold text-gray-800 mb-3">Automatically Collected Information</h3>
    //               <p className="text-gray-600 mb-3">
    //                 When you visit our website, we may automatically collect certain information:
    //               </p>
    //               <ul className="text-gray-600 space-y-2 ml-6">
    //                 <li>• IP address and browser information</li>
    //                 <li>• Device information and operating system</li>
    //                 <li>• Pages visited and time spent on our website</li>
    //                 <li>• Referring website and search terms used</li>
    //                 <li>• Cookies and similar tracking technologies</li>
    //               </ul>
    //             </div>
    //           </div>
    //         </div>

    //         {/* How We Use Information */}
    //         <div className="mb-12">
    //           <div className="flex items-center gap-3 mb-6">
    //             <Eye className="w-6 h-6 text-blue-600" />
    //             <h2 className="text-3xl font-bold text-gray-800">How We Use Your Information</h2>
    //           </div>
              
    //           <p className="text-gray-600 mb-4">We use the information we collect to:</p>
    //           <ul className="text-gray-600 space-y-2 ml-6 mb-6">
    //             <li>• Provide and improve our services and treatments</li>
    //             <li>• Communicate with you about our services, research, and updates</li>
    //             <li>• Process job applications and employment-related communications</li>
    //             <li>• Conduct research and clinical studies (with appropriate consent)</li>
    //             <li>• Comply with legal and regulatory requirements</li>
    //             <li>• Protect the security and integrity of our services</li>
    //             <li>• Analyze website usage and improve user experience</li>
    //           </ul>
    //         </div>

    //         {/* Information Sharing */}
    //         <div className="mb-12">
    //           <div className="flex items-center gap-3 mb-6">
    //             <Users className="w-6 h-6 text-blue-600" />
    //             <h2 className="text-3xl font-bold text-gray-800">Information Sharing and Disclosure</h2>
    //           </div>
              
    //           <p className="text-gray-600 mb-4">
    //             We do not sell, trade, or otherwise transfer your personal information to third parties, 
    //             except in the following circumstances:
    //           </p>
    //           <ul className="text-gray-600 space-y-2 ml-6">
    //             <li>• With your explicit consent</li>
    //             <li>• To healthcare providers involved in your treatment (for patients)</li>
    //             <li>• To regulatory authorities as required by law</li>
    //             <li>• To service providers who assist us in operating our business</li>
    //             <li>• In connection with a merger, acquisition, or sale of assets</li>
    //             <li>• To protect our rights, property, or safety, or that of others</li>
    //           </ul>
    //         </div>

    //         {/* Data Security */}
    //         <div className="mb-12">
    //           <div className="flex items-center gap-3 mb-6">
    //             <Lock className="w-6 h-6 text-blue-600" />
    //             <h2 className="text-3xl font-bold text-gray-800">Data Security</h2>
    //           </div>
              
    //           <p className="text-gray-600 mb-4">
    //             We implement appropriate technical and organizational security measures to protect your 
    //             personal information against unauthorized access, alteration, disclosure, or destruction:
    //           </p>
    //           <ul className="text-gray-600 space-y-2 ml-6">
    //             <li>• Encryption of sensitive data in transit and at rest</li>
    //             <li>• Regular security assessments and updates</li>
    //             <li>• Access controls and authentication measures</li>
    //             <li>• Employee training on data protection and privacy</li>
    //             <li>• Compliance with healthcare data protection standards</li>
    //           </ul>
    //         </div>

    //         {/* Your Rights */}
    //         <div className="mb-12">
    //           <div className="flex items-center gap-3 mb-6">
    //             <Shield className="w-6 h-6 text-blue-600" />
    //             <h2 className="text-3xl font-bold text-gray-800">Your Privacy Rights</h2>
    //           </div>
              
    //           <p className="text-gray-600 mb-4">You have the right to:</p>
    //           <ul className="text-gray-600 space-y-2 ml-6">
    //             <li>• Access and review your personal information</li>
    //             <li>• Request correction of inaccurate or incomplete information</li>
    //             <li>• Request deletion of your personal information (subject to legal requirements)</li>
    //             <li>• Opt-out of marketing communications</li>
    //             <li>• Request data portability where applicable</li>
    //             <li>• Lodge a complaint with relevant data protection authorities</li>
    //           </ul>
    //         </div>

    //         {/* Contact Information */}
    //         <div className="mb-12">
    //           <div className="flex items-center gap-3 mb-6">
    //             <Mail className="w-6 h-6 text-blue-600" />
    //             <h2 className="text-3xl font-bold text-gray-800">Contact Us</h2>
    //           </div>
              
    //           <p className="text-gray-600 mb-4">
    //             If you have questions about this Privacy Policy or our privacy practices, please contact us:
    //           </p>
    //           <div className="bg-gray-50 rounded-lg p-6">
    //             <div className="space-y-3">
    //               <p className="text-gray-700">
    //                 <span className="font-semibold">Email:</span> privacy@immunoact.in
    //               </p>
    //               <p className="text-gray-700">
    //                 <span className="font-semibold">Address:</span> ImmunoACT Pvt. Ltd.<br />
    //                 Mumbai, Maharashtra, India
    //               </p>
    //               <p className="text-gray-700">
    //                 <span className="font-semibold">Phone:</span> +91 22 6789 1234
    //               </p>
    //             </div>
    //           </div>
    //         </div>

    //         {/* Changes to Policy */}
    //         <div className="mb-12">
    //           <h2 className="text-3xl font-bold text-gray-800 mb-6">Changes to This Privacy Policy</h2>
    //           <p className="text-gray-600 leading-relaxed">
    //             We may update this Privacy Policy from time to time. We will notify you of any changes 
    //             by posting the new Privacy Policy on this page and updating the "Last updated" date. 
    //             You are advised to review this Privacy Policy periodically for any changes.
    //           </p>
    //         </div>
    //       </div>
    //     </div>
    //   </section>
    // </div>
    <p>Hello world</p>
  )
}

export default PrivacyPolicy