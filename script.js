// script.js (Hybrid Logic)

window.onload = function() {
    // Attach event listeners
    document.getElementById('fetchEventsBtn').addEventListener('click', fetchEvents);
    document.getElementById('generateConfigBtn').addEventListener('click', generateFinalConfig);

    // Determine which phase to show
    checkConfigurationState();
};

function getRepoInfo() {
    const user = document.getElementById('githubUser').value.trim();
    const repo = document.getElementById('githubRepo').value.trim();
    if (!user || !repo) {
        alert("Please enter your GitHub Username and Repository Name first.");
        return null;
    }
    return { user, repo };
}

// PHASE 1: Kicks off the backend event fetching process
function fetchEvents() {
    const repoInfo = getRepoInfo();
    if (!repoInfo) return;

    const icalUrl = document.getElementById('icalUrlInput').value.trim();
    if (!icalUrl) {
        alert("Please enter your iCal URL.");
        return;
    }

    const tempConfig = { user: repoInfo.user, repo: repoInfo.repo, icalUrl: icalUrl };
    const content = JSON.stringify(tempConfig, null, 2);
    redirectToGitHubCreateFile(repoInfo, 'temp-config.json', content, "Phase 1: Save iCal link for event fetching");
}

// PHASE 2: Saves the final configuration based on user's choices
function generateFinalConfig() {
    const repoInfo = getRepoInfo(); // The inputs will be read-only but still have the values
    if (!repoInfo) return;

    const icalUrl = document.getElementById('icalUrlInput').value;
    const checkedBoxes = document.querySelectorAll('#event-list input[type="checkbox"]:checked');
    const filters = Array.from(checkedBoxes).map(cb => cb.value);

    const finalConfig = { icalUrl: icalUrl, filtersToHide: filters };
    const content = JSON.stringify(finalConfig, null, 2);
    redirectToGitHubCreateFile(repoInfo, 'config.json', content, "Phase 2: Save final calendar filters");
}

// Checks if the backend process has finished and shows the correct UI
async function checkConfigurationState() {
    const phase1Div = document.getElementById('phase1');
    const phase2Div = document.getElementById('phase2');

    try {
        const response = await fetch(`event-types.json?v=${new Date().getTime()}`);
        if (!response.ok) {
            // We are in Phase 1
            phase1Div.style.display = 'block';
            phase2Div.style.display = 'none';
            return;
        }

        // We are in Phase 2
        const data = await response.json();

        // Populate and lock the input fields
        document.getElementById('githubUser').value = data.user;
        document.getElementById('githubUser').readOnly = true;
        document.getElementById('githubRepo').value = data.repo;
        document.getElementById('githubRepo').readOnly = true;
        document.getElementById('icalUrlInput').value = data.icalUrl;
        document.getElementById('icalUrlInput').readOnly = true;
        
        // Display the event checklist
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

        // Show Phase 2 UI
        phase1Div.style.display = 'none';
        phase2Div.style.display = 'block';

    } catch (e) {
        // Default to Phase 1 on any error
        phase1Div.style.display = 'block';
        phase2Div.style.display = 'none';
    }
}

function redirectToGitHubCreateFile(repoInfo, filename, content, message) {
    const githubRepoUrl = `https://github.com/${repoInfo.user}/${repoInfo.repo}`;
    const encodedContent = encodeURIComponent(content);
    const encodedMessage = encodeURIComponent(message);
    const newFileUrl = `${githubRepoUrl}/new/main?filename=${filename}&value=${encodedContent}&message=${encodedMessage}`;
    window.location.href = newFileUrl;
}
