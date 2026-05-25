import { CollectionConfig } from 'payload'
import { users } from './auth/users.config'
import { media } from './media/media.config'
import { pages } from './pages/pages.config'
import { posts } from './posts/posts.config'

export const collections: CollectionConfig[] = [media, pages, posts, users]
