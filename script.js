document.addEventListener("DOMContentLoaded", function () {

  const roleSelect = document.getElementById('role');
  const leadershipSection = document.getElementById('leadershipSection');
  const positionSection = document.getElementById('positionSection');
  const levelSelect = document.getElementById('level');
  const positionSelect = document.getElementById('position');

  const parishPositions = ["Parish Coordinator", "Parish vice coordinator", "Parish Secretary", "Parish vice secretary", "Parish Treasurer", "Parish litergist", "Parish vice litergist", "Parish organing secretary", "Parish games captain", "Parish Disciplinarian"];
  const localPositions = ["Local Coordinator", "Local vice coordinator", "Local Secretary", "Local vice secretary", "Local litergist", "Local vice litergist", "Local organing secretary", "Local games captain", "Local Disciplinarian"];

  roleSelect?.addEventListener('change', function() {
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

  levelSelect?.addEventListener('change', function() {
    positionSelect.innerHTML = '<option value="">-- Choose Position --</option>';
    const positions = this.value === 'parish' ? parishPositions :
                      this.value === 'local' ? localPositions : [];
    positions.forEach(pos => {
      const option = document.createElement('option');
      option.value = pos;
      option.textContent = pos;
      positionSelect.appendChild(option);
    });
    positionSection.style.display = positions.length > 0 ? 'block' : 'none';
  });

});
