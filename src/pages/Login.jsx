// src/pages/Login.jsx
import React, { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, form.email, form.password);
      toast.success("Welcome back! 🎉");
      setTimeout(() => nav(from, { replace: true }), 700);
    } catch (err) {
      toast.error(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    try {
      setLoading(true);
      await signInWithPopup(auth, googleProvider);
      toast.success("Logged in with Google!");
      setTimeout(() => nav(from, { replace: true }), 700);
    } catch (err) {
      toast.error(err.message || "Google login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-blue-100 to-pink-100 px-4">
      <ToastContainer position="top-center" />
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-6">
        <h1 className="text-2xl font-bold text-center text-blue-700">Login</h1>
        <p className="text-center text-sm text-gray-500 mb-6">
          Welcome back to <span className="text-pink-600 font-semibold">RakshaGo</span>
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              className="mt-1 w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-pink-500"
              type="email"
              name="email"
              value={form.email}
              onChange={onChange}
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium">Password</label>
            <input
              className="mt-1 w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-pink-500"
              type="password"
              name="password"
              value={form.password}
              onChange={onChange}
              required
            />
          </div>

          <button
            disabled={loading}
            className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold rounded-lg py-2 transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <button
          onClick={loginWithGoogle}
          className="mt-3 w-full border border-gray-300 hover:bg-gray-50 rounded-lg py-2 font-medium"
          disabled={loading}
        >
          Continue with Google
        </button>

        <p className="text-center text-sm mt-4">
          New here?{" "}
          <Link to="/signup" className="text-pink-600 font-semibold">
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
