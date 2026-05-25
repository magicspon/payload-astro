import { pickRandomMedia } from '@/scripts/seed/utils/picsum'
import { generateVariant } from '@/scripts/seed/utils/variants'
import type { ImageBlock, Media } from '@spon/payload-types'

export function generateImageBlock(mediaItems: Media[]): ImageBlock {
	return {
		blockType: 'imageBlock',
		variant: generateVariant(),
		image: pickRandomMedia(mediaItems),
	}
}
