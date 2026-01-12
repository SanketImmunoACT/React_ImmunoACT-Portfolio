import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { SpeedInsights } from '@vercel/speed-insights/react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ScrollToTop from '@/components/ScrollToTop'
import CookieConsent from '@/components/CookieConsent'
import AnalyticsTracker from '@/components/AnalyticsTracker'
import { CookieProvider } from '@/contexts/CookieContext'
import Home from '@/pages/Home'
import Contact from '@/pages/Contact'
import NewsMedia from '@/pages/NewsMedia'
import Careers from '@/pages/Careers'
import Philanthropy from '@/pages/Philanthropy'
import Publications from '@/pages/Publications'
import PrivacyPolicy from '@/pages/PrivacyPolicy'
import PartneredHospitals from '@/pages/PartneredHospitals'
import TreatmentCenters from '@/pages/TreatmentCenters'
import Sitemap from '@/pages/Sitemap'
import CookieSettings from '@/pages/CookieSettings'

// Main Pages
import About from '@/pages/About'
import Science from '@/pages/Science'
import NexCAR19 from '@/pages/NexCAR19'
import ForPatients from '@/pages/NexCAR19/ForPatients'
import ForHCP from '@/pages/NexCAR19/ForHCP'

// About sub-pages
import WhoWeAre from '@/pages/About/WhoWeAre'
import Team from '@/pages/About/Team'

// Science sub-pages
import Research from '@/pages/Science/Research'

// Admin Components
import { AuthProvider } from '@/contexts/AuthContext'
import AdminLogin from '@/pages/admin/AdminLogin'
import AdminLayout from '@/components/admin/AdminLayout'
import AdminDashboard from '@/pages/admin/AdminDashboard'
import MediaManagement from '@/pages/admin/MediaManagement'
import PublicationsManagement from '@/pages/admin/PublicationsManagement'
import CareersManagement from '@/pages/admin/CareersManagement'
import JobApplicationsManagement from '@/pages/admin/JobApplicationsManagement'
import ContactManagement from '@/pages/admin/ContactManagement'
import AdminHospitals from '@/pages/admin/AdminHospitals'
import ReferralManagement from '@/pages/admin/ReferralManagement'
import EmployeeReferral from '@/pages/EmployeeReferral'
import ProtectedRoute from '@/components/admin/ProtectedRoute'

import '@/App.css'

function App() {
  return (
    <CookieProvider>
      <AuthProvider>
        <Router>
          <SpeedInsights />
          <Toaster
            toastOptions={{
              // Default options for all toasts
              duration: 4000,
              style: {
                background: '#fff',
                color: '#363636',
                borderRadius: '12px',
                border: '1px solid #e2e8f0',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                fontSize: '14px',
                fontWeight: '500',
              },
              // Success toast styling
              success: {
                iconTheme: {
                  primary: '#10b981',
                  secondary: '#fff',
                },
              },
              // Error toast styling
              error: {
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#fff',
                },
              },
              // Loading toast styling
              loading: {
                iconTheme: {
                  primary: '#f97316',
                  secondary: '#fff',
                },
              },
            }}
          />
          <Routes>
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
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
            <Route path="job-applications" element={
              <ProtectedRoute requiredRoles={['super_admin', 'hr_manager']}>
                <JobApplicationsManagement />
              </ProtectedRoute>
            } />
            <Route path="contacts" element={
              <ProtectedRoute requiredRoles={['super_admin', 'office_executive']}>
                <ContactManagement />
              </ProtectedRoute>
            } />
            <Route path="hospitals" element={
              <ProtectedRoute requiredRoles={['super_admin']}>
                <AdminHospitals />
              </ProtectedRoute>
            } />
            <Route path="referrals" element={
              <ProtectedRoute requiredRoles={['super_admin', 'hr_manager']}>
                <ReferralManagement />
              </ProtectedRoute>
            } />
            <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
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
                  <Route path="/about/who-we-are" element={<WhoWeAre />} />
                  <Route path="/about/team" element={<Team />} />
                  
                  <Route path="/science" element={<Science />} />
                  <Route path="/science/research" element={<Research />} />
                  <Route path="/science/process" element={<Science />} />
                  <Route path="/science/pipeline" element={<Science />} />
                  <Route path="/science/publications" element={<Science />} />
                  
                  <Route path="/nexcar19" element={<NexCAR19 />} />
                  <Route path="/nexcar19/patients" element={<ForPatients />} />
                  <Route path="/nexcar19/healthcare-professionals" element={<ForHCP />} />
                  <Route path="/nexcar19/treatment-process" element={<NexCAR19 />} />
                  <Route path="/nexcar19/partnered-treatment-centres" element={<PartneredHospitals />} />
                  <Route path="/nexcar19-hcp" element={<NexCAR19 />} />
                  <Route path="/hcp" element={<ForHCP />} />
                  
                  {/* Media Routes */}
                  <Route path="/media" element={<NewsMedia />} />
                  
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/media/newsroom" element={<NewsMedia />} />
                  <Route path="/philanthropy" element={<Philanthropy />} />
                  <Route path="/philanthropy/immunoact-foundation" element={<Philanthropy />} />
                  <Route path="/careers" element={<Careers />} />
                  <Route path="/careers/current-job-openings" element={<Careers />} />
                  <Route path="/publications" element={<Publications />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                  <Route path="/cookie-settings" element={<CookieSettings />} />
                  <Route path="/partnered-hospitals" element={<PartneredHospitals />} />
                  <Route path="/treatment-centres" element={<PartneredHospitals />} />
                  <Route path="/collaborations" element={<Contact />} />
                  <Route path="/employee-referral" element={<EmployeeReferral />} />
                  <Route path="/sitemap" element={<Sitemap />} />
                </Routes>
              </main>
              <Footer />
              <ScrollToTop />
              <CookieConsent />
              <AnalyticsTracker />
              <SpeedInsights />
            </div>
          } />
        </Routes>
        </Router>
      </AuthProvider>
    </CookieProvider>
  )
}

export default App
