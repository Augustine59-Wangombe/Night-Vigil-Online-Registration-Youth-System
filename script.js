
import { db, doc, setDoc, serverTimestamp } from "./firebase.js";

console.log("Leadership script loaded");

document.addEventListener("DOMContentLoaded", () => {

  // 🚫 GLOBAL GUARD — prevents double execution
  if (window.__registerFormBound) return;
  window.__registerFormBound = true;

  // ELEMENTS
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

  // HIDE SECTIONS
  leadershipSection.style.display = 'none';
  positionSection.style.display = 'none';

  // ROLE CHANGE
  roleSelect.addEventListener('change', function () {
    if (this.value.toLowerCase() === 'leader') {
      leadershipSection.style.display = 'block';
    } else {
      leadershipSection.style.display = 'none';
      positionSection.style.display = 'none';
    }
  });

  // LEVEL CHANGE
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

    positionSection.style.display = positions.length ? 'block' : 'none';
  });

  // 🚀 SUBMIT (guaranteed once)
  let isSubmitting = false;

form.onsubmit = async (e) => {
  e.preventDefault();

  if (isSubmitting) return;
  isSubmitting = true;

  try {
    const phone = document.getElementById("phone").value.trim();
    const userRef = doc(db, "registrations", phone);

    await setDoc(userRef, {
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

  } catch (err) {
    console.error("Firestore error:", err);
  } finally {
    isSubmitting = false;
  }
};
