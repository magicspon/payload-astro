# Embedded Assets Plugin Plan

## Overview

Extend the existing media collection and image field to support embedded assets (YouTube, Vimeo, Twitter, etc.) alongside traditional file uploads. Users can either upload an image OR paste a URL to create an embedded asset - both stored in the media collection.

## Approach

- Extend `media` collection with oEmbed JSON field and asset type
- Create new custom image field component with upload/embed toggle
- Store oEmbed data as JSON directly in the media entry
- Treat embedded assets as first-class media items

---

## Architecture

### 1. Extend Media Collection

Add new fields to `/apps/cms/src/collections/media/index.ts`:

```
New Fields:
- assetType (select) - 'upload' | 'embed' (default: 'upload')
- embedUrl (text) - Original URL for embedded assets
- embedData (json) - Full oEmbed response:
  {
    type: 'video' | 'photo' | 'link' | 'rich',
    title: string,
    description: string,
    providerName: string,
    providerUrl: string,
    authorName: string,
    authorUrl: string,
    thumbnailUrl: string,
    thumbnailWidth: number,
    thumbnailHeight: number,
    embedHtml: string,
    width: number,
    height: number,
    rawResponse: object  // Full oEmbed response for extensibility
  }
- lastFetchedAt (date) - When oEmbed was last fetched
```

### 2. Custom Image Field Component

Replace standard upload field with custom component that offers:

- Toggle between "Upload" and "Embed URL" modes
- Upload mode: Standard Payload upload UI
- Embed mode: URL input with fetch button and preview

### 3. oEmbed Fetching

- Use `@extractus/oembed-extractor` for oEmbed (has TypeScript, updated Sept 2025)
- Use `open-graph-scraper` as fallback for sites without oEmbed
- Fetch triggered by button click in admin UI
- Store full response as JSON in embedData field

---

## File Structure

```
apps/cms/src/
├── collections/
│   └── media/
│       └── index.ts              # Extended with embed fields
├── lib/
│   └── oembed/
│       ├── index.ts              # oEmbed fetcher
│       └── types.ts              # TypeScript types
├── fields/
│   ├── image.field.ts            # UNCHANGED - existing image field
│   └── asset.field.ts            # NEW - field with embed support
├── components/
│   └── media/
│       ├── EmbedMode.tsx         # URL input + fetch + preview
│       └── EmbedPreview.tsx      # Thumbnail + metadata display
└── trpc/
    └── routers/
        └── oembed.ts             # tRPC router for fetching oEmbed
```

---

## Implementation Details

### 1. Media Collection Changes

```typescript
// /collections/media/index.ts - Additional fields

{
  name: 'assetType',
  type: 'select',
  defaultValue: 'upload',
  options: [
    { label: 'Upload', value: 'upload' },
    { label: 'Embed URL', value: 'embed' },
  ],
  admin: {
    position: 'sidebar',
  },
},
{
  name: 'embedUrl',
  type: 'text',
  admin: {
    condition: (data) => data?.assetType === 'embed',
  },
},
{
  name: 'embedData',
  type: 'json',
  admin: {
    condition: (data) => data?.assetType === 'embed',
    readOnly: true,  // Populated by fetch, not manual entry
  },
},
{
  name: 'lastFetchedAt',
  type: 'date',
  admin: {
    condition: (data) => data?.assetType === 'embed',
    readOnly: true,
  },
},
```

### 2. oEmbed Library

```typescript
// /lib/oembed/index.ts
import type { EmbedData } from './types'
import { extract } from '@extractus/oembed-extractor'
import ogs from 'open-graph-scraper'

export async function fetchEmbed(url: string): Promise<EmbedData> {
	// Try oEmbed first (for YouTube, Vimeo, Twitter, etc.)
	try {
		const oembed = await extract(url)
		if (oembed) {
			return {
				type: oembed.type || 'link',
				title: oembed.title,
				description: undefined,
				providerName: oembed.provider_name,
				providerUrl: oembed.provider_url,
				authorName: oembed.author_name,
				authorUrl: oembed.author_url,
				thumbnailUrl: oembed.thumbnail_url,
				thumbnailWidth: oembed.thumbnail_width,
				thumbnailHeight: oembed.thumbnail_height,
				embedHtml: oembed.html,
				width: oembed.width,
				height: oembed.height,
				rawResponse: oembed,
			}
		}
	} catch {
		// oEmbed not available, fall through to Open Graph
	}

	// Fallback to Open Graph scraping
	const { result } = await ogs({ url })
	return {
		type: 'link',
		title: result.ogTitle,
		description: result.ogDescription,
		providerName: result.ogSiteName,
		providerUrl: undefined,
		authorName: undefined,
		authorUrl: undefined,
		thumbnailUrl: result.ogImage?.[0]?.url,
		thumbnailWidth: result.ogImage?.[0]?.width
			? Number(result.ogImage[0].width)
			: undefined,
		thumbnailHeight: result.ogImage?.[0]?.height
			? Number(result.ogImage[0].height)
			: undefined,
		embedHtml: undefined,
		width: undefined,
		height: undefined,
		rawResponse: result,
	}
}
```

### 3. tRPC Router

```typescript
// /trpc/routers/oembed.ts
import { internalProcedure, router } from '../trpc'
import { fetchEmbed } from '@/lib/oembed'
import { z } from 'zod'

export const oembedRouter = router({
	fetch: internalProcedure
		.input(z.object({ url: z.string().url() }))
		.mutation(async ({ input }) => {
			return fetchEmbed(input.url)
		}),
})
```

### 4. Custom Media Field Component

```typescript
// /components/media/EmbedMode.tsx
'use client'

import { TextInput, useField, useForm } from '@payloadcms/ui'
import { trpc } from '@/trpc/client'
import { EmbedPreview } from './EmbedPreview'

export function EmbedMode() {
  const { value: url, setValue: setUrl } = useField<string>({ path: 'embedUrl' })
  const { value: embedData, setValue: setEmbedData } = useField({ path: 'embedData' })
  const { setValue: setAlt } = useField<string>({ path: 'alt' })
  const { setValue: setLastFetched } = useField({ path: 'lastFetchedAt' })

  const fetchMutation = trpc.oembed.fetch.useMutation({
    onSuccess: (data) => {
      setEmbedData(data)
      setAlt(data.title || '')  // Auto-populate alt from title
      setLastFetched(new Date().toISOString())
    },
  })

  return (
    <div>
      <TextInput
        path="embedUrl"
        label="Embed URL"
        placeholder="https://youtube.com/watch?v=..."
        value={url || ''}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button
        type="button"
        onClick={() => url && fetchMutation.mutate({ url })}
        disabled={!url || fetchMutation.isPending}
      >
        {fetchMutation.isPending ? 'Fetching...' : 'Fetch Embed'}
      </button>

      {embedData && <EmbedPreview data={embedData} />}
    </div>
  )
}
```

### 5. New Field Factory (Separate from image.field.ts)

```typescript
// /fields/asset.field.ts (NEW FILE - image.field.ts unchanged)
import { deepMerge } from '@/utils/deepMerge'
import { Field } from 'payload'

type FieldInput = {
	field?: Partial<Field>
	allowEmbed?: boolean // Option to enable/disable embed mode
}

export const assetField = ({
	field = {},
	allowEmbed = true,
}: FieldInput = {}) => {
	const base: Field = {
		name: 'asset',
		type: 'upload',
		relationTo: 'media',
		filterOptions: allowEmbed ? undefined : { assetType: { equals: 'upload' } },
	}

	return deepMerge(field, base)
}
```

---

## Files to Create

| File                                             | Purpose                                        |
| ------------------------------------------------ | ---------------------------------------------- |
| `apps/cms/src/lib/oembed/types.ts`               | EmbedData TypeScript types                     |
| `apps/cms/src/lib/oembed/index.ts`               | fetchEmbed function                            |
| `apps/cms/src/trpc/routers/oembed.ts`            | tRPC router for preview fetch                  |
| `apps/cms/src/fields/asset.field.ts`             | New field factory for media with embed support |
| `apps/cms/src/components/media/EmbedMode.tsx`    | Embed URL input + fetch button + preview       |
| `apps/cms/src/components/media/EmbedPreview.tsx` | Thumbnail + metadata display component         |

## Files to Modify

| File                                      | Change                                                                  |
| ----------------------------------------- | ----------------------------------------------------------------------- |
| `apps/cms/src/collections/media/index.ts` | Add assetType, embedUrl, embedData, lastFetchedAt fields                |
| `apps/cms/src/trpc/routers/index.ts`      | Add oembedRouter                                                        |
| `package.json`                            | Add `@extractus/oembed-extractor` and `open-graph-scraper` dependencies |

**Note:** `image.field.ts` remains unchanged for backwards compatibility.

---

## Implementation Phases

### Phase 1: oEmbed Library

- [ ] Install `@extractus/oembed-extractor` and `open-graph-scraper` packages
- [ ] Create `/lib/oembed/types.ts` with EmbedData type
- [ ] Create `/lib/oembed/index.ts` with fetchEmbed function (oEmbed + OG fallback)
- [ ] Create tRPC router `/trpc/routers/oembed.ts`
- [ ] Register router in `/trpc/routers/index.ts`

### Phase 2: Media Collection Extension

- [ ] Add assetType field (select: upload/embed)
- [ ] Add embedUrl field (conditional on assetType=embed)
- [ ] Add embedData JSON field (conditional, readonly)
- [ ] Add lastFetchedAt date field (conditional, readonly)
- [ ] Hide upload-specific fields when assetType=embed

### Phase 3: Admin UI Components

- [ ] Create EmbedPreview component (shows thumbnail, title, provider)
- [ ] Create EmbedMode component (URL input + fetch button)
- [ ] Wire up tRPC mutation for fetching

### Phase 4: Field Factory

- [ ] Create new `asset.field.ts` (separate from image.field.ts)
- [ ] Add allowEmbed option to filter embedded assets if needed

---

## Verification

1. **Manual testing**:
   - Create media entry with assetType="upload" - standard upload works
   - Create media entry with assetType="embed" - paste YouTube URL
   - Click fetch - embedData populated, alt auto-filled from title
   - Verify embedData contains: title, thumbnailUrl, embedHtml, provider info
   - Test with Vimeo, Twitter, Instagram URLs
   - Test with non-oEmbed URL (verify Open Graph fallback)
   - Add mediaField to a page - can select both uploads and embeds

2. **Error handling**:
   - Invalid URL format shows error
   - URL that 404s shows error message
   - Network timeout handled gracefully

3. **UI verification**:
   - Asset type toggle works
   - Upload fields hidden when embed mode selected
   - Embed fields hidden when upload mode selected
   - Preview shows thumbnail and metadata after fetch
