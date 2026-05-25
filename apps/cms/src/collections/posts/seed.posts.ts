/**
 * Posts collection generator
 * Creates blog posts with titles and author
 */
import { faker } from '@faker-js/faker'
import type { Post, User } from '@spon/payload-types'
import type { Payload } from 'payload'

export interface PostsGeneratorOptions {
	count: number
	adminUser: User
}

export async function generatePosts(
	payload: Payload,
	options: PostsGeneratorOptions,
): Promise<void> {
	const { count, adminUser } = options
	console.log(`\nGenerating ${count} posts...`)

	const createdPosts: Post[] = []

	for (let i = 0; i < count; i++) {
		try {
			const title = faker.lorem.sentence({ min: 3, max: 8 }).replace(/\.$/, '')

			console.log(`  [${i + 1}/${count}] Creating post: "${title}"`)

			const post = await payload.create({
				collection: 'posts',
				data: {
					title,
					slug: '', // Auto-generated from title by hook
					author: adminUser.id,
					_status: 'published',
				},
				depth: 0,
				draft: false,
			})

			createdPosts.push(post)
			console.log(`    Created with slug: ${post.slug}`)
		} catch (error) {
			console.error(`    Error creating post ${i + 1}:`, error)
		}
	}

	console.log(
		`\nPosts generation complete! Created ${createdPosts.length} posts.`,
	)
}

export async function cleanPosts(payload: Payload): Promise<void> {
	console.log('\nCleaning posts collection...')

	const posts = await payload.find({
		collection: 'posts',
		limit: 1000,
		depth: 0,
	})

	console.log(`  Found ${posts.docs.length} posts to delete`)

	for (const doc of posts.docs) {
		await payload.delete({
			collection: 'posts',
			id: doc.id,
		})
	}

	console.log('Posts cleanup complete!')
}
