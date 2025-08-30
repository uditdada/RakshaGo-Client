// src/pages/Signup.jsx
import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, now } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const nav = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    guardian1: "",
    guardian2: "",
    guardian3: "",
  });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const onChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSignup = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      // 1. Firebase Auth user create
      const res = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

      // 2. Display name set
      await updateProfile(res.user, { displayName: form.name || "" });

      // 3. Guardians array bana
      const guardians = [
        form.guardian1,
        form.guardian2,
        form.guardian3,
      ].filter(Boolean);

      // 4. Firestore me user document banao
      await setDoc(doc(db, "users", res.user.uid), {
        name: form.name,
        email: form.email,
        guardians,
        role: "rider", // 👈 consistent with seedFirestore.js
        createdAt: now(),
      });

      // 5. Redirect to profile
      nav("/profile");
    } catch (error) {
      setErr(error.code || "Signup failed, try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow mt-8">
      <h2 className="text-2xl font-bold text-center text-pink-600">
        Create account
      </h2>
      {err && <div className="text-red-600 mt-2">{err}</div>}
      <form onSubmit={handleSignup} className="mt-4 space-y-3">
        <input
          name="name"
          value={form.name}
          onChange={onChange}
          placeholder="Full name"
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="email"
          value={form.email}
          onChange={onChange}
          placeholder="Email"
          type="email"
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="password"
          value={form.password}
          onChange={onChange}
          placeholder="Password"
          type="password"
          className="w-full p-2 border rounded"
          required
        />

        <div className="grid gap-2">
          <input
            name="guardian1"
            value={form.guardian1}
            onChange={onChange}
            placeholder="Guardian #1 phone/email (optional)"
            className="w-full p-2 border rounded"
          />
          <input
            name="guardian2"
            value={form.guardian2}
            onChange={onChange}
            placeholder="Guardian #2"
            className="w-full p-2 border rounded"
          />
          <input
            name="guardian3"
            value={form.guardian3}
            onChange={onChange}
            placeholder="Guardian #3"
            className="w-full p-2 border rounded"
          />
        </div>

        <button
          disabled={loading}
          type="submit"
          className="w-full bg-pink-600 text-white py-2 rounded"
        >
          {loading ? "Creating..." : "Sign up"}
        </button>
      </form>

      <p className="text-sm text-center mt-3">
        Already have account?{" "}
        <Link to="/login" className="text-pink-600">
          Log in
        </Link>
      </p>
    </div>
  );
}
