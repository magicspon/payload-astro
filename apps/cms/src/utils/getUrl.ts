import { env as clientEnv } from '../env/client'
import { env as serverEnv } from '../env/server'

export function getUrl() {
	return serverEnv.CMS_URL
}

export function endpoint(path?: string) {
	return [getUrl(), path].filter(Boolean).join('/')
}

export function getClient() {
	return clientEnv.NEXT_PUBLIC_CMS_URL
}

export function getAstroClient() {
	return serverEnv.CLIENT_URL
}
