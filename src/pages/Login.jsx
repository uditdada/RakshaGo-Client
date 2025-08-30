// src/pages/Login.jsx
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const nav = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, form.email, form.password);
      nav("/book");
    } catch (error) {
      setErr(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow mt-8">
      <h2 className="text-2xl font-bold text-center text-pink-600">Login</h2>
      {err && <div className="text-red-600 mt-2">{err}</div>}
      <form onSubmit={handleLogin} className="mt-4 space-y-3">
        <input name="email" value={form.email} onChange={onChange} placeholder="Email" type="email" className="w-full p-2 border rounded" required />
        <input name="password" value={form.password} onChange={onChange} placeholder="Password" type="password" className="w-full p-2 border rounded" required />
        <button disabled={loading} type="submit" className="w-full bg-pink-600 text-white py-2 rounded">
          {loading ? "Logging..." : "Log in"}
        </button>
      </form>
      <p className="text-sm text-center mt-3">
        New? <Link to="/signup" className="text-pink-600">Create account</Link>
      </p>
    </div>
  );
}
