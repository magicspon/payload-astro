import { betterAuthStrategy } from '@delmaredigital/payload-better-auth'
import {
	isAdmin,
	isAdminField,
	isAdminOrSelf,
} from '@delmaredigital/payload-better-auth'
import type { CollectionConfig } from 'payload'

export const users: CollectionConfig = {
	slug: 'users',
	auth: {
		disableLocalStrategy: true,
		strategies: [betterAuthStrategy()],
	},
	access: {
		read: isAdminOrSelf({ adminRoles: ['admin'] }),
		update: isAdminOrSelf({ adminRoles: ['admin'] }),
		delete: isAdmin({ adminRoles: ['admin'] }),
		admin: ({ req }) => req.user?.role === 'admin',
	},
	admin: {
		useAsTitle: 'email',
		group: 'Auth',
	},
	endpoints: [],
	fields: [
		{
			name: 'name',
			type: 'text',
		},
		{
			name: 'email',
			type: 'email',
			required: true,
			unique: true,
		},
		{
			name: 'image',
			type: 'text',
			required: false,
			admin: { description: 'Profile image URL' },
		},
		{
			admin: {
				position: 'sidebar',
				description: 'admin or user',
				isClearable: false,
			},
			name: 'role',
			type: 'select',
			options: [
				{ label: 'Admin', value: 'admin' },
				{ label: 'Editor', value: 'editor' },
				{ label: 'Contributor', value: 'contributor' },
				{ label: 'Member', value: 'member' },
				{ label: 'User', value: 'user' },
			],
			defaultValue: 'user',
			required: false,
			access: {
				update: isAdminField(),
				read: isAdminField(),
			},
		},
		{
			name: 'emailVerified',
			type: 'checkbox',
			defaultValue: false,
			required: false,
			admin: {
				position: 'sidebar',
			},
			access: {
				update: isAdminField(),
				read: isAdminField(),
			},
		},
	],
}
