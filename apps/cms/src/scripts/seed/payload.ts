/**
 * Payload Local API initialization for seed scripts
 */
import config from '@payload-config'
import type { Payload } from 'payload'
import { getPayload } from 'payload'

let cachedPayload: Payload | null = null

export async function initPayload(): Promise<Payload> {
	if (cachedPayload) {
		return cachedPayload
	}

	console.log('Initializing Payload...')
	cachedPayload = await getPayload({ config })
	console.log('Payload initialized successfully')

	return cachedPayload
}

export async function getAdminUser(payload: Payload) {
	const users = await payload.find({
		collection: 'users',
		where: { email: { equals: 'magicspon@gmail.com' } },
		limit: 1,
	})

	const adminUser = users.docs[0]

	if (!adminUser) {
		throw new Error(
			'Admin user magicspon@gmail.com not found. Please ensure this user exists.',
		)
	}

	return adminUser
}
