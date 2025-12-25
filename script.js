
import { db, doc, setDoc, getDoc, serverTimestamp } from "./firebase.js";

console.log("Leadership script loaded");

document.addEventListener("DOMContentLoaded", function () {

  const form = document.getElementById("registerForm");
  const roleSelect = document.getElementById('role');
  const leadershipSection = document.getElementById('leadershipSection');
  const positionSection = document.getElementById('positionSection');
  const levelSelect = document.getElementById('level');
  const positionSelect = document.getElementById('position');

  const parishPositions = [
    "Parish Coordinator", "Parish vice coordinator",
    "Parish Secretary", "Parish vice secretary",
    "Parish Treasurer", "Parish liturgist",
    "Parish vice liturgist", "Parish organizing secretary",
    "Parish games captain", "Parish Disciplinarian"
  ];

  const localPositions = [
    "Local Coordinator", "Local vice coordinator",
    "Local Secretary", "Local vice secretary",
    "Local liturgist", "Local vice liturgist",
    "Local organizing secretary", "Local games captain",
    "Local Disciplinarian"
  ];

  if (leadershipSection) leadershipSection.style.display = 'none';
  if (positionSection) positionSection.style.display = 'none';

  if (roleSelect) {
    roleSelect.addEventListener('change', function () {
      if (this.value.toLowerCase() === 'leader') {
        if (leadershipSection) leadershipSection.style.display = 'block';
      } else {
        if (leadershipSection) leadershipSection.style.display = 'none';
        if (positionSection) positionSection.style.display = 'none';
      }
    });
  }

  if (levelSelect) {
    levelSelect.addEventListener('change', function () {
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

      if (positionSection) positionSection.style.display = positions.length ? 'block' : 'none';
    });
  }

  if (form) {
    form.addEventListener("submit", async function (e) {
      e.preventDefault();

      const phone = document.getElementById("phone").value.trim();
      const userRef = doc(db, "registrations", phone);

      try {
        // Check if user already exists
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          alert("❌ Sorry, you are already registered!");
          return; // stop submission
        }

        // Create new registration
        await setDoc(userRef, {
          name: document.getElementById("fullName").value.trim(),
          phone,
          age: document.getElementById("Age").value,
          gender: document.getElementById("Gender").value,
          localChurch: document.getElementById("localChurch").value,
          role: roleSelect ? roleSelect.value : "",
          level: levelSelect ? levelSelect.value || "" : "",
          position: positionSelect ? positionSelect.value || "" : "",
          createdAt: serverTimestamp()
        });

        alert("✅ Registration successful!");
        form.reset();
        if (leadershipSection) leadershipSection.style.display = 'none';
        if (positionSection) positionSection.style.display = 'none';

      } catch (error) {
        console.error("Firestore error:", error);
        alert("❌ Error submitting registration.");
      }
    });
  }

});
