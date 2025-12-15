import IITBombayLogo from '@/assets/images/collaborators/IIT-Bombay.jpeg'
import LaurusLabsLogo from '@/assets/images/collaborators/Laurus_Labs_Logo.jpeg'
import SineLogo from '@/assets/images/collaborators/Sine.jpeg'
import TMHLogo from '@/assets/images/collaborators/TMH.jpg'

const StrategicCollaborations = () => {
  const collaborators = [
    {
      id: 1,
      alt: 'Tata Memorial Hospital',
      logo: TMHLogo,
      name: 'TMH'
    },
    {
      id: 2,
      alt: 'Indian Institute of Technology Bombay',
      logo: IITBombayLogo,
      name: 'IIT Bombay'
    },
    {
      id: 3,
      alt: 'Society for Innovation and Entrepreneurship',
      logo: SineLogo,
      name: 'SINE'
    },
    {
      id: 4,
      alt: 'Laurus Labs',
      featured: true,
      logo: LaurusLabsLogo,
      name: 'Laurus Labs'
    }
  ]

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-[38px] font-normal text-[#47A178] font-futura">
            Strategic Collaborations
          </h2>
          <p className="text-lg text-[#363636]">
            To advance the research and development of our innovative gene-modified cell therapies, we are fostering relationships across academia, healthcare institutions, and strategic partnerships with the intent to equitable access.
          </p>
        </div>

        {/* Collaborators Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center justify-items-center mb-16">
          {/* Top Row - 3 logos */}
          {collaborators.slice(0, 3).map((collaborator) => (
            <div
              key={collaborator.id}
              className="group flex items-center justify-center p-12 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 hover:border-[#47A178]/20 w-full max-w-xs h-40"
            >
              <img
                src={collaborator.logo}
                alt={collaborator.alt}
                className="max-h-28 w-auto object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
              />
            </div>
          ))}
        </div>

        {/* Featured Partner - Laurus Labs (Bottom Center) */}
        <div className="flex justify-center">
          <div className="group bg-white rounded-3xl shadow-2xl p-16 border-3 border-[#FFBF00] hover:border-[#47A178] transition-all duration-500 transform hover:-translate-y-3 hover:shadow-3xl max-w-lg w-full">
            <div className="text-center">
              <img
                src={collaborators[3].logo}
                alt={collaborators[3].alt}
                className="max-h-32 w-auto object-contain mx-auto filter grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
              />
            </div>
          </div>
        </div>

        {/* Bottom Divider Line */}
        <div className="mt-20 flex justify-center">
          <div className="w-full max-w-[650px] h-[1px] bg-[#FFBF00] mx-4"></div>
        </div>
      </div>
    </section>
  )
}

export default StrategicCollaborations