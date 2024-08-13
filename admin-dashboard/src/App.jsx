import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainScreen from './components/Hero.jsx';
import CheckInOutPage from './pages/CheckInOut.jsx';
import { SafetyCheck }  from './pages/SafetyCheck.jsx';
import Navbar from './components/navbar.jsx';
import Leaves from './pages/leaves.jsx';
import ChatAnalysis from './pages/ChatbotAnalysis.jsx';

const App = () => {
  return (
    <Router>
      <main className='bg-black'>
        <Navbar/> 
        <Routes>
          <Route path="/" element={<MainScreen />} />
          <Route path="/check-in-out" element={<CheckInOutPage />} />
          <Route path='/leaves' element={<Leaves/>} />
          <Route path = '/safety-check' element = {<SafetyCheck/>}/>          
          <Route path = '/chat-analysis' element = {<ChatAnalysis/>}/>

        </Routes>
      </main>
    </Router>
  );
}

export default App;
