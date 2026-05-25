import { getDirectories } from './utils'
import { type PlopGeneratorConfig } from 'node-plop'

export const defaultPrompts = [
	{
		type: 'list',
		name: 'directory',
		message: 'Directory?',
		choices: ['apps', 'packages'],
	},
	{
		type: 'list',
		name: 'package',
		message: 'Package?',
		choices: (answers) => getDirectories(answers.directory),
	},
] satisfies PlopGeneratorConfig['prompts']

export const withTest = {
	type: 'confirm',
	name: 'tests',
	message: 'Do you want to include a test?',
	default: false,
}
