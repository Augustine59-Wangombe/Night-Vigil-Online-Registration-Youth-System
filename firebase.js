
// Import Firebase core
import { initializeApp } from "firebase/app";

// Import Firestore functions
import {
  getFirestore,
  collection,
  addDoc
} from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDbJ7ckY-O83Do2PRkwAUvrBTB9HXSlKJk",
  authDomain: "igil-online-registration.firebaseapp.com",
  projectId: "igil-online-registration",
  storageBucket: "igil-online-registration.appspot.com",
  messagingSenderId: "994180517578",
  appId: "1:994180517578:web:88cfca0695058ab498ee33",
  measurementId: "G-42YLQEY1FP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Wait for page to load
window.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registerForm");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    try {
      const getVal = (id) =>
        form.querySelector(`#${id}`)?.value || "";

      await addDoc(collection(db, "registrations"), {
        name: getVal("fullName"),
        phone: getVal("phone"),
        age: getVal("age"),
        localChurch: getVal("localChurch"),
        gender: getVal("gender"),
        createdAt: new Date()
      });

      alert("✅ Registration successful!");
      form.reset();

    } catch (error) {
      console.error("Firestore error:", error);
      alert("❌ Error: " + error.message);
    }
  });
});
