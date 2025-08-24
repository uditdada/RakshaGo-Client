// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBzhVZXf__9UG8K2q_hxicNVjPh3DOviY8",
  authDomain: "rakshago.firebaseapp.com",
  projectId: "rakshago",
  storageBucket: "rakshago.firebasestorage.app",
  messagingSenderId: "783444000332",
  appId: "1:783444000332:web:84bd4981ccbe2e1aecfee9",
  measurementId: "G-86QCLMKEHQ",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);

export { app, auth, googleProvider, db };
