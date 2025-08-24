import React from "react";

export default function Profile() {
  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow p-6">
      <h2 className="text-2xl font-bold mb-4">Your Profile</h2>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold mb-2">Basic Info</h3>
          <p>Name: Demo User</p>
          <p>Email: demo@example.com</p>
        </div>

        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold mb-2">Guardians</h3>
          <ul className="list-disc list-inside text-gray-700">
            <li>+91 98xxxxxx01</li>
            <li>+91 98xxxxxx02</li>
            <li>+91 98xxxxxx03</li>
          </ul>
          <button className="mt-3 text-sm bg-pink-600 text-white px-4 py-2 rounded-lg">
            Add / Edit Guardians
          </button>
        </div>
      </div>
    </div>
  );
}
