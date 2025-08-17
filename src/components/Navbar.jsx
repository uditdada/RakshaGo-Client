// src/components/Navbar.jsx
import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import logo from "../assets/rakshago.png";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const linkClass =
    "px-3 py-2 rounded-lg hover:bg-white/10 transition font-medium";
  const activeClass = "bg-white/20";

  return (
    <nav className="bg-gradient-to-r from-pink-500 to-blue-600 text-white sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="RakshaGo" className="w-8 h-8 rounded" />
            <span className="text-xl font-extrabold tracking-wide">RakshaGo</span>
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-2">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${linkClass} ${isActive ? activeClass : ""}`
              }
              end
            >
              Home
            </NavLink>
            <NavLink
              to="/book"
              className={({ isActive }) =>
                `${linkClass} ${isActive ? activeClass : ""}`
              }
            >
              Book Ride
            </NavLink>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `${linkClass} ${isActive ? activeClass : ""}`
              }
            >
              Profile
            </NavLink>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `${linkClass} ${isActive ? activeClass : ""}`
              }
            >
              Login
            </NavLink>
            <NavLink
              to="/signup"
              className={({ isActive }) =>
                `${linkClass} ${isActive ? activeClass : ""}`
              }
            >
              Sign Up
            </NavLink>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden inline-flex items-center justify-center p-2 hover:bg-white/10 rounded-lg"
            onClick={() => setOpen((s) => !s)}
            aria-label="Toggle menu"
          >
            <svg width="24" height="24" fill="none" stroke="currentColor">
              <path strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          <NavLink
            to="/"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `block ${linkClass} ${isActive ? activeClass : ""}`
            }
            end
          >
            Home
          </NavLink>
          <NavLink
            to="/book"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `block ${linkClass} ${isActive ? activeClass : ""}`
            }
          >
            Book Ride
          </NavLink>
          <NavLink
            to="/profile"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `block ${linkClass} ${isActive ? activeClass : ""}`
            }
          >
            Profile
          </NavLink>
          <NavLink
            to="/login"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `block ${linkClass} ${isActive ? activeClass : ""}`
            }
          >
            Login
          </NavLink>
          <NavLink
            to="/signup"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `block ${linkClass} ${isActive ? activeClass : ""}`
            }
          >
            Sign Up
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
