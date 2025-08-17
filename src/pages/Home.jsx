import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/rakshago.png";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-blue-100 to-white flex flex-col items-center justify-center px-4 sm:px-8">
      {/* Logo and Heading */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center"
      >
        <img src={logo} alt="RakshaGo Logo" className="w-28 sm:w-36 mb-4 drop-shadow-md" />
        <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-700 text-center">
          Welcome to <span className="text-pink-600">RakshaGo</span>
        </h1>
        <p className="mt-3 text-gray-600 text-center max-w-md">
          Ride safe. Ride smart. Built for India's small towns with ❤️
        </p>
      </motion.div>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="mt-10 flex gap-6"
      >
        <Link
          to="/login"
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl shadow-md text-lg font-semibold transition-all duration-300"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="px-6 py-3 bg-pink-500 hover:bg-pink-600 text-white rounded-2xl shadow-md text-lg font-semibold transition-all duration-300"
        >
          Sign Up
        </Link>
      </motion.div>

      {/* Footer */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="mt-12 text-sm text-gray-500 text-center"
      >
        🚘 Empowering rides for everyone, with safety at the heart.
      </motion.p>
    </div>
  );
};

export default Home;
