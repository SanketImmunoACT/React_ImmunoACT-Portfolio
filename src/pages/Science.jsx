import PageBanner from '@/components/PageBanner'
import { useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'

const Science = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [activeStep, setActiveStep] = useState(1)

  const handleViewPublications = () => {
    navigate('/philanthropy')
  }

  // Function to scroll to section
  const scrollToSection = (hash) => {
    if (hash) {
      const element = document.querySelector(hash)
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          })
        }, 100)
      }
    }
  }

  // Handle initial load and hash changes
  useEffect(() => {
    scrollToSection(location.hash)
  }, [location.hash])

  // Also handle when component first mounts
  useEffect(() => {
    const hash = window.location.hash
    if (hash) {
      scrollToSection(hash)
    }
  }, [])

  const manufacturingSteps = [
    {
      id: 1,
      title: "Leukapheresis",
      description: "Peripheral Blood Mononuclear Cells (PBMCs) are collected from the patient using leukapheresis. This forms the foundational starting material for autologous CAR-T cell manufacturing.",
      image: "/src/assets/images/science/Manufacturing-Process/1.png"
    },
    {
      id: 2,
      title: "Monocyte Depletion",
      description: "Monocytes are removed from the PBMC population to reduce non-T-cell components. This enhances T-cell purity and improves the efficiency of downstream processes.",
      image: "/src/assets/images/science/Manufacturing-Process/2.png"
    },
    {
      id: 3,
      title: "T-Cell Activation",
      description: "T lymphocytes are activated using CD3/CD28 costimulatory signals in a controlled environment. This primes the cells for efficient gene transfer during the transduction step.",
      image: "/src/assets/images/science/Manufacturing-Process/3.png"
    },
    {
      id: 4,
      title: "Lentiviral Transduction",
      description: "Activated T-cells are genetically modified with a lentiviral vector encoding the anti-CD19 CAR. This step equips T-cells to recognize and attack CD19-expressing tumor cells.",
      image: "/src/assets/images/science/Manufacturing-Process/4.png"
    },
    {
      id: 5,
      title: "CAR-T Cell Production",
      description: "Following transduction, T-cells begin expressing the chimeric antigen receptor on their surface. These cells are now classified as NexCAR19 - genetically reprogrammed to target B-cell malignancies.",
      image: "/src/assets/images/science/Manufacturing-Process/5.png"
    },
    {
      id: 6,
      title: "Expansion to Target Dose",
      description: "The CAR-T cells are cultured under GMP conditions to reach the therapeutic dose. Cell growth is monitored to maintain viability, potency, and phenotype consistency.",
      image: "/src/assets/images/science/Manufacturing-Process/6.png"
    },
    {
      id: 7,
      title: "Formulation & Cryopreservation",
      description: "The final CAR-T product is formulated with infusion-ready buffer and cryopreserved. Post quality checks, it is stored under ultra-low temperatures until patient infusion.",
      image: "/src/assets/images/science/Manufacturing-Process/7.png"
    }
  ]
  const researchData = [
    {
      title: "CAR-T Cell Mechanism",
      description: "Understanding how CAR-T cells recognize and eliminate cancer cells through engineered receptors.",
      content: "CAR-T cells are genetically modified T cells that express chimeric antigen receptors (CARs) on their surface. These receptors enable T cells to recognize specific antigens on cancer cells, leading to targeted cell destruction."
    },
    {
      title: "Clinical Efficacy",
      description: "Demonstrating superior outcomes in hematological malignancies with our NexCAR19 therapy.",
      content: "Our clinical trials have shown remarkable response rates in patients with relapsed/refractory B-cell malignancies, with complete remission rates exceeding 80% in pediatric patients."
    },
    {
      title: "Manufacturing Excellence",
      description: "State-of-the-art manufacturing processes ensuring consistent quality and scalability.",
      content: "Our GMP-compliant manufacturing facility utilizes automated systems and rigorous quality control measures to produce CAR-T cells with consistent potency and purity."
    }
  ]

  const clinicalData = [
    { parameter: "Overall Response Rate", value: "85%", description: "Patients showing complete or partial response" },
    { parameter: "Complete Remission", value: "72%", description: "Patients achieving complete remission" },
    { parameter: "Median Duration", value: "18 months", description: "Median duration of response" },
    { parameter: "Safety Profile", value: "Manageable", description: "Cytokine release syndrome grade 1-2" }
  ]

  const researchMilestones = [
    { year: "2018", milestone: "First CAR-T cell therapy approved in India" },
    { year: "2020", milestone: "100+ patients treated successfully" },
    { year: "2022", milestone: "Expanded to multiple cancer types" },
    { year: "2024", milestone: "Next-generation CAR constructs in development" }
  ]

  const publications = [
    {
      title: "Safety and efficacy of NexCAR19 in pediatric and young adult patients with relapsed/refractory B-cell acute lymphoblastic leukemia",
      journal: "Nature Medicine",
      year: "2024",
      authors: "Sharma A, et al."
    },
    {
      title: "Manufacturing optimization of CAR-T cells for improved scalability and cost-effectiveness",
      journal: "Cell Therapy and Transplantation",
      year: "2024",
      authors: "Patel R, et al."
    },
    {
      title: "Real-world evidence of CAR-T cell therapy outcomes in Indian patients: A multicenter study",
      journal: "Indian Journal of Hematology",
      year: "2023",
      authors: "Kumar S, et al."
    }
  ]

  return (
    <div className="min-h-screen font-futura">
      {/* Hero Section */}
      <PageBanner
        title="Science"
        subtitle="Advancing the frontiers of CAR-T cell therapy through innovative research and development."
      />

      {/* Research Overview Section */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-normal text-[#47A178] font-futura mt-5 mb-8">
            From Patient to Warrior: The Journey of CAR-T Cells
          </h2>
          <p className="text-[22px] font-medium text-[#363636] leading-relaxed mb-6">
            CAR-T cell therapy is a revolutionary advancement in the field of cell and gene therapy. It empowers a patient’s own immune system to recognize and eliminate cancer cells with remarkable precision.
          </p>
          <p className="text-[22px] font-medium text-[#363636] leading-relaxed mb-6">
            This therapy involves collecting a patient’s T cells from the blood and reprogramming them in the lab to express special molecules on their surface, chimeric antigen receptors (CARs). These receptors enable the modified T cells to detect and attack cancer cells when reintroduced into the patient’s body.
          </p>
          <p className="text-[22px] font-medium text-[#363636] leading-relaxed mb-6">
            CAR-T cell therapy has delivered transformative outcomes for patients, particularly in blood cancers, and is being explored across a wide range of solid and hematological malignancies.
          </p>

          {/* Bottom Divider Line */}
          <div className="mt-20 flex justify-center">
            <div className="w-full max-w-[650px] h-[1px] bg-[#FFBF00] mx-4"></div>
          </div>
        </div>
      </section>

      {/* Smarter CAR-Construct & Design Section */}
      <section id="research" className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-3">
          <h2 className="text-4xl font-medium text-[#47A178] font-futura mb-8">
            Smarter CAR-Construct & Design for Safer Treatment
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column - Text Content */}
            <div className="mt-4">
              <p className="text-2xl font-medium text-[#363636] mb-7">
                At the heart of ImmunoACT's innovation is a next-generation cell
                and gene therapy platform, purpose-built to deliver affordable
                efficacy without compromising safety. Our approach blends
                cutting-edge science with thoughtful design to make these
                therapies more accessible and tolerable.
              </p>

              <p className="text-2xl font-medium text-[#363636] mb-7">
                Our CAR-T constructs use fully humanized components, making
                them more "familiar" to the immune system. This reduces the risk
                of rejection, minimizes off-target toxicity, and improves patient
                experience by lowering the need for intensive supportive care.
              </p>

              <div className="mt-8">
                <h3 className="text-[22px] font-medium text-[#363636] mb-6">
                  <strong>Each CAR we design includes:</strong>
                </h3>
                <ul className="space-y-3 text-[#363636] text-lg">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-[#47A178] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    A single-chain variable fragment (scFv) tailored for precise tumor targeting
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-[#47A178] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    A flexible hinge (spacer) to enable optimal antigen engagement
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-[#47A178] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    A CD28 transmembrane domain for enhanced stability
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-[#47A178] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    A 4-1BB co-stimulatory domain to support T-cell survival and sustained action
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-[#47A178] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    A CD3ζ signaling domain to trigger strong and specific immune responses
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Column - CAR Construct Diagram */}
            <div className="flex justify-center items-center">
              <div className="w-full max-w-[600px]">
                <img
                  src="/src/assets/images/science/Construct-Design.png"
                  alt="Final Construct Design - CAR-T Cell Structure"
                  className="w-auto h-auto"
                />
              </div>
            </div>
          </div>

          {/* Bottom Section with Molecular Structure and Clinical Integration */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-5">
            {/* Left - Molecular Structure */}
            <div className="flex justify-center">
              <div className="w-[442px] h-[367px]">
                <img
                  src="/src/assets/images/science/CAR-HCAR19.avif"
                  alt="3D Molecular Structure - CAR Protein Complex"
                  className="w-full h-auto"
                />
              </div>
            </div>

            {/* Right - Clinical Integration Text */}
            <div className="mt-4">
              <p className="text-2xl font-medium text-[#363636] mb-6">
                Our clinical-stage CAR-T therapies integrate humanized
                sequences and undergo rigorous optimization to ensure potency,
                persistence, and safety. By reducing the likelihood of severe
                toxicities, we are not just improving patient safety, we are
                redefining how cell therapies can be delivered.
              </p>

              <p className="text-2xl font-medium text-[#363636] mb-6">
                The gene sequence of the CAR construct is first integrated into a
                plasmid, which is then used to produce a lentiviral vector. This
                vector delivers the CAR gene into T cells, enabling them to
                recognize and attack cancer cells.
              </p>
            </div>
          </div>

          {/* Bottom Divider Line */}
          <div className="mt-16 flex justify-center">
            <div className="w-full max-w-[650px] h-[1px] bg-[#FFBF00] mx-4"></div>
          </div>
        </div>
      </section>

      {/* Plasmid DNA Platform Section */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-normal text-[#47A178] font-futura mb-8">
            The Backbone of Breakthroughs: Our Plasmid DNA Platform
          </h2>

          <p className="text-2xl font-medium text-[#363636] mb-7">
            Our plasmid DNA platform is the foundation of our gene therapy manufacturing ecosystem, enabling scalable, consistent, and GMP-compliant production of high-purity plasmids, critical building blocks for advanced genetic therapies.
          </p>

          <p className="text-2xl font-medium text-[#363636] mb-7">
            From vial thaw to final fill-finish, the platform is designed for reliability and efficiency at clinical and commercial scales. We manufacture:
          </p>

          <div className="mb-8">
            <ul className="space-y-3 text-[#363636] text-lg">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-[#47A178] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span>Gene of Interest (GOI) plasmids, tailored for precise therapeutic payloads</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-[#47A178] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span>Backbone plasmids, essential for packaging and expression within our Lentiviral Vector (LVV) platform</span>
              </li>
            </ul>
          </div>

          <h3 className="text-[22px] font-medium text-[#363636] mb-6">
            <strong>End-to-End Process Integration</strong>
          </h3>

          <p className="text-[22px] text-[#363636] mb-7">
            Our platform seamlessly integrates upstream and downstream operations to ensure high yield, purity, and regulatory compliance:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-4 text-[#363636] text-lg">
              <div className="flex items-start">
                <span className="w-2 h-2 bg-[#47A178] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <div>
                  <strong className="">Seed Expansion & Fermentation:</strong>
                  <span className=""> High-density biomass generation for robust plasmid yield</span>
                </div>
              </div>
              <div className="flex items-start">
                <span className="w-2 h-2 bg-[#47A178] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <div>
                  <strong className="">Cell Lysis & Clarification:</strong>
                  <span className=""> Efficient recovery of plasmid-rich lysate under controlled conditions</span>
                </div>
              </div>
            </div>
            <div className="space-y-4 text-[#363636] text-lg">
              <div className="flex items-start">
                <span className="w-2 h-2 bg-[#47A178] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <div>
                  <strong className="">Chromatographic Purification:</strong>
                  <span className=""> Advanced purification steps to meet stringent quality benchmarks</span>
                </div>
              </div>
              <div className="flex items-start">
                <span className="w-2 h-2 bg-[#47A178] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <div>
                  <strong className="">Sterile Filtration & Fill-Finish:</strong>
                  <span className=""> Final processing under GMP conditions to ensure clinical-grade readiness</span>
                </div>
              </div>
            </div>
          </div>

          <p className="text-2xl font-medium text-[#363636] mb-7">
            By combining process control, reproducibility, and scalable design, our plasmid DNA platform ensures a strong foundation for vector development, accelerating the delivery of safe and effective gene and cell therapies.
          </p>

          {/* Process Flow Diagram */}
          <div className="flex justify-center mt-20">
            <div className="w-full max-w-5xl">
              <img
                src="/src/assets/images/science/LV-Diagram.webp"
                alt="Plasmid DNA Platform Process Flow - From Gag+Pol, Rev, Env, Gene of Interest through manufacturing steps"
                className="w-full h-auto rounded-xl shadow-lg"
              />
            </div>
          </div>

          {/* Bottom Divider Line */}
          <div className="mt-20 flex justify-center">
            <div className="w-full max-w-[650px] h-[1px] bg-[#FFBF00] mx-4"></div>
          </div>
        </div>
      </section>

      {/* Lentiviral Vector Platform Section */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-normal text-[#47A178] font-futura mb-8">
            Lentiviral Vector Platform
          </h2>

          <h3 className="text-2xl font-semibold text-[#363636] mb-6">
            Lentiviral Vector Platform
          </h3>

          <p className="text-2xl font-medium text-[#363636] mb-7">
            At the core of our CAR-T manufacturing process is ImmunoACT's proprietary Lentiviral Vector (LVV) platform, designed to deliver genetic material with unmatched safety and consistency. This platform seamlessly integrates both the gene of interest (GOI), encoding the CAR construct, and essential backbone plasmids, all manufactured under fully GMP-compliant, tightly controlled conditions.
          </p>

          <h4 className="text-2xl font-semibold text-[#363636] mb-6">
            Key Capabilities of Our LVV Platform
          </h4>

          <div className="mb-12">
            <ul className="space-y-3 text-[#363636] text-lg">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-[#47A178] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span>End-to-End Manufacturing: From vial thaw to fill-finish</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-[#47A178] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span>Scalable Cell Expansion: Utilizes adherent cell factories</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-[#47A178] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span>Robust Purification Processes: Includes nuclease treatment, diafiltration, and chromatographic purification</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-[#47A178] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span>Sterile Filtration & Fill-Finish: for clinical-grade readiness</span>
              </li>
            </ul>
          </div>

          {/* 9-Step Process Flow */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {/* Step 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 border border-gray-100 justify-evenly flex flex-col">
              <div className="flex flex-col justify-center items-center">
                <h5 className="text-[#363636] text-2xl text-center">1. Vial Thaw</h5>
                <img
                  src="/src/assets/images/science/LV-Platform/1.png"
                  alt="Vial Thaw Process"
                  className="w-40 h-40"
                />
              </div>
              <p className="text-[#363636] text-xl text-center font-medium">
                Initiating process by thawing well-characterized working cell bank.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 border border-gray-100 justify-evenly flex flex-col">
              <div className="flex flex-col justify-center items-center">
                <h5 className="text-[#363636] text-2xl text-center">2. Seeding & Expansion</h5>
                <img
                  src="/src/assets/images/science/LV-Platform/2.png"
                  alt="Seeding & Expansion Process"
                  className="w-40 h-40"
                />
              </div>
              <p className="text-[#363636] text-xl text-center font-medium">
                Culturing cells in flasks to begin biomass growth.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 border border-gray-100 justify-evenly flex flex-col">
              <div className="flex flex-col justify-center items-center">
                <h5 className="text-[#363636] text-2xl text-center">3. Scaled Expansion in Cell Factories</h5>
                <img
                  src="/src/assets/images/science/LV-Platform/3.png"
                  alt="Scaled Expansion in Cell Factories"
                  className="w-40 h-40"
                />
              </div>
              <p className="text-[#363636] text-xl text-center font-medium">
                Large-scale adherent growth in multi-layer cell factories.
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 border border-gray-100 justify-evenly flex flex-col">
              <div className="flex flex-col justify-center items-center">
                <h5 className="text-[#363636] text-2xl text-center">4. Nuclease Treatment</h5>
                <img
                  src="/src/assets/images/science/LV-Platform/4.png"
                  alt="Nuclease Treatment"
                  className="w-40 h-40"
                />
              </div>
              <p className="text-[#363636] text-xl text-center font-medium">
                Breaking down residual host-cell nucleic acids post-harvest.
              </p>
            </div>

            {/* Step 5 */}
            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 border border-gray-100 justify-evenly flex flex-col">
              <div className="flex flex-col justify-center items-center">
                <h5 className="text-[#363636] text-2xl text-center">5. Harvest Clarification</h5>
                <img
                  src="/src/assets/images/science/LV-Platform/5.png"
                  alt="Harvest Clarification"
                  className="w-40 h-40"
                />
              </div>
              <p className="text-[#363636] text-xl text-center font-medium">
                Removing cell debris to isolate viral supernatant.
              </p>
            </div>

            {/* Step 6 */}
            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 border border-gray-100 justify-evenly flex flex-col">
              <div className="flex flex-col justify-center items-center">
                <h5 className="text-[#363636] text-2xl text-center">6. Concentration & Diafiltration</h5>
                <img
                  src="/src/assets/images/science/LV-Platform/6.png"
                  alt="Concentration & Diafiltration"
                  className="w-40 h-40"
                />
              </div>
              <p className="text-[#363636] text-xl text-center font-medium">
                Filtering and concentrating the lentiviral vector product.
              </p>
            </div>

            {/* Step 7 */}
            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 border border-gray-100 justify-evenly flex flex-col">
              <div className="flex flex-col justify-center items-center">
                <h5 className="text-[#363636] text-2xl text-center">7. Chromatographic Purification</h5>
                <img
                  src="/src/assets/images/science/LV-Platform/7.png"
                  alt="Chromatographic Purification"
                  className="w-40 h-40"
                />
              </div>
              <p className="text-[#363636] text-xl text-center font-medium">
                Removing cell debris to isolate viral supernatant.
              </p>
            </div>

            {/* Step 8 */}
            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 border border-gray-100 justify-evenly flex flex-col">
              <div className="flex flex-col justify-center items-center">
                <h5 className="text-[#363636] text-2xl text-center">8. Sterile Filtration</h5>
                <img
                  src="/src/assets/images/science/LV-Platform/8.png"
                  alt="Sterile Filtration"
                  className="w-40 h-40"
                />
              </div>
              <p className="text-[#363636] text-xl text-center font-medium">
                Ensuring the final vector product is free from microbial contamination.
              </p>
            </div>

            {/* Step 9 */}
            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 border border-gray-100 justify-evenly flex flex-col">
              <div className="flex flex-col justify-center items-center">
                <h5 className="text-[#363636] text-2xl text-center">9. Fill-Finish</h5>
                <img
                  src="/src/assets/images/science/LV-Platform/9.png"
                  alt="Fill-Finish"
                  className="w-40 h-40"
                />
              </div>
              <p className="text-[#363636] text-xl text-center font-medium">
                Dispensing the purified vector into vials under aseptic conditions for clinical use.
              </p>
            </div>
          </div>

          <h4 className="text-2xl font-semibold text-[#363636] mb-6">
            Designed for Performance and Safety
          </h4>

          <p className="text-[22px] text-[#363636] mb-7">
            Our Lentiviral Vectors are:
          </p>

          <div className="mb-8">
            <ul className="space-y-3 text-[#363636] text-lg">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-[#47A178] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span><strong>Replication-incompetent and non-pathogenic:</strong> ensuring safety in clinical use</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-[#47A178] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span><strong>Engineered for high transduction efficiency:</strong> achieving yields of ~1.2 x 10^10 TU per batch</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-[#47A178] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span><strong>Validated for consistency and safety:</strong> with stringent in-process controls across production runs</span>
              </li>
            </ul>
          </div>

          <p className="text-2xl font-medium text-[#363636]">
            By seamlessly integrating our vector platform into the CAR-T manufacturing process, we enhance operational efficiency and clinical precision, yielding highly potent, target-specific T cells (NexCAR19) with reduced variability and consistently superior therapeutic outcomes.
          </p>

          {/* Bottom Divider Line */}
          <div className="mt-20 flex justify-center">
            <div className="w-full max-w-[650px] h-[1px] bg-[#FFBF00] mx-4"></div>
          </div>
        </div>
      </section>

      {/* Product Pipeline Section */}
      <section id="pipeline" className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-normal text-[#47A178] font-futura mt-5 mb-8">
            The Product Pipeline
          </h2>

          <p className="text-2xl font-medium text-[#363636] mb-7 leading-10">
            Discover our innovative pipeline of CAR-T cell therapies targeting both hematological cancers and solid tumors. With NexCAR19 leading our portfolio and multiple promising candidates in development, we're advancing breakthrough treatments for patients worldwide.
          </p>

          {/* Pipeline Card */}
          <div className="max-w-4xl mx-auto bg-gray-100 p-5 rounded-xl border border-gray-300 text-sm">
            <h3 className="text-center text-2xl font-bold mb-5 text-[#1A1A1A]">Product Pipeline</h3>

            {/* NexCAR19 */}
            <div className="bg-gray-100 border border-gray-300 rounded-xl p-4 mb-5 flex flex-col relative hover:bg-white hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer">
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <h4 className="text-base font-bold mb-1 text-[#1A1A1A]">Talicabtagene autoleucel (NexCAR19)</h4>
                  <p className="text-sm text-[#666666] mb-1">R/R-ALL, R/R-BCL</p>
                  <p className="text-sm text-[#666666] mb-1">Target: CD19</p>
                </div>
              </div>
              <div className="flex items-center mt-3">
                <div className="flex-1 bg-gray-300 h-9 rounded-xl relative overflow-hidden">
                  <div className="bg-[#47A178] h-full rounded-l-xl absolute top-0 left-0" style={{ width: '100%' }}></div>
                  <div className="absolute top-0 left-0 w-full h-full flex justify-between items-center px-4">
                    <span className="text-sm font-bold text-white z-10">Discovery</span>
                    <span className="text-sm font-bold text-white z-10">Preclinical</span>
                    <span className="text-sm font-bold text-white z-10">Clinical</span>
                    <span className="text-sm font-bold text-white z-10">Commercial</span>
                  </div>
                </div>
                <div className="font-bold text-[#47A178] text-sm pl-4 whitespace-nowrap">2023</div>
              </div>
              <div className="text-center italic font-normal text-[#47a178] mt-2 text-sm">
                Currently available for ex-India out-licensing partnerships
              </div>
            </div>

            {/* HCAR2 */}
            <div className="bg-gray-100 border border-gray-300 rounded-xl p-4 mb-5 flex flex-col relative hover:bg-white hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer">
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <h4 className="text-base font-bold mb-1 text-[#1A1A1A]">HCAR2</h4>
                  <p className="text-sm text-[#666666] mb-1">Multiple Myeloma</p>
                  <p className="text-sm text-[#666666] mb-1">Target: BCMA</p>
                </div>
              </div>
              <div className="flex items-center mt-3">
                <div className="flex-1 bg-gray-300 h-9 rounded-xl relative overflow-hidden">
                  <div className="bg-[#47A178] h-full rounded-l-xl absolute top-0 left-0" style={{ width: '75%' }}></div>
                  <div className="absolute top-0 left-0 w-full h-full flex justify-between items-center px-4">
                    <span className="text-sm font-bold text-white z-10">Discovery</span>
                    <span className="text-sm font-bold text-white z-10">Preclinical</span>
                    <span className="text-sm font-bold text-white z-10">Clinical</span>
                    <span className="text-sm font-bold text-white z-10">Commercial</span>
                  </div>
                </div>
                <div className="font-bold text-[#47A178] text-sm pl-4 whitespace-nowrap">2025</div>
              </div>
            </div>

            {/* HCAR3 */}
            <div className="bg-gray-100 border border-gray-300 rounded-xl p-4 mb-5 flex flex-col relative hover:bg-white hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer">
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <h4 className="text-base font-bold mb-1 text-[#1A1A1A]">HCAR3</h4>
                  <p className="text-sm text-[#666666] mb-1">Glioblastoma multiforme, Neuroblastoma</p>
                  <p className="text-sm text-[#666666] mb-1">Target: GD2</p>
                </div>
              </div>
              <div className="flex items-center mt-3">
                <div className="flex-1 bg-gray-300 h-9 rounded-xl relative overflow-hidden">
                  <div className="bg-[#47A178] h-full rounded-l-xl absolute top-0 left-0" style={{ width: '25%' }}></div>
                  <div className="absolute top-0 left-0 w-full h-full flex justify-between items-center px-4">
                    <span className="text-sm font-bold text-white z-10">Discovery</span>
                    <span className="text-sm font-bold text-white z-10">Preclinical</span>
                    <span className="text-sm font-bold text-white z-10">Clinical</span>
                    <span className="text-sm font-bold text-white z-10">Commercial</span>
                  </div>
                </div>
                <div className="font-bold text-[#47A178] text-sm pl-4 whitespace-nowrap">2027</div>
              </div>
            </div>

            {/* TriCAR (CX170) */}
            <div className="bg-gray-100 border border-gray-300 rounded-xl p-4 mb-5 flex flex-col relative hover:bg-white hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer">
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <h4 className="text-base font-bold mb-1 text-[#1A1A1A]">TriCAR (CX170)</h4>
                  <p className="text-sm text-[#666666] mb-1">R/R-ALL, R/R-BCL</p>
                  <p className="text-sm text-[#666666] mb-1">Target: CD19, CD20, CD22</p>
                </div>
              </div>
              <div className="flex items-center mt-3">
                <div className="flex-1 bg-gray-300 h-9 rounded-xl relative overflow-hidden">
                  <div className="bg-[#47A178] h-full rounded-l-xl absolute top-0 left-0" style={{ width: '50%' }}></div>
                  <div className="absolute top-0 left-0 w-full h-full flex justify-between items-center px-4">
                    <span className="text-sm font-bold text-white z-10">Discovery</span>
                    <span className="text-sm font-bold text-white z-10">Preclinical</span>
                    <span className="text-sm font-bold text-white z-10">Clinical</span>
                    <span className="text-sm font-bold text-white z-10">Commercial</span>
                  </div>
                </div>
                <div className="font-bold text-[#47A178] text-sm pl-4 whitespace-nowrap">2027</div>
              </div>
              <div className="text-center italic font-bold text-gray-900 mt-2 text-sm">
                Technology Partner: Caring - Cross
              </div>
            </div>

            {/* HCAR4 */}
            <div className="bg-gray-100 border border-gray-300 rounded-xl p-4 mb-5 flex flex-col relative hover:bg-white hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer">
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <h4 className="text-base font-bold mb-1 text-[#1A1A1A]">HCAR4</h4>
                  <p className="text-sm text-[#666666] mb-1">Gastroesophageal Junction (GEJ) & Gastric Cancer</p>
                  <p className="text-sm text-[#666666] mb-1">Target: Undisclosed</p>
                </div>
              </div>
              <div className="flex items-center mt-3">
                <div className="flex-1 bg-gray-300 h-9 rounded-xl relative overflow-hidden">
                  <div className="bg-[#47A178] h-full rounded-l-xl absolute top-0 left-0" style={{ width: '25%' }}></div>
                  <div className="absolute top-0 left-0 w-full h-full flex justify-between items-center px-4">
                    <span className="text-sm font-bold text-white z-10">Discovery</span>
                    <span className="text-sm font-bold text-white z-10">Preclinical</span>
                    <span className="text-sm font-bold text-white z-10">Clinical</span>
                    <span className="text-sm font-bold text-white z-10">Commercial</span>
                  </div>
                </div>
                <div className="font-bold text-[#47A178] text-sm pl-4 whitespace-nowrap">2028</div>
              </div>
            </div>

            {/* Footnote */}
            <div className="mt-8 text-sm text-gray-600 border-t border-gray-300 pt-4">
              <p className="mb-3 text-[#666666] font-medium">Several other assets under discovery for the treatment of solid tumors and haematological malignancies</p>
              <div className="grid grid-cols-2 gap-2 text-[#666666] font-medium">
                <div>R/R: Relapsed Refractory</div>
                <div>ALL: Acute Lymphoblastic Leukaemia</div>
                <div>BCL: B-Cell Lymphoma</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Publications Section */}
      <section id="publications" className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Image */}
            <div className="flex justify-center lg:justify-start">
              <img
                src="/src/assets/images/science/Publications.jpg"
                alt="Scientific Publications - Laboratory research"
                className="w-full max-w-xl h-auto rounded-3xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer"
              />
            </div>

            {/* Right Column - Content */}
            <div className="text-center lg:text-left">
              <h2 className="text-4xl font-normal text-[#47A178] font-futura mb-8">
                Publications
              </h2>

              <p className="text-[22px] text-[#363636] leading-8 font-normal">
                Read our publications, showcased in prestigious journals such as
                Molecular Cancer Therapeutics by AACR and Blood by the
                American Society of Haematology.
              </p>

              <button
                onClick={handleViewPublications}
                className="bg-[#FFBF00] hover:bg-[#E6AC00] text-[#363636] text-lg font-medium px-8 py-3 rounded-full transition-colors duration-300 w-full max-w-full mt-8"
              >
                View Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Collaborate with Us Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column - Content */}
            <div>
              <h2 className="text-4xl font-normal text-[#47A178] font-futura mb-8">
                Collaborate with Us
              </h2>

              <p className="text-2xl font-medium text-[#363636] mb-7">
                To co-develop the next generation of our cellular therapies or to broaden access in your territories.
              </p>

              <ul className="space-y-3 text-[#363636] text-lg">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-[#47A178] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Research & Development of innovative cellular therapies.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-[#47A178] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Expanding Product Access to underserved regions.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-[#47A178] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Philanthropic initiatives to support global health equity.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-[#47A178] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Investment opportunities to advance therapeutic solutions.</span>
                </li>
              </ul>
            </div>

            {/* Right Column - Form */}
            <div className="bg-white p-8 rounded-xl border border-gray-200 text-lg">
              <form className="space-y-6">
                {/* First Name and Last Name */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#47A178] focus:border-transparent outline-none transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#47A178] focus:border-transparent outline-none transition-colors"
                      required
                    />
                  </div>
                </div>

                {/* Institution */}
                <div>
                  <input
                    type="text"
                    name="institution"
                    placeholder="Institution"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#47A178] focus:border-transparent outline-none transition-colors"
                    required
                  />
                </div>

                {/* Partnering Category */}
                <div>
                  <select
                    name="partneringCategory"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#47A178] focus:border-transparent outline-none transition-colors text-gray-700 cursor-pointer"
                    required
                  >
                    <option value="">- Select - Partnering Category</option>
                    <option value="research-development">Research & Development</option>
                    <option value="product-access">Product Access</option>
                    <option value="philanthropic">Philanthropic Initiatives</option>
                    <option value="investment">Investment Opportunities</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Phone Number */}
                <div>
                  <input
                    type="tel"
                    name="phoneNumber"
                    placeholder="Phone No."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#47A178] focus:border-transparent outline-none transition-colors"
                    required
                  />
                </div>

                {/* Email Address */}
                <div>
                  <input
                    type="email"
                    name="emailAddress"
                    placeholder="Email Address"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#47A178] focus:border-transparent outline-none transition-colors"
                    required
                  />
                </div>

                {/* Message */}
                <div>
                  <textarea
                    name="message"
                    placeholder="Message *"
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#47A178] focus:border-transparent outline-none transition-colors resize-none"
                    required
                  ></textarea>
                </div>

                {/* Submit Button */}
                <div className="flex justify-center">
                  <button className='bg-[#FFBF00] hover:bg-[#E6AC00] text-[#363636] text-lg font-medium px-4 py-3 rounded-full transition-colors duration-300 w-full max-w-[150px] mt-8'>
                    Submit Form
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Science