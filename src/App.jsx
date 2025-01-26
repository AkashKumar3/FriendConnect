import React from 'react'
import { BrowserRouter } from 'react-router'
import Navbar from './components/Navbar'

const App = () => {
  return (
    <BrowserRouter>
    <Navbar/>    
    </BrowserRouter>
  )
}

export default App