const ImpactStats = () => {
  const stats = [
    {
      number: "90%",
      label: "Remission Rate"
    },
    {
      number: "200+",
      label: "Patients Treated"
    },
    {
      number: "2x",
      label: "Likely To Stay Cancer-free"
    },
    {
      number: "2yrs",
      label: "Longest Remission Rate"
    }
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Impact of NexCAR 19</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center p-8 bg-gray-50 rounded-xl">
              <div className="text-5xl font-bold text-primary-500 mb-2">{stat.number}</div>
              <div className="text-lg text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ImpactStats