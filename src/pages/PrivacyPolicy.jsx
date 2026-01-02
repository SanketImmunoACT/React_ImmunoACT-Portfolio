import PageBanner from '@/components/PageBanner'

const PrivacyPolicy = () => {
  const lastUpdated = "December 25, 2025"

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with PageBanner */}
      <PageBanner title="Privacy Policy" subtitle="Committed to clear, comprehensive data protection" />

      {/* Content Section */}
      <section className="py-16 bg-white text-[#363636]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Last Updated */}
          <p className="font-medium text-[22px] mb-6">
            Effective Date: {lastUpdated}
          </p>
          <p className="text-[22px] leading-relaxed mb-6">
            ImmunoACT Pvt. Ltd. ("we," "our," or "us") is committed to protecting your privacy and personal
            information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information
            when you visit our website, use our services, or interact with us.
          </p>

          {/* 1. Introduction */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold  mb-4 border-b border-gray-200 pb-2">
              1. Introduction
            </h2>
            <p className="text-[22px] leading-relaxed mb-6">
              At ImmunoACT, we develop innovative cell and gene therapies, including NexCAR19, to improve patient outcomes in cancer treatment. We recognize that your privacy is important, and we take great care in handling the personal data you share with us. This Privacy Policy applies to all personal and clinical information collected via our website, communications, and other interactions with ImmunoACT.
            </p>
            <p className="text-lg leading-relaxed">
              Please read this Privacy Policy carefully. By using our services, you agree to the collection and
              use of information in accordance with this policy.
            </p>
          </div>

          {/* 2. Information We Collect */}
          <div className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 border-b border-gray-200 pb-2">
              2. Information We Collect
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-[22px] font-medium mb-3">A. Personal Information</h3>
                <p className="mb-3 text-xl">
                  We may collect personal information that you voluntarily provide to us, including but not limited to:
                </p>
                <ul className="space-y-1 ml-6 list-disc text-lg">
                  <li>Name, email address, phone number, and contact information</li>
                  <li>Professional credentials and medical license information (for healthcare providers)</li>
                  <li>Medical history and treatment information (for patients, with appropriate consent)</li>
                  <li>Employment and educational background (for job applicants)</li>
                  <li>Communication preferences and feedback</li>
                </ul>
              </div>

              <div>
                <h3 className="text-[22px] font-medium mb-3">B. Automatically Collected Information</h3>
                <p className="mb-3 text-xl">
                  When you visit our website, we may automatically collect certain information about your device and usage:
                </p>
                <ul className="space-y-1 ml-6 list-disc text-lg">
                  <li>IP address, browser type, and operating system</li>
                  <li>Pages visited, time spent on pages, and click-through rates</li>
                  <li>Referring website and search terms used to find our site</li>
                  <li>Device identifiers and mobile network information</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 3. How We Use Your Information */}
          <div className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 border-b border-gray-200 pb-2">
              3. How We Use Your Information
            </h2>

            <p className="mb-4 text-xl">We use the information we collect for the following purposes:</p>
            <ul className="space-y-2 ml-6 list-disc text-lg">
              <li>To provide, maintain, and improve our services and treatments</li>
              <li>To communicate with you about our services, research updates, and important notices</li>
              <li>To process job applications and manage employment-related communications</li>
              <li>To conduct clinical research and studies (with appropriate consent and ethical approval)</li>
              <li>To comply with legal obligations and regulatory requirements</li>
              <li>To protect the security and integrity of our services and prevent fraud</li>
              <li>To analyze website usage patterns and improve user experience</li>
              <li>To respond to your inquiries and provide customer support</li>
            </ul>
          </div>

          {/* 4. Information Sharing and Disclosure */}
          <div className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 border-b border-gray-200 pb-2">
              4. Information Sharing and Disclosure
            </h2>

            <p className="mb-4 text-xl">
              We do not sell, trade, or otherwise transfer your personal information to third parties without your consent,
              except in the following limited circumstances:
            </p>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">With Service Providers:</h3>
                <p className="text-base">
                  We may share information with trusted third-party service providers who assist us in operating our
                  business, conducting research, or providing services to you.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">For Healthcare Purposes:</h3>
                <p className="text-base">
                  We may share patient information with healthcare providers, hospitals, and medical professionals
                  involved in your treatment, with appropriate consent and authorization.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Legal Requirements:</h3>
                <p className="text-base">
                  We may disclose information when required by law, regulation, legal process, or governmental request,
                  or to protect our rights, property, or safety.
                </p>
              </div>
            </div>
          </div>

          {/* 5. Data Security */}
          <div className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 border-b border-gray-200 pb-2">
              5. Data Security
            </h2>

            <p className="mb-4 text-xl">
              We implement comprehensive security measures to protect your personal information:
            </p>
            <ul className="space-y-2 ml-6 list-disc text-lg">
              <li>Encryption of sensitive data both in transit and at rest</li>
              <li>Regular security assessments and vulnerability testing</li>
              <li>Multi-factor authentication and access controls</li>
              <li>Employee training on data protection and privacy best practices</li>
              <li>Compliance with healthcare data protection standards (HIPAA, GDPR where applicable)</li>
              <li>Secure data centers with physical and environmental controls</li>
            </ul>
          </div>

          {/* 6. Your Rights */}
          <div className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 border-b border-gray-200 pb-2">
              6. Your Rights
            </h2>

            <p className="mb-4 text-xl">Depending on your location, you may have the following rights regarding your personal information:</p>
            <ul className="space-y-2 ml-6 list-disc text-lg">
              <li>Access: Request copies of your personal information</li>
              <li>Rectification: Request correction of inaccurate or incomplete information</li>
              <li>Erasure: Request deletion of your personal information (subject to legal requirements)</li>
              <li>Portability: Request transfer of your data to another organization</li>
              <li>Restriction: Request limitation of processing of your personal information</li>
              <li>Objection: Object to processing of your personal information</li>
              <li>Withdraw consent: Withdraw previously given consent at any time</li>
            </ul>
          </div>

          {/* 7. Cookies and Tracking */}
          <div className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 border-b border-gray-200 pb-2">
              7. Cookies and Tracking Technologies
            </h2>

            <p className="mb-4 text-xl">
              We use cookies and similar tracking technologies to enhance your experience on our website:
            </p>
            <ul className="space-y-2 ml-6 list-disc text-lg">
              <li>Essential cookies: Required for basic website functionality</li>
              <li>Analytics cookies: Help us understand how visitors use our website</li>
              <li>Functional cookies: Remember your preferences and settings</li>
              <li>Marketing cookies: Used to deliver relevant advertisements</li>
            </ul>
            <p className="mt-4 text-base">
              You can control cookie settings through your browser preferences, though disabling certain cookies
              may affect website functionality.
            </p>
          </div>

          {/* 8. Changes to This Policy */}
          <div className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 border-b border-gray-200 pb-2">
              8. Changes to This Privacy Policy
            </h2>

            <p className="text-xl">
              We may update this Privacy Policy from time to time to reflect changes in our practices, technology,
              legal requirements, or other factors. We will notify you of any material changes by posting the updated
              policy on our website and updating the effective date. We encourage you to review this policy periodically.
            </p>
          </div>

          {/* 9. Contact Us */}
          <div className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 border-b border-gray-200 pb-2">
              9. Contact Us
            </h2>

            <p className="mb-4 text-xl">
              If you have any questions about this Privacy Policy or our privacy practices, please contact us:
            </p>

            <div className="bg-gray-50 rounded-lg p-6 space-y-3">
              <p className="">
                <span className="font-semibold text-lg">ImmunoACT Pvt. Ltd.</span>
              </p>
              <p className="text-base">
                <span className="font-semibold">Email:</span> privacy@immunoact.in
              </p>
              <p className="text-base">
                <span className="font-semibold">Phone:</span> +91 22 4825 9140
              </p>
              <p className="text-base">
                <span className="font-semibold">Address:</span> S Central Rd, MIDC Industrial Area, Shiravane, Nerul, Navi Mumbai, Maharashtra, India
              </p>
            </div>
          </div>

        </div>
      </section>
    </div>
  )
}

export default PrivacyPolicy