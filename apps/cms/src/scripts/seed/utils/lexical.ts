/**
 * Lexical richText JSON generator for seeding content
 * Generates varied content with headings, lists, formatting, etc.
 */
import { faker } from '@faker-js/faker'

// Text format flags (bitwise)
const FORMAT = {
	NORMAL: 0,
	BOLD: 1,
	ITALIC: 2,
	STRIKETHROUGH: 4,
	UNDERLINE: 8,
	CODE: 16,
} as const

// Use index signatures to match Payload's expected Lexical types
interface LexicalTextNode {
	[k: string]: unknown
	type: 'text'
	text: string
	format: number
	version: number
}

interface LexicalLinkNode {
	[k: string]: unknown
	type: 'link'
	children: LexicalTextNode[]
	direction: 'ltr'
	format: string
	indent: number
	version: number
	fields: {
		linkType: 'custom'
		url: string
		newTab: boolean
	}
}

interface LexicalParagraphNode {
	[k: string]: unknown
	type: 'paragraph'
	children: (LexicalTextNode | LexicalLinkNode)[]
	direction: 'ltr'
	format: string
	indent: number
	version: number
}

interface LexicalHeadingNode {
	[k: string]: unknown
	type: 'heading'
	tag: 'h1' | 'h2' | 'h3' | 'h4'
	children: LexicalTextNode[]
	direction: 'ltr'
	format: string
	indent: number
	version: number
}

interface LexicalListItemNode {
	[k: string]: unknown
	type: 'listitem'
	children: LexicalTextNode[]
	direction: 'ltr'
	format: string
	indent: number
	version: number
	value: number
}

interface LexicalListNode {
	[k: string]: unknown
	type: 'list'
	listType: 'bullet' | 'number'
	children: LexicalListItemNode[]
	direction: 'ltr'
	format: string
	indent: number
	version: number
	start: number
	tag: 'ul' | 'ol'
}

interface LexicalQuoteNode {
	[k: string]: unknown
	type: 'quote'
	children: LexicalTextNode[]
	direction: 'ltr'
	format: string
	indent: number
	version: number
}

type LexicalNode =
	| LexicalParagraphNode
	| LexicalHeadingNode
	| LexicalListNode
	| LexicalQuoteNode

export interface LexicalRoot {
	[k: string]: unknown
	root: {
		type: 'root'
		children: LexicalNode[]
		direction: 'ltr' | 'rtl' | null
		format: '' | 'left' | 'start' | 'center' | 'right' | 'end' | 'justify'
		indent: number
		version: number
	}
}

function createTextNode(
	text: string,
	format: number = FORMAT.NORMAL,
): LexicalTextNode {
	return {
		type: 'text',
		text,
		format,
		version: 1,
	}
}

function createLinkNode(text: string, url: string): LexicalLinkNode {
	return {
		type: 'link',
		children: [createTextNode(text)],
		direction: 'ltr',
		format: '',
		indent: 0,
		version: 1,
		fields: {
			linkType: 'custom',
			url,
			newTab: true,
		},
	}
}

function createParagraphNode(
	children: (LexicalTextNode | LexicalLinkNode)[],
): LexicalParagraphNode {
	return {
		type: 'paragraph',
		children,
		direction: 'ltr',
		format: '',
		indent: 0,
		version: 1,
	}
}

function createHeadingNode(
	tag: 'h1' | 'h2' | 'h3' | 'h4',
	text: string,
): LexicalHeadingNode {
	return {
		type: 'heading',
		tag,
		children: [createTextNode(text)],
		direction: 'ltr',
		format: '',
		indent: 0,
		version: 1,
	}
}

function createListItemNode(text: string, value: number): LexicalListItemNode {
	return {
		type: 'listitem',
		children: [createTextNode(text)],
		direction: 'ltr',
		format: '',
		indent: 0,
		version: 1,
		value,
	}
}

function createListNode(
	listType: 'bullet' | 'number',
	items: string[],
): LexicalListNode {
	return {
		type: 'list',
		listType,
		children: items.map((text, i) => createListItemNode(text, i + 1)),
		direction: 'ltr',
		format: '',
		indent: 0,
		version: 1,
		start: 1,
		tag: listType === 'bullet' ? 'ul' : 'ol',
	}
}

function createQuoteNode(text: string): LexicalQuoteNode {
	return {
		type: 'quote',
		children: [createTextNode(text)],
		direction: 'ltr',
		format: '',
		indent: 0,
		version: 1,
	}
}

/**
 * Generate a paragraph with mixed text formatting
 */
function generateFormattedParagraph(): LexicalParagraphNode {
	const children: (LexicalTextNode | LexicalLinkNode)[] = []

	// Normal text start
	children.push(createTextNode(faker.lorem.sentence() + ' '))

	// Bold text
	children.push(
		createTextNode(faker.lorem.words({ min: 2, max: 4 }), FORMAT.BOLD),
	)
	children.push(createTextNode(' '))

	// More normal text
	children.push(createTextNode(faker.lorem.sentence() + ' '))

	// Italic text
	children.push(
		createTextNode(faker.lorem.words({ min: 2, max: 3 }), FORMAT.ITALIC),
	)
	children.push(createTextNode(' '))

	// Normal ending
	children.push(createTextNode(faker.lorem.sentence()))

	return createParagraphNode(children)
}

/**
 * Generate a paragraph with inline code
 */
function generateParagraphWithCode(): LexicalParagraphNode {
	const children: LexicalTextNode[] = []

	children.push(createTextNode(faker.lorem.sentence() + ' '))
	children.push(
		createTextNode(
			faker.helpers.arrayElement([
				'const value = 42',
				'npm install',
				'function()',
				'return true',
				'async/await',
			]),
			FORMAT.CODE,
		),
	)
	children.push(createTextNode(' ' + faker.lorem.sentence()))

	return createParagraphNode(children)
}

/**
 * Generate a paragraph with a link
 */
function generateParagraphWithLink(): LexicalParagraphNode {
	const children: (LexicalTextNode | LexicalLinkNode)[] = []

	children.push(createTextNode(faker.lorem.sentence() + ' '))
	children.push(
		createLinkNode(faker.lorem.words({ min: 2, max: 4 }), faker.internet.url()),
	)
	children.push(createTextNode(' ' + faker.lorem.sentence()))

	return createParagraphNode(children)
}

/**
 * Generate a simple paragraph
 */
function generateSimpleParagraph(): LexicalParagraphNode {
	return createParagraphNode([createTextNode(faker.lorem.paragraph())])
}

/**
 * Generate a bullet list
 */
function generateBulletList(itemCount: number = 3): LexicalListNode {
	const items = Array.from({ length: itemCount }, () => faker.lorem.sentence())
	return createListNode('bullet', items)
}

/**
 * Generate a numbered list
 */
function generateNumberedList(itemCount: number = 4): LexicalListNode {
	const items = Array.from({ length: itemCount }, () => faker.lorem.sentence())
	return createListNode('number', items)
}

/**
 * Generate complete Lexical richText content with varied elements
 */
export function generateLexicalContent(
	{ longForm }: { longForm: boolean } = { longForm: true },
): LexicalRoot {
	const children: LexicalNode[] = []

	// Always start with an h2
	if (longForm) {
		children.push(
			createHeadingNode('h2', faker.lorem.words({ min: 3, max: 6 })),
		)

		// Add formatted paragraph
		children.push(generateFormattedParagraph())

		// Maybe add a bullet list (70% chance)
		if (Math.random() < 0.7) {
			children.push(generateBulletList(faker.number.int({ min: 3, max: 5 })))
		}

		// Add another paragraph
		children.push(generateSimpleParagraph())

		// Maybe add an h3 subheading (60% chance)
		if (Math.random() < 0.6) {
			children.push(
				createHeadingNode('h3', faker.lorem.words({ min: 2, max: 4 })),
			)
			children.push(generateParagraphWithLink())
		}

		// Maybe add a numbered list (50% chance)
		if (Math.random() < 0.5) {
			children.push(generateNumberedList(faker.number.int({ min: 3, max: 6 })))
		}

		// Maybe add a blockquote (40% chance)
		if (Math.random() < 0.4) {
			children.push(createQuoteNode(faker.lorem.sentence()))
		}

		// Maybe add paragraph with code (50% chance)
		if (Math.random() < 0.5) {
			children.push(generateParagraphWithCode())
		}
	}

	// End with a simple paragraph
	children.push(generateSimpleParagraph())

	return {
		root: {
			type: 'root',
			children,
			direction: 'ltr',
			format: '',
			indent: 0,
			version: 1,
		},
	}
}

/**
 * Generate shorter Lexical content (for subtitles, etc.)
 */
export function generateShortLexicalContent(): LexicalRoot {
	return {
		root: {
			type: 'root',
			children: [generateFormattedParagraph()],
			direction: 'ltr',
			format: '',
			indent: 0,
			version: 1,
		},
	}
}
