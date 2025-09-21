// script.js (Ultra-Reliable Version)

window.onload = function() {
    const generateBtn = document.getElementById('generateBtn');

    if (generateBtn) {
        generateBtn.addEventListener('click', generateConfigFile);
    } else {
        alert("CRITICAL ERROR: Could not find the 'generateBtn' button on the page.");
    }
};

function generateConfigFile() {
    // 1. Read all values from the form
    const user = document.getElementById('githubUser').value;
    const repo = document.getElementById('githubRepo').value;
    const icalUrl = document.getElementById('icalUrlInput').value;
    const filtersText = document.getElementById('filtersText').value;

    // 2. Validate the input
    if (!user || !repo || !icalUrl) {
        alert("Please fill out your Username, Repository Name, and iCal Link.");
        return;
    }

    // 3. Prepare the configuration object
    const filters = filtersText.split('\n').map(line => line.trim()).filter(line => line); // Split by new line, trim whitespace, remove empty lines
    
    const finalConfig = {
        icalUrl: icalUrl,
        filtersToHide: filters
    };
    
    const content = JSON.stringify(finalConfig, null, 2);

    // 4. Build the 100% correct URL
    const githubRepoUrl = `https://github.com/${user}/${repo}`;
    const filename = 'config.json';
    const encodedContent = encodeURIComponent(content);
    const message = encodeURIComponent("Create calendar configuration");

    const newFileUrl = `${githubRepoUrl}/new/main?filename=${filename}&value=${encodedContent}&message=${message}`;

    // 5. Redirect the user
    window.location.href = newFileUrl;
}
