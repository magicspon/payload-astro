'use client'

import { passkeyClient } from '@better-auth/passkey/client'
import {
	createAuthClient,
	payloadAuthPlugins,
} from '@delmaredigital/payload-better-auth/client'
import {
	adminClient,
	emailOTPClient,
	magicLinkClient,
} from 'better-auth/client/plugins'

export const authClient = createAuthClient({
	plugins: [
		...payloadAuthPlugins,
		passkeyClient(),
		magicLinkClient(),
		emailOTPClient(),
		adminClient(),
	],
})

export const { useSession, signIn, signOut, passkey, emailOtp, magicLink } =
	authClient
