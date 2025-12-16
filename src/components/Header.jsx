import { useEffect, useState } from 'react'
import { ChevronDown, Menu, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ImmunoActLogo } from '@/assets'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleDropdownToggle = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown)
  }

  const closeDropdown = () => {
    setActiveDropdown(null)
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
              <button
                className="flex items-center text-[#363636] text-lg hover:text-gray-900 font-medium transition-colors"
                onClick={() => handleDropdownToggle('about')}
              >
                <span>About</span>
                <ChevronDown className="w-[18px] h-[18px] ml-[10px]" />
              </button>
              {activeDropdown === 'about' && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-50">
                  <Link to="/about" className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors text-sm">
                    Who we are
                  </Link>
                  <Link to="/about" className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors text-sm">
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
              <button
                className="flex items-center text-[#363636] text-lg hover:text-gray-900 font-medium transition-colors"
                onClick={() => handleDropdownToggle('science')}
              >
                <span>Science</span>
                <ChevronDown className="w-[18px] h-[18px] ml-[10px]" />
              </button>
              {activeDropdown === 'science' && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-50">
                  <Link to="/science" className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors text-sm">
                    Research
                  </Link>
                  <Link to="/science" className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors text-sm">
                    Process
                  </Link>
                  <Link to="/science" className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors text-sm">
                    Pipeline
                  </Link>
                  <Link to="/publications" className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors text-sm">
                    Publications
                  </Link>
                </div>
              )}
            </div>

            {/* NexCAR19 Dropdown */}
            <div
              className="relative dropdown-container"
              onMouseEnter={() => setActiveDropdown('nexcar19')}
              onMouseLeave={closeDropdown}
            >
              <button
                className="flex items-center text-[#363636] text-lg hover:text-gray-900 font-medium transition-colors"
                onClick={() => handleDropdownToggle('nexcar19')}
              >
                <span>NexCAR19™</span>
                <ChevronDown className="w-[18px] h-[18px] ml-[10px]" />
              </button>
              {activeDropdown === 'nexcar19' && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-50">
                  <Link to="/nexcar19" className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors text-sm">
                    For Patients
                  </Link>
                  <Link to="/nexcar19" className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors text-sm">
                    For HCP
                  </Link>
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
                  <Link to="/about" className="block text-gray-600 hover:text-gray-900 transition-colors text-sm">Who we are</Link>
                  <Link to="/about" className="block text-gray-600 hover:text-gray-900 transition-colors text-sm">Team</Link>
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
                  <Link to="/science" className="block text-gray-600 hover:text-gray-900 transition-colors text-sm">Research</Link>
                  <Link to="/science" className="block text-gray-600 hover:text-gray-900 transition-colors text-sm">Process</Link>
                  <Link to="/science" className="block text-gray-600 hover:text-gray-900 transition-colors text-sm">Pipeline</Link>
                  <Link to="/publications" className="block text-gray-600 hover:text-gray-900 transition-colors text-sm">Publications</Link>
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
                  <Link to="/nexcar19" className="block text-gray-600 hover:text-gray-900 transition-colors text-sm">For Patients</Link>
                  <Link to="/nexcar19" className="block text-gray-600 hover:text-gray-900 transition-colors text-sm">For HCP</Link>
                </div>
              )}
            </div>

            <Link to="/news-media" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">Media</Link>
            <Link to="/philanthropy" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">Philanthropy</Link>
            <Link to="/careers" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">Careers</Link>
            <Link
              to="/contact"
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium px-6 py-2 rounded-full transition-colors w-fit"
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