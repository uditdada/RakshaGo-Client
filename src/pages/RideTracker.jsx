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
  const [status, setStatus] = useState("loading");
  const [guardians, setGuardians] = useState([]);

  // 🔹 Load ride details
  useEffect(() => {
    async function load() {
      const snap = await getDoc(doc(db, "rides", rideId));
      if (!snap.exists()) {
        setStatus("not_found");
        return;
      }
      const r = snap.data();
      setPoints(r.route?.points || null);
      setCorridor(r.safety?.corridorMeters || 120);
      setStatus(r.status || "active");
      setGuardians(r.guardians || []);
    }
    load();
  }, [rideId]);

  // 🔹 Helper to notify guardians (placeholder)
  async function notifyGuardians(message) {
    if (!guardians.length) {
      console.log("⚠️ No guardians set.");
      return;
    }
    guardians.forEach((g) => {
      console.log(`📩 Notify guardian ${g}: ${message}`);
    });
    alert(`🚨 Guardians notified:\n${guardians.join(", ")}`);
  }

  // 🔹 Hook: Off-route watcher
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
      } catch (e) {
        console.error(e);
      }
      await notifyGuardians(`⚠️ Rider went off route. Last seen at ${lat},${lng} (Δ ${distanceM.toFixed(1)}m)`);
    },
    onBackOnRoute: async () => {
      setStatus("active");
      try {
        await updateDoc(doc(db, "rides", rideId), {
          status: "active",
          "safety.offRouteSince": null,
        });
      } catch (e) {
        console.error(e);
      }
      await notifyGuardians("✅ Rider is back on route.");
    },
  });

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow">
      <h2 className="text-2xl font-bold">Live Ride Tracker</h2>

      {status === "loading" && <p className="mt-2 text-gray-500">Loading...</p>}
      {status === "not_found" && <p className="mt-2 text-red-600">Ride not found</p>}
      {status !== "loading" && status !== "not_found" && (
        <p className={`mt-2 ${offRoute ? "text-rose-600" : "text-green-700"}`}>
          {status === "offroute" ? "⚠️ Off route detected" : "✅ On planned route"}
        </p>
      )}

      <div className="mt-4 p-3 rounded bg-gray-50">
        <div>
          Distance from plan:{" "}
          <strong>{distanceM ? distanceM.toFixed(1) : "-"} m</strong>
        </div>
        <div>
          Corridor: <strong>{corridor} m</strong>
        </div>
      </div>

      <div className="mt-4 flex gap-3">
        <a href="tel:112" className="px-4 py-2 rounded border">
          Call 112
        </a>
        <button
          onClick={() =>
            notifyGuardians("📍 Live location shared with you by the rider.")
          }
          className="px-4 py-2 rounded bg-pink-600 text-white"
        >
          Share location
        </button>
      </div>

      {guardians.length > 0 && (
        <div className="mt-4 text-sm text-gray-600">
          Guardians: {guardians.join(", ")}
        </div>
      )}
    </div>
  );
}
