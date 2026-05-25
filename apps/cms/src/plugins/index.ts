import type { Plugin } from 'payload'
import { authCollection, authPlugin } from '@/lib/auth/plugin'
import { forms } from './forms'
import { navigation } from './navigation'
import { nestedDocs } from './nestedDocs'
import { s3Storage } from './s3'
import { seo } from './seo'

export const plugins: Plugin[] = [
	s3Storage,
	seo,
	nestedDocs,
	authCollection,
	authPlugin,
	forms,
	navigation,
]
