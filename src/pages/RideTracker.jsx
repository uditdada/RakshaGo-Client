// src/pages/RideTracker.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useOffRouteWatcher from "../hooks/useOffRouteWatcher";
import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

export default function RideTracker() {
  const { rideId } = useParams();
  const [points, setPoints] = useState(null);
  const [corridor, setCorridor] = useState(120);
  const [status, setStatus] = useState("Loading...");

  useEffect(() => {
    async function load() {
      const snap = await getDoc(doc(db, "rides", rideId));
      if (!snap.exists()) {
        setStatus("Ride not found");
        return;
      }
      const r = snap.data();
      setPoints(r.route?.points || null);
      setCorridor(r.safety?.corridorMeters || 120);
      setStatus(r.status || "active");
    }
    load();
  }, [rideId]);

  const { distanceM, offRoute } = useOffRouteWatcher({
    points,
    corridorMeters: corridor,
    dwellMs: 30000,
    onOffRoute: async ({ lat, lng, distanceM }) => {
      setStatus("offroute");
      try {
        await updateDoc(doc(db, "rides", rideId), {
          status: "offroute",
          "safety.offRouteSince": serverTimestamp(),
          "safety.offRouteLocation": { lat, lng, distanceM },
        });
      } catch (e) { console.error(e); }
      alert("⚠️ Off-route detected — guardians will be updated if set.");
    },
    onBackOnRoute: async () => {
      setStatus("active");
      try {
        await updateDoc(doc(db, "rides", rideId), {
          status: "active",
          "safety.offRouteSince": null,
        });
      } catch (e) { console.error(e); }
      alert("Back on route.");
    },
  });

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow">
      <h2 className="text-2xl font-bold">Live Ride Tracker</h2>
      <p className={`mt-2 ${offRoute ? "text-rose-600" : "text-green-700"}`}>
        {status === "offroute" ? "Off route detected" : "On planned route"}
      </p>

      <div className="mt-4 p-3 rounded bg-gray-50">
        <div>Distance from plan: <strong>{distanceM ? distanceM.toFixed(1) : "-" } m</strong></div>
        <div>Corridor: <strong>{corridor} m</strong></div>
      </div>

      <div className="mt-4 flex gap-3">
        <a href="tel:112" className="px-4 py-2 rounded border">Call 112</a>
        <button onClick={() => alert("Share location to guardians (not implemented)")} className="px-4 py-2 rounded bg-pink-600 text-white">Share location</button>
      </div>
    </div>
  );
}
