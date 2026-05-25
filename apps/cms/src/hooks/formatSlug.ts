import { slugify } from '@spon/utils/slugify'
import type { FieldHook } from 'payload'

export const formatSlug =
	(fallback: string): FieldHook =>
	({ value, originalDoc, data }) => {
		if (typeof value === 'string' && value.length > 0) {
			return slugify(value, { strict: true, trim: true, lower: true })
		}

		const fallbackData = data?.[fallback] || originalDoc?.[fallback]

		if (fallbackData && typeof fallbackData === 'string') {
			return slugify(fallbackData, { strict: true, trim: true, lower: true })
		}
	}
