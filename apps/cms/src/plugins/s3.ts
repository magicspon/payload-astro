import { s3Storage as _s3Storage } from '@payloadcms/storage-s3'
import { env } from '../env/server'

export const s3Storage = _s3Storage({
	collections: {
		media: true,
	},
	bucket: env.S3_BUCKET as string,
	config: {
		credentials: {
			accessKeyId: env.S3_ACCESS_KEY_ID as string,
			secretAccessKey: env.S3_SECRET_ACCESS_KEY as string,
		},
		region: env.S3_BUCKET_REGION as string,
		endpoint: env.S3_ENDPOINT as string,
		forcePathStyle: true,
	},
})
