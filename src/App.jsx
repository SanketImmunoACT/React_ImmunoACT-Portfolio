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
import TreatmentCenters from '@/pages/TreatmentCenters'

// Main Pages
import About from '@/pages/About'
import Science from '@/pages/Science'
import NexCAR19 from '@/pages/NexCAR19'

// Admin Components
import { AuthProvider } from '@/contexts/AuthContext'
import AdminLogin from '@/pages/admin/AdminLogin'
import AdminLayout from '@/components/admin/AdminLayout'
import AdminDashboard from '@/pages/admin/AdminDashboard'
import MediaManagement from '@/pages/admin/MediaManagement'
import PublicationsManagement from '@/pages/admin/PublicationsManagement'
import CareersManagement from '@/pages/admin/CareersManagement'
import ContactManagement from '@/pages/admin/ContactManagement'
import UserManagement from '@/pages/admin/UserManagement'
import ProtectedRoute from '@/components/admin/ProtectedRoute'

import '@/App.css'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="media" element={
              <ProtectedRoute requiredRoles={['super_admin', 'office_executive']}>
                <MediaManagement />
              </ProtectedRoute>
            } />
            <Route path="publications" element={
              <ProtectedRoute requiredRoles={['super_admin', 'office_executive']}>
                <PublicationsManagement />
              </ProtectedRoute>
            } />
            <Route path="careers" element={
              <ProtectedRoute requiredRoles={['super_admin', 'hr_manager']}>
                <CareersManagement />
              </ProtectedRoute>
            } />
            <Route path="contacts" element={
              <ProtectedRoute requiredRoles={['super_admin', 'office_executive', 'hr_manager']}>
                <ContactManagement />
              </ProtectedRoute>
            } />
            <Route path="users" element={
              <ProtectedRoute requiredRoles={['super_admin']}>
                <UserManagement />
              </ProtectedRoute>
            } />
            {/* Additional admin routes will be added here */}
          </Route>

          {/* Public Routes */}
          <Route path="/*" element={
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
          } />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
