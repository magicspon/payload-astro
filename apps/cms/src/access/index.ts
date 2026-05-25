import type { Access, ClientUser, PayloadRequest } from 'payload'
import type { User } from '@/payload-types'

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

type AdminHidden = (args: { user: ClientUser }) => boolean

type RuntimeUser = User | ClientUser

function getUser(req: PayloadRequest): RuntimeUser | null {
	return req.user as RuntimeUser | null
}

export const isAnyone: Access = () => true

export const isAuthenticated: Access = ({ req }) => !!req.user

export const isRegister: Access = ({ req: { user } }) => Boolean(user)

export const isSuper: Access = ({ req }) => getUser(req)?.role === 'admin'

export const isAdmin: Access = ({ req }) => getUser(req)?.role === 'admin'

export const notAdmin: AdminHidden = ({ user }) => user.role !== 'admin'

export const isAdminOrSelf: Access = ({ req }) => {
	const user = getUser(req)
	if (!user) return false
	if (user.role === 'admin') return true
	return { id: { equals: user.id } }
}
