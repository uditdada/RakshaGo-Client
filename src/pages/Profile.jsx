// src/pages/Profile.jsx
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

const Profile = () => {
  const [user] = useAuthState(auth);

  const handleLogout = async () => {
    await signOut(auth);
    localStorage.removeItem("rakshago_role");
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-pink-50 to-blue-50 px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-6">
        <h1 className="text-2xl font-bold text-pink-700 text-center">Your Profile</h1>
        <div className="mt-4 space-y-2">
          <div className="border rounded-lg p-3">
            <p className="text-sm text-gray-500">Name</p>
            <p className="font-semibold">{user?.displayName || "—"}</p>
          </div>
          <div className="border rounded-lg p-3">
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-semibold">{user?.email}</p>
          </div>
          <div className="border rounded-lg p-3">
            <p className="text-sm text-gray-500">UID</p>
            <p className="font-mono break-all">{user?.uid}</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="mt-5 w-full bg-gray-900 hover:bg-black text-white rounded-lg py-2 font-semibold"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Profile;
