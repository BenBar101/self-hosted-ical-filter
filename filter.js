const fs = require('fs/promises');
const ical = require('node-ical');
const { IcalObject } = require('node-ical');

async function main() {
    try {
        console.log("Reading configuration...");
        const configData = await fs.readFile('config.json', 'utf8');
        const config = JSON.parse(configData);

        if (!config.icalUrl || !config.filtersToHide) {
            throw new Error("Invalid config.json format.");
        }

        const filters = new Set(config.filtersToHide);
        console.log(`Fetching calendar from: ${config.icalUrl}`);
        console.log(`Filtering out ${filters.size} event types.`);

        const events = await ical.async.fromURL(config.icalUrl);
        const newCal = new IcalObject();
        newCal.header = events.header; // Copy original calendar headers

        for (const event of Object.values(events)) {
            if (event.type === 'VEVENT') {
                if (!filters.has(event.summary)) {
                    newCal.push(event);
                }
            }
        }

        const newIcalString = newCal.toString();
        await fs.writeFile('filtered-calendar.ics', newIcalString);
        console.log("Successfully generated filtered-calendar.ics");

    } catch (error) {
        console.error("Error running filter script:", error);
        process.exit(1); // Exit with an error code to fail the GitHub Action
    }
}

main();
