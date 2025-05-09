document.addEventListener('DOMContentLoaded', () => {
  const svgContainer = document.querySelector('.floor-plan-container svg');
  if (!svgContainer) {
    console.error('SVG container not found!');
    return;
  }

  // Select all <g> room groups inside #g176-6 or similar wrappers
  const roomGroups = svgContainer.querySelectorAll('g[id^="g"] > g[id^="g"]');

  roomGroups.forEach(roomGroup => {
    // Find the path (room shape) inside each group
    const roomPath = roomGroup.querySelector('path[id^="room"]');

    if (!roomPath) return;

    roomPath.addEventListener('click', (event) => {
      event.stopPropagation();

      const roomId = roomPath.id;
      alert(`You clicked room: ${roomId}`);

      // Find the text element inside the same group
      const label = roomGroup.querySelector('text');

      if (!label) {
        alert('No label found for this room.');
        return;
      }

      const currentText = label.textContent;
      const newLabel = prompt(`Enter a new label for ${roomId}:`, currentText);

      if (newLabel && newLabel.trim() !== '') {
        label.textContent = newLabel.trim();
      }
    });

    // Optional: make it look clickable
    roomPath.style.cursor = 'pointer';
  });
});
