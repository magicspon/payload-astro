import {
	FormBlock,
	Hero,
	ImageBlock,
	Page,
	Post,
	RelatedBlocks,
	TextBlock,
} from '@spon/payload-types'

export type BlockProps =
	| (Hero | TextBlock | FormBlock | RelatedBlocks | ImageBlock)[]
	| null

export type DefaultPage = {
	template: 'default'
	blocks?: BlockProps
}

export type ArticlePage = {
	template: 'article'
	blocks?: BlockProps
}

export type ListingPage = {
	template: 'listing'
	blocks?: BlockProps
	footer?: BlockProps
}

export type ContactPage = {
	template: 'contact'
	blocks?: BlockProps
}

export type Templates = DefaultPage | ArticlePage | ListingPage | ContactPage

export type Listing =
	| { list: 'posts'; entries?: Post[] }
	| { list: 'pages'; entries?: Page[] }
	| { list: 'children'; entries?: Page[] }
