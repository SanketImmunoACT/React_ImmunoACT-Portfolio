import HeroSection from '@/components/HeroSection'
import CARTTherapySection from '@/components/CARTTherapySection'
import PatientTestimonial from '@/components/PatientTestimonial'
import Manufacturing from '@/components/Manufacturing'
import TreatmentCenters from '@/components/TreatmentCenters'
import StrategicCollaborations from '@/components/StrategicCollaborations'
import MediaPublications from '@/components/MediaPublications'
import FAQ from '@/components/FAQ'
import FinalCTA from '@/components/FinalCTA'

const Home = () => {
  return (
    <div className="home">
      <HeroSection />
      <CARTTherapySection />
      <PatientTestimonial />
      <Manufacturing />
      <TreatmentCenters />
      <StrategicCollaborations />
      <MediaPublications />
      {/* <FAQ /> */}
      <FinalCTA />
    </div>
  )
}

export default Home