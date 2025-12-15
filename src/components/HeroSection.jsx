import { useEffect, useState } from 'react'
import VideoBackground from './VideoBackground'
import heroVideoSrc from '@/assets/videos/hero-background.mp4'
import { HexagonalCards } from '../assets/svg/HexagonalCards'

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [typewriterText, setTypewriterText] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  const words = ["Accessible", "Cutting-edge", "Transformative"]
  const slides = [
    {
      id: 1,
      content: {
        buttonLink: '/nexcar19',
        buttonText: 'Learn More',
        description: 'Built for Access. Priced for equity.',
        subtitle: 'ImmunoACT:',
        title: 'Celebrating\n2 Years of\nTransforming Lives'
      },
      type: 'anniversary'
    },
    {
      id: 2,
      content: {
        buttonLink: '/news-media',
        buttonText: 'Learn More',
        description: 'NexCAR19 was recognized among the Top 3 Indian innovations, presented to Hon\'ble Prime Minister Shri Narendra Modi by Dr. Jitendra Singh at ESTIC 2025.',
        images: {
          left: 'https://immunoact.com/wp-content/uploads/2025/11/Banner-Image-2.jpg',
          right: 'https://immunoact.com/wp-content/uploads/2025/11/G4z-4JNacAEZC8zf.jpg'
        },
        title: 'Proud Moment for ImmunoACT'
      },
      type: 'proud-moment'
    }
  ]

  // Typewriter effect
  useEffect(() => {
    const currentWord = words[wordIndex]
    const typingSpeed = isDeleting ? 35 : 55
    const delayBetween = 1000

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (charIndex < currentWord.length) {
          setTypewriterText(currentWord.slice(0, charIndex + 1))
          setCharIndex(charIndex + 1)
        } else {
          setTimeout(() => setIsDeleting(true), delayBetween)
        }
      } else {
        if (charIndex > 0) {
          setTypewriterText(currentWord.slice(0, charIndex - 1))
          setCharIndex(charIndex - 1)
        } else {
          setIsDeleting(false)
          setWordIndex((wordIndex + 1) % words.length)
        }
      }
    }, typingSpeed)

    return () => clearTimeout(timer)
  }, [charIndex, isDeleting, wordIndex, words])

  // Auto-slide functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 25000)

    return () => clearInterval(timer)
  }, [slides.length])

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const renderSlide = (slide, index) => {
    const isActive = index === currentSlide

    if (slide.type === 'anniversary') {
      return (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-500 ${isActive ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
        >
          <div className="max-w-[1280px] mx-auto w-full h-full flex items-center justify-center px-4">
            <div className="flex flex-col lg:flex-row items-center justify-center gap-8 w-full">
              <div className="max-w-[600px] w-full text-center lg:text-left">
                <h2 className="text-[#F5F5F5] text-xl lg:text-2xl mb-3">
                  {slide.content.subtitle} <span className="whitespace-nowrap overflow-hidden">{typewriterText}</span>
                </h2>
                <h1 className="text-[#F5F5F5] text-4xl sm:text-5xl lg:text-[70px] my-3">
                  {slide.content.title.split('\n').map((line, i) => (
                    <span key={i}>
                      {line}
                      {i < slide.content.title.split('\n').length - 1 && <br />}
                    </span>
                  ))}
                </h1>
                <p className="text-[#F5F5F5] text-base lg:text-lg mb-3">
                  {slide.content.description}
                </p>
                <button className="bg-[#FFBF00] hover:bg-yellow-500 text-[#363636] px-5 py-2 rounded-full transition-colors text-[16px]">
                  {slide.content.buttonText}
                </button>
              </div>

              {/* SVG Hexagon Pattern */}
              <div className="hidden lg:block">
                <HexagonalCards />
              </div>
            </div>
          </div>
        </div>
      )
    }

    if (slide.type === 'proud-moment') {
      return (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-500 ${isActive ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
        >
          <div className="max-w-[1280px] mx-auto w-full h-full flex items-center justify-center px-4">
            <div className="flex flex-col lg:flex-row items-center gap-5 lg:gap-8">
              <div className="max-w-[380px] w-full text-center lg:text-left order-1 lg:order-1">
                <h2 className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 leading-tight drop-shadow-lg">
                  {slide.content.title}
                </h2>
                <p className="text-white text-sm lg:text-base leading-relaxed mb-4">
                  {slide.content.description}
                </p>
                <button className="bg-[#FFBF00] hover:bg-yellow-500 text-[#363636] px-5 py-2 rounded-full transition-colors text-[16px]">
                  {slide.content.buttonText}
                </button>
              </div>

              {/* Left Image - Hidden on mobile */}
              <div className="hidden lg:block order-2">
                <img
                  src={slide.content.images.left}
                  alt="ImmunoACT Anniversary"
                  className="w-[150px] h-auto object-cover border-[10px] border-white ml-2.5"
                />
              </div>

              {/* Right Image */}
              <div className="overflow-hidden order-3 lg:order-3">
                <img
                  src={slide.content.images.right}
                  alt="Prime Minister Award"
                  className="w-[380px] sm:w-[710px] lg:w-[530px] h-auto object-cover select-none"
                  draggable="false"
                />
              </div>
            </div>
          </div>
        </div>
      )
    }
  }

  return (
    <VideoBackground
      videoSrc={heroVideoSrc}
      posterSrc=""
      className="h-[587px]"
      overlayClassName="tri-gradient-overlay"
    >
      <section className="h-[587px] p-[50px] relative">
        {/* Slider Container */}
        <div className="relative max-w-[1280px] w-full h-full mx-auto overflow-hidden">
          {/* Slides */}
          <div className="relative w-full h-full">
            {slides.map((slide, index) => renderSlide(slide, index))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-2.5 sm:top-[220px] sm:left-[-5px] lg:top-1/2 lg:left-2.5 transform -translate-y-1/2 bg-transparent text-white border-none text-2xl p-4 cursor-pointer transition-all hover:bg-white/10 hover:rounded-lg z-10"
            aria-label="Previous slide"
          >
            &#10094;
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-2.5 sm:top-[220px] sm:right-[-5px] lg:top-1/2 lg:right-2.5 transform -translate-y-1/2 bg-transparent text-white border-none text-2xl p-4 cursor-pointer transition-all hover:bg-white/10 hover:rounded-lg z-10"
            aria-label="Next slide"
          >
            &#10095;
          </button>

          {/* Navigation Dots */}
          <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex gap-2.5 z-10">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full cursor-pointer transition-all ${index === currentSlide
                  ? 'bg-white'
                  : 'bg-white/50 hover:bg-white/80'
                  }`}
              />
            ))}
          </div>
        </div>
      </section>
    </VideoBackground>
  )
}

export default HeroSection