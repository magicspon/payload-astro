import { formsPlugin } from '@spon/payload-forms'

export const forms = formsPlugin({
	collections: {
		forms: {
			access: { create: () => true, read: () => true },
		},
	},
})
