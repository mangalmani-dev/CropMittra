import React from 'react';
// Icons updated for marketplace focus: Sales, Warehouse, Truck, Payment
import { ArrowTrendingUpIcon, BuildingStorefrontIcon, TruckIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';

const featuresData = [
  { 
    icon: ArrowTrendingUpIcon, 
    title: 'Optimized Crop Listings', 
    description: 'Farmers list crops with verified quality and quantity, getting matched instantly with qualified distributors.' 
  },
  { 
    icon: BuildingStorefrontIcon, 
    title: 'Secure Buyer Transactions', 
    description: 'Retailers and distributors submit purchase requests, locking in prices through our secure smart contract system.' 
  },
  { 
    icon: TruckIcon, 
    title: 'Smart Logistics & Tracking', 
    description: 'Automated scheduling and tracking ensure crops are picked up efficiently and delivered to the buyer on time.' 
  },
  { 
    icon: CurrencyDollarIcon, 
    title: 'Real-time Payment Assurance', 
    description: 'Farmers receive verified, rapid payment upon confirmed delivery, ensuring financial stability and trust.' 
  },
];

const Features = () => {
  return (
    <section id="how-it-works" className="py-20 px-4 bg-green-50">
      <h2 className="text-4xl font-extrabold text-center text-green-800 mb-16">The Cropmitra Marketplace Pipeline</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {featuresData.map((feature, index) => (
          <div 
            key={index} 
            className="card bg-white shadow-xl p-6 text-center transition duration-300 hover:shadow-2xl hover:scale-[1.02] border-t-4 border-green-600"
          >
            <div className="mb-4 flex justify-center">
              {/* Icon is wrapped in a DaisyUI circle for the visual effect */}
              <div className="w-16 h-16 rounded-full bg-green-600 flex items-center justify-center">
                <feature.icon className="w-8 h-8 text-white" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
