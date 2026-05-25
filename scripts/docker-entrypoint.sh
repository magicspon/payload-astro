#!/bin/sh
set -e

# Start the Next.js server
# Migrations run automatically via prodMigrations in payload.config.ts
exec node /app/apps/cms/server.js
