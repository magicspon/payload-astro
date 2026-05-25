import { execSync } from 'child_process'
import { config } from 'dotenv'
import * as fs from 'fs'
import * as path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Load environment variables from .env file
config({ path: path.resolve(__dirname, '../.env') })

const POSTGRES_URL = process.env.DATABASE_URL

if (!POSTGRES_URL) {
	console.error('Error: POSTGRES_URL not found in environment variables')
	process.exit(1)
}

// Parse the PostgreSQL connection string
// Format: postgres://user:password@host:port/database
const urlMatch = POSTGRES_URL.match(
	/postgres:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/,
)

if (!urlMatch) {
	console.error('Error: Invalid POSTGRES_URL format')
	console.error('Expected format: postgres://user:password@host:port/database')
	process.exit(1)
}

const [, user, password, host, port, database] = urlMatch

// Get backup file from command line argument
const backupFile = process.argv[2]

if (!backupFile) {
	console.error('Error: No backup file specified')
	console.error('Usage: npm run import-db <path-to-backup.sql.gz>')
	console.error('Example: npm run import-db backups/hw_2025-11-28.sql.gz')
	process.exit(1)
}

// Resolve the backup file path
const backupFilePath = path.resolve(process.cwd(), backupFile)

if (!fs.existsSync(backupFilePath)) {
	console.error(`Error: Backup file not found: ${backupFilePath}`)
	process.exit(1)
}

console.log('Starting database import...')
console.log(`Database: ${database}`)
console.log(`Host: ${host}:${port}`)
console.log(`Backup file: ${backupFilePath}`)

// Show file size
const stats = fs.statSync(backupFilePath)
const fileSizeMB = (stats.size / (1024 * 1024)).toFixed(2)
console.log(`File size: ${fileSizeMB} MB`)

console.log('\n⚠️  WARNING: This will DROP and recreate the database!')
console.log('Press Ctrl+C within 5 seconds to cancel...\n')

// Wait 5 seconds before proceeding
execSync('sleep 5', { stdio: 'inherit' })

try {
	// Set PGPASSWORD environment variable for psql commands
	const env = {
		...process.env,
		PGPASSWORD: password,
	}

	console.log('Dropping existing database...')
	// Drop the database (connect to postgres database to do this)
	execSync(
		`psql -h ${host} -p ${port} -U ${user} -d postgres -c "DROP DATABASE IF EXISTS ${database};"`,
		{ env, stdio: 'inherit' },
	)

	console.log('Creating new database...')
	// Create the database
	execSync(
		`psql -h ${host} -p ${port} -U ${user} -d postgres -c "CREATE DATABASE ${database};"`,
		{ env, stdio: 'inherit' },
	)

	console.log('Importing data...')
	// Import the backup (decompress with gunzip and pipe to psql)
	execSync(
		`gunzip -c "${backupFilePath}" | psql -h ${host} -p ${port} -U ${user} -d ${database}`,
		{ env, stdio: 'inherit' },
	)

	console.log('\n✓ Database import completed successfully!')
} catch (error) {
	console.error('\n✗ Database import failed!')
	console.error(error)
	process.exit(1)
}
