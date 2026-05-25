import { PayloadSDK } from '@payloadcms/sdk'
import type { Config } from '@spon/payload-types'
import { env } from '~/env/server'

const BEARER_TOKEN = env.PAYLOAD_BEARER_TOKEN

export const sdk = new PayloadSDK<Config>({
	baseURL: `${env.CMS_URL}/api`,
})

/**
 * Call custom endpoints with bearer token authentication
 * Uses the SDK's request method with Authorization header
 */
export async function api<T = any>(
	path: string,
	options?: {
		method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
		body?: any
		headers?: Record<string, string>
	},
): Promise<T> {
	const { method = 'GET', body, headers = {} } = options || {}

	const response = await sdk.request({
		method,
		path,
		json: body,
		init: {
			headers: {
				Authorization: `Bearer ${BEARER_TOKEN}`,
				...headers,
			},
		},
	})

	if (!response.ok) {
		const error = await response
			.json()
			.catch(() => ({ error: response.statusText }))

		console.error(error)
		throw new Error(`Request failed: ${response.statusText}`)
	}

	return response.json() as Promise<T>
}
