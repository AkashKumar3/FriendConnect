import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router'
import Navbar from './components/Navbar'
import Register from './pages/Register'
import Login from './pages/Login'

const App = () => {
  return (
    <BrowserRouter>
       <Navbar/>
    <Routes>
 
    <Route path="/register" element={<Register />} />
    <Route path="/login" element={<Login />} />
    </Routes>    
    </BrowserRouter>
  )
}

export default App