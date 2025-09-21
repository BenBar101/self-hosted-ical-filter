// script.js (Bulletproof Version)

// Use window.onload, which is the safest way to ensure EVERYTHING is loaded
// before the script runs.
window.onload = function() {
    try {
        // --- Get references to all HTML elements ---
        const phase1Div = document.getElementById('phase1');
        const phase2Div = document.getElementById('phase2');
        const icalUrlInput = document.getElementById('icalUrlInput');
        const saveLinkBtn = document.getElementById('saveLinkBtn');
        const eventListDiv = document.getElementById('event-list');
        const saveFilterBtn = document.getElementById('saveFilterBtn');

        // --- CRITICAL CHECK: Verify that the buttons actually exist ---
        if (!saveLinkBtn || !saveFilterBtn) {
            alert("CRITICAL ERROR: The script could not find the page's buttons. This is likely due to a typo in an 'id' attribute in the index.html file. Please double-check that you have buttons with id='saveLinkBtn' and id='saveFilterBtn'.");
            return; // Stop the script if the page is broken
        }

        // --- Attach functions to buttons ---
        saveLinkBtn.addEventListener('click', saveLinkAndFetch);
        saveFilterBtn.addEventListener('click', saveFinalFilter);

        // --- Run the initial check to set up the page correctly ---
        checkConfigurationState();

    } catch (e) {
        // If any other unexpected error happens, show it to the user.
        alert("An unexpected error occurred. Please check the Developer Console (F12) for details. Error message: " + e.message);
    }
};

// --- Function to handle PHASE 1: Saving the Link ---
function saveLinkAndFetch() {
    const icalUrl = document.getElementById('icalUrlInput').value;
    if (!icalUrl) {
        alert("Please enter your iCal URL.");
        return;
    }
    const tempConfig = { icalUrl: icalUrl };
    const content = JSON.stringify(tempConfig, null, 2);
    redirectToGitHubCreateFile('temp-config.json', content, "Phase 1: Save iCal link for event fetching");
}

// --- Function to handle PHASE 2: Saving the Final Filter ---
function saveFinalFilter() {
    // The icalUrlInput is visually part of phase1, but we need its value here
    const icalUrl = document.getElementById('icalUrlInput').value;
    const checkedBoxes = document.querySelectorAll('#event-list input[type="checkbox"]:checked');
    const filters = Array.from(checkedBoxes).map(cb => cb.value);
    const finalConfig = { icalUrl: icalUrl, filtersToHide: filters };
    const content = JSON.stringify(finalConfig, null, 2);
    redirectToGitHubCreateFile('config.json', content, "Phase 2: Save final calendar filters");
}

// --- Function to check if we're in Phase 1 or Phase 2 ---
async function checkConfigurationState() {
    try {
        const response = await fetch(`event-types.json?v=${new Date().getTime()}`);
        if (!response.ok) {
            document.getElementById('phase1').style.display = 'block';
            document.getElementById('phase2').style.display = 'none';
            return;
        }
        const data = await response.json();
        
        // Populate the UI for Phase 2
        document.getElementById('icalUrlInput').value = data.icalUrl;
        document.getElementById('icalUrlInput').readOnly = true; // Lock the input

        const eventListDiv = document.getElementById('event-list');
        eventListDiv.innerHTML = '';
        data.eventTypes.forEach(event => {
            const label = document.createElement('label');
            label.className = 'event-item';
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.value = event;
            label.appendChild(checkbox);
            label.appendChild(document.createTextNode(` ${event}`));
            eventListDiv.appendChild(label);
        });

        document.getElementById('phase1').style.display = 'none';
        document.getElementById('phase2').style.display = 'block';
    } catch (e) {
        document.getElementById('phase1').style.display = 'block';
        document.getElementById('phase2').style.display = 'none';
    }
}

// --- Helper function to build the GitHub URL and redirect ---
function redirectToGitHubCreateFile(filename, content, message) {
    const repoPath = window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/') + 1);
    const githubRepoUrl = `https://github.com${repoPath}`;
    const encodedContent = encodeURIComponent(content);
    const encodedMessage = encodeURIComponent(message);
    const newFileUrl = `${githubRepoUrl}new/main?filename=${filename}&value=${encodedContent}&message=${encodedMessage}`;
    window.location.href = newFileUrl;
}
