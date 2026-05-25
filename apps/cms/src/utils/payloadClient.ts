import configPromise from '@payload-config'
import { getPayload } from 'payload'

export async function payloadClient() {
	const payload = await getPayload({ config: configPromise })
	return payload
}
