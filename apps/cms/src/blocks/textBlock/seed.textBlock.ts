import { generateButtons } from '@/fields/button/seed.button'
import { generateLexicalContent } from '@/scripts/seed/utils/lexical'
import { pickRandomMedia } from '@/scripts/seed/utils/picsum'
import { generateVariant } from '@/scripts/seed/utils/variants'
import { faker } from '@faker-js/faker'
import type { Media, TextBlock } from '@spon/payload-types'

export function generateTextBlock(mediaItems: Media[]): TextBlock {
	const variant = generateVariant()

	return {
		blockType: 'textBlock',
		variant,
		content: generateLexicalContent(),
		buttons:
			Math.random() < 0.5
				? generateButtons(faker.number.int({ min: 1, max: 2 }))
				: [],
		image: variant === 'primary' ? pickRandomMedia(mediaItems) : null,
	}
}
