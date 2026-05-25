import { hasRole, requireAllRoles } from '@delmaredigital/payload-better-auth'
import path from 'path'
import type { CollectionConfig } from 'payload'
import sharp from 'sharp'
import { download } from './endpoints/download'

export const media: CollectionConfig = {
	slug: 'media',
	upload: {
		imageSizes: [
			{
				name: 'thumbnail',
				width: 400,
				height: undefined,
				position: 'centre',
			},
			{
				name: 'card',
				width: 768,
				height: undefined,
				position: 'centre',
			},
			{
				name: 'tablet',
				width: 1024,
				height: undefined,
				position: 'centre',
			},
		],
	},
	endpoints: [download],
	hooks: {
		beforeOperation: [
			async ({ args, operation, req }) => {
				// Only process on create operations with file uploads
				if (operation === 'create' && args.req?.file) {
					const { file } = args.req

					// Check if optimization should be applied
					// Note: data.optimise won't be available yet, so we default to true
					// or you can check args.data?.optimise if it's in the form data
					const shouldOptimise = args.data?.optimise !== false

					if (shouldOptimise) {
						try {
							const buffer = file.data
							const originalName = file.name
							const ext = path.extname(originalName)
							const nameWithoutExt = path.basename(originalName, ext)

							// Only optimize image files
							if (file.mimetype?.startsWith('image/')) {
								const quality = args.data?.quality ?? 80
								const resizeWidth = args.data?.resizeWidth
								const resizeHeight = args.data?.resizeHeight
								const fit = args.data?.fit ?? true

								req.payload.logger.info(
									`Optimizing image: ${originalName} -> ${nameWithoutExt}.webp
                  \n(quality: ${quality},
                  \nwidth: ${resizeWidth || 'auto'},
                  \nheight: ${resizeHeight || 'auto'},
                  \nfit: ${fit}`,
								)

								// Start Sharp pipeline
								let sharpInstance = sharp(buffer)

								// Apply resizing if width or height is specified
								if (resizeWidth || resizeHeight) {
									sharpInstance = sharpInstance.resize(
										resizeWidth,
										resizeHeight,
										{
											fit,
											withoutEnlargement: true,
										},
									)
								}

								// Convert to WebP
								const optimizedBuffer = await sharpInstance
									.webp({ quality })
									.toBuffer()

								// Update the file data
								file.data = optimizedBuffer
								file.name = `${nameWithoutExt}.webp`
								file.mimetype = 'image/webp'
								file.size = optimizedBuffer.length

								req.payload.logger.info(`Image optimized: ${file.size} bytes`)
							}
						} catch (error) {
							console.error('Error optimizing image:', error)
						}
					}
				}

				return args
			},
		],
	},
	fields: [
		{
			name: 'alt',
			type: 'text',
			required: true,
		},
		{
			name: 'quality',
			type: 'number',
			required: true,
			min: 1,
			max: 100,
			defaultValue: 80,
			admin: {
				condition: (data) => !data?.id,
			},
		},
		{
			name: 'optimise',
			label: 'Optimise (recommended)',
			type: 'checkbox',
			defaultValue: true,
			admin: {
				description: 'Optimize image to WebP format',
				condition: (data) => !data?.id,
			},
		},
		{
			type: 'row',
			fields: [
				{
					name: 'resizeWidth',
					label: 'Width',
					type: 'number',
					admin: {
						condition: (data) => !data?.id,
						description: 'Width of the image',
					},
				},
				{
					name: 'resizeHeight',
					label: 'Height',
					type: 'number',
					admin: {
						condition: (data) => !data?.id,
						description: 'Height of the image',
					},
				},
				{
					name: 'fit',
					type: 'select',
					options: [
						{ label: 'Cover', value: 'cover' },
						{ label: 'Contain', value: 'contain' },
						{ label: 'Fill', value: 'fill' },
						{ label: 'Inside', value: 'inside' },
						{ label: 'Outside', value: 'outside' },
					],
					defaultValue: 'cover',
					required: true,
					admin: {
						description: 'How to fit the image',
						condition: (data) => !data?.id,
					},
				},
			],
		},
	],
	admin: {
		group: 'Uploads',
	},
	access: {
		read: () => true,
		create: hasRole(['editor', 'admin']),
		update: hasRole(['editor', 'admin']),
		delete: requireAllRoles(['admin']),
	},
}
