import { up } from 'up-fetch'

export const fetcher = up(fetch, () => ({
	baseUrl: '/api',
	timeout: 30000,
}))
