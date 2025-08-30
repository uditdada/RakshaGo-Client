// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, serverTimestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "rakshago.firebaseapp.com",
  projectId: "rakshago",
  storageBucket: "rakshago.appspot.com",
  messagingSenderId: "783444000332",
  appId: "1:783444000332:web:84bd4981ccbe2e1aecfee9",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// helper (use karo timestamps ke liye)
export const now = () => serverTimestamp();
