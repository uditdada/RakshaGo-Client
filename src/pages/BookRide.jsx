import React from "react";

export default function BookRide() {
  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow p-6">
      <h2 className="text-2xl font-bold">Book a Ride</h2>
      <p className="text-gray-600">Plan rides for Maihar — Maa Sharda Mandir and nearby routes.</p>

      <form className="mt-6 grid md:grid-cols-2 gap-4">
        <input className="p-3 border rounded-lg" placeholder="Pickup location" />
        <input className="p-3 border rounded-lg" placeholder="Drop location" />
        <input className="p-3 border rounded-lg md:col-span-2" placeholder="Notes (optional)" />
        <button className="md:col-span-2 w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700">
          Search Drivers
        </button>
      </form>

      <div className="mt-6 text-sm text-gray-600">
        Tip: Add a guardian in Profile to auto-share live location.
      </div>
    </div>
  );
}
