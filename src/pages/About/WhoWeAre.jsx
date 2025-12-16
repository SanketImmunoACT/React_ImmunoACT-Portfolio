import PageBanner from '@/components/PageBanner'

const WhoWeAre = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-futura">
      {/* Hero Section */}
      <PageBanner 
        title="Who We Are" 
        subtitle="Pioneering India's first indigenous CAR-T cell therapy company, dedicated to making advanced cancer treatment accessible to all."
      />

      {/* Content Section */}
      <section className="py-16 bg-white">
        <div className="max-w-[1216px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Our Mission</h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              ImmunoACT is India's pioneering CAR-T cell therapy company, committed to transforming 
              cancer treatment through innovative, accessible, and affordable immunotherapy solutions. 
              We believe that every patient deserves access to cutting-edge treatment, regardless of 
              their economic background.
            </p>

            <h2 className="text-3xl font-bold text-gray-800 mb-8">Our Vision</h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              To become the leading provider of CAR-T cell therapies in India and beyond, 
              making advanced cancer treatment accessible to patients worldwide while maintaining 
              the highest standards of safety and efficacy.
            </p>

            <h2 className="text-3xl font-bold text-gray-800 mb-8">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-orange-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-orange-600 mb-3">Innovation</h3>
                <p className="text-gray-600">Continuously pushing the boundaries of medical science to develop breakthrough treatments.</p>
              </div>
              <div className="bg-teal-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-teal-600 mb-3">Accessibility</h3>
                <p className="text-gray-600">Making advanced treatments available to patients across all economic backgrounds.</p>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-blue-600 mb-3">Excellence</h3>
                <p className="text-gray-600">Maintaining the highest standards in research, manufacturing, and patient care.</p>
              </div>
              <div className="bg-purple-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-purple-600 mb-3">Compassion</h3>
                <p className="text-gray-600">Putting patients first in everything we do, with empathy and understanding.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default WhoWeAre