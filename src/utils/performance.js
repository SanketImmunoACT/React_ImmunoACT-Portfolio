// Performance monitoring utilities

export const measurePerformance = (name, fn) => {
  return async (...args) => {
    const start = performance.now();
    const result = await fn(...args);
    const end = performance.now();
    
    if (import.meta.env.DEV) {
      console.log(`⚡ ${name}: ${(end - start).toFixed(2)}ms`);
    }
    
    return result;
  };
};

export const preloadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
};

export const preloadCriticalImages = async (imageSources) => {
  const promises = imageSources.map(src => preloadImage(src));
  
  try {
    await Promise.all(promises);
    console.log('✅ Critical images preloaded');
  } catch (error) {
    console.warn('⚠️ Some images failed to preload:', error);
  }
};

// Basic performance monitoring using native APIs
export const reportWebVitals = (onPerfEntry) => {
  if (onPerfEntry && onPerfEntry instanceof Function && import.meta.env.DEV) {
    // Use Performance Observer API for basic metrics
    try {
      // Monitor navigation timing
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          onPerfEntry({
            name: entry.name,
            value: entry.duration,
            type: entry.entryType
          });
        }
      });
      
      observer.observe({ entryTypes: ['navigation', 'paint', 'largest-contentful-paint'] });
    } catch (error) {
      console.warn('Performance Observer not supported:', error);
    }
  }
};

// Resource hints
export const addResourceHints = () => {
  // Preconnect to API
  const preconnect = document.createElement('link');
  preconnect.rel = 'preconnect';
  preconnect.href = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  document.head.appendChild(preconnect);
  
  // DNS prefetch for external resources
  const dnsPrefetch = document.createElement('link');
  dnsPrefetch.rel = 'dns-prefetch';
  dnsPrefetch.href = '//fonts.googleapis.com';
  document.head.appendChild(dnsPrefetch);
};