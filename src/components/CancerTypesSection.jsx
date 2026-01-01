const CancerTypesSection = ({ isHCPView = false }) => {
  const cancerTypes = [
    {
      name: "Diffuse Large B-cell Lymphoma (DLBCL)",
      description: "Most common aggressive B-cell lymphoma type"
    },
    {
      name: "Primary Mediastinal B-cell Lymphoma (PMBCL)",
      description: "A rare chest-based lymphoma in younger adults"
    },
    {
      name: "Follicular Lymphoma (FL)",
      description: "Slow-growing with potential to transform aggressively"
    },
    {
      name: "Mantle Cell Lymphoma (MCL)",
      description: "Rare subtype often diagnosed late and challenging"
    },
    {
      name: "Marginal Zone Lymphoma (MZL)",
      description: "Associated with inflammation or infection origins"
    },
    {
      name: "High-Grade B-cell Lymphoma",
      description: "Rapid progression, requires functioning therapies"
    },
    {
      name: "B-cell Acute Lymphoblastic Leukaemia (B-ALL)",
      description: "Aggressive leukaemia impacting bone marrow and blood"
    }
  ]

  const firstRowCancers = cancerTypes.slice(0, 4)
  const secondRowCancers = cancerTypes.slice(4, 7)

  const getDescription = () => {
    if (isHCPView) {
      return "is indicated for patients with challenging B-cell malignancies that have shown resistance to conventional chemoimmunotherapy approaches."
    }
    return "is for patients with challenging B-cell cancers, which are often inadequate to treat with chemoimmunotherapy."
  }

  return (
    <section className="py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-start mb-10">
          <h2 className="text-4xl font-normal text-[#47A178] font-futura mb-7">Which cancers can NexCAR19™ treat?</h2>
          <p className="text-[22px] font-medium text-[#363636] leading-relaxed">
            <span className="font-bold text-[#305595]">NexCAR19™</span> {getDescription()}
          </p>
        </div>

        {/* Cancer Types Grid */}
        <div className="space-y-6">
          {/* First Row - 4 Cards */}
          <div className="flex flex-wrap justify-center gap-[25px]">
            {firstRowCancers.map((cancer, index) => (
              <div key={index} className="bg-white rounded-2xl w-[280px] min-h-[160px] p-5 shadow-[0_8px_20px_rgba(241,196,15,0.3)] transition-all duration-300 ease-in-out flex flex-col justify-center items-center border border-[#f1c40f] text-center hover:transform hover:scale-105 hover:shadow-[0_12px_30px_rgba(241,196,15,0.4)]">
                <h3 className="text-base font-bold text-[#222] mb-[10px]">{cancer.name}</h3>
                <p className="text-sm text-[#555555] leading-relaxed">{cancer.description}</p>
              </div>
            ))}
          </div>

          {/* Second Row - 3 Cards */}
          <div className="flex flex-wrap justify-center gap-[25px]">
            {secondRowCancers.map((cancer, index) => (
              <div key={index} className="bg-white rounded-2xl w-[280px] min-h-[160px] p-5 shadow-[0_8px_20px_rgba(241,196,15,0.3)] transition-all duration-300 ease-in-out flex flex-col justify-center items-center border border-[#f1c40f] text-center hover:transform hover:scale-105 hover:shadow-[0_12px_30px_rgba(241,196,15,0.4)]">
                <h3 className="text-base font-bold text-[#222] mb-[10px]">{cancer.name}</h3>
                <p className="text-sm text-[#555555] leading-relaxed">{cancer.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default CancerTypesSection