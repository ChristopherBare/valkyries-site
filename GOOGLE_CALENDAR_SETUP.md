# Google Calendar Integration Setup

This document provides instructions for setting up the Google Calendar integration for the Valkyries team website.

## Overview

The team calendar component displays events from a Google Calendar using the Google Calendar API. To make this work, you need to:

1. Create a Google Cloud project
2. Enable the Google Calendar API
3. Create API credentials
4. Add the credentials to GitHub Secrets
5. Make your Google Calendar public

## Step 1: Create a Google Cloud Project

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Click on "Select a project" at the top of the page, then click "New Project"
3. Name your project (e.g., "Valkyries Team Calendar") and click "Create"
4. Select your new project from the project selector

## Step 2: Enable the Google Calendar API

1. In your Google Cloud project, go to "APIs & Services" > "Library"
2. Search for "Google Calendar API"
3. Click on the Google Calendar API result and click "Enable"

## Step 3: Create API Credentials

1. In your Google Cloud project, go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" and select "API key"
3. Your new API key will be displayed. Copy this key as you'll need it later
4. Click "Restrict Key" to set restrictions:
   - Under "Application restrictions", select "HTTP referrers (websites)"
   - Add your website domain(s) to the allowed referrers
   - Under "API restrictions", select "Restrict key" and choose "Google Calendar API"
   - Click "Save"
5. Next, create an OAuth 2.0 Client ID:
   - Click "Create Credentials" again and select "OAuth client ID"
   - Select "Web application" as the application type
   - Add your website domain(s) to the authorized JavaScript origins
   - Add your website domain(s) to the authorized redirect URIs
   - Click "Create"
   - Copy the Client ID (you don't need the Client Secret for this implementation)

## Step 4: Add Credentials to GitHub Secrets

1. Go to your GitHub repository
2. Click on "Settings" > "Secrets and variables" > "Actions"
3. Click "New repository secret"
4. Add the following secrets:
   - Name: `GOOGLE_CALENDAR_API_KEY`
   - Value: The API key you created in Step 3
5. Click "Add secret"
6. Add another secret:
   - Name: `GOOGLE_CALENDAR_ID`
   - Value: Your Google Calendar ID (see below for how to find this)
7. Add one more secret:
   - Name: `GOOGLE_CLIENT_ID`
   - Value: The OAuth 2.0 Client ID you created in Step 3

## Finding Your Google Calendar ID

1. Go to [Google Calendar](https://calendar.google.com/)
2. Click on the three dots next to your calendar in the left sidebar and select "Settings and sharing"
3. Scroll down to "Integrate calendar" section
4. Copy the "Calendar ID" (it usually looks like an email address)

## Make Your Google Calendar Public

For the calendar to be accessible via the API:

1. Go to [Google Calendar](https://calendar.google.com/)
2. Click on the three dots next to your calendar in the left sidebar and select "Settings and sharing"
3. Under "Access permissions for events", check "Make available to public"
4. Choose the level of detail you want to share (recommended: "See all event details")

## Testing

After setting up the API and adding the secrets to GitHub:

1. Push your changes to trigger a new build
2. Verify that the calendar component is displaying events correctly on your website

## Troubleshooting

If events aren't displaying:

1. Check the browser console for errors
2. Verify that your API key is correctly restricted but allows your website domain
3. Ensure your calendar is set to public
4. Confirm that there are events in the calendar within the date range being fetched (3 months from current date)

## Security Notes

- The API key is restricted to your website domains to prevent unauthorized use
- Only public calendar information is displayed on the website
- API requests are made from the client side, so the API key must be properly restricted