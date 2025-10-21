#!/bin/bash

# Test script to verify the deployment setup
# This script checks if the required files for CI/CD and infrastructure are in place

echo "Testing deployment setup..."

# Check if terraform directory exists
if [ -d "./terraform" ]; then
  echo "✅ Terraform directory found"
else
  echo "❌ Terraform directory not found"
  exit 1
fi

# Check if main.tf exists
if [ -f "./terraform/main.tf" ]; then
  echo "✅ Terraform configuration file found"
else
  echo "❌ Terraform configuration file not found"
  exit 1
fi

# Check if GitHub Actions workflow directory exists
if [ -d "./.github/workflows" ]; then
  echo "✅ GitHub Actions workflows directory found"
else
  echo "❌ GitHub Actions workflows directory not found"
  exit 1
fi

# Check if deploy.yml exists
if [ -f "./.github/workflows/deploy.yml" ]; then
  echo "✅ GitHub Actions deployment workflow found"
else
  echo "❌ GitHub Actions deployment workflow not found"
  exit 1
fi

# Check if README.md contains CI/CD documentation
if grep -q "CI/CD and Infrastructure" "./README.md"; then
  echo "✅ CI/CD documentation found in README.md"
else
  echo "❌ CI/CD documentation not found in README.md"
  exit 1
fi

# Check if package.json has build script
if grep -q "\"build\":" "./package.json"; then
  echo "✅ Build script found in package.json"
else
  echo "❌ Build script not found in package.json"
  exit 1
fi

echo "All checks passed! The deployment setup is complete."
echo "To use this setup, you need to:"
echo "1. Push this code to a GitHub repository"
echo "2. Set up AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY secrets in the repository"
echo "3. Create master and develop branches"
echo "4. Push changes to these branches to trigger deployments"

exit 0