import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";

const Home = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      toast.error("Please login first!", { position: "top-center" });
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) return null; // prevent rendering before redirect

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-100">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-lg text-center">
        <h1 className="text-4xl font-bold text-green-700 mb-4">
          Welcome, {user.name}!
        </h1>
        <p className="text-gray-700 text-lg">
          You are logged in as <strong>{user.role}</strong>.
        </p>
        <p className="text-gray-500 mt-4">Email: {user.email}</p>
      </div>
    </div>
  );
};

export default Home;
