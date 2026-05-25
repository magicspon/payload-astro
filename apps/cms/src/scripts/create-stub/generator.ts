import { initPayload } from '@/scripts/seed/payload'
import type { Media } from '@spon/payload-types'
import { existsSync } from 'fs'
import { dirname, join } from 'path'
import type { Block, Field } from 'payload'

interface GeneratorOptions {
	blockPath: string
	outputDir: string
	variant?: string
}

export interface GeneratedStub {
	code: string
	exportName: string
	typeName: string
}

function toPascalCase(str: string): string {
	return str.charAt(0).toUpperCase() + str.slice(1)
}

async function fetchMediaItems(): Promise<Media[]> {
	try {
		const payload = await initPayload()
		const result = await payload.find({
			collection: 'media',
			limit: 100,
		})
		return result.docs as Media[]
	} catch (error) {
		console.warn('Could not fetch media items:', error)
		return []
	}
}

function findSeedFile(blockPath: string, blockSlug: string): string | null {
	const blockDir = dirname(blockPath)
	const possibleNames = [
		`seed.${blockSlug}.ts`,
		`seed.${toPascalCase(blockSlug)}.ts`,
		'seed.ts',
	]

	for (const name of possibleNames) {
		const seedPath = join(blockDir, name)
		if (existsSync(seedPath)) {
			return seedPath
		}
	}

	return null
}

export async function generateStub(
	block: Block,
	options: GeneratorOptions,
): Promise<GeneratedStub> {
	const { blockPath, variant } = options
	const typeName = toPascalCase(block.slug)
	const exportName = variant || 'content'
	const seedPath = findSeedFile(blockPath, block.slug)

	let code: string
	if (seedPath) {
		// Seed file exists - import and execute the generator to get actual data
		code = await generateStubFromSeed(
			block,
			seedPath,
			typeName,
			exportName,
			variant,
		)
	} else {
		// No seed file - generate inline stub with placeholder data
		code = generateInlineStub(block, typeName, exportName)
	}

	return { code, exportName, typeName }
}

async function generateStubFromSeed(
	block: Block,
	seedPath: string,
	typeName: string,
	exportName: string,
	variant?: string,
): Promise<string> {
	// Dynamically import the seed module and call the generator
	const seedModule = await import(seedPath)

	// Find the generator function
	const generatorName = Object.keys(seedModule).find(
		(key) =>
			key.startsWith('generate') && typeof seedModule[key] === 'function',
	)

	if (!generatorName) {
		// Fallback to inline generation
		return generateInlineStub(block, typeName, exportName)
	}

	// Fetch media items from the database
	const mediaItems = await fetchMediaItems()

	// Call the generator with media items and optional variant
	const generator = seedModule[generatorName]
	const data = generator(mediaItems, variant)

	// Serialize the data to a TypeScript literal
	const serialized = serializeToTypeScript(data, 1)

	return `export const ${exportName}: ${typeName} = ${serialized}
`
}

function generateInlineStub(
	block: Block,
	typeName: string,
	exportName: string,
): string {
	const data = generateDataFromFields(block.fields, block.slug)
	const serialized = serializeToTypeScript(data, 1)

	return `export const ${exportName}: ${typeName} = ${serialized}
`
}

function generateDataFromFields(
	fields: Field[],
	blockSlug: string,
): Record<string, unknown> {
	const data: Record<string, unknown> = {
		blockType: blockSlug,
	}

	for (const field of fields) {
		if (!('name' in field) || !field.name) continue
		if (field.name === 'blockType') continue

		const value = generateFieldValue(field)
		if (value !== undefined) {
			data[field.name] = value
		}
	}

	return data
}

function generateFieldValue(field: Field): unknown {
	if (!('type' in field)) return undefined

	switch (field.type) {
		case 'text':
			if (field.name?.toLowerCase().includes('title')) {
				return 'Example Title'
			}
			if (field.name?.toLowerCase().includes('email')) {
				return 'example@email.com'
			}
			return 'Example text'

		case 'textarea':
			return 'Example paragraph text content.'

		case 'number':
			return 42

		case 'email':
			return 'example@email.com'

		case 'richText':
			return generateLexicalPlaceholder()

		case 'select':
		case 'radio':
			if ('options' in field && Array.isArray(field.options)) {
				const firstOption = field.options[0]
				if (firstOption) {
					return typeof firstOption === 'string'
						? firstOption
						: firstOption.value
				}
			}
			return null

		case 'checkbox':
			return false

		case 'date':
			return new Date().toISOString()

		case 'upload':
			return null

		case 'relationship':
			if ('hasMany' in field && field.hasMany) {
				return []
			}
			return null

		case 'array':
			return []

		case 'group':
			if ('fields' in field && Array.isArray(field.fields)) {
				const groupData: Record<string, unknown> = {}
				for (const subField of field.fields) {
					if ('name' in subField && subField.name) {
						const value = generateFieldValue(subField)
						if (value !== undefined) {
							groupData[subField.name] = value
						}
					}
				}
				return groupData
			}
			return {}

		case 'blocks':
			return []

		default:
			return undefined
	}
}

function generateLexicalPlaceholder(): Record<string, unknown> {
	return {
		root: {
			type: 'root',
			children: [
				{
					type: 'paragraph',
					version: 1,
					children: [
						{
							type: 'text',
							version: 1,
							text: 'Example content paragraph.',
							format: 0,
							mode: 'normal',
						},
					],
					direction: 'ltr',
					format: '',
					indent: 0,
				},
			],
			direction: 'ltr',
			format: '',
			indent: 0,
			version: 1,
		},
	}
}

export function serializeToTypeScript(value: unknown, indent: number): string {
	const spaces = '  '.repeat(indent)
	const prevSpaces = '  '.repeat(indent - 1)

	if (value === null) {
		return 'null'
	}

	if (value === undefined) {
		return 'undefined'
	}

	if (typeof value === 'string') {
		// Escape special characters and use single quotes
		const escaped = value
			.replace(/\\/g, '\\\\')
			.replace(/'/g, "\\'")
			.replace(/\n/g, '\\n')
		return `'${escaped}'`
	}

	if (typeof value === 'number' || typeof value === 'boolean') {
		return String(value)
	}

	if (Array.isArray(value)) {
		if (value.length === 0) {
			return '[]'
		}
		const items = value.map(
			(item) => `${spaces}${serializeToTypeScript(item, indent + 1)}`,
		)
		return `[\n${items.join(',\n')},\n${prevSpaces}]`
	}

	if (typeof value === 'object') {
		const entries = Object.entries(value)
		if (entries.length === 0) {
			return '{}'
		}
		const props = entries.map(([key, val]) => {
			const serializedVal = serializeToTypeScript(val, indent + 1)
			// Use quotes for keys with special characters
			const safeKey = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key) ? key : `'${key}'`
			return `${spaces}${safeKey}: ${serializedVal}`
		})
		return `{\n${props.join(',\n')},\n${prevSpaces}}`
	}

	return String(value)
}
