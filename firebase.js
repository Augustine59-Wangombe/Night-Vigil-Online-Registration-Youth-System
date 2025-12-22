
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

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

window.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registerForm");
  if (!form) return;

  const getVal = (id) => form.querySelector(`#${id}`)?.value || "";

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "registrations"), {
        name: getVal("fullName"),
        phone: getVal("phone"),
        age: getVal("Age"),
        localChurch: getVal("localChurch"),
        gender: getVal("Gender"),
        role: getVal("role"),
        level: getVal("level") || "",
        position: getVal("position") || "",
        createdAt: new Date()
      });

      alert("✅ Registration successful!");
      form.reset();
      document.getElementById('leadershipSection').style.display = 'none';
      document.getElementById('positionSection').style.display = 'none';
    } catch (error) {
      console.error("Firestore error:", error);
      alert("❌ Error: " + error.message);
    }
  });
});
