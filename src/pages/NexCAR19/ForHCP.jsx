const ForHCP = () => {
  const clinicalData = [
    {
      indication: "B-ALL (Pediatric)",
      remissionRate: "73%",
      followUp: "3 months",
      patients: "50+"
    },
    {
      indication: "B-NHL (Adult)",
      remissionRate: "68%", 
      followUp: "3 months",
      patients: "100+"
    },
    {
      indication: "Overall",
      remissionRate: "90%",
      followUp: "Overall",
      patients: "200+"
    }
  ]

  const specifications = [
    {
      parameter: "Vein-to-Vein Time",
      value: "~20 days",
      description: "From apheresis to infusion"
    },
    {
      parameter: "Manufacturing Success Rate",
      value: ">95%",
      description: "Successful product generation"
    },
    {
      parameter: "Cell Viability",
      value: ">85%",
      description: "Post-manufacturing viability"
    },
    {
      parameter: "Expansion Fold",
      value: "100-1000x",
      description: "Cell expansion during manufacturing"
    }
  ]

  return (
    <>
      {/* Clinical Efficacy - For HCP */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Clinical Efficacy Data</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              NexCAR19™ has demonstrated significant efficacy across multiple B-cell malignancies 
              in our clinical trials.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {clinicalData.map((data, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-sm">
                <h3 className="text-2xl font-bold text-blue-600 mb-4">{data.indication}</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Remission Rate:</span>
                    <span className="font-bold text-gray-800">{data.remissionRate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Follow-up:</span>
                    <span className="font-bold text-gray-800">{data.followUp}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Patients:</span>
                    <span className="font-bold text-gray-800">{data.patients}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Specifications - For HCP */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Product Specifications</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Technical specifications and manufacturing parameters for NexCAR19™.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {specifications.map((spec, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-xl text-center">
                <h3 className="text-lg font-bold text-gray-800 mb-2">{spec.parameter}</h3>
                <div className="text-3xl font-bold text-teal-600 mb-2">{spec.value}</div>
                <p className="text-sm text-gray-600">{spec.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety Profile - For HCP */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Safety Profile</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Adverse Events</h3>
              <div className="space-y-4">
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h4 className="font-bold text-yellow-800 mb-2">Cytokine Release Syndrome (CRS)</h4>
                  <p className="text-yellow-700">Grade 1-2: 60%, Grade 3-4: 15%</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-bold text-blue-800 mb-2">Neurological Events</h4>
                  <p className="text-blue-700">Grade 1-2: 25%, Grade 3-4: 5%</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-bold text-green-800 mb-2">Manageable Profile</h4>
                  <p className="text-green-700">All events were manageable with standard protocols</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Monitoring Guidelines</h3>
              <div className="space-y-4">
                <div className="border-l-4 border-orange-500 pl-4">
                  <h4 className="font-bold text-gray-800">Pre-infusion</h4>
                  <p className="text-gray-600">Complete blood count, metabolic panel, coagulation studies</p>
                </div>
                <div className="border-l-4 border-teal-500 pl-4">
                  <h4 className="font-bold text-gray-800">Post-infusion</h4>
                  <p className="text-gray-600">Daily monitoring for first 7 days, then weekly for 4 weeks</p>
                </div>
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-bold text-gray-800">Long-term</h4>
                  <p className="text-gray-600">Monthly follow-up for first year, then quarterly</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resources - For HCP */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Resources for HCPs</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Access comprehensive resources to support your patients throughout their NexCAR19™ journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-xl text-center">
              <div className="text-4xl mb-4">📋</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Clinical Protocols</h3>
              <p className="text-gray-600 mb-4">Detailed treatment protocols and guidelines</p>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors">
                Download
              </button>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl text-center">
              <div className="text-4xl mb-4">🎓</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Training Materials</h3>
              <p className="text-gray-600 mb-4">Educational resources and training modules</p>
              <button className="bg-teal-600 text-white px-6 py-2 rounded-full hover:bg-teal-700 transition-colors">
                Access
              </button>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl text-center">
              <div className="text-4xl mb-4">📞</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Medical Support</h3>
              <p className="text-gray-600 mb-4">24/7 medical support hotline</p>
              <button className="bg-orange-600 text-white px-6 py-2 rounded-full hover:bg-orange-700 transition-colors">
                Contact
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ForHCP