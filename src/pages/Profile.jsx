// src/pages/Profile.jsx
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [guardians, setGuardians] = useState(["", "", ""]);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  useEffect(() => {
    async function load() {
      if (!user) return;
      try {
        const snap = await getDoc(doc(db, "users", user.uid));
        if (snap.exists()) {
          const d = snap.data();
          setData(d);
          const g = d.guardians || [];
          setGuardians([g[0] || "", g[1] || "", g[2] || ""]);
        }
      } catch (e) {
        console.error(e);
        setErr("Failed to load profile");
      }
    }
    load();
  }, [user]);

  async function save() {
    if (!user) return;
    setMsg("");
    setErr("");
    try {
      await updateDoc(doc(db, "users", user.uid), {
        guardians: guardians.filter(Boolean),
      });
      setMsg("✅ Guardians saved");
    } catch (e) {
      console.error(e);
      setErr("❌ Save failed");
    }
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow mt-8">
      <h2 className="text-2xl font-bold text-pink-600">My Profile</h2>

      {err && <div className="text-red-600 mt-2">{err}</div>}
      {msg && <div className="text-green-600 mt-2">{msg}</div>}

      <div className="mt-4">
        <p><span className="font-semibold">Name:</span> {data?.name || "-"}</p>
        <p><span className="font-semibold">Email:</span> {data?.email || user?.email}</p>
      </div>

      <div className="mt-6">
        <h3 className="font-semibold">Guardians</h3>
        <input
          className="w-full p-2 border rounded mt-2"
          value={guardians[0]}
          onChange={(e) =>
            setGuardians([e.target.value, guardians[1], guardians[2]])
          }
          placeholder="Guardian 1 (phone/email)"
        />
        <input
          className="w-full p-2 border rounded mt-2"
          value={guardians[1]}
          onChange={(e) =>
            setGuardians([guardians[0], e.target.value, guardians[2]])
          }
          placeholder="Guardian 2"
        />
        <input
          className="w-full p-2 border rounded mt-2"
          value={guardians[2]}
          onChange={(e) =>
            setGuardians([guardians[0], guardians[1], e.target.value])
          }
          placeholder="Guardian 3"
        />
        <button
          onClick={save}
          className="mt-3 bg-pink-600 text-white px-4 py-2 rounded"
        >
          Save
        </button>
      </div>
    </div>
  );
}
