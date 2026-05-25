#!/bin/bash

# S3 Asset Sync Script
# Syncs assets from production S3 (s3.spon.host) to local rustfs Docker container

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Default values
BUCKET_NAME="${S3_BUCKET:-uploads}"
REGION="${S3_BUCKET_REGION:-lon-1}"
SOURCE_ENDPOINT="${S3_ENDPOINT:-https://s3.spon.host}"
LOCAL_ENDPOINT="http://localhost:9000"
DRY_RUN=false
SYNC_PATH=""

# Function to print colored messages
print_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Function to show usage
usage() {
    cat << EOF
Usage: $0 [OPTIONS] [PATH]

Sync assets from production S3 (s3.spon.host) to local rustfs Docker container.

OPTIONS:
    -b, --bucket BUCKET     S3 bucket name (default: uploads)
    -r, --region REGION     S3 region (default: lon-1)
    -s, --source ENDPOINT   Source S3 endpoint (default: https://s3.spon.host)
    -d, --dry-run           Perform a dry run without actually syncing
    -h, --help              Show this help message

ARGUMENTS:
    PATH                    Optional: Specific path within bucket to sync (e.g., 'images/2024/')
                           If not specified, syncs entire bucket

EXAMPLES:
    # Sync entire bucket
    $0

    # Sync specific folder
    $0 images/2024/

    # Dry run to see what would be synced
    $0 --dry-run

    # Sync from custom bucket
    $0 --bucket my-bucket

REQUIREMENTS:
    - AWS CLI must be installed
    - Docker compose must be running (rustfs service must be up)
    - S3 credentials must be set in .env (root directory)

EOF
    exit 1
}

# Parse command line arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        -b|--bucket)
            BUCKET_NAME="$2"
            shift 2
            ;;
        -r|--region)
            REGION="$2"
            shift 2
            ;;
        -s|--source)
            SOURCE_ENDPOINT="$2"
            shift 2
            ;;
        -d|--dry-run)
            DRY_RUN=true
            shift
            ;;
        -h|--help)
            usage
            ;;
        -*)
            print_error "Unknown option: $1"
            usage
            ;;
        *)
            SYNC_PATH="$1"
            shift
            ;;
    esac
done

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    print_error "AWS CLI is not installed. Please install it first:"
    echo "  macOS: brew install awscli"
    echo "  Linux: sudo apt-get install awscli"
    exit 1
fi

# Check if docker-compose is running
if ! docker compose ps rustfs | grep -q "Up"; then
    print_error "rustfs container is not running. Please start it with:"
    echo "  docker compose up -d rustfs"
    exit 1
fi

# Load environment variables from .env file
ENV_FILE=".env"
if [ -f "$ENV_FILE" ]; then
    print_info "Loading credentials from $ENV_FILE"
    export $(grep -v '^#' "$ENV_FILE" | grep -E '^S3_|^DATABASE_URL' | xargs)
else
    print_error "Environment file not found: $ENV_FILE"
    exit 1
fi

# Validate credentials
if [ -z "$S3_ACCESS_KEY_ID" ] || [ -z "$S3_SECRET_ACCESS_KEY" ]; then
    print_error "S3 credentials not found in $ENV_FILE"
    exit 1
fi

# Configure AWS CLI aliases for source and destination
export AWS_ACCESS_KEY_ID="$S3_ACCESS_KEY_ID"
export AWS_SECRET_ACCESS_KEY="$S3_SECRET_ACCESS_KEY"

# Build source and destination paths
SOURCE_PATH="s3://${BUCKET_NAME}/${SYNC_PATH}"
DEST_PATH="s3://${BUCKET_NAME}/${SYNC_PATH}"

print_info "Configuration:"
echo "  Source: ${SOURCE_ENDPOINT}/${BUCKET_NAME}/${SYNC_PATH}"
echo "  Destination: ${LOCAL_ENDPOINT}/${BUCKET_NAME}/${SYNC_PATH}"
echo "  Region: ${REGION}"
echo "  Bucket: ${BUCKET_NAME}"

if [ "$DRY_RUN" = true ]; then
    print_warning "DRY RUN MODE - No files will be synced"
fi

# Create bucket in local rustfs if it doesn't exist
print_info "Ensuring bucket exists in local rustfs..."
aws s3 mb "s3://${BUCKET_NAME}" \
    --endpoint-url "$LOCAL_ENDPOINT" \
    --region "$REGION" 2>/dev/null || true

# Perform sync
print_info "Starting sync..."

SYNC_CMD="aws s3 sync \"$SOURCE_PATH\" \"$DEST_PATH\" \
    --source-region \"$REGION\" \
    --region \"$REGION\" \
    --endpoint-url \"$LOCAL_ENDPOINT\" \
    --no-sign-request"

# Add source endpoint for downloading
SYNC_CMD_FULL="AWS_ACCESS_KEY_ID=\"$S3_ACCESS_KEY_ID\" \
AWS_SECRET_ACCESS_KEY=\"$S3_SECRET_ACCESS_KEY\" \
aws s3 sync \"$SOURCE_PATH\" /tmp/s3-sync-temp/${BUCKET_NAME}/${SYNC_PATH} \
    --endpoint-url \"$SOURCE_ENDPOINT\" \
    --region \"$REGION\""

if [ "$DRY_RUN" = true ]; then
    SYNC_CMD_FULL="$SYNC_CMD_FULL --dryrun"
fi

print_info "Step 1: Downloading from production..."
echo "Running: aws s3 sync from ${SOURCE_ENDPOINT}"

# Create temp directory
mkdir -p "/tmp/s3-sync-temp/${BUCKET_NAME}"

# Download from production
eval "$SYNC_CMD_FULL"

if [ "$DRY_RUN" = false ]; then
    print_info "Step 2: Uploading to local rustfs..."
    aws s3 sync "/tmp/s3-sync-temp/${BUCKET_NAME}/${SYNC_PATH}" "$DEST_PATH" \
        --endpoint-url "$LOCAL_ENDPOINT" \
        --region "$REGION"

    # Cleanup temp directory
    print_info "Cleaning up temporary files..."
    rm -rf "/tmp/s3-sync-temp"

    print_info "✓ Sync completed successfully!"
else
    print_warning "Dry run completed. No files were synced."
    rm -rf "/tmp/s3-sync-temp"
fi

print_info "You can verify the sync by running:"
echo "  aws s3 ls s3://${BUCKET_NAME}/${SYNC_PATH} --endpoint-url http://localhost:9000 --region ${REGION}"
