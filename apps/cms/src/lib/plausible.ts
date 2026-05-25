import { env as publicEnv } from '../env/client'
import { env as serverEnv } from '../env/server'
import { up } from 'up-fetch'

/**
 * Get Plausible configuration
 */
export function getPlausibleConfig({ siteId }: { siteId?: string } = {}) {
	return {
		apiKey: serverEnv.PLAUSIBLE_API_KEY,
		siteId: siteId ?? publicEnv.NEXT_PUBLIC_PLAUSIBLE_DOMAIN,
		apiHost: serverEnv.PLAUSIBLE_API_HOST,
	}
}

export const analyticsClient = up(fetch, () => {
	const config = getPlausibleConfig()

	return {
		baseUrl: `${config.apiHost}/api/v1/stats/`,
		timeout: 30000,
		headers: {
			Authorization: `Bearer ${config.apiKey}`,
		},
		params: {
			site_id: config.siteId!,
		},
	}
})
