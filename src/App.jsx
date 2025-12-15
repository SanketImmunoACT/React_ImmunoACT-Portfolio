import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ScrollToTop from '@/components/ScrollToTop'
import Home from '@/pages/Home'
import Contact from '@/pages/Contact'

// About Pages
import WhoWeAre from '@/pages/About/WhoWeAre'
import Team from '@/pages/About/Team'

// NexCAR19 Pages
import ForPatients from '@/pages/NexCAR19/ForPatients'
import ForHCP from '@/pages/NexCAR19/ForHCP'

// Science Pages
import Research from '@/pages/Science/Research'

import '@/App.css'

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-white font-futura">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            
            {/* About Routes */}
            <Route path="/about/who-we-are" element={<WhoWeAre />} />
            <Route path="/about/team" element={<Team />} />
            
            {/* Science Routes */}
            <Route path="/science/research" element={<Research />} />
            <Route path="/science/process" element={<Research />} />
            <Route path="/science/pipeline" element={<Research />} />
            <Route path="/science/publications" element={<Research />} />
            
            {/* NexCAR19 Routes */}
            <Route path="/nexcar19" element={<ForPatients />} />
            <Route path="/nexcar19-hcp" element={<ForHCP />} />
            
            {/* Other Routes */}
            <Route path="/contact" element={<Contact />} />
            <Route path="/media" element={<Home />} />
            <Route path="/philanthropy" element={<Home />} />
            <Route path="/careers" element={<Home />} />
          </Routes>
        </main>
        <Footer />
        <ScrollToTop />
      </div>
    </Router>
  )
}

export default App
