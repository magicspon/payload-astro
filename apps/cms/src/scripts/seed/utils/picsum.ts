/**
 * Image fetcher for seeding media
 * Uses Picsum Photos (more reliable than Unsplash Source)
 */
import { faker } from '@faker-js/faker'
import { Media } from '@spon/payload-types'

export interface FetchedImage {
	buffer: Buffer
	filename: string
	mimetype: string
}

/**
 * Fetch a random image from Picsum Photos
 * Uses the free picsum.photos endpoint (no API key required)
 */
export async function fetchPicsumImage(
	width = 1200,
	height = 800,
	_query?: string,
): Promise<FetchedImage> {
	// Use random seed to get different images each time
	const randomSeed = faker.number.int({ min: 1, max: 1000 })
	const url = `https://picsum.photos/seed/${randomSeed}/${width}/${height}`

	console.log(`  Fetching image from Picsum Photos...`)

	const response = await fetch(url, {
		redirect: 'follow',
	})

	if (!response.ok) {
		throw new Error(
			`Failed to fetch image: ${response.status} ${response.statusText}`,
		)
	}

	const arrayBuffer = await response.arrayBuffer()
	const buffer = Buffer.from(arrayBuffer)

	// Generate a unique filename
	const filename = `picsum-${randomSeed}-${faker.string.uuid()}.jpg`

	return {
		buffer,
		filename,
		mimetype: 'image/jpeg',
	}
}

/**
 * Generate alt text for an image based on the query
 */
export function generateAltText(query?: string): string {
	if (query) {
		return `${faker.word.adjective()} ${query} image`
	}
	return faker.lorem.words({ min: 2, max: 4 })
}

export function pickRandomMedia(mediaItems: Media[]): Media | null {
	if (mediaItems.length === 0) return null
	return faker.helpers.arrayElement(mediaItems)
}
