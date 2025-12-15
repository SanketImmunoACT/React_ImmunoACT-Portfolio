import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/index.css'
import App from '@/App.jsx'

// Add basic resource hints without external dependencies
const addBasicResourceHints = () => {
  try {
    // Preconnect to API
    const preconnect = document.createElement('link');
    preconnect.rel = 'preconnect';
    preconnect.href = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    document.head.appendChild(preconnect);
  } catch (error) {
    console.warn('Could not add resource hints:', error);
  }
};

// Add resource hints for better performance
addBasicResourceHints();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
