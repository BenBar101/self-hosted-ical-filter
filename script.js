// script.js (Final, Robust Version)

window.onload = function() {
    try {
        // --- Get references to all HTML elements ---
        const phase1Div = document.getElementById('phase1');
        const phase2Div = document.getElementById('phase2');
        const icalUrlInput = document.getElementById('icalUrlInput');
        const saveLinkBtn = document.getElementById('saveLinkBtn');
        const eventListDiv = document.getElementById('event-list');
        const saveFilterBtn = document.getElementById('saveFilterBtn');

        if (!saveLinkBtn || !saveFilterBtn) {
            alert("CRITICAL ERROR: The script could not find the page's buttons. Check for typos in the id attributes of the index.html file.");
            return;
        }

        saveLinkBtn.addEventListener('click', saveLinkAndFetch);
        saveFilterBtn.addEventListener('click', saveFinalFilter);

        checkConfigurationState();

    } catch (e) {
        alert("An unexpected error occurred. Please check the Developer Console (F12). Error: " + e.message);
    }
};

function getRepoInfo() {
    const user = document.getElementById('githubUser').value;
    const repo = document.getElementById('githubRepo').value;
    if (!user || !repo) {
        alert("Please enter your GitHub Username and Repository Name first.");
        return null;
    }
    return { user, repo };
}

function saveLinkAndFetch() {
    const repoInfo = getRepoInfo();
    if (!repoInfo) return;

    const icalUrl = document.getElementById('icalUrlInput').value;
    if (!icalUrl) {
        alert("Please enter your iCal URL.");
        return;
    }

    const tempConfig = { user: repoInfo.user, repo: repoInfo.repo, icalUrl: icalUrl };
    const content = JSON.stringify(tempConfig, null, 2);
    redirectToGitHubCreateFile(repoInfo, 'temp-config.json', content, "Phase 1: Save iCal link");
}

function saveFinalFilter() {
    const repoInfo = getRepoInfo();
    if (!repoInfo) return;

    const icalUrl = document.getElementById('icalUrlInput').value;
    const checkedBoxes = document.querySelectorAll('#event-list input[type="checkbox"]:checked');
    const filters = Array.from(checkedBoxes).map(cb => cb.value);
    
    const finalConfig = { icalUrl: icalUrl, filtersToHide: filters };
    const content = JSON.stringify(finalConfig, null, 2);
    redirectToGitHubCreateFile(repoInfo, 'config.json', content, "Phase 2: Save final filters");
}

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
        document.getElementById('githubUser').value = data.user;
        document.getElementById('githubRepo').value = data.repo;
        document.getElementById('icalUrlInput').value = data.icalUrl;

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

function redirectToGitHubCreateFile(repoInfo, filename, content, message) {
    const githubRepoUrl = `https://github.com/${repoInfo.user}/${repoInfo.repo}`;
    const encodedContent = encodeURIComponent(content);
    const encodedMessage = encodeURIComponent(message);
    const newFileUrl = `${githubRepoUrl}/new/main?filename=${filename}&value=${encodedContent}&message=${encodedMessage}`;
    window.location.href = newFileUrl;
}
