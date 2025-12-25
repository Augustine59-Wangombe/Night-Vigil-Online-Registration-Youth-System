
/* ===============================
   IMPORTS
================================ */
import { db } from "./firebase.js";
import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

/* ===============================
   MAIN SCRIPT
================================ */
document.addEventListener("DOMContentLoaded", function () {

  /* ====== ROLE & LEADERSHIP UI LOGIC ====== */
  const roleSelect = document.getElementById('role');
  const leadershipSection = document.getElementById('leadershipSection');
  const positionSection = document.getElementById('positionSection');
  const levelSelect = document.getElementById('level');
  const positionSelect = document.getElementById('position');

  const parishPositions = [
    "Parish Coordinator",
    "Parish vice coordinator",
    "Parish Secretary",
    "Parish vice secretary",
    "Parish Treasurer",
    "Parish litergist",
    "Parish vice litergist",
    "Parish organing secretary",
    "Parish games captain",
    "Parish Disciplinarian"
  ];

  const localPositions = [
    "Local Coordinator",
    "Local vice coordinator",
    "Local Secretary",
    "Local vice secretary",
    "Local litergist",
    "Local vice litergist",
    "Local organing secretary",
    "Local games captain",
    "Local Disciplinarian"
  ];

  // Populate leadership positions based on level
  function populatePositions(level) {
    positionSelect.innerHTML = '<option value="">-- Choose Position --</option>';
    const positions = level === 'parish' ? parishPositions :
                      level === 'local' ? localPositions : [];
    positions.forEach(pos => {
      const option = document.createElement('option');
      option.value = pos;
      option.textContent = pos;
      positionSelect.appendChild(option);
    });
    positionSection.style.display = positions.length > 0 ? 'block' : 'none';
  }

  // When role changes
  roleSelect.addEventListener('change', function () {
    if (this.value === 'leader') {
      leadershipSection.style.display = 'block';
      levelSelect.required = true;
      positionSelect.required = true;

      // Set default level if none selected
      if (!levelSelect.value) levelSelect.value = 'parish';
      populatePositions(levelSelect.value);

    } else {
      leadershipSection.style.display = 'none';
      positionSection.style.display = 'none';
      levelSelect.required = false;
      positionSelect.required = false;
    }
  });

  // When leadership level changes
  levelSelect.addEventListener('change', function () {
    populatePositions(this.value);
  });

  /* ====== PHONE NORMALIZATION ====== */
  function normalizePhone(input) {
    let phone = input.trim().replace(/\s+/g, '').replace('+', '');
    if (phone.startsWith('0')) phone = '254' + phone.slice(1);
    if (phone.length === 9 && (phone.startsWith('7') || phone.startsWith('1'))) phone = '254' + phone;
    return phone;
  }

  /* ====== PHONE VALIDATION ====== */
  function isValidKenyanPhone(phone) {
    return /^254(7|1)\d{8}$/.test(phone);
  }

  /* ====== FORM SUBMISSION + DUPLICATE CHECK ====== */
  const form = document.getElementById("registerForm");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const rawPhone = document.getElementById("phone").value;
    const phone = normalizePhone(rawPhone);

    if (!isValidKenyanPhone(phone)) {
      alert("❌ Please enter a valid Kenyan phone number.");
      return;
    }

    try {
      // Check for duplicate phone
      const userRef = doc(db, "registrations", phone);
      const existingUser = await getDoc(userRef);

      if (existingUser.exists()) {
        alert("ℹ️ The system has already registered you.");
        return;
      }

      // Save new registration
      await setDoc(userRef, {
        name: document.getElementById("fullName").value.trim(),
        phone: phone,
        age: document.getElementById("Age").value,
        gender: document.getElementById("Gender").value,
        localChurch: document.getElementById("localChurch").value,
        role: roleSelect.value,
        level: levelSelect.value || "",
        position: positionSelect.value || "",
        createdAt: serverTimestamp()
      });

      alert("✅ Registration successful!");
      form.reset();

      leadershipSection.style.display = 'none';
      positionSection.style.display = 'none';

    } catch (error) {
      console.error(error);
      alert("❌ Error submitting registration. Try again.");
    }
  });
});
