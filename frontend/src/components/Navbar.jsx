// src/components/DashboardNavbar.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const DashboardNavbar = () => {
  const { user, logout } = useAuthStore();
  const [search, setSearch] = useState("");

  // Show nothing if user is not logged in
  if (!user) return null;

  return (
    <header className="bg-gradient-to-r from-green-600 to-green-800 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/home" className="text-2xl font-bold hover:text-yellow-300 transition">
          Crop Mitra
        </Link>

        {/* Search bar */}
        <div className="flex-1 mx-4 relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search crops, farmers, orders..."
            className="w-full rounded-md px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <button className="absolute right-1 top-1 bottom-1 bg-yellow-400 text-black px-4 rounded-r-md hover:bg-yellow-500 transition">
            Search
          </button>
        </div>

        {/* User actions */}
        <div className="flex items-center space-x-4">
          <span className="hidden sm:inline">Hi, <strong>{user.name}</strong></span>
          <Link to="/profile" className="hover:underline hover:text-yellow-300 transition">Profile</Link>
          <button
            onClick={logout}
            className="bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-500 transition"
          >
            Logout
          </button>

          <Link to="/orders" className="hover:text-yellow-300 transition">Orders</Link>

          <Link to="/cart" className="relative hover:text-yellow-300 transition">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.2 6m5.2-6v6m4-6v6M6 19a1 1 0 102 0 1 1 0 00-2 0zm12 0a1 1 0 102 0 1 1 0 00-2 0z"
              />
            </svg>
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
              3
            </span>
          </Link>
        </div>
      </div>

      {/* Navigation bar */}
      <nav className="bg-green-900 py-2 shadow-inner">
        <ul className="flex space-x-6 max-w-7xl mx-auto px-4 text-white font-semibold">
          <li>
            <Link to="/home" className="hover:text-yellow-300 transition">Home</Link>
          </li>
          <li>
            <Link to="/crops" className="hover:text-yellow-300 transition">Crops</Link>
          </li>
          <li>
            <Link to="/orders" className="hover:text-yellow-300 transition">Orders</Link>
          </li>
          <li>
            <Link to="/analytics" className="hover:text-yellow-300 transition">Analytics</Link>
          </li>
          <li>
            <Link to="/farmers" className="hover:text-yellow-300 transition">Farmers</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default DashboardNavbar;
