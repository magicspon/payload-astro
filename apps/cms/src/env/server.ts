import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
	server: {
		DATABASE_URL: z.string().min(1),
		PAYLOAD_SECRET: z.string().min(24),
		PAYLOAD_BEARER_TOKEN: z.string().min(24),

		S3_BUCKET: z.string().min(1),
		S3_BUCKET_REGION: z.string().min(1),
		S3_ACCESS_KEY_ID: z.string().min(1),
		S3_SECRET_ACCESS_KEY: z.string().min(1),
		S3_ENDPOINT: z.url(),

		PREVIEW_SECRET: z.string(),
		CMS_URL: z.string(),
		CLIENT_URL: z.string(),

		PLAUSIBLE_API_KEY: z.string(),
		PLAUSIBLE_API_HOST: z.url(),
		USE_SEND_API_KEY: z.string(),
		USE_SEND_URL: z.url(),
		BETTER_AUTH_SECRET: z.string().min(24),
		BETTER_AUTH_URL: z.string(),
		GITHUB_AUTH_CLIENT_ID: z.string().min(4),
		GITHUB_AUTH_CLIENT_SECRET: z.string().min(12),

		TEST_ENV: z
			.string()
			.optional()
			.transform((v) => v === 'true')
			.default(false),
	},

	experimental__runtimeEnv: process.env,
	skipValidation: process.env.SKIP_ENV_VALIDATION === 'true', // Add this
})
