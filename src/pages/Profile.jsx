// src/pages/Profile.jsx
import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user } = useAuth();
  const [guardians, setGuardians] = useState(["", "", ""]);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    async function load() {
      if (!user) return;
      const snap = await getDoc(doc(db, "users", user.uid));
      if (snap.exists()) {
        const d = snap.data();
        const g = d.guardians || [];
        setGuardians([g[0] || "", g[1] || "", g[2] || ""]);
      }
    }
    load();
  }, [user]);

  async function save() {
    if (!user) return;
    try {
      await updateDoc(doc(db, "users", user.uid), {
        guardians: guardians.filter(Boolean)
      });
      setMsg("Guardians saved");
    } catch (e) {
      setMsg("Save failed");
      console.error(e);
    }
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow">
      <h2 className="text-2xl font-bold">My Profile</h2>
      <p className="mt-2">Name: {user?.displayName || "-"}</p>
      <p>Email: {user?.email}</p>

      <div className="mt-4">
        <h3 className="font-semibold">Guardians</h3>
        <input className="w-full p-2 border rounded mt-2" value={guardians[0]} onChange={(e)=>setGuardians([e.target.value, guardians[1], guardians[2]])} placeholder="Guardian 1 (phone/email)" />
        <input className="w-full p-2 border rounded mt-2" value={guardians[1]} onChange={(e)=>setGuardians([guardians[0], e.target.value, guardians[2]])} placeholder="Guardian 2" />
        <input className="w-full p-2 border rounded mt-2" value={guardians[2]} onChange={(e)=>setGuardians([guardians[0], guardians[1], e.target.value])} placeholder="Guardian 3" />
        <button onClick={save} className="mt-3 bg-pink-600 text-white px-4 py-2 rounded">Save</button>
        {msg && <div className="mt-2 text-sm text-green-600">{msg}</div>}
      </div>
    </div>
  );
}
