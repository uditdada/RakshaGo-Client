import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="max-w-lg mx-auto bg-white rounded-2xl shadow p-6 text-center">
      <h2 className="text-2xl font-bold">Page not found</h2>
      <p className="text-gray-600 mt-2">The page you’re looking for does not exist.</p>
      <Link to="/" className="inline-block mt-4 px-5 py-3 bg-pink-600 text-white rounded-xl hover:bg-pink-700">
        Go Home
      </Link>
    </div>
  );
}
