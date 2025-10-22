// src/pages/Crops.jsx
import React, { useEffect, useState } from "react";
import { axiosInstance } from "../libs/axios";
import toast from "react-hot-toast";

const Crops = () => {
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch crops from backend
  const fetchCrops = async () => {
    try {
      const res = await axiosInstance.get("/crops");
      setCrops(res.data);
    } catch (err) {
      toast.error("Failed to fetch crops!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCrops();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-green-700 font-bold text-lg">Loading crops...</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-green-50 py-10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {crops.map((crop) => (
          <div
            key={crop._id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition hover:scale-105 duration-300"
          >
            <img
              src={crop.image || "/default-crop.jpg"}
              alt={crop.name}
              className="h-48 w-full object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-bold text-green-700">{crop.name}</h2>
              <p className="text-gray-600 mt-1">Farmer: {crop.farmerName}</p>
              <p className="text-gray-600 mt-1">Location: {crop.location}</p>
              <p className="text-gray-800 font-semibold mt-2">
                Price: ₹{crop.price} / kg
              </p>
              <p className="text-gray-600 mt-1">Quantity: {crop.quantity} kg</p>

              <button className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded-lg transition">
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Crops;
