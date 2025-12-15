import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
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
})
