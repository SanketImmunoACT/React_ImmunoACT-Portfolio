import BG1 from '@/assets/images/background/BG-1.png'

const PageBanner = ({ subtitle, title }) => {
  return (
    <div
      className="relative h-[587px] bg-cover bg-center bg-no-repeat flex items-center justify-center"
      style={{
        backgroundImage: `url(${BG1})`
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'linear-gradient(120deg, #ffbf00, rgba(255, 72, 0, 0.67), rgba(20, 166, 42, 0.7))'
        }}
      ></div>
      <div className="relative w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-2 border-white rounded-3xl h-[450px] flex items-center justify-center flex-col px-6 sm:px-8 lg:px-12 text-center backdrop-blur-sm">
          <h1 className="text-5xl md:text-[80px] text-white opacity-[0.5] font-light">{title}</h1>
          {subtitle && (
            <p className="text-[36px] text-white max-w-full mx-auto mt-[30px]">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default PageBanner