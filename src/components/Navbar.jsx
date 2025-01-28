import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, UserCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 md:px-10">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-blue-600 hover:underline">
            FriendConnect
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-6">
            {isAuthenticated ? (
              <div className="flex items-center gap-6">
                {/* User Info */}
                <div className="flex items-center gap-2">
                  <UserCircle className="text-gray-600" size={24} />
                  <span className="font-medium text-gray-800">
                    {user && user.username}
                  </span>
                </div>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 text-white bg-red-600 rounded-full shadow-lg hover:bg-red-700 transition-all transform hover:scale-105"
                >
                  <LogOut size={20} />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex gap-4">
                {/* Login Button */}
                <Link
                  to="/login"
                  className="relative px-5 py-2.5 font-medium text-white rounded-full shadow-md group bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-indigo-500 hover:to-blue-500 transition-all"
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 rounded-full transition-opacity group-hover:opacity-100"></span>
                  <span className="relative z-10">Login</span>
                </Link>

                {/* Register Button */}
                <Link
                  to="/register"
                  className="relative px-5 py-2.5 font-medium text-white rounded-full shadow-md group bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-indigo-500 hover:to-blue-500 transition-all"
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 rounded-full transition-opacity group-hover:opacity-100"></span>
                  <span className="relative z-10">Register</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
