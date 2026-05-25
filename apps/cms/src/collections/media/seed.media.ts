/**
 * Media collection generator
 * Downloads images from Picsum and uploads to Payload
 */
import { fetchPicsumImage, generateAltText } from '@/scripts/seed/utils/picsum'
import type { Payload } from 'payload'

export interface MediaGeneratorOptions {
	count: number
}

export async function generateMedia(
	payload: Payload,
	options: MediaGeneratorOptions,
): Promise<void> {
	const { count } = options
	console.log(`\nGenerating ${count} media items...`)

	const queries = [
		'nature',
		'business',
		'technology',
		'architecture',
		'landscape',
		'office',
	]

	for (let i = 0; i < count; i++) {
		const query = queries[i % queries.length]

		try {
			console.log(`  [${i + 1}/${count}] Creating media...`)
			const image = await fetchPicsumImage(1200, 800, query)

			await payload.create({
				collection: 'media',
				data: {
					alt: generateAltText(query),
				},
				file: {
					data: image.buffer,
					name: image.filename,
					mimetype: image.mimetype,
					size: image.buffer.length,
				},
			})

			console.log(`    Created: ${image.filename}`)
		} catch (error) {
			console.error(`    Error creating media ${i + 1}:`, error)
		}
	}

	console.log(`Media generation complete!`)
}

export async function cleanMedia(payload: Payload): Promise<void> {
	console.log('\nCleaning media collection...')

	const media = await payload.find({
		collection: 'media',
		limit: 1000,
		depth: 0,
	})

	console.log(`  Found ${media.docs.length} media items to delete`)

	for (const doc of media.docs) {
		await payload.delete({
			collection: 'media',
			id: doc.id,
		})
	}

	console.log('Media cleanup complete!')
}
