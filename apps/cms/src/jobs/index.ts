import { JobsConfig } from 'payload'

export const jobs: JobsConfig = {
	access: {
		run: ({ req }): boolean => {
			console.log('[HELLO]', process.env.CRON_SECRET)

			// Allow logged in users to execute this endpoint (default)
			if (req.user) return true

			// If there is no logged in user, then check
			// for the Vercel Cron secret to be present as an
			// Authorization header:
			const authHeader = req.headers.get('authorization')
			console.log({ yup: authHeader === `Bearer ${process.env.CRON_SECRET}` })
			return authHeader === `Bearer ${process.env.CRON_SECRET}`
		},
	},
	tasks: [],
}
