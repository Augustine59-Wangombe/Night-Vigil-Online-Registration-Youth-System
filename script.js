
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

  /* ====== ROLE & LEADERSHIP UI LOGIC (YOUR ORIGINAL CODE) ====== */

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

  roleSelect?.addEventListener('change', function () {
    if (this.value === 'leader') {
      leadershipSection.style.display = 'block';
      levelSelect.required = true;
      positionSelect.required = true;
    } else {
      leadershipSection.style.display = 'none';
      positionSection.style.display = 'none';
      levelSelect.required = false;
      positionSelect.required = false;
    }
  });

  levelSelect?.addEventListener('change', function () {
    positionSelect.innerHTML = '<option value="">-- Choose Position --</option>';

    const positions =
      this.value === 'parish' ? parishPositions :
      this.value === 'local' ? localPositions : [];

    positions.forEach(pos => {
      const option = document.createElement('option');
      option.value = pos;
      option.textContent = pos;
      positionSelect.appendChild(option);
    });

    positionSection.style.display = positions.length > 0 ? 'block' : 'none';
  });

  /* ====== PHONE NORMALIZATION ====== */
  function normalizePhone(input) {
    let phone = input.trim().replace(/\s+/g, '').replace('+', '');

    if (phone.startsWith('0')) {
      phone = '254' + phone.slice(1);
    }

    if (phone.length === 9 && (phone.startsWith('7') || phone.startsWith('1'))) {
      phone = '254' + phone;
    }

    return phone;
  }

  /* ====== OPTIONAL PHONE VALIDATION ====== */
  function isValidKenyanPhone(phone) {
    return /^254(7|1)\d{8}$/.test(phone);
  }

  /* ====== FORM SUBMISSION + DUPLICATE CHECK ====== */

  const form = document.getElementById("registrationForm");

  form?.addEventListener("submit", async function (e) {
    e.preventDefault();

    const rawPhone = document.getElementById("phone").value;
    const phone = normalizePhone(rawPhone);

    if (!isValidKenyanPhone(phone)) {
      alert("❌ Please enter a valid Kenyan phone number.");
      return;
    }

    try {
      // 🔐 CHECK FOR DUPLICATE PHONE
      const userRef = doc(db, "registrations", phone);
      const existingUser = await getDoc(userRef);

      if (existingUser.exists()) {
        alert("❌ This phone number is already registered.");
        return;
      }

      // ✅ SAVE NEW REGISTRATION
      await setDoc(userRef, {
        name: document.getElementById("name").value.trim(),
        phone: phone,
        age: document.getElementById("age").value,
        gender: document.getElementById("gender").value,
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
