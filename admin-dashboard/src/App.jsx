import React from 'react'

import MainScreen from './components/Hero.jsx'
import Navbar from './components/navbar.jsx'



const App = () => {
  return (
    <main className='bg-black'>
      <Navbar/>
      <MainScreen/>

    </main>
  )
}

export default App
