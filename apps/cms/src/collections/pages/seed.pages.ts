/**
 * Pages collection generator
 * Creates hierarchical pages with blocks
 */
import { generateBlocks } from '@/scripts/seed/generators/blocks'
import { faker } from '@faker-js/faker'
import type { Hero, Media, Page, TextBlock, User } from '@spon/payload-types'
import type { Payload } from 'payload'

export interface PagesGeneratorOptions {
	count: number
	adminUser: User
}

type Template = 'default' | 'article' | 'listing' | 'contact'

// Type for creating a new page (omit auto-generated fields)
type PageCreate = Omit<Page, 'id' | 'updatedAt' | 'createdAt' | 'breadcrumbs'>

function generateTemplate(): Template {
	return faker.helpers.arrayElement([
		'default',
		'article',
		'listing',
		'contact',
	])
}

export async function generatePages(
	payload: Payload,
	options: PagesGeneratorOptions,
): Promise<void> {
	const { count, adminUser } = options
	console.log(`\nGenerating ${count} pages...`)

	// Fetch existing media for blocks
	const mediaResult = await payload.find({
		collection: 'media',
		limit: 100,
		depth: 0,
	})
	const mediaItems = mediaResult.docs as Media[]

	if (mediaItems.length === 0) {
		console.log(
			'  Warning: No media found. Pages will be created without images.',
		)
		console.log('  Run "pnpm seed media --count=5" first to add images.')
	}

	const createdPages: Page[] = []

	for (let i = 0; i < count; i++) {
		try {
			// 30% chance to be a child of an existing page (after first 2 pages)
			let parentId: string | null = null
			if (i > 1 && Math.random() < 0.3 && createdPages.length > 0) {
				const parentPage = faker.helpers.arrayElement(createdPages)
				parentId = parentPage.id
			}

			const template = generateTemplate()
			const existingPageIds = createdPages.map((p) => p.id)

			// Generate blocks based on template
			const blocks = generateBlocks(mediaItems, existingPageIds, {
				includeHero: template !== 'listing',
				maxBlocks: template === 'listing' ? 2 : 4,
			})

			const title = faker.lorem.sentence({ min: 2, max: 5 }).replace(/\.$/, '')

			// Build base page data with required fields
			const baseData = {
				title,
				slug: '', // Auto-generated from title by hook
				description: faker.lorem.sentence(),
				template,
				author: adminUser.id,
				parent: parentId,
				image:
					mediaItems.length > 0
						? faker.helpers.arrayElement(mediaItems).id
						: null,
				_status: 'published' as const,
			}

			// Build template-specific page data
			let pageData: PageCreate

			switch (template) {
				case 'default':
					pageData = {
						...baseData,
						blocks: blocks as (Hero | TextBlock)[],
					}
					break
				case 'article':
					pageData = {
						...baseData,
						article: { blocks },
					}
					break
				case 'contact':
					pageData = {
						...baseData,
						contact: { blocks },
					}
					break
				case 'listing':
					pageData = {
						...baseData,
						listing: {
							top: blocks.slice(0, 1) as (Hero | TextBlock)[],
							list: faker.helpers.arrayElement(['pages', 'posts'] as const),
							limit: faker.number.int({ min: 5, max: 20 }),
							footer: blocks.slice(1),
						},
					}
					break
			}

			console.log(
				`  [${i + 1}/${count}] Creating page: "${title}"${parentId ? ' (child)' : ''}`,
			)

			const page = await payload.create({
				collection: 'pages',
				data: pageData,
				depth: 0,
				draft: false,
			})

			createdPages.push(page)
			console.log(`    Created with template: ${template}`)
		} catch (error) {
			console.error(`    Error creating page ${i + 1}:`, error)
		}
	}

	console.log(
		`\nPages generation complete! Created ${createdPages.length} pages.`,
	)

	// Show hierarchy summary
	const topLevel = createdPages.filter((p) => !p.parent)
	const nested = createdPages.filter((p) => p.parent)
	console.log(`  Top-level pages: ${topLevel.length}`)
	console.log(`  Nested pages: ${nested.length}`)
}

export async function cleanPages(payload: Payload): Promise<void> {
	console.log('\nCleaning pages collection...')

	// First, find all pages
	const pages = await payload.find({
		collection: 'pages',
		limit: 1000,
		depth: 0,
	})

	console.log(`  Found ${pages.docs.length} pages to delete`)

	// Delete children first (those with parents), then parents
	const withParent = pages.docs.filter((p) => p.parent)
	const withoutParent = pages.docs.filter((p) => !p.parent)

	// Delete nested pages first
	for (const doc of withParent) {
		await payload.delete({
			collection: 'pages',
			id: doc.id,
		})
	}

	// Then delete top-level pages
	for (const doc of withoutParent) {
		await payload.delete({
			collection: 'pages',
			id: doc.id,
		})
	}

	console.log('Pages cleanup complete!')
}
