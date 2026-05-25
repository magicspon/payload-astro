import { GlobalConfig } from 'payload'
import { isAnyone } from '@/access'

export const settings: GlobalConfig = {
	slug: 'settings',
	access: {
		read: isAnyone,
	},
	admin: {
		group: 'Content',
		hidden: true,
	},
	fields: [],
}
