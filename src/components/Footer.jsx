import { ImmunoActLogo } from '@/assets'
import { FooterInstagram, FooterLinkedIn, FooterMeta, FooterTwitter, FooterYouTube } from '@/assets/svg/Icons.jsx'

const Footer = () => {
  return (
    <footer className="bg-white py-12 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <img
              src={ImmunoActLogo}
              alt="ImmunoACT"
              className="w-[200px] h-auto"
            />
            <p className="text-[#363636] mt-8 text-sm mb-8 max-w-sm">
              Expert Cancer Treatment with Personal Care, Wherever You Are
            </p>

            {/* Social Media Icons */}
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/people/Immunoadoptive-Cell/pfbid07T31Ez4ULUrLEvo1Q87XFnY8ZPTXR5DCFoR1n47BeepmJ3S3jv7PuMquhcisPG81l/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-600 transition-colors">
                <span className="sr-only">Meta (Facebook)</span>
                <FooterMeta />
              </a>
              <a href="https://www.instagram.com/actimmuno/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-600 transition-colors">
                <span className="sr-only">Instagram</span>
                <FooterInstagram />
              </a>
              <a href="https://x.com/ActImmuno" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-600 transition-colors">
                <span className="sr-only">Twitter</span>
                <FooterTwitter />
              </a>
              <a href="https://www.linkedin.com/company/immunoact/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-600 transition-colors">
                <span className="sr-only">LinkedIn</span>
                <FooterLinkedIn />
              </a>
              <a href="https://www.youtube.com/@immunoact4858" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-600 transition-colors">
                <span className="sr-only">YouTube</span>
                <FooterYouTube />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-[20px] font-semibold text-[#363636] mb-4">Quick Links:</h3>
            <ul className="space-y-4">
              <li><a href="/" className="text-[#363636] hover:text-gray-800 transition-colors text-lg">Home</a></li>
              <li><a href="/about" className="text-[#363636] hover:text-gray-800 transition-colors text-lg">About</a></li>
              <li><a href="/science" className="text-[#363636] hover:text-gray-800 transition-colors text-lg">Science</a></li>
              <li><a href="/nexcar19" className="text-[#363636] hover:text-gray-800 transition-colors text-lg">NexCAR19™</a></li>
              <li><a href="/hcp" className="text-[#363636] hover:text-gray-800 transition-colors text-lg">For HCP</a></li>
              <li><a href="/treatment-centres" className="text-[#363636] hover:text-gray-800 transition-colors text-lg">Find a Treatment Centre</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Resources:</h3>
            <ul className="space-y-3">
              <li><a href="/media" className="text-[#363636] hover:text-gray-800 transition-colors text-lg">Media</a></li>
              <li><a href="/publications" className="text-[#363636] hover:text-gray-800 transition-colors text-lg">Publications</a></li>
              <li><a href="/sitemap" className="text-[#363636] hover:text-gray-800 transition-colors text-lg">Sitemap</a></li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-800 mb-4 mt-8">Support & Legal:</h3>
            <ul className="space-y-3">
              <li><a href="/contact" className="text-[#363636] hover:text-gray-800 transition-colors text-lg">Contact Us</a></li>
              <li><a href="/privacy-policy" className="text-[#363636] hover:text-gray-800 transition-colors text-lg">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Get Involved */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Get Involved:</h3>
            <ul className="space-y-3">
              <li><a href="/collaborations" className="text-[#363636] hover:text-gray-800 transition-colors text-lg">Collaborations</a></li>
              <li><a href="/philanthropy" className="text-[#363636] hover:text-gray-800 transition-colors text-lg">Philanthropy</a></li>
              <li><a href="/careers" className="text-[#363636] hover:text-gray-800 transition-colors text-lg">Careers</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer