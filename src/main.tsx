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

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
