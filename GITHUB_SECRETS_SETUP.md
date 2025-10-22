# Setting Up GitHub Secrets for Cloudflare Credentials

To use Cloudflare credentials from GitHub secrets, follow these steps:

## 1. Generate a Cloudflare API Token

1. Log in to your Cloudflare dashboard at https://dash.cloudflare.com/
2. Navigate to "My Profile" > "API Tokens"
3. Click "Create Token"
4. Select "Create Custom Token"
5. Name your token (e.g., "Valkyries Site Terraform")
6. Under "Permissions", add:
   - Zone > DNS > Edit
   - Zone > SSL and Certificates > Edit
7. Under "Zone Resources", select:
   - Include > Specific zone > valkyries-softball.org
8. Set a reasonable expiration time (or leave as "No expiration" if needed)
9. Click "Continue to summary" and then "Create Token"
10. **IMPORTANT**: Copy the generated token immediately, as you won't be able to see it again

## 2. Get Your Cloudflare Zone ID

1. Log in to your Cloudflare dashboard
2. Select the "valkyries-softball.org" domain
3. The Zone ID is displayed on the right side of the "Overview" page
4. Copy this ID

## 3. Add Secrets to GitHub Repository

1. Go to your GitHub repository
2. Navigate to "Settings" > "Secrets and variables" > "Actions"
3. Click "New repository secret"
4. Add the following secrets:

   | Name | Value |
   |------|-------|
   | `CLOUDFLARE_API_TOKEN` | The API token you generated in step 1 |
   | `CLOUDFLARE_ZONE_ID` | The Zone ID you copied in step 2 |

5. Click "Add secret" for each

## 4. Verify Setup

The GitHub workflow has been updated to use these secrets. The next time you push to the master or develop branch, the workflow will automatically use these credentials.

## Security Notes

- The API token has limited permissions (only what's needed for this workflow)
- Consider setting an expiration date on your API token and rotating it periodically
- The token is stored securely in GitHub secrets and is never exposed in logs