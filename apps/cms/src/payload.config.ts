import { postgresAdapter } from '@payloadcms/db-postgres'
import {
	BlocksFeature,
	FixedToolbarFeature,
	UploadFeature,
	lexicalEditor,
} from '@payloadcms/richtext-lexical'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { blocks } from './blocks'
import { buttonsBlock } from './blocks/buttonBlock/button.config'
import { collections } from './collections'
import { users } from './collections/auth/users.config'
import { env } from './env/server'
import { buttons } from './fields/button'
import { globals } from './globals'
import { useSendAdapter } from './lib/email/adapter'
import { mockEmailAdapter } from './lib/email/mockAdapter'
import { migrations } from './migrations'
import { plugins } from './plugins'
import { getAstroClient, getClient, getUrl } from './utils/getUrl'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
	onInit: async (payload) => {
		payload.logger.info('[payload init]')
	},
	serverURL: getUrl(),
	cors: [getUrl(), getClient(), getAstroClient()],
	csrf: [getUrl(), getClient(), getAstroClient()],
	endpoints: [],
	admin: {
		theme: 'light',
		meta: {
			title: `Admin | Spon corp`,
		},
		autoLogin:
			process.env.NODE_ENV === 'development'
				? {
						email: 'hello@spon.io',
						password: 'fishfish',
						prefillOnly: false,
					}
				: false,

		user: users.slug,
		importMap: {
			baseDir: path.resolve(dirname),
		},
		livePreview: {
			breakpoints: [
				{
					label: 'Mobile',
					name: 'mobile',
					width: 375,
					height: 667,
				},
				{
					label: 'Tablet',
					name: 'tablet',
					width: 768,
					height: 1024,
				},
				{
					label: 'Desktop',
					name: 'desktop',
					width: 1440,
					height: 900,
				},
			],
		},

		routes: {
			logout: '/auth/sign-out',
		},
	},
	db: postgresAdapter({
		prodMigrations: migrations,
		pool: {
			connectionString: env.DATABASE_URL,
		},
		push: false,
		migrationDir: path.join(dirname, 'migrations'),
		generateSchemaOutputFile: path.join(dirname, 'payload-generated-schema.ts'),
		idType: 'uuid',
	}),
	email:
		process.env.NODE_ENV === 'production'
			? useSendAdapter({
					defaultFromAddress: 'hello@spon.io',
					defaultFromName: 'Spon',
				})
			: mockEmailAdapter,
	editor: lexicalEditor({
		features({ defaultFeatures }) {
			return [
				...defaultFeatures,
				FixedToolbarFeature(),
				UploadFeature({
					collections: {
						uploads: {
							// media: 'media',
							fields: [
								{
									name: 'alt',
									type: 'text',
									label: 'Alt Text',
								},
							],
						},
					},
				}),
				BlocksFeature({
					// Block-level blocks
					blocks: [buttonsBlock],
				}),
			]
		},
	}),
	secret: env.PAYLOAD_SECRET,
	typescript: {
		outputFile: path.resolve(
			dirname,
			'../../../packages/payload-types/index.ts',
		),
	},

	plugins,
	collections,
	globals,
	blocks,
	sharp,
})
