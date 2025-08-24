import React from "react";

export default function AdminPanel() {
  return (
    <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow p-6">
      <h2 className="text-2xl font-bold">Admin Panel</h2>
      <div className="grid md:grid-cols-3 gap-4 mt-6">
        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold">Drivers</h3>
          <p className="text-gray-600 text-sm">Approve KYC & licences</p>
          <button className="mt-3 text-sm bg-blue-600 text-white px-4 py-2 rounded-lg">
            Manage Drivers
          </button>
        </div>
        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold">Users</h3>
          <p className="text-gray-600 text-sm">Handle support & safety issues</p>
          <button className="mt-3 text-sm bg-blue-600 text-white px-4 py-2 rounded-lg">
            Manage Users
          </button>
        </div>
        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold">Reports</h3>
          <p className="text-gray-600 text-sm">Trips, SOS, ratings</p>
          <button className="mt-3 text-sm bg-blue-600 text-white px-4 py-2 rounded-lg">
            View Reports
          </button>
        </div>
      </div>
    </div>
  );
}
