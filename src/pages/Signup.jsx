import React from "react";
import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow p-6">
      <h2 className="text-2xl font-bold text-center">
        Create your <span className="text-pink-600">Raksha</span>
        <span className="text-blue-600">Go</span> account
      </h2>

      <form className="mt-6 space-y-4">
        <input className="w-full p-3 border rounded-lg" placeholder="Full Name" />
        <input type="email" className="w-full p-3 border rounded-lg" placeholder="Email" />
        <input type="password" className="w-full p-3 border rounded-lg" placeholder="Password" />
        <button className="w-full bg-pink-600 text-white py-3 rounded-xl hover:bg-pink-700">
          Sign up
        </button>
      </form>

      <p className="text-center text-sm text-gray-600 mt-4">
        Already have an account?{" "}
        <Link to="/login" className="text-pink-600 font-semibold">Log in</Link>
      </p>
    </div>
  );
}
