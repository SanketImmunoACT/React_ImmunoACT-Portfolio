import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ScrollToTop from '@/components/ScrollToTop'
import Home from '@/pages/Home'
import Contact from '@/pages/Contact'
import NewsMedia from '@/pages/NewsMedia'
import BlogPost from '@/pages/BlogPost'
import Careers from '@/pages/Careers'
import Philanthropy from '@/pages/Philanthropy'
import Publications from '@/pages/Publications'
import PrivacyPolicy from '@/pages/PrivacyPolicy'
import PartneredHospitals from '@/pages/PartneredHospitals'

// Main Pages
import About from '@/pages/About'
import Science from '@/pages/Science'
import NexCAR19 from '@/pages/NexCAR19'

import '@/App.css'

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-white font-futura">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            
            {/* Main Page Routes */}
            <Route path="/about" element={<About />} />
            <Route path="/about/who-we-are" element={<About />} />
            <Route path="/about/team" element={<About />} />
            
            <Route path="/science" element={<Science />} />
            <Route path="/science/research" element={<Science />} />
            <Route path="/science/process" element={<Science />} />
            <Route path="/science/pipeline" element={<Science />} />
            <Route path="/science/publications" element={<Science />} />
            
            <Route path="/nexcar19" element={<NexCAR19 />} />
            <Route path="/nexcar19-hcp" element={<NexCAR19 />} />
            
            {/* Media Routes */}
            <Route path="/news-media" element={<NewsMedia />} />
            <Route path="/news-media/:id" element={<BlogPost />} />
            
            {/* Other Routes */}
            <Route path="/contact" element={<Contact />} />
            <Route path="/media" element={<NewsMedia />} />
            <Route path="/philanthropy" element={<Philanthropy />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/publications" element={<Publications />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/partnered-hospitals" element={<PartneredHospitals />} />
            <Route path="/treatment-centres" element={<PartneredHospitals />} />
          </Routes>
        </main>
        <Footer />
        <ScrollToTop />
      </div>
    </Router>
  )
}

export default App
