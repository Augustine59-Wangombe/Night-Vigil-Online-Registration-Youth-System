
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDbJ7ckY-O83Do2PRkwAUvrBTB9HXSlKJk",
  authDomain: "igil-online-registration.firebaseapp.com",
  projectId: "igil-online-registration",
  storageBucket: "igil-online-registration.firebasestorage.app",
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

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const getVal = (id) => form.querySelector(`#${id}`)?.value || "";
    await addDoc(collection(db, "registrations"), {











                 alert("✅ Registration successful!");
         catch (error) {
      alert(error.message);
      console.error(error);
    }
  });
});
