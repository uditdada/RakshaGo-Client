// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import BookRide from "./pages/BookRide";
import RideTracker from "./pages/RideTracker";
import Profile from "./pages/Profile";
import AdminPanel from "./pages/AdminPanel";
import GuardianAlerts from "./pages/GuardianAlerts";
import VerifiedDrivers from "./pages/VerifiedDrivers";
import PanicActions from "./pages/PanicActions";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main className="max-w-6xl mx-auto px-4 py-6">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />

              <Route
                path="/book"
                element={
                  <ProtectedRoute>
                    <BookRide />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/track/:rideId"
                element={
                  <ProtectedRoute>
                    <RideTracker />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <AdminPanel />
                  </ProtectedRoute>
                }
              />

              <Route path="/guardian-alerts" element={<GuardianAlerts />} />
              <Route path="/verified-drivers" element={<VerifiedDrivers />} />
              <Route path="/panic-actions" element={<PanicActions />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}
