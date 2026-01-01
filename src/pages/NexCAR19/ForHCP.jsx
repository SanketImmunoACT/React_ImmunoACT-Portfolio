import { Clipboard, PdfDownload } from '@/assets/svg/Icons'
import CancerTypesSection from '@/components/CancerTypesSection'
import { useState } from 'react'

const ForHCP = () => {
  const [expandedCard, setExpandedCard] = useState(null)

  const toggleCard = (cardType) => {
    setExpandedCard(expandedCard === cardType ? null : cardType)
  }

  return (
    <>
      {/* What is NexCAR19 Section - For HCP */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-normal text-[#47A178] font-futura mb-8">What is NexCAR19™ ?</h2>
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            <div className="flex justify-center lg:justify-start">
              <img
                src="/images/NexCAR19/hcp/NexCAR19.png"
                alt="NexCAR19 logo"
                className="w-[280px] h-auto"
              />
            </div>
            <div className="flex-1">
              <p className="text-[22px] font-medium text-[#363636] leading-relaxed">
                <span className="font-bold text-[#305595]">NexCAR19™</span> is an autologous CAR-T cell therapy indicated for the treatment of patients with relapsed or refractory B-cell Non-Hodgkin's Lymphoma (B-NHL) and B-cell Acute Lymphoblastic Leukaemia (B-ALL) who have not responded to, or have relapsed following, standard lines of therapy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Which cancers can NexCAR19 treat Section - Reusable Component */}
      <CancerTypesSection isHCPView={true} />

      {/* Unmet Needs in Relapsed/Refractory B-Cell Malignancies Section */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-start mb-12">
            <h2 className="text-4xl font-normal text-[#47A178] font-futura mb-8">Unmet Needs in Relapsed/Refractory B-Cell Malignancies</h2>
            <p className="text-[22px] font-medium text-[#363636] leading-relaxed max-w-7xl mx-auto">
              Transforming outcomes for patients with relapsed/refractory B-cell malignancies—where current treatments fall short
            </p>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Card 1 - Annual Cases */}
            <div className="bg-white rounded-3xl p-5 shadow-[0_8px_20px_rgba(71,161,120,0.15)] border border-[#47A178]/20 text-center hover:shadow-[0_12px_30px_rgba(71,161,120,0.25)] transition-all duration-300">
              <div className="text-[40px] font-bold text-[#339966] mb-4">~100,000</div>
              <p className="text-[#363636] text-lg font-medium leading-relaxed">
                Annual Estimated Diagnosed Cases of B-ALL & DLBCL in India
              </p>
            </div>

            {/* Card 2 - Relapses */}
            <div className="bg-white rounded-3xl p-5 shadow-[0_8px_20px_rgba(71,161,120,0.15)] border border-[#47A178]/20 text-center hover:shadow-[0_12px_30px_rgba(71,161,120,0.25)] transition-all duration-300">
              <div className="text-[40px] font-bold text-[#339966] mb-4">~40%</div>
              <p className="text-[#363636] text-lg font-medium leading-relaxed">
                Relapses in patients with DLBCL, of which 10% have refractory disease
              </p>
            </div>

            {/* Card 3 - Stem Cell Transplant */}
            <div className="bg-white rounded-3xl p-5 shadow-[0_8px_20px_rgba(71,161,120,0.15)] border border-[#47A178]/20 text-center hover:shadow-[0_12px_30px_rgba(71,161,120,0.25)] transition-all duration-300">
              <div className="text-[40px] font-bold text-[#339966] mb-4">&gt; 60%</div>
              <p className="text-[#363636] text-lg font-medium leading-relaxed">
                Patients requiring a Stem Cell Transplant are unable to receive one.
              </p>
            </div>

            {/* Card 4 - Survival Rate */}
            <div className="bg-white rounded-3xl p-5 shadow-[0_8px_20px_rgba(71,161,120,0.15)] border border-[#47A178]/20 text-center hover:shadow-[0_12px_30px_rgba(71,161,120,0.25)] transition-all duration-300">
              <div className="text-[40px] font-bold text-[#339966] mb-4">~41%</div>
              <p className="text-[#363636] text-lg font-medium leading-relaxed">
                Historical survival rate in patients with B-ALL
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Consider NexCAR19 as a treatment option Section */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-9">
            <h2 className="text-4xl font-normal text-[#47A178] font-futura mb-8">Consider NexCAR19™ as a treatment option</h2>
            <p className="text-[22px] font-medium text-[#363636] leading-relaxed">
              The administration of <span className="font-bold text-[#305595]">NexCAR19™</span> (Talicabtagene autoleucel) should be preceded by a thorough clinical risk evaluation and mitigation
              process at the treatment center. ImmunoACT recommends the following parameters as prerequisites for consideration of NexCAR19 for
              your patient. These parameters may be required by your patient's insurer or payer towards their access to CAR-T cell therapy.
            </p>
          </div>

          {/* Two Column Layout for Cancer Types */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* B-cell Non-Hodgkin's Lymphomas Card */}
            <div className="bg-white rounded-3xl p-10 shadow-[0_8px_20px_rgba(71,161,120,0.15)] border border-[#47A178]/20">
              <h3 className="text-2xl font-semibold text-[#47A178] mb-6 text-center">B-cell Non-Hodgkin's Lymphomas (B-NHL)</h3>
              <ul className="space-y-3 text-[#363636] text-base">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-[#47A178] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Diffuse Large B-cell Lymphoma</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-[#47A178] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>High-grade B-cell Lymphoma, not otherwise specified</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-[#47A178] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Primary Mediastinal Large B-cell Lymphoma</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-[#47A178] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Follicular Lymphoma</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-[#47A178] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Transformed Follicular Lymphoma (tFL)</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-[#47A178] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Mantle Cell Lymphoma (specify plasmorphic or blastoid)</span>
                </li>
              </ul>
              <div className="mt-6 pt-4 border-t border-gray-200">
                <p className="text-base text-gray-600 italic">
                  Confirmed by Immunohistochemistry & Histopathology/Biopsy Reports
                </p>
              </div>
            </div>

            {/* B-cell Acute Lymphoblastic Leukaemia Card */}
            <div className="bg-white rounded-3xl p-10 shadow-[0_8px_20px_rgba(71,161,120,0.15)] border border-[#47A178]/20">
              <h3 className="text-2xl font-bold text-[#47A178] mb-6 text-center">B-cell Acute Lymphoblastic Leukaemia (B-ALL)</h3>
              <ul className="space-y-3 text-[#363636] text-base">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-[#47A178] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Ph+ve B-ALL or Ph-like B-ALL or Not Otherwise Specified</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-[#47A178] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>CD19+ve expression (dim/moderate/bright) on the malignant clone, and absence of a CD19-ve malignant clone</span>
                </li>
              </ul>
              <div className="mt-6 pt-4 border-t border-gray-200">
                <p className="text-base text-gray-600 italic">
                  Confirmed by Bone Marrow Aspiration and Biopsy through Flow Cytometry / Immunophenotyping
                </p>
              </div>
            </div>
          </div>

          {/* Clinical Trial Information */}
          <div className="">
            <p className="text-[#363636] font-medium text-lg">
              Approved in patients aged 15 and above, for the treatment of relapsed/refractory B-cell lymphoma and B-cell acute lymphoblastic leukaemia in India.
            </p>
            <p className="text-[#363636] font-medium text-lg mt-5 leading-relaxed">
              <span className="font-bold text-[#305595]">NexCAR19</span> was assessed in an open-label, multicentre, phase 1/2 study in six tertiary cancer centres across India. Of 64 patients aged 15 and above with
              either relapsed/refractory B-cell lymphoma or B-cell acute lymphoblastic leukaemia, 14 were enrolled in Phase 1, and 50 were enrolled in Phase 2. At an
              efficacy dose of up to 5 × 10⁶ CAR-T cells per kg, NexCAR19 demonstrated an overall response rate of 73%. The trial exhibited a manageable safety profile
              with high efficacy in a difficult-to-treat population with B-cell malignancies, with these results published in Lancet Haematology.
            </p>
          </div>
        </div>
      </section>

      {/* Recommended Pointers for Eligibility Section */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-normal text-[#47A178] font-futura mb-8">Recommended Pointers for Eligibility</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* General Criteria - Left Column */}
            <div>
              <ul className="space-y-3 text-[#363636] text-lg">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-[#47A178] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>ECOG: 0-2</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-[#47A178] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Ejection Fraction (EF) on 2D Echo ≥ 45%</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-[#47A178] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Peripheral Blood ALC ≥ 500/μL or Absolute CD3+ T cell count ≥ 150/μL</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-[#47A178] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>AST/ALT ≤ 3× ULN, Total Bilirubin ≤ 2× ULN (Child-Pugh A/B unless derangement due to malignancy)</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-[#47A178] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Creatinine Clearance ≥ 30 mL/min</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-[#47A178] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Well-preserved lung function</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-[#47A178] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Well-controlled pre-existing medical & surgical comorbidities</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-[#47A178] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Absence of active infection or acute inflammation</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-[#47A178] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>CNS disease well-mitigated (if involved)</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-[#47A178] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Viral Marker Negative Status: HIV, HBV, HCV, CMV</span>
                </li>
              </ul>
            </div>

            {/* Expandable Cards - Right Column */}
            <div className="space-y-4">
              {/* B-ALL Specific Criteria Card */}
              <div className="bg-gray-50 rounded-2xl overflow-hidden shadow-[0_4px_12px_rgba(71,161,120,0.1)] border border-[#47A178]/10">
                <button
                  onClick={() => toggleCard('ball')}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-100 transition-colors duration-200"
                >
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-[#47A178]/10 rounded mr-3 flex items-center justify-center">
                      <Clipboard />
                    </div>
                    <span className="text-2xl font-medium text-[#47A178]">B-ALL Specific Criteria</span>
                  </div>
                  <svg
                    className={`w-5 h-5 text-[#47A178] transition-transform duration-200 ${expandedCard === 'ball' ? 'rotate-90' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                {expandedCard === 'ball' && (
                  <div className="px-6 py-6 bg-white">
                    <ul className="space-y-3 text-[#363636] text-lg">
                      <li className="font-medium mb-2">Low percentage of blasts in:</li>
                      <li className="flex items-start ml-4">
                        <span className="w-1.5 h-1.5 bg-[#47A178] rounded-full mt-2.5 mr-3 flex-shrink-0"></span>
                        <span>Peripheral blood</span>
                      </li>
                      <li className="flex items-start ml-4">
                        <span className="w-1.5 h-1.5 bg-[#47A178] rounded-full mt-2.5 mr-3 flex-shrink-0"></span>
                        <span>Bone marrow</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-[#47A178] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span>Presence or absence of extramedullary disease</span>
                      </li>
                    </ul>
                  </div>
                )}
              </div>

              {/* B-NHL Specific Criteria Card */}
              <div className="bg-gray-50 rounded-2xl overflow-hidden shadow-[0_4px_12px_rgba(71,161,120,0.1)] border border-[#47A178]/10">
                <button
                  onClick={() => toggleCard('bnhl')}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-100 transition-colors duration-200"
                >
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-[#47A178]/10 rounded mr-3 flex items-center justify-center">
                      <Clipboard />
                    </div>
                    <span className="text-2xl font-medium text-[#47A178]">B-NHL Specific Criteria</span>
                  </div>
                  <svg
                    className={`w-5 h-5 text-[#47A178] transition-transform duration-200 ${expandedCard === 'bnhl' ? 'rotate-90' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                {expandedCard === 'bnhl' && (
                  <div className="px-6 py-6 bg-white">
                    <ul className="space-y-3 text-[#363636] text-lg">
                      <li className="font-medium mb-2">Low disease bulk:</li>
                      <li className="flex items-start ml-4">
                        <span className="w-1.5 h-1.5 bg-[#47A178] rounded-full mt-2.5 mr-3 flex-shrink-0"></span>
                        <span>Subjective quantification by nodal size & extent of nodal/extranodal involvement</span>
                      </li>
                      <li className="flex items-start ml-4">
                        <span className="w-1.5 h-1.5 bg-[#47A178] rounded-full mt-2.5 mr-3 flex-shrink-0"></span>
                        <span>Or metabolically active tumor volume</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-[#47A178] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span>LDH levels may be used as additional supporting marker</span>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How does NexCAR19 work Section */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-normal text-[#47A178] font-futura mb-8 text-center">How does NexCAR19™ work?</h2>

          {/* Mechanism Explanation */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-[60px]">
            <div className="flex-1">
              <p className="text-[22px] font-medium text-[#363636] leading-relaxed">
                <span className="font-bold text-[#305595]">NexCAR19™</span> utilizes precisely engineered Chimeric Antigen Receptors featuring:
              </p>
              <ul className="space-y-4 text-[#363636] my-5 text-lg">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-[#47A178] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>A humanized single-chain variable fragment (ScFv) antibody that specifically targets CD19 markers found on B-cells</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-[#47A178] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>An optimized flexible spacer that enhances target binding efficiency and cellular interaction</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-[#47A178] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>A specialized 4-1BB co-stimulatory domain that significantly boosts T-cell activation, promotes robust proliferation, and supports long-term persistence</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-[#47A178] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>CD3ζ signaling components that trigger potent T-cell immune responses upon cancer cell recognition</span>
                </li>
              </ul>
            </div>
            <div className="flex items-center justify-center lg:justify-center">
              <img
                src="/images/NexCAR19/hcp/image-1.png"
                alt="NexCAR19 mechanism diagram showing CAR-T cell interaction with tumor cell"
                className="w-full max-w-[300px] h-auto rounded-3xl"
              />
            </div>
          </div>

          {/* Three Benefit Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Proven Clinical Performance Card */}
            <div className="bg-white rounded-3xl p-8 shadow-[0_8px_20px_rgba(71,161,120,0.15)] border border-[#47A178]/20 hover:shadow-[0_12px_30px_rgba(71,161,120,0.25)] transition-all duration-300">
              <h3 className="text-[26px] font-semibold text-[#47A178] mb-3 leading-8 text-center">Proven Clinical Performance</h3>
              <p className="text-[#363636] text-lg font-medium leading-relaxed text-center">
                Our anti-CD19 binding technology has demonstrated remarkable persistence in clinical settings, with documented durability of action extending beyond 24 months in select patients. The humanized ScFv component delivers exceptional efficacy while contributing to a reduced incidence of severe treatment-related toxicities.
              </p>
            </div>

            {/* Superior Therapeutic Profile Card */}
            <div className="bg-white rounded-3xl p-8 shadow-[0_8px_20px_rgba(71,161,120,0.15)] border border-[#47A178]/20 hover:shadow-[0_12px_30px_rgba(71,161,120,0.25)] transition-all duration-300">
              <h3 className="text-[26px] font-semibold text-[#47A178] mb-3 leading-8 text-center">Superior Therapeutic Profile</h3>
              <p className="text-[#363636] text-lg font-medium leading-relaxed text-center mb-6">
                <span className="font-bold text-[#305595]">NexCAR19™</span> modified T-cells offer a comprehensive treatment solution:
              </p>

              {/* Bullet Points */}
              <ul className="space-y-4 text-left text-base">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-[#47A178] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-[#363636]">
                    <span className="font-bold">Safety:</span> Rigorously tested cellular product with established safety profile
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-[#47A178] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-[#363636]">
                    <span className="font-bold">Durability:</span> Long-lasting anti-cancer activity for sustained disease control
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-[#47A178] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-[#363636]">
                    <span className="font-bold">Effectiveness:</span> Consistent response rates across diverse patient populations
                  </span>
                </li>
              </ul>
            </div>

            {/* Optimized Dosing Strategy Card */}
            <div className="bg-white rounded-3xl p-8 shadow-[0_8px_20px_rgba(71,161,120,0.15)] border border-[#47A178]/20 hover:shadow-[0_12px_30px_rgba(71,161,120,0.25)] transition-all duration-300">
              <h3 className="text-[26px] font-semibold text-[#47A178] mb-3 leading-8 text-center">Optimized Dosing Strategy</h3>
              <p className="text-[#363636] text-lg font-medium leading-relaxed text-center">
                With an efficacy threshold of more than 5 million CAR-T cells per kilogram of body weight, NexCAR19™ achieves exceptional tumor penetration and maintains effectiveness even in challenging high-risk patient populations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Safety & Efficacy Highlights Section */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-normal text-[#47A178] font-futura mb-8 text-center">Safety & Efficacy Highlights</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* B-ALL Column */}
            <div className="text-center">
              <h3 className="text-[32px] font-medium text-[#47A178] mb-8">B-ALL</h3>
              <div className="space-y-6 text-xl">
                {/* Complete Response Rate */}
                <div className="bg-gray-50 rounded-full p-5 border-2 border-[#47A178]/20 hover:border-[#47A178] hover:bg-[#47A178]/5 hover:shadow-[0_8px_20px_rgba(71,161,120,0.2)] hover:scale-105 transition-all duration-300 cursor-pointer group">
                  <p className="font-medium text-[#363636] group-hover:text-[#47A178]">
                    73% Complete Response Rate in Adult & Adolescent
                  </p>
                </div>

                {/* 1 Year PFS with BM Blasts */}
                <div className="bg-gray-50 rounded-full p-5 border-2 border-[#47A178]/20 hover:border-[#47A178] hover:bg-[#47A178]/5 hover:shadow-[0_8px_20px_rgba(71,161,120,0.2)] hover:scale-105 transition-all duration-300 cursor-pointer group">
                  <p className="font-medium text-[#363636] group-hover:text-[#47A178]">
                    1 Year PFS with BM Blasts &lt; 25%
                  </p>
                </div>

                {/* 1 Year OS with BM Blasts */}
                <div className="bg-gray-50 rounded-full p-5 border-2 border-[#47A178]/20 hover:border-[#47A178] hover:bg-[#47A178]/5 hover:shadow-[0_8px_20px_rgba(71,161,120,0.2)] hover:scale-105 transition-all duration-300 cursor-pointer group">
                  <p className="font-medium text-[#363636] group-hover:text-[#47A178]">
                    1 Year OS with BM Blasts &lt; 25%
                  </p>
                </div>
              </div>
            </div>

            {/* B-NHL Column */}
            <div className="text-center">
              <h3 className="text-[32px] font-medium text-[#47A178] mb-8">B-NHL</h3>
              <div className="space-y-6 text-xl">
                {/* Overall Response Rate */}
                <div className="bg-gray-50 rounded-full p-5 border-2 border-[#47A178]/20 hover:border-[#47A178] hover:bg-[#47A178]/5 hover:shadow-[0_8px_20px_rgba(71,161,120,0.2)] hover:scale-105 transition-all duration-300 cursor-pointer group">
                  <p className="font-medium text-[#363636] group-hover:text-[#47A178]">
                    72% Overall Response Rate
                  </p>
                </div>

                {/* 1 Year PFS with MB Volume */}
                <div className="bg-gray-50 rounded-full p-5 border-2 border-[#47A178]/20 hover:border-[#47A178] hover:bg-[#47A178]/5 hover:shadow-[0_8px_20px_rgba(71,161,120,0.2)] hover:scale-105 transition-all duration-300 cursor-pointer group">
                  <p className="font-medium text-[#363636] group-hover:text-[#47A178]">
                    1 Year PFS with MB Volume &lt; 100 cubic cm
                  </p>
                </div>

                {/* 1 Year OS with MB Volume */}
                <div className="bg-gray-50 rounded-full p-5 border-2 border-[#47A178]/20 hover:border-[#47A178] hover:bg-[#47A178]/5 hover:shadow-[0_8px_20px_rgba(71,161,120,0.2)] hover:scale-105 transition-all duration-300 cursor-pointer group">
                  <p className="font-medium text-[#363636] group-hover:text-[#47A178]">
                    1 Year OS with MB Volume &lt; 100 cubic cm
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NexCAR19 Prescribing Information Guide Section */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image Column */}
            <div className="flex justify-center lg:justify-start">
              <img
                src="/images/NexCAR19/hcp/Prescribing-Information.jpeg"
                alt="Doctor consulting with patient about NexCAR19 treatment"
                className="w-full max-w-auto h-auto rounded-3xl shadow-[0_8px_20px_rgba(71,161,120,0.15)]"
              />
            </div>

            {/* Content Column */}
            <div className="flex-1">
              <h2 className="text-4xl font-normal text-[#47A178] font-futura mb-8">
                NexCAR19™ Prescribing Information Guide
              </h2>
              <p className="text-[22px] font-medium text-[#363636] leading-relaxed mb-6">
                Essential prescribing information and medication guide for{' '}
                <span className="font-bold text-[#305595]">NexCAR19™</span> (Acetylcabtagene autoleucel), a CAR-T cell therapy
                for treating relapsed/refractory B-cell lymphomas and B-cell acute lymphoblastic leukemia. Includes detailed dosing instructions, safety
                information, and patient counseling guidelines.
              </p>

              {/* Download Button */}
              <button className="duration-300 flex justify-center items-center space-x-2 hover:shadow-xl  bg-yellow-400 hover:bg-yellow-500 text-black font-medium text-lg px-[18px] py-[9px] rounded-full transition-colors w-full mt-8 gap-3">
                Download Prescribing Information PDF
                <PdfDownload />
              </button>
            </div>
          </div>
        </div>
      </section>

    </>
  )
}

export default ForHCP