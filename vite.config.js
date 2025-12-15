import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react()
    // Note: Image optimization disabled for now due to compatibility issues
    // Will be enabled in production build
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@/components': path.resolve(__dirname, './src/components'),
      '@/pages': path.resolve(__dirname, './src/pages'),
      '@/assets': path.resolve(__dirname, './src/assets'),
      '@/utils': path.resolve(__dirname, './src/utils'),
      '@/images': path.resolve(__dirname, './src/assets/images'),
      '@/icons': path.resolve(__dirname, './src/assets/icons'),
      '@/logos': path.resolve(__dirname, './src/assets/logos'),
      '@/videos': path.resolve(__dirname, './src/assets/videos'),
      '@/fonts': path.resolve(__dirname, './src/assets/fonts'),
    },
  },
  // Performance optimizations
  server: {
    hmr: {
      overlay: false // Disable error overlay for better performance
    },
    fs: {
      strict: false
    }
  },
  build: {
    // Optimize chunk splitting
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          forms: ['react-hook-form', '@hookform/resolvers', 'yup'],
          icons: ['lucide-react']
        }
      }
    },
    // Increase chunk size warning limit
    chunkSizeWarningLimit: 1000,
    // Enable source maps for debugging
    sourcemap: false
  },
  // Asset optimization
  assetsInclude: ['**/*.woff', '**/*.woff2', '**/*.ttf'],
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-hook-form', 'yup', 'lucide-react']
  }
})
