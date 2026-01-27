import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteCompression from 'vite-plugin-compression'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Gzip compression
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 10240, // Only compress files larger than 10KB
      deleteOriginFile: false
    }),
    // Brotli compression
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 10240,
      deleteOriginFile: false
    })
  ],
  base: '/',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug']
      }
    },
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor';
            }
            if (id.includes('react-router')) {
              return 'router';
            }
            return 'vendor';
          }
          if (id.includes('Dashboard.tsx')) {
            return 'dashboard';
          }
          if (id.includes('EventDetail.tsx') || id.includes('EventRegistrationModal.tsx')) {
            return 'events';
          }
          if (id.includes('Profile.tsx') || id.includes('Login.tsx') || id.includes('Signup.tsx')) {
            return 'auth';
          }
        }
      }
    },
    chunkSizeWarningLimit: 1000,
    // Enable CSS code splitting for better caching
    cssCodeSplit: true,
    // Optimize assets
    assetsInlineLimit: 4096 // Inline assets smaller than 4KB as base64
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
