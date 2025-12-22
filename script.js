
// -----------------------
  // LEADERSHIP LOGIC 
  // -----------------------
  const roleSelect = document.getElementById('role');
  const leadershipSection = document.getElementById('leadershipSection');
  const positionSection = document.getElementById('positionSection');
  const levelSelect = document.getElementById('level');
  const positionSelect = document.getElementById('position');

  const parishPositions = ["Parish Coordinator", "Parish vice coordinator", "Parish Secretary", "Parish vice secretary", "Parish Treasurer", "Parish litergist", "Parish vice litergist", "Parish organing secretary", "Parish games captain", "Parish Disciplinarian"];
  const localPositions = ["Local Coordinator", "Local vice coordinator", "Local Secretary", "Local vice secretary", "Local litergist", "Local vice litergist", "Local organing secretary", "Local games captain", "Local Disciplinarian"];

  if (roleSelect) {
    roleSelect.addEventListener('change', function() {
      if (this.value === 'leader') {
        leadershipSection.style.display = 'block';
      } else {
        leadershipSection.style.display = 'none';
        positionSection.style.display = 'none';
      }
    });
  }

  if (levelSelect) {
    levelSelect.addEventListener('change', function() {
      positionSelect.innerHTML = '<option value="">-- Choose Position --</option>';

      if (this.value === 'parish') {
        parishPositions.forEach(pos => {
          const option = document.createElement('option');
          option.value = pos;
          option.textContent = pos;
          positionSelect.appendChild(option);
        });
        positionSection.style.display = 'block';
      } else if (this.value === 'local') {
        localPositions.forEach(pos => {
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
  }
});
