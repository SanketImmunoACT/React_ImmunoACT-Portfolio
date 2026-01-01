const StatCard = ({ title, value, desc }) => (
    <div className="bg-[#47A1782E] hover:bg-white rounded-[32px] p-6 text-center
  transition-all duration-300 ease-in-out
  hover:scale-[1.02]
  border border-transparent hover:border-[#47A178]/60
  hover:shadow-md">

        <div className="text-[20px] text-[#363636] font-medium">{title}</div>
        <div className="text-3xl font-semibold text-[#FFBF00]">{value}</div>
        <div className="text-lg text-[#363636]">{desc}</div>
    </div>

);

export default StatCard