import React from 'react'
import { Routes ,Route} from 'react-router-dom'
import Navbar from './Navbar'

const Navbar = () => {
  return (
    <div>
        <Navbar/>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      
    </div>
  )
}

export default Navbar
