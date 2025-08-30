// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import logo from "../logo.png";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm">
      <nav className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="RakshaGo" className="h-10 w-10 rounded-lg" />
          <span className="font-bold text-lg">
            <span className="text-pink-600">Raksha</span><span className="text-blue-600">Go</span>
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <Link to="/" className="text-sm hover:text-pink-600">Home</Link>
          <Link to="/book" className="text-sm hover:text-pink-600">Book</Link>
          <Link to="/profile" className="text-sm hover:text-pink-600">Profile</Link>
          <Link to="/admin" className="text-sm hover:text-pink-600">Admin</Link>

          {user ? (
            <button onClick={logout} className="ml-3 px-3 py-1 rounded bg-rose-500 text-white text-sm">Logout</button>
          ) : (
            <>
              <Link to="/login" className="ml-3 px-3 py-1 rounded border text-sm">Login</Link>
              <Link to="/signup" className="ml-2 px-3 py-1 rounded bg-pink-600 text-white text-sm">Signup</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
