import type { Media } from '@spon/payload-types'
import * as React from 'react'

type TElementProps = Omit<
	React.ComponentProps<'img'>,
	'src' | 'width' | 'height' | 'alt' | 'srcSet'
>

export type TPayloadImageProps = TElementProps & {
	media: Media | null | string
	sizes?: string
}

function buildSrcSet(media: Media): string | undefined {
	const sources: string[] = []

	if (media.sizes?.thumbnail?.url && media.sizes.thumbnail.width) {
		sources.push(`${media.sizes.thumbnail.url} ${media.sizes.thumbnail.width}w`)
	}

	if (media.sizes?.card?.url && media.sizes.card.width) {
		sources.push(`${media.sizes.card.url} ${media.sizes.card.width}w`)
	}

	if (media.sizes?.tablet?.url && media.sizes.tablet.width) {
		sources.push(`${media.sizes.tablet.url} ${media.sizes.tablet.width}w`)
	}

	if (media.url && media.width) {
		sources.push(`${media.url} ${media.width}w`)
	}

	return sources.length > 0 ? sources.join(', ') : undefined
}

export function PayloadImage({
	media,
	sizes,
	loading = 'lazy',
	decoding = 'async',
	...props
}: TPayloadImageProps) {
	if (!media || typeof media === 'string') return null

	const srcSet = media.sizes ? buildSrcSet(media) : undefined

	return (
		<img
			src={media.url ?? undefined}
			width={media.width ?? undefined}
			height={media.height ?? undefined}
			alt={media.alt}
			srcSet={srcSet}
			sizes={srcSet ? sizes : undefined}
			loading={loading}
			decoding={decoding}
			{...props}
		/>
	)
}
