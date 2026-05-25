#!/bin/bash

# Script to sync environment variables from apps/cms/.env to GitHub secrets
# Requires: gh CLI (GitHub CLI) to be installed and authenticated
# Usage: ./scripts/sync-github-secrets.sh

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

ENV_FILE="apps/cms/.env"

# Check if gh CLI is installed
if ! command -v gh &> /dev/null; then
    echo -e "${RED}Error: GitHub CLI (gh) is not installed${NC}"
    echo "Install it from: https://cli.github.com/"
    exit 1
fi

# Check if authenticated
if ! gh auth status &> /dev/null; then
    echo -e "${RED}Error: Not authenticated with GitHub CLI${NC}"
    echo "Run: gh auth login"
    exit 1
fi

# Check if .env file exists
if [ ! -f "$ENV_FILE" ]; then
    echo -e "${RED}Error: $ENV_FILE not found${NC}"
    exit 1
fi

echo -e "${YELLOW}This script will sync the following environment variables to GitHub secrets:${NC}"
echo ""

# List of required environment variables
REQUIRED_VARS=(
    "DATABASE_URL"
    "PAYLOAD_SECRET"
    "S3_BUCKET"
    "S3_BUCKET_REGION"
    "S3_ACCESS_KEY_ID"
    "S3_SECRET_ACCESS_KEY"
    "S3_ENDPOINT"
    "PREVIEW_SECRET"
    "RESEND_API_KEY"
    "CMS_URL"
    "NEXT_PUBLIC_FRONTEND_URL"
)

# Source the .env file and export variables
set -a
source "$ENV_FILE"
set +a

# Display variables that will be synced (hide sensitive values)
for var in "${REQUIRED_VARS[@]}"; do
    value="${!var}"
    if [ -z "$value" ]; then
        echo -e "${RED}  ✗ $var (not set)${NC}"
    else
        # Show first 4 chars and last 4 chars for security
        masked_value=$(echo "$value" | sed 's/\(^.\{4\}\).*\(.\{4\}$\)/\1****\2/')
        echo -e "${GREEN}  ✓ $var${NC} = $masked_value"
    fi
done

echo ""
read -p "Do you want to continue and push these secrets to GitHub? (y/N) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Aborted."
    exit 1
fi

echo ""
echo -e "${YELLOW}Pushing secrets to GitHub...${NC}"
echo ""

# Counter for tracking success
SUCCESS_COUNT=0
FAIL_COUNT=0

# Push each secret to GitHub
for var in "${REQUIRED_VARS[@]}"; do
    value="${!var}"

    if [ -z "$value" ]; then
        echo -e "${RED}  ✗ Skipping $var (not set)${NC}"
        FAIL_COUNT=$((FAIL_COUNT + 1))
        continue
    fi

    # Push to GitHub secrets
    if echo "$value" | gh secret set "$var" 2>/dev/null; then
        echo -e "${GREEN}  ✓ $var${NC}"
        SUCCESS_COUNT=$((SUCCESS_COUNT + 1))
    else
        echo -e "${RED}  ✗ Failed to set $var${NC}"
        FAIL_COUNT=$((FAIL_COUNT + 1))
    fi
done

echo ""
echo -e "${GREEN}Done! Successfully synced $SUCCESS_COUNT secrets.${NC}"
if [ $FAIL_COUNT -gt 0 ]; then
    echo -e "${RED}Failed to sync $FAIL_COUNT secrets.${NC}"
    exit 1
fi

echo ""
echo -e "${YELLOW}Note: These secrets are now available in your GitHub Actions workflow.${NC}"
echo "You can view them at: https://github.com/$(gh repo view --json nameWithOwner -q .nameWithOwner)/settings/secrets/actions"
