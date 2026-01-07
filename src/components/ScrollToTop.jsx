import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false)
  const location = useLocation()

  // Automatically scroll to top when route changes, or to hash element if present
  useEffect(() => {
    if (location.hash) {
      // If there's a hash, scroll to that element after a short delay
      setTimeout(() => {
        const element = document.getElementById(location.hash.substring(1))
        if (element) {
          // Get the element's position
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
          // Account for fixed header (approximately 80px) and add some padding
          const offsetPosition = elementPosition - 100
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          })
        }
      }, 200) // Increased delay to ensure page is fully loaded
    } else {
      // No hash, scroll to top
      window.scrollTo(0, 0)
    }
  }, [location.pathname, location.hash])

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)

    return () => {
      window.removeEventListener('scroll', toggleVisibility)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-gray-400 hover:bg-gray-500 text-white w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl z-50 hover:scale-110"
          aria-label="Scroll to top"
        >
          <svg 
            className="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M5 15l7-7 7 7" 
            />
          </svg>
        </button>
      )}
    </>
  )
}

export default ScrollToTop