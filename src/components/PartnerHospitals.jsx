const PartnerHospitals = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">Partnered Hospitals</h2>
        
        <div className="text-center mb-12">
          <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
            Our strong association with over 80 leading cancer treatment hospitals 
            in India ensures hassle-free treatment with our CAR-T cell therapies.
          </p>
          
          <button className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
            Find A Treatment Centre Near You
          </button>
        </div>
        
        <div className="text-center max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold text-gray-800 mb-4">Strategic Collaborations</h3>
          <p className="text-lg text-gray-600 leading-relaxed">
            To advance the research and development of our innovative gene-modified 
            cell therapies, we are fostering relationships across academia, healthcare 
            institutions, and strategic partnerships with the intent to equitize access.
          </p>
        </div>
      </div>
    </section>
  )
}

export default PartnerHospitals