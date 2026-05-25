import { createEnv } from '@t3-oss/env-nextjs'
import z from 'zod'

export const env = createEnv({
	client: {
		NEXT_PUBLIC_CMS_URL: z.string(),
		NEXT_PUBLIC_PLAUSIBLE_DOMAIN: z.string(),
	},
	runtimeEnv: {
		NEXT_PUBLIC_CMS_URL: process.env.NEXT_PUBLIC_CMS_URL,
		NEXT_PUBLIC_PLAUSIBLE_DOMAIN: process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN,
	},
	skipValidation: process.env.SKIP_ENV_VALIDATION === 'true', // Add this
})
