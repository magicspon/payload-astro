import type { Media, Setting } from '@spon/payload-types'
import { type SEOProps as SeoProps } from 'astro-seo'

function getImageUrl(
	image: (string | null) | Media | undefined,
): string | undefined {
	if (!image) return undefined
	if (typeof image === 'string') return image
	return image.url ?? undefined
}

export function parseSeo(props: Setting['meta']): SeoProps {
	if (!props) return {}

	const result: SeoProps = {
		title: props.title ?? undefined,
		description: props.description ?? undefined,
		canonical: props.canonical ?? undefined,
		nofollow: props.robots?.nofollow ?? undefined,
		noindex: props.robots?.noindex ?? undefined,
		noarchive: props.robots?.noarchive ?? undefined,
		nocache: props.robots?.nocache ?? undefined,
		robotsExtras: props.robots?.extras ?? undefined,
		languageAlternates: props.languageAlternates?.map(({ href, hrefLang }) => ({
			href,
			hrefLang,
		})),
	}

	const ogImage = getImageUrl(props.openGraph?.basic?.image)
	if (props.openGraph?.basic?.title && props.openGraph.basic.type && ogImage) {
		result.openGraph = {
			basic: {
				title: props.openGraph.basic.title,
				type: props.openGraph.basic.type,
				image: ogImage,
				url: props.openGraph.basic.url ?? undefined,
			},
			optional: props.openGraph.optional
				? {
						audio: props.openGraph.optional.audio ?? undefined,
						description: props.openGraph.optional.description ?? undefined,
						determiner: props.openGraph.optional.determiner ?? undefined,
						locale: props.openGraph.optional.locale ?? undefined,
						localeAlternate: props.openGraph.optional.localeAlternate?.map(
							(l) => l.locale,
						),
						siteName: props.openGraph.optional.siteName ?? undefined,
						video: props.openGraph.optional.video ?? undefined,
					}
				: undefined,
			image: props.openGraph.image
				? {
						type: props.openGraph.image.type ?? undefined,
						width: props.openGraph.image.width ?? undefined,
						height: props.openGraph.image.height ?? undefined,
						alt: props.openGraph.image.alt ?? undefined,
					}
				: undefined,
			article: props.openGraph.article
				? {
						publishedTime: props.openGraph.article.publishedTime ?? undefined,
						modifiedTime: props.openGraph.article.modifiedTime ?? undefined,
						expirationTime: props.openGraph.article.expirationTime ?? undefined,
						authors: props.openGraph.article.authors?.map((a) => a.author),
						section: props.openGraph.article.section ?? undefined,
						tags: props.openGraph.article.tags?.map((t) => t.tag),
					}
				: undefined,
		}
	}

	if (props.twitter) {
		result.twitter = {
			card: props.twitter.card ?? undefined,
			site: props.twitter.site ?? undefined,
			creator: props.twitter.creator ?? undefined,
			title: props.twitter.title ?? undefined,
			description: props.twitter.description ?? undefined,
			image: getImageUrl(props.twitter.image),
			imageAlt: props.twitter.imageAlt ?? undefined,
		}
	}

	if (props.extend) {
		result.extend = {
			link: props.extend.link?.map(({ rel, href, hreflang, type }) => ({
				rel: rel ?? undefined,
				href: href ?? undefined,
				hreflang: hreflang ?? undefined,
				type: type ?? undefined,
			})),
			meta: props.extend.meta?.map(({ name, property, content }) => ({
				name: name ?? undefined,
				property: property ?? undefined,
				content: content ?? undefined,
			})),
		}
	}

	return result
}
