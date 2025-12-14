import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: false
  },
  server: {
    watch: {
      // Prevent EBUSY errors on Windows
      usePolling: false,
      interval: 100,
    },
    hmr: {
      // Add overlay for HMR errors
      overlay: true
    }
  }
})
