// src/pages/BookRide.jsx
import React, { useState } from "react";
import { getRouteFallback } from "../services/routeService";
import { auth, db } from "../firebase";
import { addDoc, collection, doc, getDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function BookRide() {
  const nav = useNavigate();
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [corridor, setCorridor] = useState(120);
  const [loading, setLoading] = useState(false);

  function parseLatLng(text) {
    const parts = text.split(",").map(s => s.trim());
    if (parts.length !== 2) return null;
    const lat = parseFloat(parts[0]);
    const lng = parseFloat(parts[1]);
    if (isNaN(lat) || isNaN(lng)) return null;
    return { lat, lng };
  }

  async function handlePlanAndStart() {
    if (!pickup || !drop) {
      return alert("⚠️ Enter pickup & drop as lat,lng (e.g. 24.265,80.750)");
    }

    const origin = parseLatLng(pickup);
    const destination = parseLatLng(drop);
    if (!origin || !destination) {
      return alert("⚠️ Invalid coordinates. Use format: lat,lng");
    }

    setLoading(true);
    try {
      // fetch guardians from profile
      let guardians = [];
      if (auth.currentUser?.uid) {
        const userSnap = await getDoc(doc(db, "users", auth.currentUser.uid));
        if (userSnap.exists()) {
          guardians = userSnap.data().guardians || [];
        }
      }

      // get route from fallback service
      const route = await getRouteFallback(origin, destination);

      // save ride
      const docRef = await addDoc(collection(db, "rides"), {
        riderId: auth.currentUser?.uid || null,
        pickup: { ...origin, text: pickup },
        drop: { ...destination, text: drop },
        route: {
          points: route.points,
          distanceMeters: route.distanceMeters,
          durationSeconds: route.durationSeconds,
        },
        safety: {
          corridorMeters: corridor,
          offRouteSince: null,
        },
        guardians,
        status: "active",
        createdAt: serverTimestamp(),
      });

      nav(`/track/${docRef.id}`);
    } catch (e) {
      console.error(e);
      alert("❌ Failed to create ride: " + (e.message || "unknown error"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow mt-6">
      <h2 className="text-2xl font-bold text-pink-600">Plan & Start Ride</h2>
      <p className="text-sm text-gray-600">
        For MVP enter coordinates: pickup and drop as <code>lat,lng</code>. <br />
        Example: <code>24.265,80.750</code>
      </p>

      <div className="mt-4 space-y-3">
        <input
          value={pickup}
          onChange={(e) => setPickup(e.target.value)}
          placeholder="Pickup (lat,lng)"
          className="w-full p-2 border rounded"
        />
        <input
          value={drop}
          onChange={(e) => setDrop(e.target.value)}
          placeholder="Drop (lat,lng)"
          className="w-full p-2 border rounded"
        />

        <div className="flex items-center gap-3">
          <input
            value={corridor}
            onChange={(e) => setCorridor(Number(e.target.value))}
            type="number"
            className="w-32 p-2 border rounded"
          />
          <div className="text-sm text-gray-600">corridor meters</div>
        </div>

        <button
          onClick={handlePlanAndStart}
          disabled={loading}
          className="w-full bg-pink-600 text-white py-2 rounded"
        >
          {loading ? "Starting..." : "Plan & Start Ride"}
        </button>
      </div>
    </div>
  );
}
