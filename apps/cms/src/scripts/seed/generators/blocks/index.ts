import { generateHeroBlock } from '@/blocks/hero/seed.hero'
import { generateImageBlock } from '@/blocks/imageBlock/seed.imageBlock'
import { generateRelatedBlock } from '@/blocks/related/seed.relatedBlocks'
import { generateTextBlock } from '@/blocks/textBlock/seed.textBlock'
import { faker } from '@faker-js/faker'
import type {
	Hero,
	ImageBlock,
	Media,
	RelatedBlocks,
	TextBlock,
} from '@spon/payload-types'

export { generateButton, generateButtons } from '@/fields/button/seed.button'

export { generateHeroBlock } from '@/blocks/hero/seed.hero'
export { generateImageBlock } from '@/blocks/imageBlock/seed.imageBlock'
export { generateRelatedBlock } from '@/blocks/related/seed.relatedBlocks'
export { generateTextBlock } from '@/blocks/textBlock/seed.textBlock'

export type Block = Hero | TextBlock | ImageBlock | RelatedBlocks

/**
 * Generate a random set of blocks for a page
 */
export function generateBlocks(
	mediaItems: Media[],
	existingPageIds: string[] = [],
	options?: { includeHero?: boolean; maxBlocks?: number },
): Block[] {
	const { includeHero = true, maxBlocks = 4 } = options ?? {}
	const blocks: Block[] = []

	// Maybe start with a hero
	if (includeHero && Math.random() < 0.7) {
		blocks.push(generateHeroBlock(mediaItems))
	}

	// Add random blocks
	const blockCount = faker.number.int({ min: 1, max: maxBlocks })
	for (let i = 0; i < blockCount; i++) {
		const blockType = faker.helpers.arrayElement([
			'textBlock',
			'textBlock', // Higher weight for text
			'imageBlock',
			'relatedBlocks',
		])

		switch (blockType) {
			case 'textBlock':
				blocks.push(generateTextBlock(mediaItems))
				break
			case 'imageBlock':
				if (mediaItems.length > 0) {
					blocks.push(generateImageBlock(mediaItems))
				}
				break
			case 'relatedBlocks':
				if (existingPageIds.length > 0) {
					blocks.push(generateRelatedBlock(existingPageIds))
				}
				break
		}
	}

	return blocks
}
