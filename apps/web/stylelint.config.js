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
					'custom-media',
				],
			},
		],
		'no-descending-specificity': null,
		'import-notation': null,
		'comment-empty-line-before': null,
		'no-invalid-position-at-import-rule': null,
		'lightness-notation': null,
		'hue-degree-notation': null,
		'custom-property-pattern': null,
		'selector-class-pattern': null,
	},
}
