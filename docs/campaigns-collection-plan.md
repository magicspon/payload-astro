# Replace campaigns custom views with a Payload collection

## Goal

Replace the current custom admin views + tRPC-only approach for campaigns with a native Payload collection. This gives us live preview, drafts/autosave, and the standard Payload editing UI. An `afterChange` hook syncs campaign data to UseSend on publish.

## Files to create

### 1. Collection definition

**`apps/cms/src/collections/campaigns/index.ts`**

```
slug: 'campaigns'
admin.group: 'Email'
admin.useAsTitle: 'name'
versions.drafts.autosave (interval: 2000)
livePreview.url — point at Astro preview route
```

Fields (using tabs):

**Tab: Content**

- `name` — text, required
- `subject` — text, required
- `previewText` — text
- `content` — richText (lexical editor)

**Tab: Settings**

- `from` — email, required
- `contactBookId` — text, required (later could become a select populated via beforeOperation)
- `replyTo` — text
- `cc` — text
- `bcc` — text

**Tab: Scheduling**

- `sendNow` — checkbox
- `scheduledAt` — date (admin.date.pickerAppearance: 'dayAndTime')
- `batchSize` — number (defaultValue: 50000)

**Sidebar**

- `usesendId` — text, admin.readOnly (stores the remote campaign ID after first sync)
- `syncStatus` — select (options: 'pending', 'synced', 'error'), admin.readOnly, defaultValue: 'pending'

### 2. afterChange hook

**`apps/cms/src/collections/campaigns/hooks/afterChangeSyncCampaign.ts`**

- Only runs when `doc._status === 'published'`
- Imports `usesend` from `@/lib/email/usesend`
- If no `usesendId` on doc → call `usesend.campaigns.create(...)` with mapped fields, then update the doc with `payload.update()` to store the returned `usesendId` and set `syncStatus: 'synced'`
- If `usesendId` exists → currently UseSend SDK has no `update` method for campaigns, so we create a new campaign (or skip sync and log). Set `syncStatus` accordingly.
- On error → set `syncStatus: 'error'`, log the error

### 3. Register collection

**`apps/cms/src/collections/index.ts`** — add `campaigns` to the array

## Files to modify

### 4. Remove custom campaign admin views from config

**`apps/cms/src/payload.config.ts`**

Remove these view entries:

- `campaigns` (`/campaigns`)
- `campaign` (`/campaigns/:campaignId`)
- `createCampaign` (`/campaigns/create`)

The Payload collection will auto-register its own list/edit views.

### 5. Update nav links

**`apps/cms/src/components/admin/AfterNavLinks`** — update/remove any campaigns link since the collection will appear in the sidebar under the 'Email' group.

### 6. Simplify tRPC campaigns router

**`apps/cms/src/trpc/routers/campaigns.ts`**

Remove `list`, `create`, and `getById` (now handled by Payload collection API). Keep `getContactBooks` if needed for other views, or move it to `contactBooks` router.

### 7. Clean up old campaign view components

Delete or gut these files (no longer needed):

- `apps/cms/src/components/emails/Campaigns/` (list view — replaced by collection list)
- `apps/cms/src/components/emails/Campaign/` (edit/create view — replaced by collection edit)

### 8. Generate types + migration

After creating the collection, run:

```
pnpm payload generate:types
pnpm payload migrate:create
```

## Content rendering for live preview

The `content` field uses the Lexical rich text editor. For live preview, render the serialized Lexical content to HTML. The Astro frontend needs a preview route for campaigns (e.g. `/~/preview/campaign`) that accepts campaign data and renders it.

This is a separate task — for now the live preview URL can point to a simple template page.

## Verification

1. `pnpm payload migrate:create` — generates migration for new campaigns table
2. `pnpm payload generate:types` — generates TypeScript types
3. Type-check: `npx tsc --noEmit -p apps/cms/tsconfig.json`
4. Create a draft campaign in the admin UI — verify autosave works
5. Publish a campaign — verify `afterChange` hook creates it in UseSend and stores `usesendId`
6. Check live preview iframe renders
