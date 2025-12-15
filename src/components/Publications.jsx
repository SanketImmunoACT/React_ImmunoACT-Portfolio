const Publications = () => {
  const publications = [
    {
      title: "Novel humanized CD19-CAR-T (Now talicabtagene autoleucel, Tali-celTM) cells in relapsed/ refractory pediatric B-acute lymphoblastic leukemia- an open-label single-arm phase-I/Ib study",
      type: "Article",
      date: "Apr 24, 2025",
      journal: "Blood Cancer Journal"
    },
    {
      title: "Talicabtagene Autoleucel for Relapsed or Refractory B-cell Malignancies: Results from an Open-label, Multicentre, Phase 1/2 Study",
      type: "Article",
      date: "Apr 1, 2025",
      journal: "The Lancent Haemotology"
    },
    {
      title: "Excellent Safety Profile of a Low-Cost Novel Humanized CD19 CAR T-Cell Therapy, Actalycabtagene Autoleucel : Potential Impact on Access and Feasibility",
      type: "Abstract",
      date: "Dec 9, 2023",
      journal: "American Society of Hematology Meeting"
    }
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">Publications</h2>
        
        <p className="text-lg text-gray-600 text-center mb-12 max-w-4xl mx-auto leading-relaxed">
          Read our publications, published in prestigious journals such as The Lancet 
          Haematology, Molecular Cancer Therapeutics by AACR and Blood by the American 
          Society of Hematology.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {publications.map((pub, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 leading-tight">{pub.title}</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div><span className="font-medium">Type:</span> {pub.type}</div>
                <div><span className="font-medium">Date:</span> {pub.date}</div>
                <div><span className="font-medium">Journal:</span> {pub.journal}</div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <button className="border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white px-8 py-3 rounded-lg font-semibold transition-colors">
            View More
          </button>
        </div>
      </div>
    </section>
  )
}

export default Publications