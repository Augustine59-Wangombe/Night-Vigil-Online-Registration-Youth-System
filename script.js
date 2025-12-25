
import { db } from "./firebase.js";
import { doc, setDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", function () {

  // ----- ROLE & LEADERSHIP LOGIC -----
  const roleSelect = document.getElementById('role');
  const leadershipSection = document.getElementById('leadershipSection');
  const levelSelect = document.getElementById('level');
  const positionSelect = document.getElementById('position');

  const parishPositions = [
    "Parish Coordinator",
    "Parish Vice Coordinator",
    "Parish Secretary",
    "Parish Vice Secretary",
    "Parish Treasurer",
    "Parish Liturgist",
    "Parish Vice Liturgist",
    "Parish Organizing Secretary",
    "Parish Games Captain",
    "Parish Disciplinarian"
  ];

  const localPositions = [
    "Local Coordinator",
    "Local Vice Coordinator",
    "Local Secretary",
    "Local Vice Secretary",
    "Local Liturgist",
    "Local Vice Liturgist",
    "Local Organizing Secretary",
    "Local Games Captain",
    "Local Disciplinarian"
  ];

  function populatePositions(level) {
    positionSelect.innerHTML = '<option value="">-- Choose Position --</option>';
    let positions = [];
    if (level === 'parish') positions = parishPositions;
    else if (level === 'local') positions = localPositions;

    positions.forEach(pos => {
      const option = document.createElement('option');
      option.value = pos;
      option.textContent = pos;
      positionSelect.appendChild(option);
    });

    // Show or hide position select
    positionSelect.style.display = positions.length > 0 ? 'block' : 'none';
  }

  // Show leadership section when role is "Leader"
  roleSelect.addEventListener('change', function () {
    if (this.value === 'leader') {
      leadershipSection.style.display = 'block';
      levelSelect.required = true;
      positionSelect.required = true;

      // Default to parish if nothing selected
      const currentLevel = levelSelect.value || 'parish';
      levelSelect.value = currentLevel;
      populatePositions(currentLevel);
    } else {
      leadershipSection.style.display = 'none';
      levelSelect.required = false;
      positionSelect.required = false;
    }
  });

  // Update positions when level changes
  levelSelect.addEventListener('change', function () {
    populatePositions(this.value);
  });

  // ----- FORM SUBMISSION -----
  const form = document.getElementById("registerForm");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    try {
      const phone = document.getElementById("phone").value.trim();
      const userRef = doc(db, "registrations", phone);

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
      positionSelect.style.display = 'block';
    } catch (error) {
      console.error(error);
      alert("❌ Error submitting registration. Try again.");
    }
  });

});
