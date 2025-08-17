// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

/**
 * Usage:
 * <ProtectedRoute> <SomePage/> </ProtectedRoute>
 * <ProtectedRoute adminOnly> <AdminPage/> </ProtectedRoute>
 */
const ProtectedRoute = ({ children, adminOnly = false }) => {
  const [user, loading] = useAuthState(auth);
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  // Simple admin flag example (you can replace with Firestore role check)
  const isAdmin = localStorage.getItem("rakshago_role") === "admin";
  if (adminOnly && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
