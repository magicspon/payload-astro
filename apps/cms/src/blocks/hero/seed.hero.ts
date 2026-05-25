import { faker } from '@faker-js/faker'
// import { generateButtons } from '@/fields/button/seed.button'
import { generateLexicalContent } from '@/scripts/seed/utils/lexical'
import { pickRandomMedia } from '@/scripts/seed/utils/picsum'
import { generateVariant } from '@/scripts/seed/utils/variants'
import type { Hero, Media } from '@spon/payload-types'

export function generateHeroBlock(
	mediaItems: Media[],
	overrideVariant?: Hero['variant'],
): Hero {
	const variant = overrideVariant ?? generateVariant()

	return {
		blockType: 'hero',
		variant,
		title: faker.lorem.sentence({ min: 1, max: 2 }).replace(/\.$/, ''),
		content:
			variant !== 'tertiary'
				? generateLexicalContent({ longForm: false })
				: null,
		image: variant === 'primary' ? pickRandomMedia(mediaItems) : null,
	}
}
