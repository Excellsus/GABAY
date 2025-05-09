// javascript/panZoomOnly.js

document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM Loaded. Initializing SVG Pan & Zoom and Click Events...");

    const svg = document.getElementById('svg1');
    // --- Select the room paths again ---
    const rooms = svg ? svg.querySelectorAll('path[id^="room"]') : [];

    // --- Basic Checks ---
    if (!svg) {
        console.error("SVG container (#svg1) not found!");
        return; // Stop script execution if SVG is missing
    } else {
        console.log("SVG container (#svg1) found.");
    }

    if (rooms.length === 0) {
         console.warn("No room paths found with selector 'path[id^=\"room\"]'. Check path IDs in the SVG.");
    } else {
         console.log(`Found ${rooms.length} room paths.`);
    }
    // --- End Basic Checks ---


    // --- Add Click Listener to Rooms ---
    if (rooms.length > 0) {
        rooms.forEach(room => {
            // Add the 'click' event listener to each room path
            room.addEventListener('click', (event) => {
                // Optional: If clicking interferes with panning unexpectedly,
                // you might uncomment the next line. Usually not needed for simple clicks.
                // event.stopPropagation();

                const clickedRoomId = room.id; // Get the ID of the clicked room
                console.log('Clicked on:', clickedRoomId); // Log to console for debugging

                // Display the alert
                alert(`You clicked on ${clickedRoomId}`);
            });

            // Optional: Add a simple cursor style to indicate rooms are clickable
            room.style.cursor = 'pointer';
        });
        console.log("Click listeners added to rooms.");
    }
    // --- End Click Listener Setup ---


    // --- Initialize svg-pan-zoom ---
    if (typeof svgPanZoom === 'function') {
        console.log("Initializing svg-pan-zoom...");
        try {
            const panZoomInstance = svgPanZoom('#svg1', {
                zoomEnabled: true,          // Enable zooming
                controlIconsEnabled: true,  // Show +/- zoom buttons
                fit: true,                // Fit SVG to container on load
                center: true,             // Center SVG in container on load
                panEnabled: true,         // Allow panning
                minZoom: 0.5,             // Minimum zoom level
                maxZoom: 10,              // Maximum zoom level
                preventMouseEventsDefault: false, // Allow mouse events to propagate
                beforePan: function(oldPan, newPan) {
                    // Check if we're in edit mode and dragging
                    const editButton = document.getElementById('edit-floorplan-btn');
                    const isEditMode = editButton && editButton.textContent === 'Save';
                    if (isEditMode) {
                        return false; // Prevent panning in edit mode
                    }
                    return newPan;
                }
            });
            
            // Store the panZoom instance globally
            window.panZoom = panZoomInstance;
            
            console.log("svg-pan-zoom initialized successfully.");

            // Make the pan/zoom instance responsive to window resizing
            window.addEventListener('resize', () => {
                console.log("Window resized, adjusting SVG pan/zoom.");
                panZoomInstance.resize(); // Recalculate SVG size
                panZoomInstance.fit();    // Re-fit SVG to the new container size
                panZoomInstance.center(); // Re-center SVG
            });

        } catch (e) {
            console.error("Error initializing svg-pan-zoom:", e);
        }
    } else {
        console.warn("svg-pan-zoom library not found or loaded. Make sure the script tag for svg-pan-zoom.min.js is included BEFORE this file in the HTML.");
    }

    console.log("SVG Pan & Zoom and Click Events script finished initialization.");
});
