
import { db } from "./firebase.js";
import { doc, getDoc, setDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("registerForm");
  const roleSelect = document.getElementById('role');
  const leadershipSection = document.getElementById('leadershipSection');
  const positionSection = document.getElementById('positionSection');
  const levelSelect = document.getElementById('level');
  const positionSelect = document.getElementById('position');
  const phoneError = document.getElementById('phoneError');

  const parishPositions = [
    "Parish Coordinator", "Parish vice coordinator", "Parish Secretary",
    "Parish vice secretary", "Parish Treasurer", "Parish litergist",
    "Parish vice litergist", "Parish organing secretary", "Parish games captain",
    "Parish Disciplinarian"
  ];

  const localPositions = [
    "Local Coordinator", "Local vice coordinator", "Local Secretary",
    "Local vice secretary", "Local litergist", "Local vice litergist",
    "Local organing secretary", "Local games captain", "Local Disciplinarian"
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

      // Show positions if a level is already selected
      if (levelSelect.value) populatePositions(levelSelect.value);
      else positionSection.style.display = 'none';
    } else {
      leadershipSection.style.display = 'none';
      positionSection.style.display = 'none';
      levelSelect.required = false;
      positionSelect.required = false;
    }
  });

  levelSelect?.addEventListener('change', function () {
    if (this.value) populatePositions(this.value);
    else positionSection.style.display = 'none';
  });

  function normalizePhone(input) {
    let phone = input.trim().replace(/\s+/g, '').replace('+', '');
    if (phone.startsWith('0')) phone = '254' + phone.slice(1);
    if (phone.length === 9 && (phone.startsWith('7') || phone.startsWith('1'))) phone = '254' + phone;
    return phone;
  }

  function isValidKenyanPhone(phone) {
    return /^254(7|1)\d{8}$/.test(phone);
  }

  form?.addEventListener("submit", async function (e) {
    e.preventDefault();
    phoneError.textContent = ""; // Clear previous error

    const rawPhone = document.getElementById("phone").value;
    const phone = normalizePhone(rawPhone);

    if (!isValidKenyanPhone(phone)) {
      phoneError.textContent = "❌ Please enter a valid Kenyan phone number.";
      return;
    }

    try {
      const userRef = doc(db, "registrations", phone);
      const existingUser = await getDoc(userRef);

      if (existingUser.exists()) {
        phoneError.textContent = "ℹ️ The system has already registered you.";
        return;
      }

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
      phoneError.textContent = "❌ Error submitting registration. Try again.";
    }
  });
});
