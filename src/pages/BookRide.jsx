// src/pages/BookRide.jsx
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BookRide = () => {
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [eta, setEta] = useState(null);
  const [fare, setFare] = useState(null);

  const estimate = () => {
    if (!pickup || !drop) return toast.info("Enter pickup & drop");
    // Very simple mock fare/eta
    const minutes = Math.floor(Math.random() * 12) + 4;
    const price = Math.floor(Math.random() * 120) + 80;
    setEta(minutes);
    setFare(price);
  };

  const bookNow = () => {
    if (!pickup || !drop) return toast.info("Enter pickup & drop");
    toast.success("Ride booked! Driver assigned in a moment. 🚗");
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-blue-50 to-pink-50 px-4">
      <ToastContainer position="top-center" />
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-6">
        <h1 className="text-2xl font-bold text-blue-700 text-center">Book Your Ride</h1>
        <p className="text-center text-sm text-gray-500 mb-6">Safe • Quick • Reliable</p>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Pickup</label>
            <input
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              className="mt-1 w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="e.g. Maihar Station"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Drop</label>
            <input
              value={drop}
              onChange={(e) => setDrop(e.target.value)}
              className="mt-1 w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="e.g. Maa Sharda Mandir"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-5">
          <button
            onClick={estimate}
            className="flex-1 bg-pink-600 hover:bg-pink-700 text-white font-semibold rounded-lg py-2"
          >
            Get Estimate
          </button>
          <button
            onClick={bookNow}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg py-2"
          >
            Book Now
          </button>
        </div>

        {(eta || fare) && (
          <div className="mt-6 grid sm:grid-cols-2 gap-4">
            <div className="rounded-xl border p-4">
              <p className="text-sm text-gray-500">Estimated Time</p>
              <p className="text-2xl font-bold text-blue-700">{eta} min</p>
            </div>
            <div className="rounded-xl border p-4">
              <p className="text-sm text-gray-500">Estimated Fare</p>
              <p className="text-2xl font-bold text-pink-700">₹ {fare}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookRide;
