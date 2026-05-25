import { defaultPrompts, withTest } from '../shared'
import { validator } from '../utils'
import type { PlopTypes } from '@turbo/gen'

export const hook = (plop: PlopTypes.NodePlopAPI) => {
	plop.setGenerator('hook', {
		description: 'Create a new hook with tests (optional)',
		prompts: [
			{
				type: 'input',
				name: 'func',
				message: 'What is the name of the hook?',
				validate: validator,
			},
			...defaultPrompts,
			withTest,
		],
		actions: (answers) => {
			const outputPath = answers?.package === 'hooks' ? 'src' : 'src/hooks'

			const actions = [
				{
					type: 'add',
					path: `{{ turbo.paths.root }}/{{ directory }}/{{ package }}/${outputPath}/use{{ pascalCase func }}/use{{ pascalCase func }}.ts`,
					templateFile: 'hook/hook.ts.hbs',
				},
				{
					type: 'add',
					path: `{{ turbo.paths.root }}/{{ directory }}/{{ package }}/${outputPath}/use{{ pascalCase func }}/index.ts`,
					templateFile: 'hook/index.ts.hbs',
				},
			]

			if (answers?.tests) {
				actions.push({
					type: 'add',
					path: `{{ turbo.paths.root }}/{{ directory }}/{{ package }}/${outputPath}/use{{ pascalCase func }}/use{{ pascalCase func }}.test.ts`,
					templateFile: 'hook/hook.test.ts.hbs',
				})
			}

			return actions
		},
	})
}
