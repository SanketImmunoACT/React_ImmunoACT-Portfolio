const PatientStories = () => {
  const stories = [
    {
      name: "Ramnath Vishnu",
      story: "After years of setbacks with traditional treatments, CAR-T cell therapy changed everything. The idea of using my own cells to fight the cancer gave me hope. Now, I'm in remission, and I feel like I've truly gotten my life back. I can finally look forward to the future without fear.",
      title: "Cancer Survivor"
    }
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">Real Stories of Hope</h2>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
            At ImmunoACT, we believe that every patient story matters. Our CAR-T cell 
            therapies are transforming lives—bringing hope where options were once limited. 
            These powerful testimonials reflect not only the resilience of our patients 
            but also the impact of cutting-edge, gene-modified cell therapy.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {stories.map((story, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-lg">
              <div className="mb-6">
                <p className="text-lg text-gray-600 italic leading-relaxed">"{story.story}"</p>
              </div>
              <div className="border-t pt-4">
                <h4 className="text-xl font-bold text-primary-500">{story.name}</h4>
                <p className="text-gray-500">{story.title}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center max-w-4xl mx-auto">
          <p className="text-lg text-gray-600 leading-relaxed">
            As we work alongside leading healthcare institutions, academic collaborators, 
            and strategic partners, our mission remains clear: to expand equitable access 
            to advanced immunotherapies and redefine cancer care in India and beyond.
          </p>
        </div>
      </div>
    </section>
  )
}

export default PatientStories