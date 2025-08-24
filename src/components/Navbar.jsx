import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../logo.png";

const NavLink = ({ to, children }) => {
  const { pathname } = useLocation();
  const active = pathname === to;
  return (
    <Link
      to={to}
      className={`px-3 py-2 rounded-full text-sm font-medium transition
        ${active ? "bg-pink-600 text-white" : "text-gray-700 hover:bg-pink-100"}
      `}
    >
      {children}
    </Link>
  );
};

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur shadow-sm">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="RakshaGo" className="h-10 w-10 rounded-xl" />
          <span className="text-xl font-extrabold tracking-tight">
            <span className="text-pink-600">Raksha</span>
            <span className="text-blue-600">Go</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-2">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/book">Book Ride</NavLink>
          <NavLink to="/profile">Profile</NavLink>
          <NavLink to="/admin">Admin</NavLink>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/login"
            className="px-4 py-2 rounded-full border border-pink-500 text-pink-600 hover:bg-pink-50 transition text-sm"
          >
            Log in
          </Link>
          <Link
            to="/signup"
            className="px-4 py-2 rounded-full bg-pink-600 text-white hover:bg-pink-700 transition text-sm"
          >
            Sign up
          </Link>
        </div>
      </nav>
    </header>
  );
}
