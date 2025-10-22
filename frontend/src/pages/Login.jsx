import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import bgImage from "../assets/bg-image.jpg";
import toast from 'react-hot-toast';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email) {
      toast.error('Please enter your email!', { position: 'top-center' });
      return;
    }

    if (!password) {
      toast.error('Please enter your password!', { position: 'top-center' });
      return;
    }

    // Show success toast
    toast.success('Login successful!', { position: 'top-center' });

    setError('');
    console.log(`Logging in with Email: ${email}`);

    // Reset form
    setFormData({ email: '', password: '' });
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-green-800 mb-6">
          Login to Your Account
        </h2>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
          >
            Login
          </button>
        </form>

        <p className="text-center text-gray-500 mt-4">
          Don’t have an account?{' '}
          <Link to="/signup" className="text-green-600 hover:underline">
            Sign Up
          </Link>
        </p>

        <p className="text-center text-gray-500 mt-2">
          <Link to="/forgot-password" className="text-green-600 hover:underline">
            Forgot Password?
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
