
import { db } from "./firebase.js";
import { doc, setDoc, serverTimestamp } from
  "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", function () {

  // ELEMENTS
  const roleSelect = document.getElementById('role');
  const leadershipSection = document.getElementById('leadershipSection');
  const positionSection = document.getElementById('positionSection');
  const levelSelect = document.getElementById('level');
  const positionSelect = document.getElementById('position');
  const form = document.getElementById("registerForm");

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

  // ROLE CHANGE
  roleSelect.addEventListener('change', function () {
    if (this.value === 'leader') {
      leadershipSection.style.display = 'block';
    } else {
      leadershipSection.style.display = 'none';
      positionSection.style.display = 'none';
    }
  });

  // LEVEL CHANGE
  levelSelect.addEventListener('change', function () {
    positionSelect.innerHTML = '<option value="">-- Choose Position --</option>';

    let positions = this.value === 'parish'
      ? parishPositions
      : this.value === 'local'
      ? localPositions
      : [];

    if (positions.length) {
      positions.forEach(pos => {
        const option = document.createElement('option');
        option.value = pos;
        option.textContent = pos;
        positionSelect.appendChild(option);
      });
      positionSection.style.display = 'block';
    } else {
      positionSection.style.display = 'none';
    }
  });

  // FORM SUBMIT
  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    try {
      const phone = document.getElementById("phone").value.trim();

      await setDoc(doc(db, "registrations", phone), {
        name: document.getElementById("fullName").value.trim(),
        phone,
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
      alert("❌ Error submitting registration.");
    }
  });

});
