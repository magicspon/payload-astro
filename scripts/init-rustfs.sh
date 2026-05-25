#!/bin/bash

# RustFS Initialization Script
# Creates the uploads bucket if it doesn't exist

set -e

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

print_info() {
    echo -e "${GREEN}[RUSTFS-INIT]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[RUSTFS-INIT]${NC} $1"
}

# Configuration
BUCKET_NAME="${S3_BUCKET:-uploads}"
REGION="${S3_BUCKET_REGION:-lon-1}"
ENDPOINT="${S3_ENDPOINT:-http://rustfs:9000}"
MAX_RETRIES=30
RETRY_DELAY=2

print_info "Waiting for RustFS to be ready..."

# Wait for rustfs to be available
for i in $(seq 1 $MAX_RETRIES); do
    if curl -sf "${ENDPOINT}/health" > /dev/null 2>&1 || curl -sf "${ENDPOINT}" > /dev/null 2>&1; then
        print_info "RustFS is ready!"
        break
    fi

    if [ $i -eq $MAX_RETRIES ]; then
        print_warning "RustFS is not responding after ${MAX_RETRIES} attempts. Proceeding anyway..."
        break
    fi

    echo "Attempt $i/$MAX_RETRIES - RustFS not ready yet, waiting ${RETRY_DELAY}s..."
    sleep $RETRY_DELAY
done

# Check if AWS CLI is available
if ! command -v aws &> /dev/null; then
    print_warning "AWS CLI not found. Installing..."
    apk add --no-cache aws-cli 2>/dev/null || apt-get update && apt-get install -y awscli 2>/dev/null || {
        print_warning "Could not install AWS CLI. Skipping bucket creation."
        exit 0
    }
fi

print_info "Checking if bucket '${BUCKET_NAME}' exists..."

# Try to create the bucket (will succeed if it doesn't exist, fail gracefully if it does)
aws s3 mb "s3://${BUCKET_NAME}" \
    --endpoint-url "$ENDPOINT" \
    --region "$REGION" 2>/dev/null && \
    print_info "✓ Bucket '${BUCKET_NAME}' created successfully!" || \
    print_info "Bucket '${BUCKET_NAME}' already exists or creation skipped."

print_info "Initialization complete!"
