import { passkey } from '@better-auth/passkey'
import type { BetterAuthOptions } from 'better-auth'
import { emailOTP, magicLink } from 'better-auth/plugins'
import { IS_DEV } from '@/utils/env'
import { getUrl } from '@/utils/getUrl'

const baseUrl = getUrl()

const RATE_LIMIT_ENABLED = !IS_DEV

export const betterAuthOptions = {
	user: {
		additionalFields: {
			role: { type: 'string', defaultValue: 'user' },
		},
	},
	session: {
		expiresIn: 60 * 60 * 24 * 30, // 30 days
	},
	// Disable rate limiting in CI/test — the e2e suite fires many sign-in
	// requests in quick succession (one per describe block) and would otherwise
	// hit the built-in 429 threshold before all users have authenticated.
	rateLimit: {
		enabled: RATE_LIMIT_ENABLED,
	},
	emailAndPassword: {
		enabled: true,
		// Magic link / OTP authenticate via email implicitly, so hard verification
		// is redundant for most flows. Disabled in CI to allow seed scripts to run.
		requireEmailVerification: !IS_DEV,
	},
	emailVerification: {
		sendVerificationEmail: async ({ user, url }) => {
			if (IS_DEV) return
			// await sendEmail({
			// 	name: 'verifyEmail',
			// 	props: {
			// 		to: user.email,
			// 		subject: 'Verify your email address',
			// 		data: {
			// 			company: 'Spring | Proxy',
			// 			verifyUrl: url,
			// 			baseUrl: env.CMS_URL,
			// 			siteUrl: env.STUDIO_URL,
			// 		},
			// 	},
			// })
		},
		autoSignInAfterVerification: true,
		sendOnSignUp: true,
	},
	plugins: [
		passkey({
			rpID: new URL(baseUrl).hostname,
			rpName: 'Spon',
			origin: baseUrl,
		}),
		magicLink({
			sendMagicLink: async ({ email, token, url }) => {
				if (IS_DEV) return

				// await sendEmail({
				// 	name: 'magicLink',
				// 	props: {
				// 		to: email,
				// 		subject: 'Magic Link',
				// 		data: {
				// 			company: 'Spring | Proxy',
				// 			baseUrl: env.CMS_URL,
				// 			siteUrl: env.STUDIO_URL,
				// 			loginUrl: url,
				// 			token,
				// 		},
				// 	},
				// })
			},
		}),
		emailOTP({
			otpLength: 6,
			expiresIn: 300,
			async sendVerificationOTP({ email, otp }) {
				if (IS_DEV) return
				// await sendEmail({
				// 	name: 'otp',
				// 	props: {
				// 		to: email,
				// 		subject: 'OTP Verification',
				// 		data: {
				// 			company: 'Spring | Proxy',
				// 			validationCode: otp,
				// 			baseUrl: env.CMS_URL,
				// 			siteUrl: env.STUDIO_URL,
				// 			loginUrl: `${env.STUDIO_URL}/admin/login?otp`,
				// 		},
				// 	},
				// })
			},
		}),
	],
} satisfies BetterAuthOptions
