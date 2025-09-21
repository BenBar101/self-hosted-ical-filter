# Self-Hosted iCal Filter

This repository allows you to create a new, filtered version of any public iCal calendar link. It automatically removes events you don't want to see.

The entire process is free, private, and runs on your own GitHub account. The calendar will automatically refresh with new events approximately every hour.

## Setup Instructions

Follow these steps carefully. The entire setup should take less than 5 minutes.

### Step 1: Create Your Repository

Click the green **"Use this template"** button at the top of this page, then select **"Create a new repository"**. This will create a personal copy of this tool under your own GitHub account.

### Step 2: Enable GitHub Pages

1.  In your newly created repository, go to the **"Settings"** tab.
2.  On the left-hand menu, click on **"Pages"**.
3.  Under "Branch," select `main` and click **"Save"**.
4.  Wait about 2-3 minutes for the site to be deployed. You will see a green message saying, "Your site is live at..."

### Step 3: Configure Your Filter

1.  Once your site is live, visit the URL provided by GitHub Pages. It will look like this:
    `https://YOUR-USERNAME.github.io/YOUR-REPOSITORY-NAME/`
2.  Follow the instructions on that page:
    *   Paste your original iCal link.
    *   Click "Fetch Event Types" to see a list of all unique events in your calendar.
    *   Check the boxes next to the events you wish to **hide**.
    *   Click "Generate Configuration File".
3.  You will be taken to a new page on GitHub titled "Create new file". The content will be pre-filled for you. Simply scroll down and click the green **"Commit new file"** button.

### Step 4: Run the Filter for the First Time

1.  Go to the **"Actions"** tab of your repository.
2.  On the left, click on the **"Generate Filtered iCal Feed"** workflow.
3.  You will see a message: "This workflow has a workflow_dispatch event trigger." Click the **"Run workflow"** button on the right.

### Step 5: Get Your New Calendar Link!

1.  After the action has finished running (the icon next to it will turn into a green checkmark), go back to the **"Code"** tab of your repository.
2.  You will now see a new file named `filtered-calendar.ics`.
3.  Click on this file, and then click the **"Raw"** button.
4.  Copy the URL from your browser's address bar. **This is your new, filtered calendar link.**

You can now subscribe to this link in any calendar app (Google Calendar, Apple Calendar, etc.). It will automatically update with new events about once an hour.
