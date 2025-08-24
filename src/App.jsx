import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import BookRide from "./pages/BookRide";
import Profile from "./pages/Profile";
import AdminPanel from "./pages/AdminPanel";
import GuardianAlerts from "./pages/GuardianAlerts";
import VerifiedDrivers from "./pages/VerifiedDrivers";
import PanicActions from "./pages/PanicActions";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-blue-50">
        <Navbar />
        <main className="px-4 md:px-8 lg:px-12 py-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/book" element={<BookRide />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/guardian-alerts" element={<GuardianAlerts />} />
            <Route path="/verified-drivers" element={<VerifiedDrivers />} />
            <Route path="/panic-actions" element={<PanicActions />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
