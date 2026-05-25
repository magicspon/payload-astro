import type { Auth } from 'better-auth/types'

type AuthInstance = Auth<any> | null

let authInstance: AuthInstance | null = null

export function setAuthInstance(auth: AuthInstance): void {
	authInstance = auth
}

export function getAuthInstance(): AuthInstance {
	if (!authInstance) {
		throw new Error('Auth not initialized')
	}
	return authInstance
}
