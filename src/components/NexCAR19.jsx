const NexCAR19 = () => {
  const impactStats = [
    {
      label: "Total Patients Treated",
      value: "200+",
      description: "Lives transformed through treatment"
    },
    {
      label: "B-NHL Remission Rate",
      value: "68%",
      description: "at 3 months in clinical trials"
    },
    {
      label: "B-ALL Rate",
      value: "73%",
      description: "at 3 months in clinical trials"
    },
    {
      label: "Vein-To-Vein Time",
      value: "~20",
      description: "days in Clinical Trials"
    },
    {
      label: "Longest Remission",
      value: "2+",
      description: "years of sustained response"
    }
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">What is NexCAR19™?</h2>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
            NexCAR19™ is a CAR-T cell therapy that involves the genetic modification 
            of your T-cells in a lab, empowering them to identify and destroy specific 
            cancerous B-cells upon re-introduction into the body.
          </p>
        </div>
        
        <div className="mb-12">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-8">NexCAR19™'s Impact</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {impactStats.map((stat, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-xl text-center">
                <h4 className="text-sm font-medium text-gray-600 mb-3">{stat.label}</h4>
                <div className="text-4xl font-bold text-primary-500 mb-2">{stat.value}</div>
                <p className="text-sm text-gray-500">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default NexCAR19