import {
	betterAuthCollections,
	createBetterAuthPlugin,
	payloadAdapter,
} from '@delmaredigital/payload-better-auth'
import { betterAuth } from 'better-auth'
import { env } from '@/env/server'
import { setPayloadInstance } from '@/lib/payload/instance'
import { getAstroClient, getUrl } from '@/utils/getUrl'
import { betterAuthOptions } from './config'
import { setAuthInstance } from './instance'

const baseUrl = getUrl()

export const authCollection = betterAuthCollections({
	betterAuthOptions,
	skipCollections: ['user'],
	firstUserAdmin: true,
})

export const authPlugin = createBetterAuthPlugin({
	createAuth: (payload) => {
		const auth = betterAuth({
			...betterAuthOptions,
			database: payloadAdapter({
				payloadClient: payload,
				adapterConfig: {
					enableDebugLogs: false,
				},
			}),
			advanced: {
				database: {
					generateId: 'uuid',
				},
			},
			baseURL: baseUrl,
			secret: env.BETTER_AUTH_SECRET,
			trustedOrigins: [baseUrl, getAstroClient()],
		})

		setAuthInstance(auth)
		setPayloadInstance(payload)

		return auth
	},

	admin: {
		betterAuthOptions,
		login: {
			enablePasskey: true,
			enableSignUp: true,
			enableForgotPassword: false,
			defaultSignUpRole: 'admin', // optional, default is 'user'
			requiredRole: ['admin'],
		},
	},
})
