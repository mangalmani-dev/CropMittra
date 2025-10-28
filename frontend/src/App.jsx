import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardNavbar from './components/Navbar';

import { Toaster } from 'react-hot-toast';
import LandingPage from './pages/LandingPage';
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Home from './pages/Home';
import './App.css'; 

function App() {
  return (
    <Router>
           <DashboardNavbar /> 
      <Toaster 
        position="top-center"  // default is top-right
        toastOptions={{
          style: {
            fontSize: '16px',
            padding: '16px 24px',
          },
        }}
      />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path='/home' element={<Home/>}/>

    
      </Routes>
    </Router>
  );
}

export default App;
