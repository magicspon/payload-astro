/**
 * CLI argument parsing utilities for the create-stub command
 */

export interface CliOptions {
	input: string
	output: string
	variant?: string
}

export function parseArgs(args: string[]): CliOptions {
	let input: string | undefined
	let output: string | undefined
	let variant: string | undefined

	for (let i = 0; i < args.length; i++) {
		const arg = args[i]

		if (arg === '--input' || arg === '-i') {
			input = args[++i]
		} else if (arg?.startsWith('--input=')) {
			input = arg.split('=')[1]
		} else if (arg === '--output' || arg === '-o') {
			output = args[++i]
		} else if (arg?.startsWith('--output=')) {
			output = arg.split('=')[1]
		} else if (arg === '--variant' || arg === '-v') {
			variant = args[++i]
		} else if (arg?.startsWith('--variant=')) {
			variant = arg.split('=')[1]
		} else if (arg?.startsWith('-')) {
			console.error(`Error: Unknown option "${arg}"`)
			printUsage()
			process.exit(1)
		}
	}

	if (!input) {
		console.error('Error: --input is required')
		printUsage()
		process.exit(1)
	}

	if (!output) {
		console.error('Error: --output is required')
		printUsage()
		process.exit(1)
	}

	return { input, output, variant }
}

function printUsage(): void {
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
}
