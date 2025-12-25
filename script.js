
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

  roleSelect?.addEventListener('change', function () {
    if (this.value === 'leader') {
      leadershipSection.style.display = 'block';
      levelSelect.required = true;
      positionSelect.required = true;

      // If no level selected, default to Parish
      if (!levelSelect.value) levelSelect.value = 'parish';
      populatePositions(levelSelect.value);

    } else {
      leadershipSection.style.display = 'none';
      positionSection.style.display = 'none';
      levelSelect.required = false;
      positionSelect.required = false;
    }
  });

  levelSelect?.addEventListener('change', function () {
    populatePositions(this.value);
  });

  /* ====== FORM SUBMISSION ====== */
  const form = document.getElementById("registerForm");

  form?.addEventListener("submit", async function (e) {
    e.preventDefault();

    try {
      const userRef = doc(db, "registrations", document.getElementById("phone").value.trim());

      await setDoc(userRef, {
        name: document.getElementById("fullName").value.trim(),
        phone: document.getElementById("phone").value.trim(),
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
