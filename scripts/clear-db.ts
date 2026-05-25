import { execSync } from 'child_process'
import { config } from 'dotenv'
import * as path from 'path'
import * as readline from 'readline'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Load environment variables from .env file
config({ path: path.resolve(__dirname, '../.env') })

const POSTGRES_URL = process.env.DATABASE_URL

if (!POSTGRES_URL) {
	console.error('Error: DATABASE_URL not found in environment variables')
	process.exit(1)
}

// Parse the PostgreSQL connection string
// Format: postgres://user:password@host:port/database
const urlMatch = POSTGRES_URL.match(
	/postgres:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/,
)

if (!urlMatch) {
	console.error('Error: Invalid DATABASE_URL format')
	console.error('Expected format: postgres://user:password@host:port/database')
	process.exit(1)
}

const [, user, password, host, port, database] = urlMatch

console.log('⚠️  WARNING: This will DROP ALL TABLES in the database!')
console.log(`Database: ${database}`)
console.log(`Host: ${host}:${port}`)
console.log('')

// Create readline interface for user confirmation
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
})

rl.question('Are you sure you want to continue? (yes/no): ', (answer) => {
	rl.close()

	if (answer.toLowerCase() !== 'yes') {
		console.log('Operation cancelled.')
		process.exit(0)
	}

	console.log('\nDropping all tables...')

	try {
		// Set PGPASSWORD environment variable
		const env = {
			...process.env,
			PGPASSWORD: password,
		}

		// Use a simpler approach: drop schema and recreate it
		const commands = [
			'DROP SCHEMA public CASCADE',
			'CREATE SCHEMA public',
			'GRANT ALL ON SCHEMA public TO postgres',
			'GRANT ALL ON SCHEMA public TO public',
		]

		for (const command of commands) {
			execSync(
				`psql -h ${host} -p ${port} -U ${user} -d ${database} -c "${command}"`,
				{
					env,
					stdio: 'pipe',
				},
			)
		}

		console.log(
			'\n✓ All tables, sequences, and views have been dropped successfully!',
		)
		console.log('Run migrations to recreate the database schema.')
	} catch (error) {
		console.error('\n✗ Failed to drop tables!')
		console.error(error)
		process.exit(1)
	}
})
