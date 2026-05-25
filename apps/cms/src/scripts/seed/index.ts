#!/usr/bin/env tsx
/**
 * Seed CLI - Generate dummy content for Payload CMS
 *
 * Usage:
 *   pnpm seed <collection> [options]
 *
 * Collections:
 *   media     Seed media collection with Unsplash images
 *   pages     Seed pages with nested hierarchy and blocks
 *   posts     Seed blog posts
 *   all       Seed all collections in dependency order
 *
 * Options:
 *   --count=N   Number of documents to create (default: 5)
 *   --clean     Delete existing documents before seeding
 */
import {
	cleanMedia,
	cleanOrgs,
	cleanPages,
	cleanPosts,
	cleanUsers,
	generateMedia,
	generateOrgs,
	generatePages,
	generatePosts,
	generateUsers,
} from './generators'
import { getAdminUser, initPayload } from './payload'
import { type ValidCollection, parseArgs } from './utils/cli'

async function main() {
	const args = process.argv.slice(2)
	const options = parseArgs(args)

	console.log('\n========================================')
	console.log('  Payload CMS Seed Tool')
	console.log('========================================')
	console.log(`  Collection: ${options.collection}`)
	console.log(`  Count: ${options.count}`)
	console.log(`  Clean: ${options.clean}`)
	console.log('========================================\n')

	// Initialize Payload
	const payload = await initPayload()

	// Get admin user for author fields
	const adminUser = await getAdminUser(payload)
	console.log(`Using admin user: ${adminUser.email}`)

	const collection = options.collection as ValidCollection

	// Handle "all" - seed in dependency order
	if (collection === 'all') {
		// Clean in reverse order (most dependent first)
		if (options.clean) {
			await cleanPosts(payload)
			await cleanPages(payload)
			await cleanMedia(payload)
			await cleanOrgs(payload)
			await cleanUsers(payload)
		}

		// Seed in dependency order
		await generateUsers(payload, { count: options.count })
		await generateOrgs(payload, { count: options.count })
		await generateMedia(payload, { count: options.count })
		await generatePages(payload, { count: options.count, adminUser })
		await generatePosts(payload, { count: options.count, adminUser })
	} else {
		// Handle individual collections
		switch (collection) {
			case 'media':
				if (options.clean) await cleanMedia(payload)
				await generateMedia(payload, { count: options.count })
				break

			case 'pages':
				if (options.clean) await cleanPages(payload)
				await generatePages(payload, { count: options.count, adminUser })
				break

			case 'posts':
				if (options.clean) await cleanPosts(payload)
				await generatePosts(payload, { count: options.count, adminUser })
				break

			case 'users':
				if (options.clean) await cleanUsers(payload)
				await generateUsers(payload, { count: options.count })
				break

			case 'orgs':
				if (options.clean) await cleanOrgs(payload)
				await generateOrgs(payload, { count: options.count })
				break
		}
	}

	console.log('\n========================================')
	console.log('  Seeding complete!')
	console.log('========================================\n')

	process.exit(0)
}

main().catch((error) => {
	console.error('\nSeed failed:', error)
	process.exit(1)
})
