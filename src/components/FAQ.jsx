import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

const FAQ = () => {
  const [openFAQ, setOpenFAQ] = useState(null)

  const faqs = [
    {
      question: "What is CAR-T cell therapy?",
      answer: "CAR-T cell therapy is a type of immunotherapy that uses genetically modified T-cells to fight cancer. The patient's T-cells are collected, modified in a laboratory to better recognize cancer cells, and then infused back into the patient."
    },
    {
      question: "Who is eligible for NexCAR19™ treatment?",
      answer: "NexCAR19™ is indicated for patients with relapsed or refractory B-cell malignancies, including acute lymphoblastic leukemia and large B-cell lymphoma. Eligibility is determined through comprehensive medical evaluation."
    },
    {
      question: "How long does the treatment process take?",
      answer: "The vein-to-vein time for NexCAR19™ is approximately 20 days in clinical trials, which includes cell collection, manufacturing, and infusion back to the patient."
    },
    {
      question: "What are the potential side effects?",
      answer: "Like all CAR-T therapies, NexCAR19™ may cause side effects including cytokine release syndrome (CRS) and neurological events. Our medical team closely monitors patients and manages these effects."
    }
  ]

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index)
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Frequently Asked Questions</h2>

        <div className="max-w-4xl mx-auto mb-12">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-200 mb-4">
              <button
                className="w-full py-6 text-left flex justify-between items-center text-lg font-semibold text-gray-800 hover:text-primary-500 transition-colors"
                onClick={() => toggleFAQ(index)}
              >
                <span>{faq.question}</span>
                {openFAQ === index ? <ChevronUp className="text-primary-500" /> : <ChevronDown className="text-gray-400" />}
              </button>

              {openFAQ === index && (
                <div className="pb-6">
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mb-12">
          <button className="border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white px-8 py-3 rounded-lg font-semibold transition-colors">
            View All FAQs
          </button>
        </div>

        <div className="text-center bg-gray-50 p-12 rounded-xl">
          <h3 className="text-3xl font-bold text-gray-800 mb-4">Harnessing Your Immune System to Fight Cancer Safely</h3>
          <p className="text-lg text-gray-600 mb-8">Begin Your Personalized Cancer Treatment Journey</p>
          <button className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
            Discuss Treatment Options
          </button>
        </div>
      </div>
    </section>
  )
}

export default FAQ