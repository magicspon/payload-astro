# Web Application

An Astro-based frontend application that connects to the Payload CMS using the Payload SDK.

## Quick Start

1. Copy the environment variables:

   ```bash
   cp .env.example .env
   ```

2. Install dependencies and start the dev server:

   ```bash
   pnpm install
   pnpm dev
   ```

3. Access the application at `http://localhost:4321`

## Environment Variables

```bash
CMS_URL=http://localhost:3000           # URL of your Payload CMS instance
PAYLOAD_BEARER_TOKEN=your-token-here    # Bearer token for API authentication
```

## Project Structure

```
/
├── public/              # Static assets
├── src/
│   ├── components/      # Astro/React components
│   ├── layouts/         # Page layouts
│   ├── lib/
│   │   └── payload.ts   # Payload SDK setup
│   └── pages/           # File-based routes
│       ├── index.astro
│       └── api/         # API routes
└── package.json
```

---

# Working with the CMS

This app uses the Payload SDK to interact with the Payload CMS.

## Payload SDK

The Payload SDK provides a type-safe way to interact with Payload CMS operations like fetching collections, globals, and authentication.

### Setup

The SDK is pre-configured in [src/lib/payload.ts](src/lib/payload.ts):

```ts
import { PayloadSDK } from '@payloadcms/sdk'
import type { Config } from '@spon/payload-types'

export const sdk = new PayloadSDK<Config>({
	baseURL: `${import.meta.env.CMS_URL}/api`,
})
```

### Usage Examples

#### Fetching Collections

```ts
import { sdk } from '@/lib/payload'

// Get all pages with pagination
const pages = await sdk.find({
	collection: 'pages',
	page: 1,
	limit: 10,
})

// Get a specific page by ID
const page = await sdk.findByID({
	collection: 'pages',
	id: 'page-id-here',
})

// Query with filters
const filteredPages = await sdk.find({
	collection: 'pages',
	where: {
		slug: {
			equals: 'about',
		},
	},
	limit: 1,
})
```

#### Working with Globals

```ts
import { sdk } from '@/lib/payload'

// Get a global
const settings = await sdk.findGlobal({
	slug: 'settings',
})

// Update a global (requires authentication)
const updatedSettings = await sdk.updateGlobal({
	slug: 'settings',
	data: {
		siteName: 'My Site',
	},
})
```

#### Authentication

```ts
import { sdk } from '@/lib/payload'

// Login
const result = await sdk.login({
	collection: 'users',
	data: {
		email: 'user@example.com',
		password: 'password',
	},
})

// Get current user
const user = await sdk.auth({ collection: 'users' })

// Logout
await sdk.logout({ collection: 'users' })
```

#### Using in Astro Pages

```astro
---
// src/pages/index.astro
import { sdk } from '@/lib/payload'

const pages = await sdk.find({
	collection: 'pages',
	limit: 10,
})
---

<html>
	<body>
		<h1>Pages</h1>
		<ul>
			{pages.docs.map((page) => <li>{page.title}</li>)}
		</ul>
	</body>
</html>
```

---

# Type Safety

The SDK provides type safety through the `@spon/payload-types` package:

```ts
import type { Page } from '@spon/payload-types'

// SDK automatically types responses
const pages = await sdk.find({ collection: 'pages' })
pages.docs // Type: Page[]
```

# Examples

## Example 1: Simple Page List

```astro
---
// src/pages/pages.astro
import { sdk } from '@/lib/payload'
import Layout from '@/layouts/Layout.astro'

const { docs: pages } = await sdk.find({
	collection: 'pages',
	limit: 10,
})
---

<Layout title="All Pages">
	<h1>Pages</h1>
	<ul>
		{
			pages.map((page) => (
				<li>
					<a href={`/${page.slug}`}>{page.title}</a>
				</li>
			))
		}
	</ul>
</Layout>
```

## Example 2: Dynamic Page Route

```astro
---
// src/pages/[slug].astro
import { sdk } from '@/lib/payload'
import Layout from '@/layouts/Layout.astro'

const { slug } = Astro.params

const { docs } = await sdk.find({
	collection: 'pages',
	where: {
		slug: {
			equals: slug,
		},
	},
	limit: 1,
})

const page = docs[0]

if (!page) {
	return Astro.redirect('/404')
}
---

<Layout title={page.title}>
	<h1>{page.title}</h1>
	<div>{page.content}</div>
</Layout>
```

## Example 3: Using Globals

```astro
---
// src/pages/index.astro
import { sdk } from '@/lib/payload'
import Layout from '@/layouts/Layout.astro'

const home = await sdk.findGlobal({ slug: 'home' })

const { docs: pages } = await sdk.find({
	collection: 'pages',
	limit: 3,
})
---

<Layout title="Home">
	<h1>Welcome</h1>

	<h2>Featured Pages</h2>
	<ul>
		{pages.map((page) => <li>{page.title}</li>)}
	</ul>
</Layout>
```

---

# Best Practices

1. **Cache responses** - Use Astro's built-in caching or add your own layer
2. **Handle errors gracefully** - Always wrap API calls in try/catch blocks
3. **Type everything** - Leverage the generated Payload types
4. **Environment variables** - Never commit bearer tokens to source control

---

# Commands

| Command                | Action                                           |
| :--------------------- | :----------------------------------------------- |
| `pnpm install`         | Installs dependencies                            |
| `pnpm dev`             | Starts local dev server at `localhost:4321`      |
| `pnpm build`           | Build your production site to `./dist/`          |
| `pnpm preview`         | Preview your build locally, before deploying     |
| `pnpm astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `pnpm astro -- --help` | Get help using the Astro CLI                     |

---

# Resources

- [Astro Documentation](https://docs.astro.build)
- [Payload SDK Documentation](https://payloadcms.com/docs/sdk/overview)
- [CMS README](../cms/README.md)
