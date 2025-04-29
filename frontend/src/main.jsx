// src/main.jsx

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ToasterContainer } from './components/ui/toast'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <ToasterContainer />
  </StrictMode>,
)
