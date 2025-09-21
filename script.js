const icalUrlInput = document.getElementById('icalUrl');
const fetchBtn = document.getElementById('fetchBtn');
const errorMsg = document.getElementById('error');
const filterSection = document.getElementById('filter-section');
const eventListDiv = document.getElementById('event-list');
const generateSection = document.getElementById('generate-section');
const generateBtn = document.getElementById('generateBtn');

let uniqueEvents = new Set();

async function fetchEvents() {
    const url = icalUrlInput.value;
    if (!url) {
        showError("Please enter a valid iCal URL.");
        return;
    }

    // A simple CORS proxy to prevent fetch errors
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    fetchBtn.textContent = "Fetching...";
    fetchBtn.disabled = true;
    errorMsg.classList.add('hidden');

    try {
        const response = await fetch(proxyUrl + url);
        if (!response.ok) {
            throw new Error(`Failed to fetch calendar. Status: ${response.status}`);
        }
        const data = await response.text();
        parseIcalData(data);
        displayEvents();
    } catch (e) {
        showError(`Could not fetch calendar. Please ensure the link is correct and publicly accessible. Error: ${e.message}`);
    } finally {
        fetchBtn.textContent = "Fetch Event Types";
        fetchBtn.disabled = false;
    }
}

function parseIcalData(data) {
    uniqueEvents.clear();
    const lines = data.split('\n');
    for (const line of lines) {
        if (line.startsWith('SUMMARY:')) {
            const summary = line.substring(8).trim();
            if (summary) {
                uniqueEvents.add(summary);
            }
        }
    }
}

function displayEvents() {
    eventListDiv.innerHTML = '';
    if (uniqueEvents.size === 0) {
        eventListDiv.innerHTML = '<p>No events found in this calendar.</p>';
    } else {
        // Sort events alphabetically
        const sortedEvents = [...uniqueEvents].sort((a, b) => a.localeCompare(b));
        
        for (const event of sortedEvents) {
            const label = document.createElement('label');
            label.className = 'event-item';
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.value = event;
            label.appendChild(checkbox);
            label.appendChild(document.createTextNode(` ${event}`));
            eventListDiv.appendChild(label);
        }
    }
    filterSection.classList.remove('hidden');
    generateSection.classList.remove('hidden');
}

function generateConfigFile() {
    const icalUrl = icalUrlInput.value;
    const checkedBoxes = eventListDiv.querySelectorAll('input[type="checkbox"]:checked');
    const filters = Array.from(checkedBoxes).map(cb => cb.value);

    const config = {
        icalUrl: icalUrl,
        filtersToHide: filters
    };
    const configContent = JSON.stringify(config, null, 2);

    // Get the current repository URL path (e.g., "/Your-Username/Your-Repo/")
    const repoPath = window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/') + 1);
    const githubRepoUrl = `https://github.com${repoPath}`;
    
    const filename = 'config.json';
    const encodedContent = encodeURIComponent(configContent);
    const newFileUrl = `${githubRepoUrl}new/main?filename=${filename}&value=${encodedContent}&message=Create calendar configuration`;

    // Redirect the user to create the file
    window.location.href = newFileUrl;
}

function showError(message) {
    errorMsg.textContent = message;
    errorMsg.classList.remove('hidden');
    filterSection.classList.add('hidden');
    generateSection.classList.add('hidden');
}
