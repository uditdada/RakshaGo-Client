import React from "react";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow p-6">
      <h2 className="text-2xl font-bold text-center">
        Welcome back to <span className="text-pink-600">Raksha</span>
        <span className="text-blue-600">Go</span>
      </h2>

      <form className="mt-6 space-y-4">
        <input type="email" className="w-full p-3 border rounded-lg" placeholder="Email" />
        <input type="password" className="w-full p-3 border rounded-lg" placeholder="Password" />
        <button className="w-full bg-pink-600 text-white py-3 rounded-xl hover:bg-pink-700">
          Log in
        </button>
      </form>

      <p className="text-center text-sm text-gray-600 mt-4">
        New here?{" "}
        <Link to="/signup" className="text-pink-600 font-semibold">Create account</Link>
      </p>
    </div>
  );
}
