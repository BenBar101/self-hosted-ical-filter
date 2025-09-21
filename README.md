# Self-Hosted iCal Filter

This repository creates a filtered version of any iCal calendar link, running for free on your own GitHub account. The calendar automatically refreshes approximately every hour.

## Setup Instructions

The entire setup is done through a guided web page.

### Step 1: Create Your Repository & Enable Pages

1.  Click the green **"Use this template"** button -> **"Create a new repository"**.
2.  In your new repository, go to **Settings > Pages**.
3.  Under "Branch," select `main` and click **"Save"**.
4.  Wait 2-3 minutes for the site to deploy. You will see a green message: "Your site is live at..."

### Step 2: Configure Your Calendar

1.  Visit your live site URL from the step above. It will look like:
    `https://YOUR-USERNAME.github.io/YOUR-REPOSITORY-NAME/`
2.  Follow the simple two-step process on that page:
    a. Fill in your GitHub username, repository name, and your private iCal link, then click **"Fetch My Events"**. You will be redirected to GitHub to save a temporary file.
    b. After saving, go back to your configurator page and **refresh it after a minute**. The page will automatically show you a checklist of all your event types.
    c. Select which events to hide and click **"Generate Final Configuration"**. You'll be redirected to GitHub one last time to save the final file.

### Step 3: Get Your New Calendar Link

1.  After completing the setup, a main filter process will run.
2.  Go to the **"Code"** tab of your repository. After a minute or two, a file named `filtered-calendar.ics` will appear.
3.  Click on this file, then click the **"Raw"** button.
4.  Copy the URL from your browser's address bar. **This is your new, filtered calendar link.**
