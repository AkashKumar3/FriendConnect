import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-lg border-b-2 border-gray-100">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-semibold text-blue-800 hover:text-blue-600 transition-colors">
            FriendConnect
          </Link>

          <div className="flex items-center gap-6">
            <div className="flex gap-6">
              <Link
                to="/login"
                className="px-6 py-2 rounded-full border-2 border-blue-600 text-blue-600 font-medium text-lg transition-all duration-300 transform hover:scale-105 hover:bg-blue-600 hover:text-white"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-6 py-2 rounded-full border-2 border-blue-600 text-blue-600 font-medium text-lg transition-all duration-300 transform hover:scale-105 hover:bg-blue-600 hover:text-white"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
