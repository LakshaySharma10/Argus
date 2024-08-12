import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainScreen from './components/Hero.jsx';
import CheckInOutPage from './pages/CheckInOut.jsx';

import Navbar from './components/navbar.jsx';
import Leaves from './pages/leaves.jsx';

const App = () => {
  return (
    <Router>
      <main className='bg-black'>
        <Navbar/> 
        <Routes>
          <Route path="/" element={<MainScreen />} />
          <Route path="/check-in-out" element={<CheckInOutPage />} />
          <Route path='/leaves' element={<Leaves/>} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
