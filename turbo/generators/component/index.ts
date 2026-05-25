import type { PlopTypes } from '@turbo/gen'
import { defaultPrompts, withTest } from '../shared'
import { getDirectories, validator } from '../utils'

export const component = (plop: PlopTypes.NodePlopAPI) => {
	plop.setGenerator('component', {
		description: 'Create a new component with tests and stories (optional)',
		prompts: [
			{
				type: 'input',
				name: 'func',
				message: 'What is the name of the component?',
				validate: validator,
			},
			...defaultPrompts,
			{
				type: 'list',
				name: 'folder',
				message: 'What folder should we use',
				validate: (input) => (input ? true : 'Subtitle cannot be empty'), // Optional validation
				choices: (answers) =>
					getDirectories(`${answers.directory}/${answers.package}/src`),
			},
			withTest,
			{
				type: 'confirm',
				name: 'stub',
				message: 'Do you want to include an stub file for dummy content?',
				default: false,
			},
			{
				type: 'confirm',
				name: 'astro',
				message: 'Do you want to include an Astro component?',
				default: false,
			},
			{
				type: 'confirm',
				name: 'stories',
				message: 'Do you want to include a story?',
				default: false,
			},
			{
				type: 'confirm',
				name: 'client',
				message: 'Is this a client component',
				default: false,
			},
			{
				type: 'confirm',
				name: 'variants',
				message: 'Do you want to use cva',
				default: false,
			},
			{
				type: 'confirm',
				name: 'css',
				message: 'Do you want to include a css file?',
				default: false,
			},
		],
		actions: (answers) => {
			const outputPath = `src/${answers?.folder}`
			const componentFilesName = answers?.astro
				? '{{ pascalCase func }}.client'
				: '{{ pascalCase func }}'

			const actions = [
				{
					type: 'add',
					path: `{{ turbo.paths.root }}/{{ directory }}/{{ package }}/${outputPath}/{{ pascalCase func }}/${componentFilesName}.tsx`,
					templateFile: 'component/component.ts.hbs',
				},
				{
					type: 'add',
					path: `{{ turbo.paths.root }}/{{ directory }}/{{ package }}/${outputPath}/{{ pascalCase func }}/index.ts`,
					templateFile: 'component/index.ts.hbs',
				},
			]

			if (answers?.tests) {
				actions.push({
					type: 'add',
					path: `{{ turbo.paths.root }}/{{ directory }}/{{ package }}/${outputPath}/{{ pascalCase func }}/{{ pascalCase func }}.test.tsx`,
					templateFile: 'component/component.test.ts.hbs',
				})
			}
			if (answers?.stories) {
				actions.push({
					type: 'add',
					path: `{{ turbo.paths.root }}/{{ directory }}/{{ package }}/${outputPath}/{{ pascalCase func }}/{{ pascalCase func }}.stories.tsx`,
					templateFile: 'component/component.stories.ts.hbs',
				})
			}

			if (answers?.stub) {
				actions.push({
					type: 'add',
					path: `{{ turbo.paths.root }}/{{ directory }}/{{ package }}/${outputPath}/{{ pascalCase func }}/{{ pascalCase func }}.stub.ts`,
					templateFile: 'component/component.stub.ts.hbs',
				})
			}

			if (answers?.astro) {
				actions.push({
					type: 'add',
					path: `{{ turbo.paths.root }}/{{ directory }}/{{ package }}/${outputPath}/{{ pascalCase func }}/{{ pascalCase func }}.astro`,
					templateFile: 'component/component.astro.hbs',
				})
			}

			if (answers?.css) {
				actions.push({
					type: 'add',
					path: `{{ turbo.paths.root }}/{{ directory }}/{{ package }}/${outputPath}/{{ pascalCase func }}/{{ pascalCase func }}.module.css`,
					templateFile: 'component/component.module.css.hbs',
				})
			}

			return actions
		},
	})
}
