// src/pages/Signup.jsx
import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const cred = await createUserWithEmailAndPassword(auth, form.email, form.password);
      await updateProfile(cred.user, { displayName: form.name });
      toast.success("Account created! 🎉");
      setTimeout(() => nav("/book", { replace: true }), 700);
    } catch (err) {
      toast.error(err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const signupWithGoogle = async () => {
    try {
      setLoading(true);
      await signInWithPopup(auth, googleProvider);
      toast.success("Signed up with Google!");
      setTimeout(() => nav("/book", { replace: true }), 700);
    } catch (err) {
      toast.error(err.message || "Google signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-pink-100 to-blue-100 px-4">
      <ToastContainer position="top-center" />
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-6">
        <h1 className="text-2xl font-bold text-center text-pink-700">Create Account</h1>
        <p className="text-center text-sm text-gray-500 mb-6">
          Join <span className="text-blue-600 font-semibold">RakshaGo</span>
        </p>

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="text-sm font-medium">Full Name</label>
            <input
              className="mt-1 w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              name="name"
              value={form.name}
              onChange={onChange}
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              className="mt-1 w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
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
              className="mt-1 w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              type="password"
              name="password"
              value={form.password}
              onChange={onChange}
              minLength={6}
              required
            />
          </div>

          <button
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg py-2 transition"
          >
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>

        <button
          onClick={signupWithGoogle}
          className="mt-3 w-full border border-gray-300 hover:bg-gray-50 rounded-lg py-2 font-medium"
          disabled={loading}
        >
          Continue with Google
        </button>

        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
