#!/bin/bash

# Database Sync Script
# Downloads database from production server via SSH and restores it locally

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Default values
PRODUCTION_HOST="${PRODUCTION_HOST:-}"
PRODUCTION_USER="${PRODUCTION_USER:-}"
PRODUCTION_DB_URL="${PRODUCTION_DB_URL:-}"
LOCAL_DB_URL=""
DRY_RUN=false
KEEP_DUMP=false
RESTORE_FROM_FILE=""
SKIP_BACKUP=false
BACKUP_DIR="./backups"

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
Usage: $0 [OPTIONS]

Download database from production server via SSH and restore it locally.

MODES:
    1. Sync from production (default)
    2. Restore from local dump file (use --restore-from)

OPTIONS:
    -h, --host HOST         Production server hostname or IP
    -u, --user USER         SSH username for production server
    -p, --prod-db URL       Production DATABASE_URL (PostgreSQL connection string)
    -l, --local-db URL      Local DATABASE_URL (default: from .env)
    -r, --restore-from FILE Restore from local dump file instead of downloading from production
    -b, --backup-dir DIR    Directory to store backups (default: ./backups)
    --skip-backup           Skip backing up local database before restore
    -d, --dry-run           Show what would be done without executing
    -k, --keep-dump         Keep the database dump file after restore
    --help                  Show this help message

EXAMPLES:
    # Sync from production (reads from .env)
    $0

    # Sync from production with explicit credentials
    $0 --host app.example.com --user deploy --prod-db "postgres://user:pass@localhost:5432/dbname"

    # Restore from a local dump file
    $0 --restore-from ./backups/db_backup_20231225_120000.sql

    # Restore without creating a backup first
    $0 --restore-from ./my-dump.sql --skip-backup

    # Dry run to see what would happen
    $0 --host app.example.com --user deploy --dry-run

BACKUP BEHAVIOR:
    - By default, the local database is ALWAYS backed up before dropping
    - Backups are stored in ./backups/ with timestamp
    - Use --skip-backup to disable automatic backup (not recommended)
    - Backups are kept indefinitely (manual cleanup required)

REQUIREMENTS:
    - SSH access to production server (for sync mode)
    - pg_dump and psql installed on production server (for sync mode)
    - pg_dump and psql installed locally
    - Docker compose running (for local database)

ENVIRONMENT VARIABLES:
    You can set these in .env or export them:
    - PRODUCTION_HOST: Production server hostname
    - PRODUCTION_USER: SSH username
    - PRODUCTION_DB_URL: Production database connection string
    - DATABASE_URL: Local database connection string (in .env)

EOF
    exit 1
}

# Parse command line arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        -h|--host)
            PRODUCTION_HOST="$2"
            shift 2
            ;;
        -u|--user)
            PRODUCTION_USER="$2"
            shift 2
            ;;
        -p|--prod-db)
            PRODUCTION_DB_URL="$2"
            shift 2
            ;;
        -l|--local-db)
            LOCAL_DB_URL="$2"
            shift 2
            ;;
        -r|--restore-from)
            RESTORE_FROM_FILE="$2"
            shift 2
            ;;
        -b|--backup-dir)
            BACKUP_DIR="$2"
            shift 2
            ;;
        --skip-backup)
            SKIP_BACKUP=true
            shift
            ;;
        -d|--dry-run)
            DRY_RUN=true
            shift
            ;;
        -k|--keep-dump)
            KEEP_DUMP=true
            shift
            ;;
        --help)
            usage
            ;;
        *)
            print_error "Unknown option: $1"
            usage
            ;;
    esac
done

# Check if pg_dump and psql are installed locally
if ! command -v pg_dump &> /dev/null; then
    print_error "pg_dump is not installed. Please install PostgreSQL client tools:"
    echo "  macOS: brew install postgresql"
    echo "  Linux: sudo apt-get install postgresql-client"
    exit 1
fi

if ! command -v psql &> /dev/null; then
    print_error "psql is not installed. Please install PostgreSQL client tools:"
    echo "  macOS: brew install postgresql"
    echo "  Linux: sudo apt-get install postgresql-client"
    exit 1
fi

# Load environment variables from .env file
ENV_FILE=".env"
if [ -f "$ENV_FILE" ]; then
    print_info "Loading configuration from $ENV_FILE"
    export $(grep -v '^#' "$ENV_FILE" | grep -E '^DATABASE_URL|^PRODUCTION_' | xargs)
fi

# Get local database URL from .env if not provided
if [ -z "$LOCAL_DB_URL" ]; then
    if [ -f "$ENV_FILE" ]; then
        LOCAL_DB_URL=$(grep "^DATABASE_URL=" "$ENV_FILE" | cut -d '=' -f2-)
    fi
fi

# Check if we're in restore mode
if [ -n "$RESTORE_FROM_FILE" ]; then
    # Restore mode - only need local DB
    if [ ! -f "$RESTORE_FROM_FILE" ]; then
        print_error "Dump file not found: $RESTORE_FROM_FILE"
        exit 1
    fi

    if [ -z "$LOCAL_DB_URL" ]; then
        print_error "Local database URL not found. Use --local-db or set DATABASE_URL in .env"
        exit 1
    fi
else
    # Sync mode - need production details
    if [ -z "$PRODUCTION_HOST" ]; then
        print_error "Production host not specified. Use --host or set PRODUCTION_HOST"
        usage
    fi

    if [ -z "$PRODUCTION_USER" ]; then
        print_error "Production user not specified. Use --user or set PRODUCTION_USER"
        usage
    fi

    if [ -z "$PRODUCTION_DB_URL" ]; then
        print_error "Production database URL not specified. Use --prod-db or set PRODUCTION_DB_URL"
        usage
    fi

    if [ -z "$LOCAL_DB_URL" ]; then
        print_error "Local database URL not found. Use --local-db or set DATABASE_URL in .env"
        exit 1
    fi
fi

# Parse database connection details
parse_db_url() {
    local url=$1
    # Remove protocol
    local no_protocol="${url#*://}"

    # Extract user (everything before first :)
    local user="${no_protocol%%:*}"

    # Remove user and : to get the rest
    local after_user="${no_protocol#*:}"

    # Extract password (everything before the last @)
    local password="${after_user%@*}"

    # Extract everything after the last @ in password
    local after_password="${after_user##*@}"

    # Extract host (everything before :)
    local host="${after_password%%:*}"

    # Extract port and database
    local port_and_db="${after_password#*:}"
    local port="${port_and_db%%/*}"
    local database="${port_and_db#*/}"

    # Remove query string if present
    database="${database%%\?*}"

    echo "$user|$password|$host|$port|$database"
}

# Parse database URLs
LOCAL_DB_PARTS=$(parse_db_url "$LOCAL_DB_URL")
LOCAL_DB_USER=$(echo "$LOCAL_DB_PARTS" | cut -d'|' -f1)
LOCAL_DB_PASSWORD=$(echo "$LOCAL_DB_PARTS" | cut -d'|' -f2)
LOCAL_DB_HOST=$(echo "$LOCAL_DB_PARTS" | cut -d'|' -f3)
LOCAL_DB_PORT=$(echo "$LOCAL_DB_PARTS" | cut -d'|' -f4)
LOCAL_DB_NAME=$(echo "$LOCAL_DB_PARTS" | cut -d'|' -f5)

# Parse production URL if in sync mode
if [ -z "$RESTORE_FROM_FILE" ]; then
    PROD_DB_PARTS=$(parse_db_url "$PRODUCTION_DB_URL")
    PROD_DB_USER=$(echo "$PROD_DB_PARTS" | cut -d'|' -f1)
    PROD_DB_PASSWORD=$(echo "$PROD_DB_PARTS" | cut -d'|' -f2)
    PROD_DB_HOST=$(echo "$PROD_DB_PARTS" | cut -d'|' -f3)
    PROD_DB_PORT=$(echo "$PROD_DB_PARTS" | cut -d'|' -f4)
    PROD_DB_NAME=$(echo "$PROD_DB_PARTS" | cut -d'|' -f5)
fi

# Create temporary dump file name
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
DUMP_FILE="db_dump_${TIMESTAMP}.sql"
BACKUP_FILE="${BACKUP_DIR}/backup_${LOCAL_DB_NAME}_${TIMESTAMP}.sql"
TEMP_DIR="/tmp/db-sync-$$"

# Show configuration
print_info "Configuration:"
if [ -n "$RESTORE_FROM_FILE" ]; then
    echo "  Mode: Restore from local file"
    echo "  Source: ${RESTORE_FROM_FILE}"
else
    echo "  Mode: Sync from production"
    echo "  Production: ${PRODUCTION_USER}@${PRODUCTION_HOST}"
    echo "  Production DB: ${PROD_DB_NAME} on ${PROD_DB_HOST}:${PROD_DB_PORT}"
fi
echo "  Local DB: ${LOCAL_DB_NAME} on ${LOCAL_DB_HOST}:${LOCAL_DB_PORT}"
if [ "$SKIP_BACKUP" = false ]; then
    echo "  Backup: ${BACKUP_FILE}"
fi

if [ "$DRY_RUN" = true ]; then
    print_warning "DRY RUN MODE - No changes will be made"
    echo ""
    echo "Would execute:"
    STEP=1
    if [ "$SKIP_BACKUP" = false ]; then
        echo "${STEP}. Backup local database to: ${BACKUP_FILE}"
        STEP=$((STEP + 1))
    fi
    if [ -n "$RESTORE_FROM_FILE" ]; then
        echo "${STEP}. Use existing dump file: ${RESTORE_FROM_FILE}"
    else
        echo "${STEP}. SSH to ${PRODUCTION_USER}@${PRODUCTION_HOST}"
        STEP=$((STEP + 1))
        echo "${STEP}. Run pg_dump on production database: ${PROD_DB_NAME}"
        STEP=$((STEP + 1))
        echo "${STEP}. Download dump to local machine"
    fi
    STEP=$((STEP + 1))
    echo "${STEP}. Drop local database: ${LOCAL_DB_NAME}"
    STEP=$((STEP + 1))
    echo "${STEP}. Create new local database: ${LOCAL_DB_NAME}"
    STEP=$((STEP + 1))
    echo "${STEP}. Restore dump to local database"
    if [ "$KEEP_DUMP" = false ] && [ -z "$RESTORE_FROM_FILE" ]; then
        STEP=$((STEP + 1))
        echo "${STEP}. Delete dump file"
    fi
    exit 0
fi

# Confirm before proceeding
if [ -n "$RESTORE_FROM_FILE" ]; then
    print_warning "This will DROP your local database '${LOCAL_DB_NAME}' and restore from: ${RESTORE_FROM_FILE}"
else
    print_warning "This will DROP your local database '${LOCAL_DB_NAME}' and replace it with production data!"
fi
read -p "Are you sure you want to continue? (yes/NO) " -r
echo
if [[ ! $REPLY =~ ^[Yy][Ee][Ss]$ ]]; then
    print_info "Aborted."
    exit 0
fi

# Create temporary and backup directories
mkdir -p "$TEMP_DIR"
if [ "$SKIP_BACKUP" = false ]; then
    mkdir -p "$BACKUP_DIR"
fi

CURRENT_STEP=1

# Step: Backup local database (if not skipped)
if [ "$SKIP_BACKUP" = false ]; then
    print_info "Step ${CURRENT_STEP}: Backing up local database..."

    # Check if database exists
    DB_EXISTS=$(PGPASSWORD="${LOCAL_DB_PASSWORD}" psql -h "${LOCAL_DB_HOST}" -p "${LOCAL_DB_PORT}" -U "${LOCAL_DB_USER}" -d postgres -tAc "SELECT 1 FROM pg_database WHERE datname='${LOCAL_DB_NAME}'" 2>/dev/null)

    if [ "$DB_EXISTS" = "1" ]; then
        PGPASSWORD="${LOCAL_DB_PASSWORD}" pg_dump -h "${LOCAL_DB_HOST}" -p "${LOCAL_DB_PORT}" -U "${LOCAL_DB_USER}" -d "${LOCAL_DB_NAME}" --no-owner --no-acl -F p > "${BACKUP_FILE}"

        if [ $? -eq 0 ]; then
            BACKUP_SIZE=$(du -h "${BACKUP_FILE}" | cut -f1)
            print_info "✓ Backup created successfully (${BACKUP_SIZE})"
            echo "  Backup saved to: ${BACKUP_FILE}"
        else
            print_error "Failed to create backup"
            rm -rf "$TEMP_DIR"
            exit 1
        fi
    else
        print_warning "Local database does not exist, skipping backup"
    fi

    CURRENT_STEP=$((CURRENT_STEP + 1))
fi

# Step: Get or create dump file
if [ -n "$RESTORE_FROM_FILE" ]; then
    print_info "Step ${CURRENT_STEP}: Using existing dump file: ${RESTORE_FROM_FILE}"
    DUMP_TO_RESTORE="$RESTORE_FROM_FILE"
    DUMP_SIZE=$(du -h "${DUMP_TO_RESTORE}" | cut -f1)
    print_info "  Dump file size: ${DUMP_SIZE}"
else
    print_info "Step ${CURRENT_STEP}: Creating database dump on production server..."

    # Create remote dump command using docker exec to access the database container
    # When running pg_dump inside the container, use localhost instead of container name
    # Using sudo to run docker command (may require passwordless sudo for docker)
    REMOTE_DUMP_CMD="sudo docker exec -e PGPASSWORD='${PROD_DB_PASSWORD}' ${PROD_DB_HOST} pg_dump -h localhost -p ${PROD_DB_PORT} -U ${PROD_DB_USER} --no-owner --no-acl -F p ${PROD_DB_NAME}"

    # Execute dump on production and stream to local file
    ssh "${PRODUCTION_USER}@${PRODUCTION_HOST}" "${REMOTE_DUMP_CMD}" > "${TEMP_DIR}/${DUMP_FILE}"

    if [ $? -ne 0 ]; then
        print_error "Failed to create database dump"
        rm -rf "$TEMP_DIR"
        exit 1
    fi

    DUMP_TO_RESTORE="${TEMP_DIR}/${DUMP_FILE}"
    DUMP_SIZE=$(du -h "${DUMP_TO_RESTORE}" | cut -f1)
    print_info "✓ Dump created successfully (${DUMP_SIZE})"
fi

CURRENT_STEP=$((CURRENT_STEP + 1))

# Step: Drop local database
print_info "Step ${CURRENT_STEP}: Dropping local database..."

PGPASSWORD="${LOCAL_DB_PASSWORD}" psql -h "${LOCAL_DB_HOST}" -p "${LOCAL_DB_PORT}" -U "${LOCAL_DB_USER}" -d postgres -c "DROP DATABASE IF EXISTS ${LOCAL_DB_NAME};" 2>/dev/null || {
    print_warning "Could not drop database. It may not exist or may be in use."
}

CURRENT_STEP=$((CURRENT_STEP + 1))

# Step: Create local database
print_info "Step ${CURRENT_STEP}: Creating local database..."

PGPASSWORD="${LOCAL_DB_PASSWORD}" psql -h "${LOCAL_DB_HOST}" -p "${LOCAL_DB_PORT}" -U "${LOCAL_DB_USER}" -d postgres -c "CREATE DATABASE ${LOCAL_DB_NAME};"

if [ $? -ne 0 ]; then
    print_error "Failed to create local database"
    rm -rf "$TEMP_DIR"
    exit 1
fi

print_info "✓ Database created successfully"

CURRENT_STEP=$((CURRENT_STEP + 1))

# Step: Restore dump to local database
print_info "Step ${CURRENT_STEP}: Restoring database dump..."

PGPASSWORD="${LOCAL_DB_PASSWORD}" psql -h "${LOCAL_DB_HOST}" -p "${LOCAL_DB_PORT}" -U "${LOCAL_DB_USER}" -d "${LOCAL_DB_NAME}" < "${DUMP_TO_RESTORE}"

if [ $? -ne 0 ]; then
    print_error "Failed to restore database dump"
    rm -rf "$TEMP_DIR"
    exit 1
fi

print_info "✓ Database restored successfully"

# Step: Cleanup or keep dump
if [ "$KEEP_DUMP" = true ] && [ -z "$RESTORE_FROM_FILE" ]; then
    mv "${TEMP_DIR}/${DUMP_FILE}" "./${DUMP_FILE}"
    print_info "Production dump saved to: ./${DUMP_FILE}"
fi

print_info "Cleaning up temporary files..."
rm -rf "$TEMP_DIR"

print_info "✓ Database sync completed successfully!"
echo ""
if [ -n "$RESTORE_FROM_FILE" ]; then
    print_info "Your local database has been restored from: ${RESTORE_FROM_FILE}"
else
    print_info "Your local database now contains the production data."
fi
echo "  Database: ${LOCAL_DB_NAME}"
echo "  Connection: ${LOCAL_DB_HOST}:${LOCAL_DB_PORT}"
if [ "$SKIP_BACKUP" = false ] && [ -f "$BACKUP_FILE" ]; then
    echo ""
    print_info "A backup of your previous database was saved to:"
    echo "  ${BACKUP_FILE}"
fi
