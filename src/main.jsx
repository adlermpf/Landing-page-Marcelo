import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import DoctorLanding from './components/DoctorLanding.jsx'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DoctorLanding />
  </React.StrictMode>
)
