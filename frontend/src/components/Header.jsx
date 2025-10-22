import React from 'react';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom'; // <-- Import Link

const Header = () => {
  return (
    <header className="navbar bg-green-800 text-white fixed top-0 z-50 shadow-lg px-4 lg:px-10">
      
      {/* Logo/Brand */}
      <div className="flex-1">
        <Link to="/" className="flex items-center text-xl font-bold text-white hover:text-amber-400">
          <span className="text-3xl mr-2 text-lime-400">🌱</span> 
          <span>Cropmitra</span>
        </Link>
      </div>
      
      {/* Desktop Navigation Links */}
      <div className="flex-none hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-lg font-medium">
          <li><a href="#features" className="hover:text-amber-400">Features</a></li>
          <li><a href="#how-it-works" className="hover:text-amber-400">How It Works</a></li>
          <li><Link to="/login" className="hover:text-amber-400">Login</Link></li>
        </ul>
        <Link to="/signup" className="btn btn-warning ml-4 text-green-800 font-bold hover:bg-amber-400">
          Get Started
        </Link>
      </div>

      {/* Mobile Dropdown Menu (Hamburger) */}
      <div className="flex-none lg:hidden">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost">
            <Bars3Icon className="h-6 w-6 text-white" />
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-1 p-2 shadow bg-base-100 rounded-box w-52 text-gray-800">
            <li><a href="#features">Features</a></li>
            <li><a href="#how-it-works">How It Works</a></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup" className="btn btn-warning btn-sm mt-2">Get Started</Link></li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
