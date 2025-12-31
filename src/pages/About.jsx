import { useLocation, Link } from 'react-router-dom'
import { useEffect } from 'react'
import PageBanner from '@/components/PageBanner'
import HorizontalTimeline from '@/components/HorizontalTimeline'

// Import team member images
import RahulPurwarImg from '@/assets/images/about/team/Rahul-Purwar.jpg'
import ShirishAryaImg from '@/assets/images/about/team/Shirish-Arya.png'
import AtharvaKarulkarImg from '@/assets/images/about/team/Atharva-Karulkar.jpg'
import ShaliniPurwarImg from '@/assets/images/about/team/Shalini-purwar.jpg'
import RajatMaheshwariImg from '@/assets/images/about/team/Rajat-Maheshwari.jpg'
import SimpsonEmmanuelImg from '@/assets/images/about/team/Simpson-Emmanuel.jpg'
import SatyenAminImg from '@/assets/images/about/team/Satyen-Amin.png'
import BrianBernardImg from '@/assets/images/about/team/Brian-Bernard.png'
import SushantKumarImg from '@/assets/images/about/team/Sushant-Kumar.jpg'
import AfrinFirfirayImg from '@/assets/images/about/team/Afrin-Firfiray.jpg'
import ShreshthaShahImg from '@/assets/images/about/team/Shreshtha-Shah.jpg'
import JuberPendhariImg from '@/assets/images/about/team/Juber-Pendhari.jpg'
import PranaliPatilImg from '@/assets/images/about/team/Pranali-Patil.jpg'
import DevanshiKalraImg from '@/assets/images/about/team/Devanshi-Kalra.jpg'
import SmrithiRavikumarImg from '@/assets/images/about/team/Smrithi-Ravikumar.jpg'
import ParagDeshpandeImg from '@/assets/images/about/team/Parag-Deshpande.jpg'

// Import advisory board images
import CarlJuneImg from '@/assets/images/about/team/Carl-June.jpg'
import AveryPoseyImg from '@/assets/images/about/team/Avery-Posey.avif'
import GauravNarulaImg from '@/assets/images/about/team/Gaurav-Narula.avif'
import SattvaNeelapuImg from '@/assets/images/about/team/Sattva-Neelapu.avif'
import NiraliShahImg from '@/assets/images/about/team/Nirali-Shah.jpg'

// Import business advisory board images
import RavindranathKancherlaImg from '@/assets/images/about/team/Ravindranath-Kancherla.avif'
import SatyanarayanaChavaImg from '@/assets/images/about/team/Satyanarayana-Chava.avif'

const About = () => {
  const location = useLocation()
  const currentPath = location.pathname

  // Handle scroll to section when hash changes
  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1))
      if (element) {
        // Add a small delay to ensure the page has loaded
        setTimeout(() => {
          const headerHeight = 117 // Height of the fixed header
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
          const offsetPosition = elementPosition - headerHeight - 20 // Extra 20px padding

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          })
        }, 100)
      }
    }
  }, [location.hash])

  // Function to get team member image
  const getTeamMemberImage = (name) => {
    const imageMap = {
      "Dr. Rahul Purwar": RahulPurwarImg,
      "Mr. Shirish Arya": ShirishAryaImg,
      "Dr. Atharva Karulkar, PhD": AtharvaKarulkarImg,
      "Mrs. Shalini Purwar": ShaliniPurwarImg,
      "Mr. Rajat Maheshwari": RajatMaheshwariImg,
      "Mr. Simpson V. Emmanuel": SimpsonEmmanuelImg,
      "Mr. Satyen Amin": SatyenAminImg,
      "Dr. Brian Bernard": BrianBernardImg,
      "Dr. Sushant Kumar, PhD": SushantKumarImg,
      "Mrs. Afrin Firfiray": AfrinFirfirayImg,
      "Mrs. Shreshtha Shah": ShreshthaShahImg,
      "Mr. Juber Pendhari": JuberPendhariImg,
      "Dr. Pranali Patil": PranaliPatilImg,
      "Devanshi Kalra": DevanshiKalraImg,
      "Smrithi Ravikumar": SmrithiRavikumarImg,
      "Dr. Parag Deshpande": ParagDeshpandeImg,
      "Dr. Carl June, M.D": CarlJuneImg,
      "Dr. Avery D Posey, PhD": AveryPoseyImg,
      "Dr. Gaurav Narula, M.D": GauravNarulaImg,
      "Dr. Sattva Neelapu, MD": SattvaNeelapuImg,
      "Dr. Nirali Shah, M.D": NiraliShahImg,
      "Dr. Ravindranath Kancherla": RavindranathKancherlaImg,
      "Dr. Satyanarayana Chava": SatyanarayanaChavaImg
    }
    return imageMap[name] || null
  }

  // Team Members - All in one simple array
  const teamMembers = [
    {
      name: "Dr. Rahul Purwar",
      position: "Founder & CEO",
      department: "Chairman of Board"
    },
    {
      name: "Mr. Shirish Arya",
      position: "Co-Founder & Director",
      department: "Corporate Strategy & Business Development"
    },
    {
      name: "Dr. Atharva Karulkar, PhD",
      position: "Co-Founder",
      department: "Head-Scientific programs"
    },
    {
      name: "Mrs. Shalini Purwar",
      position: "Director",
      department: "Digital & IT"
    },
    {
      name: "Mr. Rajat Maheshwari",
      position: "CFO",
      department: "Finance"
    },
    {
      name: "Mr. Simpson V. Emmanuel",
      position: "President",
      department: ""
    },
    {
      name: "Mr. Satyen Amin",
      position: "Vice President",
      department: "Sales and Market Access"
    },
    {
      name: "Dr. Brian Bernard",
      position: "Medical Director",
      department: "Medical Team"
    },
    {
      name: "Dr. Sushant Kumar, PhD",
      position: "Senior Scientist",
      department: "R&D"
    },
    {
      name: "Mrs. Afrin Firfiray",
      position: "Principal Scientist",
      department: "Quality Control"
    },
    {
      name: "Mrs. Shreshtha Shah",
      position: "Principal Scientist",
      department: "Lentiviral Vector"
    },
    {
      name: "Mr. Juber Pendhari",
      position: "Assistant Manager",
      department: "Quality Assurance and R&D"
    },
    {
      name: "Dr. Pranali Patil",
      position: "Senior Scientist",
      department: "Plasmid"
    },
    {
      name: "Devanshi Kalra",
      position: "Senior Project Manager",
      department: "Clinical Operations"
    },
    {
      name: "Smrithi Ravikumar",
      position: "Senior Project Manager",
      department: "Clinical Operations"
    },
    {
      name: "Dr. Parag Deshpande",
      position: "Lead",
      department: "Facility and Operations"
    },
  ]

  // Advisory Board
  const advisoryBoard = [
    {
      name: "Dr. Carl June, M.D",
      position: "Director",
      description: "Parker Institute of Cancer Immunotherapy, University of Pennsylvania, USA. Pioneer of world's 1st CAR-T cell therapy",
    },
    {
      name: "Dr. Avery D Posey, PhD",
      position: "Assistant Professor",
      description: "Parker Institute of Cancer Immunotherapy, University of Pennsylvania, USA Expert on CAR-T for solid tumor.",
    },
    {
      name: "Dr. Gaurav Narula, M.D",
      position: "Professor",
      description: "Tata Memorial Hospital, Mumbai Leading 1st CAR-T trial of paediatric B-ALL in India",
    },
    {
      name: "Dr. Sattva Neelapu, MD",
      position: "Professor",
      description: "MD Anderson Cancer Center, USA. Pioneer in Clinical Studies of CAR-T Cell Therapy",
    },
    {
      name: "Dr. Nirali Shah, M.D",
      position: "Head of the Hematologic Malignancies Section",
      description: "Pediatric Oncology Branch at National Cancer Institute (NCI), NIH, USA. Expert in cancer immunotherapy, including CAR-T Cell therapy for pediatric leukemia.",
    }
  ]

  // Scientific Advisory Board
  const scientificAdvisoryBoard = [
    {
      name: "Dr. Ravindranath Kancherla",
      position: "Former Chairman & MD, Global Hospitals",
      description: "Founded philanthropic organizations - Global University Foundation and Global Health technology life sciences university.",
    },
    {
      name: "Dr. Satyanarayana Chava",
      position: "Founder & CEO, Laurus Labs",
      description: "Former COO of Matrix Laboratories, recognized with many prestigious awards including India Pharma Leader Award 2021 and BT Best CEO award (pharma) - 2022 amongst others.",
    }
  ]

  // Company Statistics
  const stats = [
    { number: "50+", label: "Team Members" },
    { number: "5+", label: "Years of Research" },
    { number: "10+", label: "Clinical Trials" },
    { number: "1000+", label: "Patients Impacted" }
  ]

  // Navigation items for About sections
  const aboutNavItems = [
    { path: '/about', label: 'Overview', id: 'overview' },
    { path: '/about/who-we-are', label: 'Who We Are', id: 'who-we-are' },
    { path: '/about/team', label: 'Our Team', id: 'team' }
  ]

  // Determine which sections to show based on current path
  const showOverview = currentPath === '/about'
  const showWhoWeAre = currentPath === '/about' || currentPath === '/about/who-we-are'
  const showTeam = currentPath === '/about' || currentPath === '/about/team'

  // Get page title and subtitle based on current path
  const getPageInfo = () => {
    switch (currentPath) {
      case '/about/who-we-are':
        return {
          title: 'Who We Are',
          subtitle: 'Learn about our mission, vision, and values that drive our commitment to accessible CAR-T cell therapy.'
        }
      case '/about/team':
        return {
          title: 'Our Team',
          subtitle: 'Meet the dedicated professionals driving innovation in CAR-T cell therapy and transforming cancer treatment in India.'
        }
      default:
        return {
          title: 'About Us',
          subtitle: 'Pioneering India\'s first indigenous CAR-T cell therapy company, dedicated to making advanced cancer treatment accessible to all.'
        }
    }
  }

  return (
    <div className="min-h-screen bg-white font-futura">
      {/* Hero Section with PageBanner */}
      <PageBanner title="About" subtitle="Spearheading CAR-T Cell Therapy Advancement in India & Beyond" />

      {/* Main Content Section - Who we are */}
      <section id="who-we-are" className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-normal text-[#47A178] font-futura mt-5 mb-3">
            Who we are
          </h2>
          <p className="text-[22px] font-medium text-[#363636] leading-relaxed mb-6">
            ImmunoACT is a pioneering cell and gene therapy company, established in 2018 as a spin-off from the Biosciences & Bioengineering department at IIT Bombay. Incubated at SINE (Society for Innovation and Entrepreneurship), our journey began with a singular mission: to make life-saving gene-modified cell therapies accessible and affordable for patients battling aggressive cancers and clinically unmet disorders.
          </p>
          <p className="text-[22px] font-medium text-[#363636] leading-relaxed mb-6">
            Rooted in research dating back to 2013, ImmunoACT today stands as a fully integrated cell and gene therapy company, backed by a state-of-the-art, cGMP-compliant manufacturing facility that adheres to the highest global standards. From discovery to development, clinical validation to commercialization — we control the entire value chain to ensure quality, consistency, and scalability.
          </p>
          <p className="text-[22px] font-medium text-[#363636] leading-relaxed mb-6">
            Our cancer immunotherapies are designed to reprogram a patient’s own immune system to recognize and destroy cancer cells — restoring its natural ability to fight disease. These are precision-engineered, single-dose treatments intended to deliver deep, lasting responses in otherwise refractory conditions.
          </p>
          <p className="text-[22px] font-medium text-[#363636] leading-relaxed mb-6">
            Developing gene-modified cell therapies is inherently complex, requiring years of R&D, rigorous clinical trials, and specialized infrastructure. Despite this, our unwavering goal remains clear: to democratize access to these breakthrough therapies by dramatically lowering their cost and expanding their reach.
          </p>

          {/* Our Vision and Purpose Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Our Vision */}
            <div className="bg-white border border-gray-200 p-5 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:border-[#47A178] hover:-translate-y-1">
              <h3 className="text-3xl font-medium text-[#47A178]">Our Vision</h3>
              <p className="text-[#363636] text-base pt-3">
                To be the world’s leading innovator in gene & cell therapies, pioneering breakthrough treatments through scientific excellence, advanced manufacturing, and unwavering commitment to patient care.
              </p>
            </div>

            {/* Our Purpose & Promise */}
            <div className="bg-white border border-gray-200 p-5 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:border-[#47A178] hover:-translate-y-1">
              <h3 className="text-3xl font-medium text-[#47A178]">Our Purpose & Promise</h3>
              <p className="text-[#363636] text-base pt-3">
                At ImmunoACT, we are committed to transforming healthcare by advancing gene and cell therapies that are not only life-changing but also accessible and affordable for every patient who can benefit—no matter how complex the science behind them.
              </p>
            </div>
          </div>

          {/* Bottom Divider Line */}
          <div className="mt-20 flex justify-center">
            <div className="w-full max-w-[650px] h-[1px] bg-[#FFBF00] mx-4"></div>
          </div>
        </div>
      </section>

      {/* Our Journey Section */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-[38px] text-start font-normal text-[#47A178] font-futura mb-8">
            Our Journey
          </h2>

          <HorizontalTimeline />

          {/* Bottom Divider Line */}
          <div className="mt-20 flex justify-center">
            <div className="w-full max-w-[650px] h-[1px] bg-[#FFBF00] mx-4"></div>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section id="team" className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl text-[#47A178] font-futura mb-8">
              Our Team
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12">
              Meet the dedicated professionals driving innovation in CAR-T cell therapy and transforming cancer treatment in India
            </p>
          </div>

          {/* Team Members - Simple Grid */}
          <div className="mb-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {teamMembers.map((member, index) => {
                const memberImage = getTeamMemberImage(member.name)
                return (
                  <div
                    key={index}
                    className="bg-white rounded-[32px] p-6 text-center transition-all duration-300 ease-in-out hover:-translate-y-2 hover:border-[#FFBF00] cursor-pointer group border-2 border-transparent"
                    style={{
                      boxShadow: '0 10px 15px -3px rgb(71 161 120 / 0.1), 0 4px 6px -4px rgb(71 161 120 / 0.1), 0 15px 20px -3px rgb(243 203 81 / 0.08), 0 8px 10px -4px rgb(243 203 81 / 0.08), 0px -1px 10px 2px rgb(71 161 120 / 0.1)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = '0 20px 25px -5px rgb(255 191 0 / 0.3), 0 10px 10px -5px rgb(255 191 0 / 0.2), 0 25px 30px -5px rgb(243 203 81 / 0.15), 0 15px 15px -5px rgb(243 203 81 / 0.1), 0px -2px 15px 4px rgb(255 191 0 / 0.2)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = '0 10px 15px -3px rgb(71 161 120 / 0.1), 0 4px 6px -4px rgb(71 161 120 / 0.1), 0 15px 20px -3px rgb(243 203 81 / 0.08), 0 8px 10px -4px rgb(243 203 81 / 0.08), 0px -1px 10px 2px rgb(71 161 120 / 0.1)'
                    }}
                  >
                    <div className="relative w-40 h-40 mx-auto mb-8">
                      <div className="w-full h-full rounded-full border-4 border-[#FFBF00] overflow-hidden">
                        {memberImage ? (
                          <img
                            src={memberImage}
                            alt={member.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-500 text-xs">Photo</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <h4 className="text-xl text-[#363636] font-medium">{member.name}</h4>
                    <p className="text-[#339966] font-bold text-base">{member.position}</p>
                    <p className="text-[#363636] text-base font-normal">{member.department}</p>
                  </div>
                )
              })}
            </div>
            {/* Bottom Divider Line */}
            <div className="mt-20 flex justify-center">
              <div className="w-full max-w-[650px] h-[1px] bg-[#FFBF00] mx-4"></div>
            </div>
          </div>

          {/* Collaborators/Mentors */}
          <div className="mb-16">
            <h2 className="text-4xl text-[#47A178] text-center font-futura mb-8">
              Collaborators/Mentors
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {advisoryBoard.map((member, index) => {
                const memberImage = getTeamMemberImage(member.name)
                return (
                  <div
                    key={index}
                    className="bg-white rounded-[32px] p-6 text-center transition-all duration-300 ease-in-out hover:-translate-y-2 hover:border-[#FFBF00] cursor-pointer group border-2 border-transparent"
                    style={{
                      boxShadow: '0 10px 15px -3px rgb(71 161 120 / 0.1), 0 4px 6px -4px rgb(71 161 120 / 0.1), 0 15px 20px -3px rgb(243 203 81 / 0.08), 0 8px 10px -4px rgb(243 203 81 / 0.08), 0px -1px 10px 2px rgb(71 161 120 / 0.1)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = '0 20px 25px -5px rgb(255 191 0 / 0.3), 0 10px 10px -5px rgb(255 191 0 / 0.2), 0 25px 30px -5px rgb(243 203 81 / 0.15), 0 15px 15px -5px rgb(243 203 81 / 0.1), 0px -2px 15px 4px rgb(255 191 0 / 0.2)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = '0 10px 15px -3px rgb(71 161 120 / 0.1), 0 4px 6px -4px rgb(71 161 120 / 0.1), 0 15px 20px -3px rgb(243 203 81 / 0.08), 0 8px 10px -4px rgb(243 203 81 / 0.08), 0px -1px 10px 2px rgb(71 161 120 / 0.1)'
                    }}
                  >
                    <div className="relative w-40 h-40 mx-auto mb-8">
                      <div className="w-full h-full rounded-full border-4 border-[#FFBF00] overflow-hidden">
                        {memberImage ? (
                          <img
                            src={memberImage}
                            alt={member.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-500 text-xs">Photo</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <h4 className="text-xl text-[#363636] font-medium">{member.name}</h4>
                    <p className="text-[#339966] font-bold text-base">{member.position}</p>
                    <p className="text-[#363636] text-base font-normal mt-8">{member.description}</p>
                  </div>
                )
              })}
            </div>
            {/* Bottom Divider Line */}
            <div className="mt-20 flex justify-center">
              <div className="w-full max-w-[650px] h-[1px] bg-[#FFBF00] mx-4"></div>
            </div>
          </div>

          {/* Business Advisory Board */}
          <div className='mb-16'>
            <h2 className="text-4xl text-[#47A178] text-center font-futura mb-8">
              Business Advisory Board
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {scientificAdvisoryBoard.map((member, index) => {
                const memberImage = getTeamMemberImage(member.name)
                return (
                  <div
                    key={index}
                    className="bg-white rounded-[32px] p-6 text-center transition-all duration-300 ease-in-out hover:-translate-y-2 hover:border-[#FFBF00] cursor-pointer group border-2 border-transparent"
                    style={{
                      boxShadow: '0 10px 15px -3px rgb(71 161 120 / 0.1), 0 4px 6px -4px rgb(71 161 120 / 0.1), 0 15px 20px -3px rgb(243 203 81 / 0.08), 0 8px 10px -4px rgb(243 203 81 / 0.08), 0px -1px 10px 2px rgb(71 161 120 / 0.1)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = '0 20px 25px -5px rgb(255 191 0 / 0.3), 0 10px 10px -5px rgb(255 191 0 / 0.2), 0 25px 30px -5px rgb(243 203 81 / 0.15), 0 15px 15px -5px rgb(243 203 81 / 0.1), 0px -2px 15px 4px rgb(255 191 0 / 0.2)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = '0 10px 15px -3px rgb(71 161 120 / 0.1), 0 4px 6px -4px rgb(71 161 120 / 0.1), 0 15px 20px -3px rgb(243 203 81 / 0.08), 0 8px 10px -4px rgb(243 203 81 / 0.08), 0px -1px 10px 2px rgb(71 161 120 / 0.1)'
                    }}
                  >
                    <div className="relative w-40 h-40 mx-auto mb-8">
                      <div className="w-full h-full rounded-full border-4 border-[#FFBF00] overflow-hidden">
                        {memberImage ? (
                          <img
                            src={memberImage}
                            alt={member.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-500 text-xs">Photo</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <h4 className="text-xl text-[#363636] font-medium">{member.name}</h4>
                    <p className="text-[#339966] font-bold text-base">{member.position}</p>
                    <p className="text-[#363636] text-base font-normal mt-8">{member.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About