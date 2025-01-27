import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { gsap } from 'gsap';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // GSAP fade-in animation for the form
  useEffect(() => {
    gsap.fromTo('.form-container', { opacity: 0 }, { opacity: 1, duration: 1 });
  }, []);

  // Handle form submission
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', { username, email, password });
      navigate('/login');
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center w-full h-screen bg-gray-100">

      <div className="form-container w-full max-w-md p-8 bg-white rounded-xl shadow-2xl z-10 space-y-6 transition-all ease-in-out duration-500 transform hover:scale-105">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">Register</h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-600">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:ring-2 hover:ring-indigo-400 transition-all duration-300 shadow-md hover:shadow-lg"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:ring-2 hover:ring-indigo-400 transition-all duration-300 shadow-md hover:shadow-lg"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:ring-2 hover:ring-indigo-400 transition-all duration-300 shadow-md hover:shadow-lg"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 mt-6 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 ease-in-out transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Register
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-500">
          Already have an account? <a href="/login" className="text-indigo-600 hover:underline">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
