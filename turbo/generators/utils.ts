import { readdirSync } from 'node:fs'
import path from 'node:path'

export const getDirectories = (root = 'packages') =>
	readdirSync(path.resolve(process.cwd(), root), { withFileTypes: true })
		.filter((dirent) => dirent.isDirectory())
		.map((dirent) => dirent.name)

export const validator = (input: string) => {
	if (input.includes('.')) {
		return 'file name cannot include an extension'
	}
	if (input.includes(' ')) {
		return 'file name cannot include spaces'
	}
	if (!input) {
		return 'file name is required'
	}
	return true
}
