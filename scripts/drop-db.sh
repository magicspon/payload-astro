#!/bin/bash

# Drop Database Script
# Drops all tables and types from the database (for development use only)

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

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

# Load environment variables from .env file
ENV_FILE=".env"
if [ -f "$ENV_FILE" ]; then
    print_info "Loading configuration from $ENV_FILE"
    export $(grep -v '^#' "$ENV_FILE" | grep -E '^DATABASE_URL=' | xargs)
else
    print_error ".env file not found"
    exit 1
fi

if [ -z "$DATABASE_URL" ]; then
    print_error "DATABASE_URL not found in .env"
    exit 1
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

# Parse database URL
DB_PARTS=$(parse_db_url "$DATABASE_URL")
DB_USER=$(echo "$DB_PARTS" | cut -d'|' -f1)
DB_PASSWORD=$(echo "$DB_PARTS" | cut -d'|' -f2)
DB_HOST=$(echo "$DB_PARTS" | cut -d'|' -f3)
DB_PORT=$(echo "$DB_PARTS" | cut -d'|' -f4)
DB_NAME=$(echo "$DB_PARTS" | cut -d'|' -f5)

print_info "Database: ${DB_NAME} on ${DB_HOST}:${DB_PORT}"

# Confirm before proceeding
print_warning "This will DROP ALL TABLES AND TYPES from database '${DB_NAME}'!"
print_warning "This action cannot be undone!"
read -p "Are you sure you want to continue? (yes/NO) " -r
echo
if [[ ! $REPLY =~ ^[Yy][Ee][Ss]$ ]]; then
    print_info "Aborted."
    exit 0
fi

print_info "Dropping all tables and types..."

# Drop all tables, sequences, types in the public schema
PGPASSWORD="${DB_PASSWORD}" psql -h "${DB_HOST}" -p "${DB_PORT}" -U "${DB_USER}" -d "${DB_NAME}" << 'EOF'
-- Drop all tables in public schema
DO $$
DECLARE
    r RECORD;
BEGIN
    FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = 'public') LOOP
        EXECUTE 'DROP TABLE IF EXISTS public.' || quote_ident(r.tablename) || ' CASCADE';
    END LOOP;
END $$;

-- Drop all sequences in public schema
DO $$
DECLARE
    r RECORD;
BEGIN
    FOR r IN (SELECT sequencename FROM pg_sequences WHERE schemaname = 'public') LOOP
        EXECUTE 'DROP SEQUENCE IF EXISTS public.' || quote_ident(r.sequencename) || ' CASCADE';
    END LOOP;
END $$;

-- Drop all custom types (enums) in public schema
DO $$
DECLARE
    r RECORD;
BEGIN
    FOR r IN (SELECT typname FROM pg_type WHERE typnamespace = 'public'::regnamespace AND typtype = 'e') LOOP
        EXECUTE 'DROP TYPE IF EXISTS public.' || quote_ident(r.typname) || ' CASCADE';
    END LOOP;
END $$;
EOF

if [ $? -eq 0 ]; then
    print_info "All tables and types dropped successfully!"
else
    print_error "Failed to drop tables and types"
    exit 1
fi
