# Payload CMS

A headless CMS built with [Payload](https://github.com/payloadcms/payload) and integrated with tRPC for type-safe API endpoints.

## Quick Start

1. Copy the environment variables:

   ```bash
   cp .env.example .env
   ```

2. Install dependencies and start the server:

   ```bash
   pnpm install
   pnpm dev
   ```

3. Access the application:
   - Home page: `http://localhost:3000`
   - Admin panel: `http://localhost:3000/admin`

## Collections

See the [Collections](https://payloadcms.com/docs/configuration/collections) docs for details on how to extend any of this functionality.

### Users

The `users` collection is auth-enabled for managing authenticated users. For additional help with authentication, see the official [Auth Example](https://github.com/payloadcms/payload/tree/main/examples/cms#readme) or the [Authentication](https://payloadcms.com/docs/authentication/overview#authentication-overview) docs.

### Pages

The `pages` collection manages page content with support for slugs and tRPC endpoints for querying pages by slug or listing all pages.

For more details on access control, see the [Payload Access Control](https://payloadcms.com/docs/access-control/overview#access-control) docs.

## Database Migrations

This project uses PayloadCMS migrations to manage database schema changes. Auto-push is **disabled** (`push: false`) to ensure all schema changes go through migrations.

### Workflow

1. **Make schema changes** to your collections/globals
2. **Generate a migration**:
   ```bash
   npx payload migrate:create
   ```
3. **Run the migration**:
   ```bash
   npx payload migrate
   ```

### Important Notes

- Never run Payload with auto-push enabled in this project
- Always generate and run migrations for schema changes
- Migration files are located in `src/migrations/`
- The `payload_migrations` table tracks which migrations have been applied

### Migration Commands

- `npx payload migrate:create` - Generate a new migration from schema changes
- `npx payload migrate` - Run pending migrations
- `npx payload migrate:status` - Check migration status
- `npx payload migrate:down` - Rollback the last migration
- `npx payload migrate:refresh` - Rollback all migrations and re-run them

## Questions

If you have any issues or questions, reach out to us on [Discord](https://discord.com/invite/payload) or start a [GitHub discussion](https://github.com/payloadcms/payload/discussions).

---

# tRPC Integration

This Payload CMS includes a full tRPC setup for type-safe API endpoints.

## 🚀 What's Included

- **Full type-safety** between frontend and backend
- **React Query integration** ready
- **Bearer token authentication** by default
- **Payload CMS context** in all procedures
- **Collection-specific routers** for custom endpoints per collection

## 📁 Directory Structure

```
trpc/
├── context.ts              # Creates context for each request
├── trpc.ts                 # tRPC initialization and procedures
├── routers/
│   ├── _app.ts            # Main router (exports AppRouter type)
│   ├── health.ts          # Health check example
│   ├── globals.ts         # Payload globals CRUD example
│   └── pages.ts           # Pages collection router
└── index.ts               # Public exports for frontend
```

## 📍 Endpoint Structure

All tRPC endpoints are accessible at `/api/trpc/*`:

```
/api/trpc/health.check
/api/trpc/globals.get
/api/trpc/pages.getBySlug
/api/trpc/pages.list
```

## 🗺️ All Available Endpoints

All routes are accessible at `/api/trpc/*`

#### Health Router

- `health.check` - Health check with timestamp

#### Globals Router

- `globals.get` - Get a Payload global by slug

#### Pages Router

- `pages.getBySlug` - Get a page by slug
- `pages.list` - List pages with pagination

## 🔑 Authentication

All tRPC procedures require **Bearer token authentication by default**.

### Available Procedures

#### 1. `baseProcedure` (Default - Bearer Token Required)

The base procedure that all endpoints should use. Requires a valid bearer token in the `Authorization` header.

```ts
import { baseProcedure, router } from '../trpc'
import { z } from 'zod'

export const myRouter = router({
	getData: baseProcedure
		.input(z.object({ id: z.string() }))
		.query(async ({ ctx, input }) => {
			// Bearer token is already validated
			return await ctx.req.payload.findByID({
				collection: 'items',
				id: input.id,
			})
		}),
})
```

**Required Header:**

```
Authorization: Bearer <your-token>
```

#### 2. `protectedProcedure` (Bearer + User Auth)

Requires both bearer token AND a logged-in Payload user.

```ts
export const myRouter = router({
	updateProfile: protectedProcedure
		.input(z.object({ name: z.string() }))
		.mutation(async ({ ctx, input }) => {
			// Both bearer token and user are validated
			// ctx.user is guaranteed to exist
			return await ctx.req.payload.update({
				collection: 'users',
				id: ctx.user.id,
				data: { name: input.name },
			})
		}),
})
```

#### 3. `adminProcedure` (Bearer + Admin User)

Requires bearer token AND a logged-in Payload user with admin role.

```ts
export const myRouter = router({
	deleteUser: adminProcedure
		.input(z.object({ id: z.string() }))
		.mutation(async ({ ctx, input }) => {
			// Bearer token, user, and admin role are all validated
			return await ctx.req.payload.delete({
				collection: 'users',
				id: input.id,
			})
		}),
})
```

#### 4. `publicProcedure` (⚠️ No Authentication)

**NOT RECOMMENDED** - Bypasses all authentication. Only use for truly public endpoints.

```ts
export const myRouter = router({
	// ⚠️ Use sparingly!
	getPublicData: publicProcedure.query(async ({ ctx }) => {
		// No authentication required
		return { message: 'This is public' }
	}),
})
```

### Setting Up Bearer Token

The bearer token is validated against the `PAYLOAD_BEARER_TOKEN` environment variable.

**`.env` file:**

```bash
PAYLOAD_BEARER_TOKEN=your-secret-token-here
```

### Error Responses

**Missing Bearer Token:**

```json
{
	"error": {
		"message": "Authorization header is required",
		"code": "UNAUTHORIZED"
	}
}
```

**Invalid Bearer Token:**

```json
{
	"error": {
		"message": "Invalid bearer token",
		"code": "UNAUTHORIZED"
	}
}
```

**Missing User (protectedProcedure):**

```json
{
	"error": {
		"message": "You must be logged in to access this resource",
		"code": "UNAUTHORIZED"
	}
}
```

**Not Admin (adminProcedure):**

```json
{
	"error": {
		"message": "You must be an admin to access this resource",
		"code": "FORBIDDEN"
	}
}
```

### Security Best Practices

1. **Never commit your bearer token** - Use environment variables
2. **Rotate tokens regularly** - Update `PAYLOAD_BEARER_TOKEN` periodically
3. **Use HTTPS in production** - Never send bearer tokens over HTTP
4. **Use `baseProcedure` by default** - Only use `publicProcedure` when absolutely necessary
5. **Combine with user auth** - Use `protectedProcedure` for user-specific operations

## 📡 Making Requests

### cURL Examples

```bash
# Health check
curl http://localhost:3000/api/trpc/health.check \
  -H "Authorization: Bearer your-token"

# Get global
curl "http://localhost:3000/api/trpc/globals.get?input=%7B%22slug%22%3A%22home%22%7D" \
  -H "Authorization: Bearer your-token"

# Get page by slug
curl "http://localhost:3000/api/trpc/pages.getBySlug?input=%7B%22slug%22%3A%22about%22%7D" \
  -H "Authorization: Bearer your-token"

# List pages
curl "http://localhost:3000/api/trpc/pages.list?input=%7B%22page%22%3A1%2C%22limit%22%3A10%7D" \
  -H "Authorization: Bearer your-token"
```

### TypeScript Client

```ts
import type { AppRouter } from '@spon/cms/trpc'
import { createTRPCClient, httpBatchLink } from '@trpc/client'

const trpc = createTRPCClient<AppRouter>({
	links: [
		httpBatchLink({
			url: 'http://localhost:3000/api/trpc',
			headers: {
				authorization: `Bearer ${process.env.BEARER_TOKEN}`,
			},
		}),
	],
})

// Global endpoints
const health = await trpc.health.check.query()
const home = await trpc.globals.get.query({ slug: 'home' })

// Collection endpoints
const page = await trpc.pages.getBySlug.query({ slug: 'about' })
const pages = await trpc.pages.list.query({ page: 1, limit: 10 })
```

### React Hooks

```tsx
function MyComponent() {
	// Global endpoints
	const { data: health } = trpc.health.check.useQuery()
	const { data: home } = trpc.globals.get.useQuery({ slug: 'home' })

	// Collection endpoints
	const { data: page } = trpc.pages.getBySlug.useQuery({ slug: 'about' })
	const { data: pages } = trpc.pages.list.useQuery({ page: 1, limit: 10 })

	return <div>...</div>
}
```

## 🔍 Testing Endpoints

### Using VS Code REST Client

Create a `.http` file:

```http
### Health Check
GET http://localhost:3000/api/trpc/health.check
Authorization: Bearer your-token

### Get Global
GET http://localhost:3000/api/trpc/globals.get?input={"slug":"home"}
Authorization: Bearer your-token

### Get Page
GET http://localhost:3000/api/trpc/pages.getBySlug?input={"slug":"about"}
Authorization: Bearer your-token

### List Pages
GET http://localhost:3000/api/trpc/pages.list?input={"page":1,"limit":10}
Authorization: Bearer your-token
```

## 🎯 Quick Reference

All endpoints are accessible at `/api/trpc/{router}.{procedure}`:

| Router  | Procedure | Example                     |
| ------- | --------- | --------------------------- |
| health  | check     | `/api/trpc/health.check`    |
| globals | get       | `/api/trpc/globals.get`     |
| pages   | getBySlug | `/api/trpc/pages.getBySlug` |
| pages   | list      | `/api/trpc/pages.list`      |

All endpoints require `Authorization: Bearer <token>` header.

---

# Adding Custom tRPC Routers

You can add custom routers to the main tRPC app router.

## 🚀 Quick Start

### 1. Create a Router

Create a router file in `src/trpc/routers/[name].ts`:

```ts
// src/trpc/routers/posts.ts
import { baseProcedure, router } from '../trpc'
import { z } from 'zod'

export const postsRouter = router({
	getBySlug: baseProcedure
		.input(
			z.object({
				slug: z.string().min(1),
			}),
		)
		.query(async ({ ctx, input }) => {
			const result = await ctx.req.payload.find({
				collection: 'posts',
				where: { slug: { equals: input.slug } },
				limit: 1,
			})
			return result.docs[0] || null
		}),

	list: baseProcedure
		.input(
			z.object({
				page: z.number().default(1),
				limit: z.number().default(10),
			}),
		)
		.query(async ({ ctx, input }) => {
			return await ctx.req.payload.find({
				collection: 'posts',
				page: input.page,
				limit: input.limit,
			})
		}),
})
```

### 2. Add to App Router

Update `src/trpc/routers/_app.ts`:

```ts
import { postsRouter } from './posts'

export const appRouter = router({
	health: healthRouter,
	globals: globalsRouter,
	pages: pagesRouter,
	posts: postsRouter, // Add this
})
```

Done! Your endpoints are now available at `/api/trpc/posts.*`

## 📁 Recommended Router Structure

### Basic CRUD Router

```ts
import { baseProcedure, protectedProcedure, router } from '../trpc'
import { z } from 'zod'

export const postsRouter = router({
	// READ operations
	getById: baseProcedure
		.input(z.object({ id: z.string() }))
		.query(async ({ ctx, input }) => {
			return await ctx.req.payload.findByID({
				collection: 'posts',
				id: input.id,
			})
		}),

	getBySlug: baseProcedure
		.input(z.object({ slug: z.string() }))
		.query(async ({ ctx, input }) => {
			const result = await ctx.req.payload.find({
				collection: 'posts',
				where: { slug: { equals: input.slug } },
				limit: 1,
			})
			return result.docs[0] || null
		}),

	list: baseProcedure
		.input(
			z.object({
				page: z.number().int().positive().default(1),
				limit: z.number().int().min(1).max(100).default(10),
				where: z.record(z.any()).optional(),
			}),
		)
		.query(async ({ ctx, input }) => {
			return await ctx.req.payload.find({
				collection: 'posts',
				page: input.page,
				limit: input.limit,
				where: input.where,
			})
		}),

	// WRITE operations (protected)
	create: protectedProcedure
		.input(
			z.object({
				title: z.string().min(1),
				content: z.string(),
				slug: z.string().optional(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			return await ctx.req.payload.create({
				collection: 'posts',
				data: input,
			})
		}),

	update: protectedProcedure
		.input(
			z.object({
				id: z.string(),
				data: z.object({
					title: z.string().optional(),
					content: z.string().optional(),
				}),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			return await ctx.req.payload.update({
				collection: 'posts',
				id: input.id,
				data: input.data,
			})
		}),

	delete: protectedProcedure
		.input(z.object({ id: z.string() }))
		.mutation(async ({ ctx, input }) => {
			return await ctx.req.payload.delete({
				collection: 'posts',
				id: input.id,
			})
		}),
})
```

## 🔍 Advanced Patterns

### Search with Filters

```ts
search: baseProcedure
  .input(z.object({
    query: z.string(),
    category: z.string().optional(),
    tags: z.array(z.string()).optional(),
    page: z.number().default(1),
  }))
  .query(async ({ ctx, input }) => {
    const where: any = {
      or: [
        { title: { contains: input.query } },
        { content: { contains: input.query } },
      ],
    }

    if (input.category) {
      where.category = { equals: input.category }
    }

    if (input.tags?.length) {
      where.tags = { in: input.tags }
    }

    return await ctx.req.payload.find({
      collection: 'posts',
      where,
      page: input.page,
    })
  }),
```

### Nested Relations

```ts
getWithAuthor: baseProcedure
  .input(z.object({ id: z.string() }))
  .query(async ({ ctx, input }) => {
    return await ctx.req.payload.findByID({
      collection: 'posts',
      id: input.id,
      depth: 2, // Populate relationships
    })
  }),
```

### Custom Business Logic

```ts
publish: protectedProcedure
  .input(z.object({ id: z.string() }))
  .mutation(async ({ ctx, input }) => {
    // Check if user can publish
    if (!ctx.user.canPublish) {
      throw new TRPCError({
        code: 'FORBIDDEN',
        message: 'You cannot publish posts',
      })
    }

    return await ctx.req.payload.update({
      collection: 'posts',
      id: input.id,
      data: {
        status: 'published',
        publishedAt: new Date().toISOString(),
      },
    })
  }),
```

## 🎯 URL Structure

For a router `posts`:

```
GET  /api/trpc/posts.getBySlug?input={"slug":"hello"}
POST /api/trpc/posts.create
GET  /api/trpc/posts.list?input={"page":1}
```

## 🔒 Security

All collection routers inherit the same bearer token authentication:

- **`baseProcedure`** - Requires bearer token (default)
- **`protectedProcedure`** - Requires bearer token + logged-in user
- **`adminProcedure`** - Requires bearer token + admin user

```ts
// Public read, protected write
export const postsRouter = router({
  list: baseProcedure.query(...),        // Requires bearer token
  create: protectedProcedure.mutation(...), // Requires bearer + user
  delete: adminProcedure.mutation(...),     // Requires bearer + admin
})
```

## 📊 Type Safety

The frontend automatically gets full type safety:

```ts
// Frontend knows exactly what endpoints exist and their types
const post = await trpc.posts.getBySlug.query({
	slug: 'hello', // ✅ TypeScript knows this is required
})

post.title // ✅ Full type inference
post.notAField // ❌ TypeScript error
```

## 🧩 Multiple Routers Example

```ts
// src/trpc/routers/posts.ts
export const postsRouter = router({ ... })

// src/trpc/routers/pages.ts
export const pagesRouter = router({ ... })

// src/trpc/routers/media.ts
export const mediaRouter = router({ ... })
```

Then in `src/trpc/routers/_app.ts`:

```ts
import { mediaRouter } from './media'
import { pagesRouter } from './pages'
import { postsRouter } from './posts'

export const appRouter = router({
	health: healthRouter,
	globals: globalsRouter,
	posts: postsRouter,
	pages: pagesRouter,
	media: mediaRouter,
})
```

## 🎨 Best Practices

1. **One router per collection** - Keep routers focused
2. **Use Zod for validation** - Always validate inputs
3. **Use appropriate procedures** - `baseProcedure` for reads, `protectedProcedure` for writes
4. **Keep it RESTful** - Use standard names: `list`, `getById`, `create`, `update`, `delete`
5. **Handle errors gracefully** - Use `TRPCError` for custom errors
6. **Document your procedures** - Add JSDoc comments
7. **Type your responses** - Let TypeScript infer from Payload types

## 🔗 Frontend Setup

### Installation

Install dependencies in your frontend app:

```bash
pnpm add @trpc/client @trpc/tanstack-react-query @tanstack/react-query
```

### Vanilla TypeScript Client

```ts
// Frontend: src/lib/trpc.ts
// This type includes ALL collection routers
import type { AppRouter } from '@spon/cms/trpc'
import { createTRPCClient, httpBatchLink } from '@trpc/client'

const trpc = createTRPCClient<AppRouter>({
	links: [
		httpBatchLink({
			url: 'http://localhost:3000/api/trpc',
			headers() {
				return {
					authorization: `Bearer ${process.env.BEARER_TOKEN}`,
				}
			},
		}),
	],
})

// Use it
const health = await trpc.health.check.query()
const home = await trpc.globals.get.query({ slug: 'home' })

// Use collection-specific routers
const posts = await trpc.posts.list.query()
const page = await trpc.pages.getBySlug.query({ slug: 'home' })
```

### React Client with Hooks

```tsx
import type { AppRouter } from '@spon/cms/trpc'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createTRPCReact, httpBatchLink } from '@trpc/tanstack-react-query'
import { useState } from 'react'

const trpc = createTRPCReact<AppRouter>()

function TRPCProvider({ children }: { children: React.ReactNode }) {
	const [queryClient] = useState(() => new QueryClient())
	const [trpcClient] = useState(() =>
		trpc.createClient({
			links: [
				httpBatchLink({
					url: '/api/trpc',
					headers() {
						return {
							authorization: `Bearer ${process.env.NEXT_PUBLIC_BEARER_TOKEN}`,
						}
					},
				}),
			],
		}),
	)

	return (
		<trpc.Provider client={trpcClient} queryClient={queryClient}>
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		</trpc.Provider>
	)
}

// Use in components
function MyComponent() {
	const { data, isLoading } = trpc.health.check.useQuery()
	const { data: page } = trpc.pages.getBySlug.useQuery({ slug: 'about' })
	const { data: pages } = trpc.pages.list.useQuery({ page: 1, limit: 10 })

	// Bearer token is automatically included in all requests
	return <div>...</div>
}
```

## 📚 Resources

- [tRPC Documentation](https://trpc.io)
- [Payload CMS Documentation](https://payloadcms.com)
- [React Query Documentation](https://tanstack.com/query)
