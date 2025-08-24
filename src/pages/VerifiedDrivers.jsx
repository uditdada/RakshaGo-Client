import React from "react";

export default function VerifiedDrivers() {
  const simulateCheck = () => alert("Driver KYC, licence & background verified 🔒");

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow p-6">
      <h2 className="text-2xl font-bold">Verified Drivers</h2>
      <p className="text-gray-600">
        Every driver passes KYC, licence validation, and community rating threshold.
      </p>
      <button
        onClick={simulateCheck}
        className="mt-4 bg-blue-600 text-white px-5 py-3 rounded-xl hover:bg-blue-700"
      >
        Run Verification Check
      </button>
    </div>
  );
}
