# Self-Hosted iCal Filter

This repository creates a filtered version of any iCal calendar link, running for free on your own GitHub account. The calendar automatically refreshes approximately every hour.

## Setup Instructions (The Simple Way)

The entire setup is done through a guided web page.

### Step 1: Create Your Repository & Enable Pages

1.  Click the green **"Use this template"** button -> **"Create a new repository"**.
2.  In your new repository, go to **Settings > Pages**.
3.  Under "Branch," select `main` and click **"Save"**.
4.  Wait 2-3 minutes for the site to deploy. You will see a green message: "Your site is live at..."

### Step 2: Configure Your Calendar

1.  Visit your live site URL from the step above. It will look like:
    `https://YOUR-USERNAME.github.io/YOUR-REPOSITORY-NAME/`
2.  Follow the simple two-phase process on that page. You will be guided to:
    a. Save your iCal link.
    b. Wait a minute and refresh the page to see your event types automatically appear.
    c. Select which events to hide and save your final filter.

### Step 3: Get Your New Calendar Link

1.  After completing the setup, a main filter process will run automatically.
2.  Go to the **"Code"** tab of your repository. After a minute or two, a file named `filtered-calendar.ics` will appear.
3.  Click on this file, then click the **"Raw"** button.
4.  Copy the URL from your browser's address bar. **This is your new, filtered calendar link.**

You can now subscribe to this link in any calendar app. It's fully automated!
