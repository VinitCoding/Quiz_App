import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import AuthenticationPage from './pages/AuthenticationPage'
import OTPVerification from './pages/OTPVerification'

const App = () => {
  return (
    <main className='w-screen h-screen'>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/auth' element={<AuthenticationPage />} />
        <Route path='/otp_verify' element={<OTPVerification />} />
      </Routes>
    </main>
  )
}

export default App