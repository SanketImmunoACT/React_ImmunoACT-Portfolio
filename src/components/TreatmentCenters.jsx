import { Link } from 'react-router-dom'
import DottedIndiaMapImg from '@/assets/images/locations/dotted-india-map.png'

const TreatmentCenters = () => {
  return (
    <>
      <style>
        {`
          @keyframes pumpingEffect {
            0%, 100% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.05);
            }
          }
        `}
      </style>
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="order-1 lg:order-1">
              <h2 className="text-[38px] font-normal text-[#47A178] font-futura">
                Partnered Hospitals
              </h2>
              <p className="text-lg text-[#363636] max-w-md mt-4 mb-9">
                Our strong association with over 80 leading cancer treatment hospitals in India ensures hassle-free treatment with our CAR-T cell therapies.
              </p>

              <Link
                to="/treatment-centres"
                className="bg-[#FFBF00] hover:bg-yellow-500 text-[#363636] font-medium px-[18px] py-[9px] rounded-full transition-colors text-[18px]"
              >
                Find A Treatment Centre Near You
              </Link>
            </div>

            {/* Right - India Map */}
            <div className="order-2 lg:order-2 flex justify-center lg:justify-end">
              <div className="relative">
                <img
                  src={DottedIndiaMapImg}
                  alt="India Treatment Network Map"
                  className="w-full max-w-md h-auto object-contain"
                  style={{
                    animation: 'pumpingEffect 2.5s ease-in-out infinite'
                  }}
                />
              </div>
            </div>
          </div>

          {/* Bottom Divider Line */}
          <div className="mt-20 flex justify-center">
            <div className="w-full max-w-[650px] h-[1px] bg-[#FFBF00] mx-4"></div>
          </div>
        </div>
      </section>
    </>
  )
}

export default TreatmentCenters