import PageBanner from '@/components/PageBanner'

const Research = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-futura">
      <PageBanner 
        title="Research" 
        subtitle="Advancing the frontiers of CAR-T cell therapy through innovative research and development."
      />

      <section className="py-16 bg-white">
        <div className="max-w-[1216px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-800 mb-8">Our Research Focus</h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto">
              Our research team is dedicated to developing next-generation CAR-T cell therapies 
              that are more effective, safer, and accessible to patients worldwide.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Research