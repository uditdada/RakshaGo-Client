import React from "react";

export default function GuardianAlerts() {
  const simulateSend = () => alert("Guardian notified with live ride + location ✅");

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow p-6">
      <h2 className="text-2xl font-bold">Guardian Alerts</h2>
      <p className="text-gray-600">
        Auto-share driver details & live location with up to 3 guardians when a ride starts.
      </p>
      <button
        onClick={simulateSend}
        className="mt-4 bg-pink-600 text-white px-5 py-3 rounded-xl hover:bg-pink-700"
      >
        Test Alert
      </button>
    </div>
  );
}
