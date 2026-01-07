import { useEffect, useState } from 'react'
import { ChevronDown, Menu, X } from 'lucide-react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { ImmunoActLogo } from '@/assets'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const navigate = useNavigate()
  const location = useLocation()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleDropdownToggle = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown)
  }

  const closeDropdown = () => {
    setActiveDropdown(null)
  }

  // Custom navigation handler for Science sections
  const handleScienceNavigation = (hash) => {
    setActiveDropdown(null) // Close dropdown

    if (location.pathname === '/science') {
      // If already on science page, just scroll to section
      const element = document.querySelector(hash)
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      }
    } else {
      // If on different page, navigate to science page with hash
      navigate(`/science${hash}`)
    }
  }

  // Custom navigation handler for NexCAR19 sections
  const handleNexCAR19Navigation = (type) => {
    setActiveDropdown(null) // Close dropdown

    if (type === 'patients') {
      navigate('/nexcar19')
    } else if (type === 'hcp') {
      navigate('/nexcar19-hcp')
    }
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (activeDropdown && !event.target.closest('.dropdown-container')) {
        setActiveDropdown(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [activeDropdown])

  return (
    <header className="bg-white sticky top-0 z-50 h-[117px] font-futura">
      {/* Top section with Find a Treatment Centre */}
      <div className="bg-FFFFFF">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-end py-2 h-[40px]">
            <Link
              to="/treatment-centres"
              className="text-[13px] h-[20px] text-[#363636] hover:text-gray-900 font-medium transition-colors"
            >
              FIND A TREATMENT CENTRE
            </Link>
          </div>
        </div>
        {/* Centered divider line with max width 1280px */}
        <div className="flex justify-center">
          <div className="w-full max-w-[1216px] border-b border-gray-200"></div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1">
        <div className="flex items-center justify-between h-[77px]">
          {/* Logo - Left */}
          <div className="flex items-center justify-start">
            <Link to="/">
              <img
                src={ImmunoActLogo}
                alt="ImmunoACT"
                className="h-auto w-[160px]"
              />
            </Link>
          </div>

          {/* Desktop Navigation - Center */}
          <nav className="hidden lg:flex items-center justify-center space-x-8">
            {/* About Dropdown */}
            <div
              className="relative dropdown-container"
              onMouseEnter={() => setActiveDropdown('about')}
              onMouseLeave={closeDropdown}
            >
              <Link
                to="/about"
                className="flex items-center text-[#363636] text-lg hover:text-gray-900 font-medium transition-colors py-2"
                onClick={() => setActiveDropdown(null)} // Close dropdown when clicking the main link
              >
                <span>About</span>
                <ChevronDown className="w-[18px] h-[18px] ml-[10px]" />
              </Link>
              {activeDropdown === 'about' && (
                <div className="absolute top-full left-0 w-48 bg-white rounded-lg shadow-lg border z-50">
                  <Link to="/about#who-we-are" className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors text-sm">
                    Who we are
                  </Link>
                  <Link to="/about#team" className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors text-sm">
                    Team
                  </Link>
                </div>
              )}
            </div>

            {/* Science Dropdown */}
            <div
              className="relative dropdown-container"
              onMouseEnter={() => setActiveDropdown('science')}
              onMouseLeave={closeDropdown}
            >
              <Link
                to="/science"
                className="flex items-center text-[#363636] text-lg hover:text-gray-900 font-medium transition-colors py-2"
                onClick={() => setActiveDropdown(null)} // Close dropdown when clicking the main link
              >
                <span>Science</span>
                <ChevronDown className="w-[18px] h-[18px] ml-[10px]" />
              </Link>
              {activeDropdown === 'science' && (
                <div className="absolute top-full left-0 w-48 bg-white rounded-lg shadow-lg border z-50">
                  <button
                    onClick={() => handleScienceNavigation('#research')}
                    className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors text-sm"
                  >
                    Research
                  </button>
                  <button
                    onClick={() => handleScienceNavigation('#pipeline')}
                    className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors text-sm"
                  >
                    Pipeline
                  </button>
                  <button
                    onClick={() => handleScienceNavigation('#publications')}
                    className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors text-sm"
                  >
                    Publications
                  </button>
                </div>
              )}
            </div>

            {/* NexCAR19 Dropdown */}
            <div
              className="relative dropdown-container"
              onMouseEnter={() => setActiveDropdown('nexcar19')}
              onMouseLeave={closeDropdown}
            >
              <Link
                to="/nexcar19"
                className="flex items-center text-[#363636] text-lg hover:text-gray-900 font-medium transition-colors py-2"
                onClick={() => setActiveDropdown(null)} // Close dropdown when clicking the main link
              >
                <span>NexCAR19™</span>
                <ChevronDown className="w-[18px] h-[18px] ml-[10px]" />
              </Link>
              {activeDropdown === 'nexcar19' && (
                <div className="absolute top-full left-0 w-48 bg-white rounded-lg shadow-lg border z-50">
                  <button
                    onClick={() => handleNexCAR19Navigation('patients')}
                    className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors text-sm"
                  >
                    For Patients
                  </button>
                  <button
                    onClick={() => handleNexCAR19Navigation('hcp')}
                    className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors text-sm"
                  >
                    For HCP
                  </button>
                </div>
              )}
            </div>

            {/* Regular Links */}
            <Link to="/news-media" className="text-[#363636] text-lg hover:text-gray-900 font-medium transition-colors">Media</Link>
            <Link to="/philanthropy" className="text-[#363636] text-lg hover:text-gray-900 font-medium transition-colors">Philanthropy</Link>
            <Link to="/careers" className="text-[#363636] text-lg hover:text-gray-900 font-medium transition-colors">Careers</Link>
          </nav>

          {/* Right side - Contact button and mobile menu */}
          <div className="flex items-center justify-end space-x-4">
            <Link
              to="/contact"
              className="hidden lg:block bg-[#FFBF00] hover:bg-yellow-500 text-[#363636] font-medium px-5 py-2 rounded-full transition-colors text-[18px]"
            >
              Contact us
            </Link>

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
              onClick={toggleMenu}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          <nav className={`${isMenuOpen ? 'flex' : 'hidden'} lg:hidden flex-col absolute top-full left-0 right-0 bg-white shadow-lg p-4 space-y-4`}>
            {/* Mobile About */}
            <div>
              <button
                className="flex items-center justify-between w-full text-gray-700 hover:text-gray-900 font-medium transition-colors"
                onClick={() => handleDropdownToggle('mobile-about')}
              >
                <span>About</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === 'mobile-about' ? 'rotate-180' : ''}`} />
              </button>
              {activeDropdown === 'mobile-about' && (
                <div className="mt-2 ml-4 space-y-2">
                  <Link to="/about#who-we-are" className="block text-gray-600 hover:text-gray-900 transition-colors text-sm">Who we are</Link>
                  <Link to="/about#team" className="block text-gray-600 hover:text-gray-900 transition-colors text-sm">Team</Link>
                </div>
              )}
            </div>

            {/* Mobile Science */}
            <div>
              <button
                className="flex items-center justify-between w-full text-gray-700 hover:text-gray-900 font-medium transition-colors"
                onClick={() => handleDropdownToggle('mobile-science')}
              >
                <span>Science</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === 'mobile-science' ? 'rotate-180' : ''}`} />
              </button>
              {activeDropdown === 'mobile-science' && (
                <div className="mt-2 ml-4 space-y-2">
                  <button
                    onClick={() => handleScienceNavigation('#research')}
                    className="block w-full text-left text-gray-600 hover:text-gray-900 transition-colors text-sm"
                  >
                    Research
                  </button>
                  <button
                    onClick={() => handleScienceNavigation('#pipeline')}
                    className="block w-full text-left text-gray-600 hover:text-gray-900 transition-colors text-sm"
                  >
                    Pipeline
                  </button>
                  <button
                    onClick={() => handleScienceNavigation('#publications')}
                    className="block w-full text-left text-gray-600 hover:text-gray-900 transition-colors text-sm"
                  >
                    Publications
                  </button>
                </div>
              )}
            </div>

            {/* Mobile NexCAR19 */}
            <div>
              <button
                className="flex items-center justify-between w-full text-gray-700 hover:text-gray-900 font-medium transition-colors"
                onClick={() => handleDropdownToggle('mobile-nexcar19')}
              >
                <span>NexCAR19™</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === 'mobile-nexcar19' ? 'rotate-180' : ''}`} />
              </button>
              {activeDropdown === 'mobile-nexcar19' && (
                <div className="mt-2 ml-4 space-y-2">
                  <button
                    onClick={() => handleNexCAR19Navigation('patients')}
                    className="block w-full text-left text-gray-600 hover:text-gray-900 transition-colors text-sm"
                  >
                    For Patients
                  </button>
                  <button
                    onClick={() => handleNexCAR19Navigation('hcp')}
                    className="block w-full text-left text-gray-600 hover:text-gray-900 transition-colors text-sm"
                  >
                    For HCP
                  </button>
                </div>
              )}
            </div>

            <Link to="/news-media" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">Media</Link>
            <Link to="/philanthropy" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">Philanthropy</Link>
            <Link to="/careers" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">Careers</Link>
            <Link
              to="/contact"
              className="bg-[#FFBF00] hover:bg-[#FFBF00] text-black font-medium px-6 py-2 rounded-full transition-colors w-fit"
            >
              Contact us
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header