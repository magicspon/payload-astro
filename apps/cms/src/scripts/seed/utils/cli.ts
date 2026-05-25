/**
 * CLI argument parsing utilities for the seed command
 */

export interface CliOptions {
	collection: string
	count: number
	clean: boolean
}

const VALID_COLLECTIONS = [
	'media',
	'pages',
	'posts',
	'users',
	'orgs',
	'all',
] as const
export type ValidCollection = (typeof VALID_COLLECTIONS)[number]

export function parseArgs(args: string[]): CliOptions {
	const collection = args[0]

	if (!collection) {
		printUsage()
		process.exit(1)
	}

	if (!VALID_COLLECTIONS.includes(collection as ValidCollection)) {
		console.error(`\nError: Invalid collection "${collection}"`)
		console.error(`Valid collections: ${VALID_COLLECTIONS.join(', ')}`)
		process.exit(1)
	}

	let count = 5 // default
	let clean = false

	for (const arg of args.slice(1)) {
		if (arg.startsWith('--count=')) {
			const value = parseInt(arg.split('=')[1] ?? '5', 10)
			if (isNaN(value) || value < 1) {
				console.error('Error: --count must be a positive number')
				process.exit(1)
			}
			count = value
		} else if (arg === '--clean') {
			clean = true
		} else if (arg.startsWith('-')) {
			console.error(`Error: Unknown option "${arg}"`)
			printUsage()
			process.exit(1)
		}
	}

	return { collection, count, clean }
}

function printUsage(): void {
	console.log(`
Usage: pnpm seed <collection> [options]

Collections:
  media     Seed media collection with Unsplash images
  pages     Seed pages with nested hierarchy and blocks
  posts     Seed blog posts
  all       Seed all collections in dependency order

Options:
  --count=N   Number of documents to create (default: 5)
  --clean     Delete existing documents before seeding

Examples:
  pnpm seed media --count=10
  pnpm seed pages --count=5 --clean
  pnpm seed all --count=3
`)
}
