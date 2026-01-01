import { PdfDownload } from "@/assets/svg/Icons"
import PatientTestimonial from "@/components/PatientTestimonial"
import StatCard from "@/components/StatCard"
import TreatmentCenters from "@/components/TreatmentCenters"
import CancerTypesSection from "@/components/CancerTypesSection"
import { useState } from 'react'

const ForPatients = () => {
  // Slider state
  const [currentSlide, setCurrentSlide] = useState(0)
  const totalSlides = 6

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
  }

  return (
    <>
      {/* What is NexCAR19 Section */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* First Row - What is NexCAR19 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-[60px]">
            <div>
              <h2 className="text-4xl font-normal text-[#47A178] font-futura mb-8">What is NexCAR19™ ?</h2>
              <p className="text-[22px] font-medium text-[#363636] leading-relaxed">
                <span className="font-bold text-[#305595]">NexCAR19™</span> is a prescription drug for treating specific relapsed
                or refractory B-cell Non-Hodgkin's Lymphomas and B-cell Acute
                Lymphoblastic Leukaemia when frontline therapy or other standard
                treatments have been unsuccessful.
              </p>
            </div>
            <div>
              <img
                src="/images/NexCAR19/patients/scientist.jpg"
                alt="Scientist working in laboratory"
                className="rounded-3xl shadow-lg w-auto h-auto hover:scale-105 hover:shadow-xl transition-all duration-300 ease-in-out cursor-pointer"
              />
            </div>
          </div>

          {/* Second Row - Is NexCAR19 for you */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="/images/NexCAR19/patients/caregiver.jpg"
                alt="Patient with caregiver"
                className="rounded-3xl shadow-lg w-auto h-auto hover:scale-105 hover:shadow-xl transition-all duration-300 ease-in-out cursor-pointer"
              />
            </div>
            <div>
              <h2 className="text-4xl font-normal text-[#47A178] font-futura mb-8">Is NexCAR19™ for you?</h2>
              <p className="text-[22px] font-medium text-[#363636] leading-relaxed mb-6">
                If you're 15 or older and have B-cell Non-Hodgkin's Lymphoma or
                B-cell Acute Lymphoblastic Leukaemia, your haematologist or
                medical oncologist might recommend <span className="font-bold text-[#305595]">NexCAR19™</span> if:
              </p>
              <ul className="space-y-3 text-[#363636] text-base">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-teal-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Frontline treatment was not sufficient to achieve complete remission.</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-teal-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Previous treatment didn't work, or the cancer returned after remission.</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-teal-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Stem cell transplant failed or is not suitable</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Which cancers can NexCAR19 treat Section - Reusable Component */}
      <CancerTypesSection isHCPView={false} />

      {/* Why NexCAR19 Section */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl text-start font-normal text-[#47A178] font-futura mb-7">Why NexCAR19™ ?</h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-7 items-stretch">
            {/* Left Side - Patient Image (spans 3 rows on desktop) */}
            <div className="relative row-span-1 lg:row-span-3">
              <div className="rounded-3xl relative overflow-hidden h-full
                transition-all duration-300
                hover:scale-[1.02]
                hover:shadow-xl
                hover:border hover:border-[#47A178]">
                <img
                  src="/images/NexCAR19/patients/care-1.jpg"
                  alt="Patient with healthcare provider"
                  className="w-full h-full object-cover"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t
                 from-[rgba(71,161,120,0.90)]
                 via-[rgba(71,161,120,0.45)]
                 to-[rgba(71,161,120,0.10)]"></div>

                {/* Content */}
                <div className="absolute bottom-6 left-8 z-10 text-white">
                  <div className="text-[20px]">Total Patients Treated</div>
                  <div className="text-[32px] font-semibold text-[#FFBF00]">450+</div>
                  <div className="text-lg">Lives transformed through treatment</div>
                </div>
              </div>
            </div>

            {/* Right Side – Stats */}
            <StatCard
              title="B-NHL Response Rate"
              value="72%"
              desc="at 28 days in clinical trials"
            />
            <StatCard
              title="B-ALL Response Rate"
              value="73%"
              desc="at 28 days in clinical trials"
            />

            <StatCard
              title="Survival Chances at 1 year"
              value="> 50%"
              desc="in unmet B-NHL & B-ALL in clinical trials"
            />
            <StatCard
              title="Vein-to-Vein Time"
              value="~18 days"
              desc="in Clinical Trials"
            />

            <StatCard
              title="Longest Remission"
              value="3+ Years"
              desc="of sustained response"
            />
            <StatCard
              title="Low Hospitalization Duration"
              value="< 15 days"
              desc="post infusion, barring severe side effects"
            />
          </div>


          {/* Last Updated */}
          <div className="text-center mt-8">
            <p className="text-md text-[#00000057] italic">Last updated December 2025</p>
          </div>
        </div>
      </section>

      {/* Patient Testimonial Section */}
      <section className="py-8 bg-white">
        <PatientTestimonial showDescription={false} headerMargin="mb-12" bottomLine={false} />
      </section>

      {/* How does NexCAR19 work Section */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl text-start font-normal text-[#47A178] font-futura mb-8">How does NexCAR19™ work?</h2>

          {/* Explanation Text */}
          <div className="max-w-7xl mx-auto mb-10">
            <p className="text-[22px] font-medium text-[#363636] leading-relaxed mb-[30px]">
              <span className="font-bold text-[#305595]">NexCAR19™</span> is a type of CAR-T cell therapy. T-cells are naturally made by your body as an advanced defense against viruses and
              cancer cells. As they mature, they develop specific connectors (receptors) to target key signals in cancer cells. However, cancers can
              escape the inbuilt defense mechanism of T-cells, which can lead to an increase in tumor burden and can result in the survival of cancer
              cells and a further increase in tumor burden. CD19 is a protein commonly present on the surfaces of certain B-cell cancers.
            </p>
            <p className="text-[22px] font-medium text-[#363636] leading-relaxed">
              Our scientists have designed instructions for your T-cells to express unique proteins called Chimeric Antigen Receptors (CARs) on their
              surface, which will enable them to bind to a specific target on the cancer cells. These instructions are delivered genetically using a vehicle
              known as a lentiviral vector. NexCAR19 targets a marker called CD19, which is commonly present on the surface of cancerous B-cells.
            </p>
          </div>

          {/* Process Steps */}
          <div className="space-y-6">
            {/* First Row - 3 Cards */}
            <div className="flex flex-wrap justify-center gap-[25px]">
              {/* 1. Isolate */}
              <div className="bg-white rounded-2xl w-[280px] min-h-[160px] p-5 shadow-[0_8px_20px_rgba(241,196,15,0.3)] transition-all duration-300 ease-in-out flex flex-col justify-center items-center border border-[#f1c40f] text-center hover:transform hover:scale-105 hover:shadow-[0_12px_30px_rgba(241,196,15,0.4)]">
                <h3 className="text-base font-bold text-[#222] mb-[10px]">1. Isolate</h3>
                <p className="text-sm text-[#555555] leading-relaxed">Select and activate T-cells from the patient's blood sample.</p>
              </div>

              {/* 2. Program */}
              <div className="bg-white rounded-2xl w-[280px] min-h-[160px] p-5 shadow-[0_8px_20px_rgba(241,196,15,0.3)] transition-all duration-300 ease-in-out flex flex-col justify-center items-center border border-[#f1c40f] text-center hover:transform hover:scale-105 hover:shadow-[0_12px_30px_rgba(241,196,15,0.4)]">
                <h3 className="text-base font-bold text-[#222] mb-[10px]">2. Program</h3>
                <p className="text-sm text-[#555555] leading-relaxed">Deliver genetic instructions to T-cells using viral vectors.</p>
              </div>

              {/* 3. Engineer */}
              <div className="bg-white rounded-2xl w-[280px] min-h-[160px] p-5 shadow-[0_8px_20px_rgba(241,196,15,0.3)] transition-all duration-300 ease-in-out flex flex-col justify-center items-center border border-[#f1c40f] text-center hover:transform hover:scale-105 hover:shadow-[0_12px_30px_rgba(241,196,15,0.4)]">
                <h3 className="text-base font-bold text-[#222] mb-[10px]">3. Engineer</h3>
                <p className="text-sm text-[#555555] leading-relaxed">Enable T-cells to express Chimeric Antigen Receptors (CARs).</p>
              </div>
            </div>

            {/* Second Row - 2 Cards */}
            <div className="flex flex-wrap justify-center gap-[25px]">
              {/* 4. Expand */}
              <div className="bg-white rounded-2xl w-[280px] min-h-[160px] p-5 shadow-[0_8px_20px_rgba(241,196,15,0.3)] transition-all duration-300 ease-in-out flex flex-col justify-center items-center border border-[#f1c40f] text-center hover:transform hover:scale-105 hover:shadow-[0_12px_30px_rgba(241,196,15,0.4)]">
                <h3 className="text-base font-bold text-[#222] mb-[10px]">4. Expand</h3>
                <p className="text-sm text-[#555555] leading-relaxed">Multiply CAR-T cells to achieve the therapeutic dose.</p>
              </div>

              {/* 5. Infuse */}
              <div className="bg-white rounded-2xl w-[280px] min-h-[160px] p-5 shadow-[0_8px_20px_rgba(241,196,15,0.3)] transition-all duration-300 ease-in-out flex flex-col justify-center items-center border border-[#f1c40f] text-center hover:transform hover:scale-105 hover:shadow-[0_12px_30px_rgba(241,196,15,0.4)]">
                <h3 className="text-base font-bold text-[#222] mb-[10px]">5. Infuse</h3>
                <p className="text-sm text-[#555555] leading-relaxed">Administer CAR-T cells to the patient for targeted cancer treatment.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Treatment Process Slider Section */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-normal text-[#47A178] font-futura mb-8">Treatment Process</h2>
          <p className="text-[22px] font-medium text-[#363636] max-w-7xl mx-auto mb-6">
            A comprehensive guide through each step of your NexCAR19 treatment journey, detailing what to expect and how to prepare?
          </p>

          {/* Slider Container */}
          <div className="relative">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {/* Slide 1 - Initial Consultation */}
                <div className="w-full flex-shrink-0 px-4">
                  <div className="bg-gray-50 rounded-2xl p-8 max-w-4xl mx-auto">
                    <h3 className="text-[32px] text-[#47A178] mb-6 text-center">Step 1: Initial Consultation</h3>
                    <p className="text-2xl text-[#363636] mb-6 text-center">
                      Meet with your hematologist or oncologist to discuss NexCAR19 treatment and evaluate your eligibility for CAR T-cell therapy.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="text-lg font-bold text-[#363636] mb-4">What to Expect:</h4>
                        <ul className="space-y-2 text-[#363636] text-lg">
                          <li className="flex items-start">
                            <span className="w-2 h-2 bg-[#47A178] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            <span>Comprehensive medical assessments, including blood tests and imaging studies.</span>
                          </li>
                          <li className="flex items-start">
                            <span className="w-2 h-2 bg-[#47A178] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            <span>Discussion of your medical history and previous treatments.</span>
                          </li>
                          <li className="flex items-start">
                            <span className="w-2 h-2 bg-[#47A178] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            <span>Explanation of the CAR T-cell therapy process, potential benefits and risks.</span>
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-lg font-bold text-[#363636] mb-4">Preparation Tips:</h4>
                        <ul className="space-y-2 text-[#363636] text-lg">
                          <li className="flex items-start">
                            <span className="w-2 h-2 bg-[#47A178] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            <span>Bring a list of current medications and any relevant medical records.</span>
                          </li>
                          <li className="flex items-start">
                            <span className="w-2 h-2 bg-[#47A178] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            <span>Prepare questions or concerns to discuss with your healthcare team.</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Slide 2 - Pre-Treatment Preparation */}
                <div className="w-full flex-shrink-0 px-4">
                  <div className="bg-gray-50 rounded-2xl p-8 max-w-4xl mx-auto">
                    <h3 className="text-[32px] text-[#47A178] mb-6 text-center">Step 2: Pre-Treatment Preparation</h3>
                    <p className="text-2xl text-[#363636] mb-6 text-center">
                      Comprehensive health evaluation and preparation for the CAR T-cell therapy process.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="text-lg font-bold text-[#363636] mb-4">What to Expect:</h4>
                        <ul className="space-y-2 text-[#363636] text-lg">
                          <li className="flex items-start">
                            <span className="w-2 h-2 bg-[#47A178] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            <span>Additional diagnostic tests and scans to assess your condition.</span>
                          </li>
                          <li className="flex items-start">
                            <span className="w-2 h-2 bg-[#47A178] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            <span>Heart and lung function tests to ensure you're ready for treatment.</span>
                          </li>
                          <li className="flex items-start">
                            <span className="w-2 h-2 bg-[#47A178] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            <span>Discussion about treatment timeline and logistics.</span>
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-lg font-bold text-[#363636] mb-4">Preparation Tips:</h4>
                        <ul className="space-y-2 text-[#363636] text-lg">
                          <li className="flex items-start">
                            <span className="w-2 h-2 bg-[#47A178] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            <span>Arrange for support from family and friends during treatment.</span>
                          </li>
                          <li className="flex items-start">
                            <span className="w-2 h-2 bg-[#47A178] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            <span>Plan for time off work and daily activities.</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Slide 3 - T-Cell Collection */}
                <div className="w-full flex-shrink-0 px-4">
                  <div className="bg-gray-50 rounded-2xl p-8 max-w-4xl mx-auto">
                    <h3 className="text-[32px] text-[#47A178] mb-6 text-center">Step 3: T-Cell Collection</h3>
                    <p className="text-2xl text-[#363636] mb-6 text-center">
                      Your T-cells are collected through a process called apheresis, which is similar to donating blood.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="text-lg font-bold text-[#363636] mb-4">What to Expect:</h4>
                        <ul className="space-y-2 text-[#363636] text-lg">
                          <li className="flex items-start">
                            <span className="w-2 h-2 bg-[#47A178] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            <span>Outpatient procedure lasting 3-6 hours.</span>
                          </li>
                          <li className="flex items-start">
                            <span className="w-2 h-2 bg-[#47A178] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            <span>Blood is drawn, T-cells are separated, and remaining blood is returned.</span>
                          </li>
                          <li className="flex items-start">
                            <span className="w-2 h-2 bg-[#47A178] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            <span>Minimal discomfort, similar to blood donation.</span>
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-lg font-bold text-[#363636] mb-4">Preparation Tips:</h4>
                        <ul className="space-y-2 text-[#363636] text-lg">
                          <li className="flex items-start">
                            <span className="w-2 h-2 bg-[#47A178] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            <span>Eat a good meal and stay hydrated before the procedure.</span>
                          </li>
                          <li className="flex items-start">
                            <span className="w-2 h-2 bg-[#47A178] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            <span>Bring entertainment like books or music for the waiting time.</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Slide 4 - Manufacturing */}
                <div className="w-full flex-shrink-0 px-4">
                  <div className="bg-gray-50 rounded-2xl p-8 max-w-4xl mx-auto">
                    <h3 className="text-[32px] text-[#47A178] mb-6 text-center">Step 4: Manufacturing</h3>
                    <p className="text-2xl text-[#363636] mb-6 text-center">
                      Your T-cells are genetically modified in our WHO-GMP certified laboratory to create CAR T-cells.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="text-lg font-bold text-[#363636] mb-4">What to Expect:</h4>
                        <ul className="space-y-2 text-[#363636] text-lg">
                          <li className="flex items-start">
                            <span className="w-2 h-2 bg-[#47A178] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            <span>Manufacturing process takes approximately 2-3 weeks.</span>
                          </li>
                          <li className="flex items-start">
                            <span className="w-2 h-2 bg-[#47A178] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            <span>Your cells are modified to express CAR proteins.</span>
                          </li>
                          <li className="flex items-start">
                            <span className="w-2 h-2 bg-[#47A178] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            <span>Quality testing ensures safety and effectiveness.</span>
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-lg font-bold text-[#363636] mb-4">Preparation Tips:</h4>
                        <ul className="space-y-2 text-[#363636] text-lg">
                          <li className="flex items-start">
                            <span className="w-2 h-2 bg-[#47A178] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            <span>Continue regular medical care and monitoring.</span>
                          </li>
                          <li className="flex items-start">
                            <span className="w-2 h-2 bg-[#47A178] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            <span>Stay in close contact with your healthcare team.</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Slide 5 - Conditioning Chemotherapy */}
                <div className="w-full flex-shrink-0 px-4">
                  <div className="bg-gray-50 rounded-2xl p-8 max-w-4xl mx-auto">
                    <h3 className="text-[32px] text-[#47A178] mb-6 text-center">Step 5: Conditioning Chemotherapy</h3>
                    <p className="text-2xl text-[#363636] mb-6 text-center">
                      Preparatory treatment to make room for the CAR T-cells and help them work more effectively.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="text-lg font-bold text-[#363636] mb-4">What to Expect:</h4>
                        <ul className="space-y-2 text-[#363636] text-lg">
                          <li className="flex items-start">
                            <span className="w-2 h-2 bg-[#47A178] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            <span>Low-dose chemotherapy given 2-7 days before CAR T-cell infusion.</span>
                          </li>
                          <li className="flex items-start">
                            <span className="w-2 h-2 bg-[#47A178] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            <span>Helps create space for CAR T-cells to expand and work.</span>
                          </li>
                          <li className="flex items-start">
                            <span className="w-2 h-2 bg-[#47A178] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            <span>May cause temporary side effects like fatigue.</span>
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-lg font-bold text-[#363636] mb-4">Preparation Tips:</h4>
                        <ul className="space-y-2 text-[#363636] text-lg">
                          <li className="flex items-start">
                            <span className="w-2 h-2 bg-[#47A178] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            <span>Rest well and maintain good nutrition.</span>
                          </li>
                          <li className="flex items-start">
                            <span className="w-2 h-2 bg-[#47A178] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            <span>Report any unusual symptoms to your healthcare team.</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Slide 6 - CAR T-Cell Infusion */}
                <div className="w-full flex-shrink-0 px-4">
                  <div className="bg-gray-50 rounded-2xl p-8 max-w-4xl mx-auto">
                    <h3 className="text-[32px] text-[#47A178] mb-6 text-center">Step 6: CAR T-Cell Infusion</h3>
                    <p className="text-2xl text-[#363636] mb-6 text-center">
                      Your modified CAR T-cells are infused back into your body through an IV, similar to a blood transfusion.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="text-lg font-bold text-[#363636] mb-4">What to Expect:</h4>
                        <ul className="space-y-2 text-[#363636] text-lg">
                          <li className="flex items-start">
                            <span className="w-2 h-2 bg-[#47A178] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            <span>Simple IV infusion lasting 15-30 minutes.</span>
                          </li>
                          <li className="flex items-start">
                            <span className="w-2 h-2 bg-[#47A178] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            <span>Close monitoring during and after the infusion.</span>
                          </li>
                          <li className="flex items-start">
                            <span className="w-2 h-2 bg-[#47A178] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            <span>Hospital stay for observation and monitoring.</span>
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-lg font-bold text-[#363636] mb-4">Preparation Tips:</h4>
                        <ul className="space-y-2 text-[#363636] text-lg">
                          <li className="flex items-start">
                            <span className="w-2 h-2 bg-[#47A178] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            <span>Arrange for extended hospital stay (1-2 weeks).</span>
                          </li>
                          <li className="flex items-start">
                            <span className="w-2 h-2 bg-[#47A178] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            <span>Have support person available for assistance.</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors z-10"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors z-10"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Dots Navigation */}
            <div className="flex justify-center mt-8 space-x-2">
              {[0, 1, 2, 3, 4, 5].map((index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${currentSlide === index ? 'bg-[#47A178]' : 'bg-gray-300'
                    }`}
                />
              ))}
            </div>
          </div>

          {/* Bottom Divider Line */}
          <div className="mt-14 flex justify-center">
            <div className="w-full max-w-7xl h-[1px] bg-[#47A178] mx-auto"></div>
          </div>
        </div>
      </section>

      {/* Partnered Hospitals Section */}
      <TreatmentCenters bottomLine={false} />

      {/* What are the Side Effects Section */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-normal text-[#47A178] font-futura mb-8">What are the Side Effects of NexCAR19?</h2>
          <p className="text-[22px] font-medium text-[#363636] leading-relaxed mb-[50px]">
            <span className="font-bold text-[#305595]">NexCAR19™</span> may cause side effects that are severe and/or life-threatening. Call/visit your physician or
            get emergency help right away if you get any of the following
          </p>

          {/* Side Effects Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
            {/* Fever */}
            <div className="bg-white rounded-3xl w-full max-w-[280px] min-h-[200px] p-6 shadow-lg border border-gray-200 text-center hover:shadow-xl transition-shadow duration-300">
              <div className="mb-3">
                <img
                  src="/images/NexCAR19/patients/fever@2x.png"
                  alt="Fever icon"
                  className="w-[150px] h-auto mx-auto"
                />
              </div>
              <h3 className="text-xl font-normal text-[#363636]">Fever (100.4°F/38°C or higher)</h3>
            </div>

            {/* Difficulty Breathing */}
            <div className="bg-white rounded-3xl w-full max-w-[280px] min-h-[200px] p-6 shadow-lg border border-gray-200 text-center hover:shadow-xl transition-shadow duration-300">
              <div className="mb-3">
                <img
                  src="/images/NexCAR19/patients/difficulty-breathing@2x.png"
                  alt="Difficulty breathing icon"
                  className="w-[150px] h-auto mx-auto"
                />
              </div>
              <h3 className="text-xl font-normal text-[#363636]">Difficulty breathing</h3>
            </div>

            {/* Chills */}
            <div className="bg-white rounded-3xl w-full max-w-[280px] min-h-[200px] p-6 shadow-lg border border-gray-200 text-center hover:shadow-xl transition-shadow duration-300">
              <div className="mb-3">
                <img
                  src="/images/NexCAR19/patients/cough@2x.png"
                  alt="Chills icon"
                  className="w-[150px] h-auto mx-auto"
                />
              </div>
              <h3 className="text-xl font-normal text-[#363636]">Chills or shaking chills</h3>
            </div>

            {/* Confusion */}
            <div className="bg-white rounded-3xl w-full max-w-[280px] min-h-[200px] p-6 shadow-lg border border-gray-200 text-center hover:shadow-xl transition-shadow duration-300">
              <div className="mb-3">
                <img
                  src="/images/NexCAR19/patients/confusion@2x.png"
                  alt="Confusion icon"
                  className="w-[150px] h-auto mx-auto"
                />
              </div>
              <h3 className="text-xl font-normal text-[#363636]">Confusion</h3>
            </div>

            {/* Dizziness */}
            <div className="bg-white rounded-3xl w-full max-w-[280px] min-h-[200px] p-6 shadow-lg border border-gray-200 text-center hover:shadow-xl transition-shadow duration-300">
              <div className="mb-3">
                <img
                  src="/images/NexCAR19/patients/dizziness@2x.png"
                  alt="Dizziness icon"
                  className="w-[150px] h-auto mx-auto"
                />
              </div>
              <h3 className="text-xl font-normal text-[#363636]">Dizziness or lightheadedness</h3>
            </div>

            {/* Nausea */}
            <div className="bg-white rounded-3xl w-full max-w-[280px] min-h-[200px] p-6 shadow-lg border border-gray-200 text-center hover:shadow-xl transition-shadow duration-300">
              <div className="mb-3">
                <img
                  src="/images/NexCAR19/patients/nausea@2x.png"
                  alt="Nausea icon"
                  className="w-[150px] h-auto mx-auto"
                />
              </div>
              <h3 className="text-xl font-normal text-[#363636]">Severe nausea, vomiting, or diarrhea</h3>
            </div>

            {/* Fast Heartbeat */}
            <div className="bg-white rounded-3xl w-full max-w-[280px] min-h-[200px] p-6 shadow-lg border border-gray-200 text-center hover:shadow-xl transition-shadow duration-300">
              <div className="mb-3">
                <img
                  src="/images/NexCAR19/patients/heartbeat@2x.png"
                  alt="Heartbeat icon"
                  className="w-[150px] h-auto mx-auto"
                />
              </div>
              <h3 className="text-xl font-normal text-[#363636]">Fast or irregular heartbeat</h3>
            </div>

            {/* Fatigue */}
            <div className="bg-white rounded-3xl w-full max-w-[280px] min-h-[200px] p-6 shadow-lg border border-gray-200 text-center hover:shadow-xl transition-shadow duration-300">
              <div className="mb-3">
                <img
                  src="/images/NexCAR19/patients/fatigue@2x.png"
                  alt="Fatigue icon"
                  className="w-[150px] h-auto mx-auto"
                />
              </div>
              <h3 className="text-xl font-normal text-[#363636]">Severe fatigue or weakness</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Precautions Section */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-normal text-[#47A178] font-futura mb-8">Precautions</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Column */}
            <div>
              <p className="text-[22px] font-medium text-[#363636] leading-relaxed mb-6">
                Before receiving <span className="font-bold text-[#305595]">NexCAR19™</span>, inform your physician about any medical issues, including if you have or have had:
              </p>

              <ul className="space-y-3 text-[#363636] text-lg">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-[#47A178] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Neurologic problems (such as seizures, stroke, or memory loss).</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-[#47A178] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Lung or breathing problems.</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-[#47A178] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Heart problems.</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-[#47A178] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Liver problems.</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-[#47A178] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Kidney problems.</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-[#47A178] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>A recent or active infection.</span>
                </li>
              </ul>
            </div>

            {/* Right Column */}
            <div>
              <p className="text-[22px] font-medium text-[#363636] leading-relaxed mb-6">
                Inform your physician about all the medications you take, including prescription and over-the-counter medicines, vitamins, and herbal supplements. Inform your physician if you are pregnant, planning to be pregnant, or breastfeeding.
              </p>

              <p className="text-[22px] font-medium text-[#363636] leading-relaxed">
                A pregnancy test may be then performed prior to your starting treatment. No information is available of NexCAR19 use in pregnant or breastfeeding women; hence, its use is not recommended in cases of pregnancy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* For Caregivers Section */}
      <section
        className="py-14 relative"
        style={{
          backgroundImage: "url('/images/NexCAR19/patients/green-bg.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div className="text-[#EDEDED]">
              <h2 className="text-4xl text-[#FFBF00]">For Caregivers</h2>
              <h3 className="text-4xl text-[#FFBF00] mb-7">What is my role as a caregiver?</h3>

              <p className="text-[22px] font-medium leading-relaxed mb-6">
                Caregivers play a vital role in CAR T treatment, providing essential support throughout the patient's recovery. CAR T patients require a full-time caregiver to:
              </p>

              <ul className="space-y-4 text-lg">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-white rounded-full mt-2 mr-4 flex-shrink-0"></div>
                  <span className="leading-relaxed">
                    Stay with them for at least 4 weeks near a certified healthcare facility, as advised by the treatment team.
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-white rounded-full mt-2 mr-4 flex-shrink-0"></div>
                  <span className="leading-relaxed">
                    Monitor for side effects, including those the patient may not notice (refer to "Managing Side Effects" and "Important Facts about ImmunoACT" for details).
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-white rounded-full mt-2 mr-4 flex-shrink-0"></div>
                  <span className="leading-relaxed">
                    Assist with daily activities and recovery, such as maintaining a healthy diet and clean surroundings.
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-white rounded-full mt-2 mr-4 flex-shrink-0"></div>
                  <span className="leading-relaxed">
                    Provide transportation, as patients should not drive for at least 8 weeks post-infusion.
                  </span>
                </li>
              </ul>
            </div>

            {/* Right Column - Image */}
            <div className="flex justify-center">
              <div className="rounded-[32px] overflow-hidden max-w-auto">
                <img
                  src="/images/NexCAR19/patients/caregiver4.jpg"
                  alt="Caregiver supporting patient"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Patient Information Guide Section */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Image */}
            <div className="flex justify-center lg:justify-start">
              <div className="rounded-3xl overflow-hidden shadow-lg max-w-auto">
                <img
                  src="/images/NexCAR19/patients/info-guide.png"
                  alt="Healthcare team with patient - NexCAR19 Information Guide"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

            {/* Right Column - Content */}
            <div>
              <h2 className="text-4xl font-normal text-[#47A178] font-futura mb-9">
                NexCAR19™ Patient Information Guide
              </h2>

              <p className="text-[22px] font-medium text-[#363636] leading-relaxed mb-8">
                Essential information guide for <span className="font-bold text-[#305595]">NexCAR19™</span> (Actalycabtagene autoleucel), a CAR-T cell therapy for treating relapsed/refractory B-cell lymphomas and B-cell acute lymphoblastic leukemia.
              </p>

              {/* Download Button */}
              <div className="flex ">
                <button
                  onClick={() => {
                    const pdfUrl = '/assets/pdf/NexCAR19-Patients-Brochure-February-2025.pdf';
                    window.open(pdfUrl, '_blank');
                  }}
                  className="duration-300 flex justify-center items-center space-x-2 hover:shadow-xl  bg-yellow-400 hover:bg-yellow-500 text-black font-medium text-lg px-[18px] py-[9px] rounded-full transition-colors w-full"
                >
                  <span>Download Patient Information Guide</span>
                  <PdfDownload />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  )
}

export default ForPatients