import React from 'react';
import { Link } from 'react-router-dom';
// Import the public components from your project structure
import Header from '../components/Header';   // Assuming you placed public header in 'components/'
import Hero from '../components/Hero';       // Assuming you placed hero in 'components/'
import Features from '../components/Features'; // Assuming this holds the 'How It Works' section
import Footer from '../components/Footer';   // Assuming this holds the final CTA and footer

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      
      {/* 1. Header (Navigation Bar) */}
      <Header />
      
      <main>
        {/* 2. Hero Section (Connect Crops to Markets) */}
        <Hero />
        
        {/* 3. Features (How It Works) Section */}
        <Features />
        
        {/* 4. Testimonials Section - Updated for Sales/Marketplace focus */}
        <section id="testimonials" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Trusted Results</h2>
            
            <div className="max-w-3xl mx-auto p-6 bg-gray-50 rounded-lg shadow-xl border-l-4 border-amber-500">
                <p className="italic text-xl text-gray-700">
                    "Cropmitra instantly connected me to five new distributors in different districts, **boosting my average price per unit by 15%**!"
                </p>
                <cite className="block mt-4 text-lg font-semibold text-green-700">
                    — Sunita Devi, Farm Owner & Seller
                </cite>
            </div>

            {/* Placeholder for small trust logos */}
            <div className="flex justify-center gap-8 mt-10 text-xl text-gray-400">
                <span>Verified by Farmers 🤝</span>
                <span>Logistics Network 🚚</span>
            </div>
        </section>

        {/* 5. Final CTA / Footer */}
        <Footer />
        
      </main>
    </div>
  );
};

export default LandingPage;
