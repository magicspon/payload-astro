#!/usr/bin/env tsx
/**
 * Create Stub CLI - Generate faker-based dummy content from Payload blocks
 *
 * Usage:
 *   pnpm create-stub --input <block> --output <directory> [--variant <name>]
 *
 * Options:
 *   --input, -i    Block name (e.g., textBlock) or path to block file
 *   --output, -o   Output directory for the stub file
 *   --variant, -v  Variant name for the export (optional, defaults to 'content')
 *
 * Examples:
 *   pnpm create-stub --input textBlock --output ../web/src/components/TextBlock
 *   pnpm create-stub -i hero -o ../web/src/components/Hero
 *   pnpm create-stub --input hero --output ../web/src/components/Hero --variant primary
 */
import {
	existsSync,
	mkdirSync,
	readFileSync,
	readdirSync,
	writeFileSync,
} from 'fs'
import { dirname, isAbsolute, join, resolve } from 'path'
import type { Block } from 'payload'
import { fileURLToPath } from 'url'
import { parseArgs } from './cli'
import { type GeneratedStub, generateStub } from './generator'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// CMS src directory
const CMS_SRC = resolve(__dirname, '../..')

function resolveBlockPath(input: string): string {
	// If it's already a path (contains / or ends with .ts)
	if (input.includes('/') || input.endsWith('.ts')) {
		const absolutePath = isAbsolute(input)
			? input
			: resolve(process.cwd(), input)
		if (!existsSync(absolutePath)) {
			console.error(`Error: Block file not found: ${absolutePath}`)
			process.exit(1)
		}
		return absolutePath
	}

	// Otherwise, treat as block name and look in blocks directory
	const blocksDir = join(CMS_SRC, 'blocks')
	const blockDir = join(blocksDir, input)
	const blockFile = join(blockDir, `${input}.config.ts`)

	if (existsSync(blockFile)) {
		return blockFile
	}

	// Try to find a matching directory
	if (existsSync(blocksDir)) {
		const dirs = readdirSync(blocksDir, { withFileTypes: true })
			.filter((d) => d.isDirectory())
			.map((d) => d.name)

		const match = dirs.find((d) => d.toLowerCase() === input.toLowerCase())
		if (match) {
			const matchedFile = join(blocksDir, match, `${input}.config.ts`)
			if (existsSync(matchedFile)) {
				return matchedFile
			}
		}
	}

	console.error(`Error: Could not find block "${input}"`)
	console.error(`Looked in: ${blocksDir}`)
	process.exit(1)
}

function findBlockExport(module: Record<string, unknown>): Block {
	// Look for a Block export
	for (const [, value] of Object.entries(module)) {
		if (
			value &&
			typeof value === 'object' &&
			'slug' in value &&
			'fields' in value
		) {
			return value as Block
		}
	}

	console.error('Error: No block export found in module')
	console.error('Expected an export with { slug, fields } properties')
	process.exit(1)
}

function toPascalCase(str: string): string {
	return str.charAt(0).toUpperCase() + str.slice(1)
}

function parseExistingStubFile(content: string): {
	imports: string[]
	exports: Map<string, string>
} {
	const imports: string[] = []
	const exports = new Map<string, string>()

	// Extract import statements
	const importRegex = /^import\s+.*$/gm
	let match
	while ((match = importRegex.exec(content)) !== null) {
		imports.push(match[0])
	}

	// Extract export statements with their content
	// Match: export const name: Type = { ... }
	const exportRegex = /export\s+const\s+(\w+):\s*(\w+)\s*=\s*(\{[\s\S]*?\n\})/g
	while ((match = exportRegex.exec(content)) !== null) {
		const [fullMatch, exportName] = match
		if (exportName) {
			exports.set(exportName, fullMatch)
		}
	}

	return { imports, exports }
}

function mergeStubFile(
	existingContent: string,
	newStub: GeneratedStub,
): string {
	const { exports } = parseExistingStubFile(existingContent)
	const { code, exportName, typeName } = newStub

	// Check if this export already exists
	if (exports.has(exportName)) {
		// Replace the existing export
		const exportRegex = new RegExp(
			`export\\s+const\\s+${exportName}:\\s*\\w+\\s*=\\s*\\{[\\s\\S]*?\\n\\}`,
			'g',
		)
		return existingContent.replace(exportRegex, code.trim())
	}

	// Check if import already exists
	const importStatement = `import type { ${typeName} } from '@spon/payload-types'`
	const hasImport = existingContent.includes(typeName)

	if (hasImport) {
		// Just append the new export
		return existingContent.trimEnd() + '\n\n' + code
	} else {
		// Need to add the type to imports
		// Try to find existing import from @spon/payload-types
		const payloadTypesImportRegex =
			/import\s+type\s*\{\s*([^}]+)\s*\}\s*from\s*['"]@spon\/payload-types['"]/
		const importMatch = existingContent.match(payloadTypesImportRegex)

		if (importMatch && importMatch[1]) {
			// Add type to existing import
			const existingTypes = importMatch[1]
			const newImport = `import type { ${existingTypes.trim()}, ${typeName} } from '@spon/payload-types'`
			const updatedContent = existingContent.replace(
				payloadTypesImportRegex,
				newImport,
			)
			return updatedContent.trimEnd() + '\n\n' + code
		} else {
			// Add new import at the top
			return (
				importStatement + '\n\n' + existingContent.trimEnd() + '\n\n' + code
			)
		}
	}
}

async function main() {
	const args = process.argv.slice(2)

	if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
		console.log(`
Usage: pnpm create-stub --input <block> --output <directory> [--variant <name>]

Options:
  --input, -i    Block name (e.g., textBlock) or path to block file
  --output, -o   Output directory for the stub file
  --variant, -v  Variant name for the export (optional, defaults to 'content')

Examples:
  pnpm create-stub --input textBlock --output ../web/src/components/TextBlock
  pnpm create-stub -i hero -o ../web/src/components/Hero
  pnpm create-stub --input hero --output ../web/src/components/Hero --variant primary
  pnpm create-stub -i hero -o ../web/src/components/Hero -v secondary
`)
		process.exit(0)
	}

	const { input, output, variant } = parseArgs(args)

	// Resolve block path
	const blockPath = resolveBlockPath(input)
	console.log(`Reading block from: ${blockPath}`)

	// Import the block module
	const blockModule = await import(blockPath)
	const block = findBlockExport(blockModule)
	console.log(`Found block: ${block.slug}`)

	// Resolve output directory
	const outputDir = isAbsolute(output) ? output : resolve(process.cwd(), output)

	// Ensure output directory exists
	if (!existsSync(outputDir)) {
		mkdirSync(outputDir, { recursive: true })
		console.log(`Created directory: ${outputDir}`)
	}

	// Generate stub
	const stub = await generateStub(block, { blockPath, outputDir, variant })

	// Determine stub file path
	const stubFileName = `${toPascalCase(block.slug)}.stub.ts`
	const stubPath = join(outputDir, stubFileName)

	let finalContent: string

	if (existsSync(stubPath)) {
		// File exists - merge the new export
		const existingContent = readFileSync(stubPath, 'utf-8')
		finalContent = mergeStubFile(existingContent, stub)
		console.log(`Appending export '${stub.exportName}' to: ${stubPath}`)
	} else {
		// New file - create with import and export
		const importStatement = `import type { ${stub.typeName} } from '@spon/payload-types'`
		finalContent = importStatement + '\n\n' + stub.code
		console.log(`Generated stub: ${stubPath}`)
	}

	writeFileSync(stubPath, finalContent)
	console.log(`Export name: ${stub.exportName}`)
}

main().catch((error) => {
	console.error('Error:', error.message)
	process.exit(1)
})
