import PageBanner from '@/components/PageBanner'

const Philanthropy = () => {
  return (
    <div className="min-h-screen font-futura">
      {/* Hero Section */}
      <PageBanner title="Humanity" subtitle="Philanthropic Initiatives" />

      {/* About ImmunoACT Foundation Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-normal text-[#47A178] font-futura mb-8">
              About ImmunoACT Foundation
            </h2>

            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p>
                Recognizing the broad disease landscape of patients who may be eligible to receive CAR-T cell therapies but are unable to do so due to socio-economic bereavement or healthcare resource exhaustion – the ImmunoACT Foundation was created to bridge the gap in access-to-funding, access-to-supportive-care, and most importantly, access to life-saving CAR-T cell therapies at the time when they are needed most.
              </p>

              <p>
                Learn how you can support our philanthropic initiatives here – to enable a better quality of life for patients. These initiatives solely place patients first & foremost, as a significant pillar in our mission to broaden access to CAR-T cell therapies.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Philanthropy