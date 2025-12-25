

console.log("Leadership script loaded");
document.addEventListener("DOMContentLoaded", function () {



  const form = document.getElementById("registerForm");
  const roleSelect = document.getElementById('role');
  const leadershipSection = document.getElementById('leadershipSection');
  const positionSection = document.getElementById('positionSection');
  const levelSelect = document.getElementById('level');
  const positionSelect = document.getElementById('position');

  // Hide sections on load
  if (leadershipSection) leadershipSection.style.display = 'none';
  if (positionSection) positionSection.style.display = 'none';

  // Role change listener
  if (roleSelect) {
    roleSelect.addEventListener('change', function () {
      if (this.value.toLowerCase() === 'leader') {
        leadershipSection.style.display = 'block';
      } else {
        leadershipSection.style.display = 'none';
        positionSection.style.display = 'none';
      }
    });
  }

  // Level change listener
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
      positionSection.style.display = positions.length ? 'block' : 'none';
    });
  }

  // Form submission (Firestore logic unchanged)
  if (form) {
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
