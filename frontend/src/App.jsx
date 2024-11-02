import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import AuthenticationPage from './pages/AuthenticationPage'
import OTPVerification from './pages/OTPVerification'
import Candi_Dashboard from './pages/Candi_Dashboard'

const App = () => {
  return (
    <main className='w-screen h-screen'>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/auth' element={<AuthenticationPage />} />
        <Route path='/otp_verify' element={<OTPVerification />} />
        <Route path='/candidate_dashboard' element={<Candi_Dashboard />} />
      </Routes>
    </main>
  )
}

export default App