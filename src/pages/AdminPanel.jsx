// src/pages/AdminPanel.jsx
import React, { useState, useEffect } from "react";

const AdminPanel = () => {
  const [role, setRole] = useState(localStorage.getItem("rakshago_role") || "user");

  useEffect(() => {
    localStorage.setItem("rakshago_role", role);
  }, [role]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-blue-100 to-pink-100 px-4">
      <div className="w-full max-w-2xl bg-white shadow-2xl rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-blue-700">Admin Panel</h1>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Role:</span>
            <select
              className="border rounded-lg px-3 py-1"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 mt-6">
          <button className="border rounded-xl p-4 hover:bg-gray-50 text-left">
            <p className="text-sm text-gray-500">Drivers</p>
            <p className="font-semibold">Verify Drivers</p>
          </button>
          <button className="border rounded-xl p-4 hover:bg-gray-50 text-left">
            <p className="text-sm text-gray-500">Users</p>
            <p className="font-semibold">Manage Users</p>
          </button>
          <button className="border rounded-xl p-4 hover:bg-gray-50 text-left">
            <p className="text-sm text-gray-500">Rides</p>
            <p className="font-semibold">All Rides & Issues</p>
          </button>
          <button className="border rounded-xl p-4 hover:bg-gray-50 text-left">
            <p className="text-sm text-gray-500">Safety</p>
            <p className="font-semibold">SOS Review Queue</p>
          </button>
        </div>

        <p className="mt-6 text-sm text-gray-500">
          (Note: Admin access is demo via localStorage role. We’ll wire real roles with Firestore later.)
        </p>
      </div>
    </div>
  );
};

export default AdminPanel;
