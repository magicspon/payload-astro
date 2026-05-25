import { defaultPrompts } from '../shared'
import { validator } from '../utils'
import type { PlopTypes } from '@turbo/gen'

export const context = (plop: PlopTypes.NodePlopAPI) => {
	plop.setGenerator('context', {
		description: 'Create a new react context',
		prompts: [
			{
				type: 'input',
				name: 'func',
				message: 'What is the name of the context?',
				validate: validator,
			},
			...defaultPrompts,
		],
		actions: (answers) => {
			const outputPath = 'src/context'

			const actions = [
				{
					type: 'add',
					path: `{{ turbo.paths.root }}/{{ directory }}/{{ package }}/${outputPath}/{{ pascalCase func }}Context/{{ pascalCase func }}Context.tsx`,
					templateFile: 'context/context.ts.hbs',
				},
				{
					type: 'add',
					path: `{{ turbo.paths.root }}/{{ directory }}/{{ package }}/${outputPath}/{{ pascalCase func }}Context/index.ts`,
					templateFile: 'context/index.ts.hbs',
				},
			]

			return actions
		},
	})
}
