import { generateShortLexicalContent } from '@/scripts/seed/utils/lexical'
import { generateVariant } from '@/scripts/seed/utils/variants'
import { faker } from '@faker-js/faker'
import type { RelatedBlocks } from '@spon/payload-types'

export function generateRelatedBlock(pageIds: string[]): RelatedBlocks {
	return {
		blockType: 'relatedBlocks',
		variant: generateVariant(),
		content: generateShortLexicalContent(),
		related:
			pageIds.length > 0
				? faker.helpers
						.arrayElements(pageIds, {
							min: 1,
							max: Math.min(3, pageIds.length),
						})
						.map((id) => ({
							relationTo: 'pages' as const,
							value: id,
						}))
				: [],
	}
}
