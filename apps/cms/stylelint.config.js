/** @type {import('stylelint').Config} */
export default {
	extends: ['stylelint-config-standard'],
	rules: {
		'at-rule-no-unknown': [
			true,
			{
				ignoreAtRules: [
					'tailwind',
					'apply',
					'variants',
					'responsive',
					'screen',
					'source',
					'theme',
					'layer',
					'import-glob',
					'config',
				],
			},
		],
		'no-descending-specificity': null,
		'import-notation': null,
		'comment-empty-line-before': null,
		'no-invalid-position-at-import-rule': null,
		'lightness-notation': null,
		'hue-degree-notation': null,
		'selector-class-pattern': null,
	},
}
