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

// Create backup filename with timestamp
const timestamp = new Date().toISOString().replace(/[:.]/g, '-').split('T')[0]
const backupDir = path.resolve(__dirname, '../backups')
const backupFile = path.join(backupDir, `${database}_${timestamp}.sql.gz`)

// Create backups directory if it doesn't exist
if (!fs.existsSync(backupDir)) {
	fs.mkdirSync(backupDir, { recursive: true })
}

console.log('Starting database export...')
console.log(`Database: ${database}`)
console.log(`Host: ${host}:${port}`)
console.log(`Output file: ${backupFile}`)

try {
	// Set PGPASSWORD environment variable for pg_dump
	const env = {
		...process.env,
		PGPASSWORD: password,
	}

	// Execute pg_dump and pipe to gzip
	execSync(
		`pg_dump -h ${host} -p ${port} -U ${user} -d ${database} | gzip > "${backupFile}"`,
		{
			env,
			stdio: 'inherit',
		},
	)

	console.log('\n✓ Database export completed successfully!')
	console.log(`Backup saved to: ${backupFile}`)

	// Show file size
	const stats = fs.statSync(backupFile)
	const fileSizeMB = (stats.size / (1024 * 1024)).toFixed(2)
	console.log(`File size: ${fileSizeMB} MB`)
} catch (error) {
	console.error('\n✗ Database export failed!')
	console.error(error)
	process.exit(1)
}
