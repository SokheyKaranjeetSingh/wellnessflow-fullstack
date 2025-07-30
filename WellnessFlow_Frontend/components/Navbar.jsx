import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ token, setToken }) {
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userEmail');
    setToken(null);
  };

  return (
    <nav className="bg-wellness-500 shadow-lg sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="bg-white rounded-full p-2">
              <span className="text-wellness-500 text-xl font-bold">🌿</span>
            </div>
            <span className="text-white text-xl font-bold">WellnessFlow</span>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-6">
            <Link 
              to="/dashboard" 
              className="text-white hover:text-wellness-100 px-3 py-2 rounded-lg font-medium transition-colors duration-200 hover:bg-wellness-600"
            >
              Dashboard
            </Link>
            
            {token && (
              <Link 
                to="/my-sessions" 
                className="text-white hover:text-wellness-100 px-3 py-2 rounded-lg font-medium transition-colors duration-200 hover:bg-wellness-600"
              >
                My Sessions
              </Link>
            )}
            
            {token && (
              <Link 
                to="/editor" 
                className="text-white hover:text-wellness-100 px-3 py-2 rounded-lg font-medium transition-colors duration-200 hover:bg-wellness-600"
              >
                New Session
              </Link>
            )}
            
            {!token ? (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/login" 
                  className="text-white hover:text-wellness-100 px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="bg-white text-wellness-500 hover:bg-wellness-50 px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                >
                  Register
                </Link>
              </div>
            ) : (
              <button 
                onClick={handleLogout}
                className="bg-wellness-600 hover:bg-wellness-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
