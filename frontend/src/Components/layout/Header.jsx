import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Header({ isLoggedIn, handleLogout }) {
  const navigate = useNavigate();

  const onLogoutClick = () => {
    handleLogout(); // Update the state in App.jsx
    navigate('/');    // Redirect user to the home page
  };

  return (
    <div className="nav fixed top-0 left-0 w-full bg-white shadow-md px-6 py-4 flex justify-between items-center z-50">
      <Link to="/" className="flex items-center space-x-3 cursor-pointer">
        <img
          src="/your-logo.png"
          alt="Org Logo"
          className="h-10 w-10 object-contain"
        />
        <span
          className="text-3xl md:text-4xl font-bold"
          style={{ fontFamily: 'Times New Roman, serif', color: '#15803d' }}
        >
          Vyawastha
        </span>
      </Link>
      <div className="pr-4">
        {/* Ternary operator to switch between Login and Logout */}
        {isLoggedIn ? (
          <button
            onClick={onLogoutClick}
            className="px-6 py-2 rounded-full bg-red-600 text-white text-lg md:text-xl font-semibold transition hover:bg-red-700"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="px-6 py-2 rounded-full bg-green-600 text-white text-lg md:text-xl font-semibold transition hover:bg-green-700"
          >
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
}

export default Header;