import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Global: disable right-click, text selection, and element dragging across the site
document.addEventListener('contextmenu', (event) => {
  event.preventDefault()
})

document.addEventListener('selectstart', (event) => {
  event.preventDefault()
})

document.addEventListener('dragstart', (event) => {
  event.preventDefault()
})

// Disable DevTools shortcuts
document.addEventListener('keydown', (event) => {
  // F12
  if (event.key === 'F12') {
    event.preventDefault()
  }
  // Ctrl+Shift+I
  if (event.ctrlKey && event.shiftKey && event.key === 'I') {
    event.preventDefault()
  }
  // Ctrl+Shift+C
  if (event.ctrlKey && event.shiftKey && event.key === 'C') {
    event.preventDefault()
  }
  // Ctrl+Shift+J (Console)
  if (event.ctrlKey && event.shiftKey && event.key === 'J') {
    event.preventDefault()
  }
  // Ctrl+U (View Source)
  if (event.ctrlKey && event.key === 'u') {
    event.preventDefault()
  }
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
