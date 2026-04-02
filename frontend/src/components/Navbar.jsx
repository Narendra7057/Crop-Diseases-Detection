import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Sun, Moon, LogOut } from "lucide-react";
import { isAuthenticated, removeTokens, getUser } from "../utils/helpers";

export const Navbar = ({ isDark, toggleDark }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const user = getUser();
  const authenticated = isAuthenticated();

  const handleLogout = () => {
    removeTokens();
    navigate("/");
    setIsOpen(false);
  };

  return (
    <nav className={`${isDark ? "bg-gray-900 text-white" : "bg-white text-gray-900"} shadow-lg sticky top-0 z-50`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl">🌾</span>
            <span className="font-bold text-lg hidden sm:block">CropGuard</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="hover:text-green-500 transition">Home</Link>
            <Link to="/detection" className={authenticated ? "hover:text-green-500 transition" : "opacity-50 cursor-not-allowed"}>Detection</Link>
            <Link to="/prevention" className={authenticated ? "hover:text-green-500 transition" : "opacity-50 cursor-not-allowed"}>Prevention</Link>
            <Link to="/dashboard" className={authenticated ? "hover:text-green-500 transition" : "opacity-50 cursor-not-allowed"}>Dashboard</Link>
            <Link to="/contact" className="hover:text-green-500 transition">Contact</Link>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            <button
              onClick={toggleDark}
              className={`p-2 rounded-full ${isDark ? "bg-gray-800" : "bg-gray-100"}`}
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {authenticated ? (
              <div className="flex items-center gap-4">
                <span className="hidden sm:block text-sm">{user?.name}</span>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
                >
                  <LogOut size={18} />
                  <span className="hidden sm:block">Logout</span>
                </button>
              </div>
            ) : (
              <div className="hidden sm:flex gap-2">
                <Link to="/login" className="px-4 py-2 border rounded-lg hover:border-green-500 transition">
                  Login
                </Link>
                <Link to="/signup" className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className={`md:hidden pb-4 border-t ${isDark ? "border-gray-800" : "border-gray-200"}`}>
            <Link to="/" className="block py-2 hover:text-green-500">Home</Link>
            <Link to="/detection" className={authenticated ? "block py-2 hover:text-green-500" : "block py-2 opacity-50 cursor-not-allowed"}>
              Detection
            </Link>
            <Link to="/prevention" className={authenticated ? "block py-2 hover:text-green-500" : "block py-2 opacity-50 cursor-not-allowed"}>
              Prevention
            </Link>
            <Link to="/dashboard" className={authenticated ? "block py-2 hover:text-green-500" : "block py-2 opacity-50 cursor-not-allowed"}>
              Dashboard
            </Link>
            <Link to="/contact" className="block py-2 hover:text-green-500">Contact</Link>

            {authenticated ? (
              <button
                onClick={handleLogout}
                className="w-full text-left mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Logout
              </button>
            ) : (
              <div className="flex gap-2 mt-4">
                <Link to="/login" className="flex-1 px-4 py-2 border rounded-lg text-center hover:border-green-500 transition">
                  Login
                </Link>
                <Link to="/signup" className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg text-center hover:bg-green-600 transition">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};
