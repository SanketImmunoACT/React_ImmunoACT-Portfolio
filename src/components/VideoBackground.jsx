import { useEffect, useRef } from 'react'

const VideoBackground = ({ 
  videoSrc, 
  posterSrc, 
  className = "", 
  overlayClassName = "bg-gradient-to-r from-orange-500/70 to-orange-600/70",
  children 
}) => {
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      // Add event listeners for debugging
      video.addEventListener('loadstart', () => console.log('Video loading started'))
      video.addEventListener('canplay', () => console.log('Video can start playing'))
      video.addEventListener('error', (e) => console.error('Video error:', e))
      
      // Ensure video plays automatically and loops
      video.play().catch((error) => {
        console.error('Video autoplay failed:', error)
      })
    }
  }, [])

  return (
    <div className={`relative overflow-hidden bg-orange-500 ${className}`}>
      {/* Background Video */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster={posterSrc}
      >
        <source src={videoSrc} type="video/mp4" />
        {/* Fallback for browsers that don't support video */}
        {posterSrc && (
          <img 
            src={posterSrc} 
            alt="Background" 
            className="w-full h-full object-cover"
          />
        )}
      </video>

      {/* Gradient Overlay */}
      <div className={`absolute inset-0 ${overlayClassName}`} />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}

export default VideoBackground