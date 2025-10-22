# Valkyries Site

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Features

The Valkyries team website includes the following features:

- **Team Roster**: Display of team members with their positions and photos
- **Coaching Staff**: Information about the coaching staff
- **Team Calendar**: Interactive calendar showing upcoming games, practices, and events
  - Month view and list view options
  - Pulls events directly from the team's Google Calendar
  - Highlights today's events
  - Shows event details including location and description
- **Social Media Links**: Links to the team's social media accounts

## CI/CD and Infrastructure

This project includes a complete CI/CD pipeline and infrastructure setup using GitHub Actions, Terraform, AWS S3, and CloudFront.

### Infrastructure

The infrastructure is managed using Terraform and includes:

- An S3 bucket named `valkyries-site-bucket` for hosting the website
- A CloudFront distribution for content delivery
- Proper IAM roles and policies for secure access
- A separate development environment path using a random UUID

### CI/CD Pipeline

The CI/CD pipeline is implemented using GitHub Actions and automatically:

1. Deploys to production when changes are merged into the `master` branch
2. Deploys to a hidden development environment when changes are merged into the `develop` branch
3. Builds the React application into a static site
4. Uploads the built files to the appropriate S3 location
5. Invalidates the CloudFront cache to ensure the latest content is served

### Setup Requirements

To use the CI/CD pipeline, you need to set up the following GitHub secrets:

- `AWS_ACCESS_KEY_ID`: Your AWS access key with appropriate permissions
- `AWS_SECRET_ACCESS_KEY`: Your AWS secret key
- `GOOGLE_CALENDAR_API_KEY`: Google Calendar API key for the team calendar
- `GOOGLE_CALENDAR_ID`: ID of the Google Calendar to display team events
- `GOOGLE_CLIENT_ID`: OAuth 2.0 Client ID for Google Calendar integration

The AWS user should have permissions for:
- S3 (read/write)
- CloudFront (create invalidations)
- IAM (if you want GitHub Actions to create/update resources)
- Other AWS services used by Terraform

For detailed instructions on setting up the Google Calendar integration, see [GOOGLE_CALENDAR_SETUP.md](GOOGLE_CALENDAR_SETUP.md).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
