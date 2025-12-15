import { useEffect, useRef } from 'react'

const VideoBackground = ({
  children,
  className = "",
  overlayClassName = "tri-gradient-overlay",
  posterSrc,
  videoSrc
}) => {
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      // Add event listeners for debugging
      video.addEventListener('loadstart', () => console.log('Video loading started'))
      video.addEventListener('canplay', () => console.log('Video can start playing'))
      video.addEventListener('error', (e) => console.error('Video error:', e))

      // Try to play video, but handle autoplay restrictions gracefully
      const playPromise = video.play()

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Video started playing successfully
            console.log('Video autoplay started')
          })
          .catch((error) => {
            // Autoplay was prevented - this is normal behavior
            console.log('Video autoplay prevented by browser policy:', error.name)
            // Don't show this as an error since it's expected behavior
          })
      }
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
        preload="metadata"
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