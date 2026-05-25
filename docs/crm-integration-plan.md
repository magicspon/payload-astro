# CRM Integration Plan for Form Plugin

## Overview

Add third-party CRM integrations to the existing Payload CMS form plugin, allowing users to:

1. Create and manage CRM integrations (API credentials)
2. Connect forms to CRM integrations with field mapping
3. Automatically sync form submissions to CRMs

## Target CRMs (10 total)

- Salesforce
- HubSpot
- Zoho
- Microsoft Dynamics 365
- Pipedrive
- ActiveCampaign
- Freshsales
- SugarCRM
- Insightly
- Capsule CRM

---

## Architecture

### New Collections

#### 1. `crm_integrations` - Stores CRM connection configurations

```
Fields:
- name (text) - User-friendly name
- provider (select) - Which CRM (hubspot, salesforce, etc.)
- status (select) - active | inactive | error
- authType (select) - api_key | oauth2 | basic
- apiKey (encrypted text) - For API key auth
- oauth (group) - clientId, clientSecret, accessToken, refreshToken, tokenExpiresAt
- basicAuth (group) - username, password (encrypted)
- instanceUrl (text) - For Salesforce, Dynamics, SugarCRM
- subdomain (text) - For Zoho, Freshsales, ActiveCampaign
- defaultObjectType (select) - contact | lead | deal | custom
- duplicateHandling (select) - skip | update | create
- duplicateMatchField (text) - Field for deduplication (default: email)
- lastSyncAt, lastSyncStatus, lastError, totalSynced (status fields)
```

#### 2. `crm_sync_logs` - Tracks sync history per submission

```
Fields:
- submission (relationship)
- integration (relationship)
- status (select) - pending | processing | success | failed | skipped
- action (select) - created | updated | skipped
- crmRecordId (text) - ID in the CRM
- error (textarea)
- startedAt, completedAt (dates)
- retryCount (number)
- requestPayload, responsePayload (json) - For debugging
```

### Form Collection Extension

Add `crmIntegrations` array field to form collection:

```
- integration (relationship to crm_integrations)
- enabled (checkbox)
- objectType (select) - default | contact | lead | deal | custom
- fieldMapping (array):
  - formField (select from form fields)
  - crmField (select from CRM fields - fetched dynamically)
  - transformationType (select) - direct | static | template
  - staticValue / templateValue (text)
- conditions (json) - Reuse existing condition engine from notifications
```

---

## CRM Adapter System

### Interface

```typescript
interface CRMAdapter {
	testConnection(): Promise<{ success: boolean; error?: string }>
	getAvailableObjects(): Promise<Array<{ name: string; label: string }>>
	getObjectFields(objectType: string): Promise<CRMFieldDefinition[]>
	createRecord(objectType: string, data: CRMRecord): Promise<CRMSyncResult>
	updateRecord(
		objectType: string,
		recordId: string,
		data: CRMRecord,
	): Promise<CRMSyncResult>
	findRecordByField(
		objectType: string,
		field: string,
		value: unknown,
	): Promise<CRMRecord | null>
	upsertRecord(
		objectType: string,
		data: CRMRecord,
		matchField: string,
	): Promise<CRMSyncResult>
}
```

### File Structure

```
apps/cms/src/
├── collections/
│   └── crm/
│       ├── index.ts              # crm_integrations collection
│       ├── crm_sync_logs.ts      # Sync logs collection
│       └── hooks/
│           ├── encryptCredentials.ts
│           └── decryptCredentials.ts
├── lib/
│   ├── encryption.ts             # AES-256-GCM encryption utils
│   └── crm/
│       ├── index.ts              # Adapter registry & factory
│       ├── types.ts              # Shared types
│       ├── fieldMapper.ts        # Form → CRM field mapping logic
│       └── adapters/
│           ├── base.ts           # BaseCRMAdapter class
│           ├── hubspot.ts
│           ├── salesforce.ts
│           ├── zoho.ts
│           ├── dynamics365.ts
│           ├── pipedrive.ts
│           ├── activecampaign.ts
│           ├── freshsales.ts
│           ├── sugarcrm.ts
│           ├── insightly.ts
│           └── capsule.ts
├── components/
│   └── crm/
│       ├── EncryptedTextField.tsx
│       ├── FormFieldSelector.tsx
│       ├── CRMFieldSelector.tsx
│       ├── CRMConditionEditor.tsx
│       ├── IntegrationTestButton.tsx
│       └── SubmissionCRMStatus.tsx
├── jobs/
│   └── tasks/
│       └── crmSync.ts            # Async CRM sync job
└── trpc/
    └── routers/
        └── crm.ts                # tRPC routes for UI
```

---

## Submission Flow

### Async Processing via Payload Jobs

1. Form submitted → `submissions` collection `afterChange` hook fires
2. Hook checks if form has CRM integrations enabled
3. For each enabled integration, queue a `crm-sync` job
4. Job worker:
   - Evaluates conditions (reuses `shouldSendNotification`)
   - Maps form fields to CRM fields (reuses `replaceTemplatePlaceholders`)
   - Creates/updates record via adapter
   - Logs result to `crm_sync_logs`
   - Updates integration stats

### Why Async?

- Doesn't block form submission response
- Automatic retries on failure (3 retries with exponential backoff)
- Jobs system already configured at `/apps/cms/src/jobs/index.ts`

---

## Security

### Credential Encryption

- Use AES-256-GCM encryption with `PAYLOAD_SECRET` as key derivation source
- Encrypt: apiKey, clientSecret, accessToken, refreshToken, password
- `beforeChange` hook encrypts, `afterRead` hook decrypts

### Access Control

- Admin-only access to `crm_integrations` and `crm_sync_logs`
- Follow existing pattern from `/apps/cms/src/access/index.ts`

---

## Admin UI Components

1. **EncryptedTextField** - Password input that encrypts on save
2. **FormFieldSelector** - Dropdown of form fields (from pages structure)
3. **CRMFieldSelector** - Async dropdown fetching CRM fields via tRPC
4. **CRMConditionEditor** - Adapt existing NotificationConditionEditor
5. **IntegrationTestButton** - Test connection with loading/success/error states
6. **SubmissionCRMStatus** - Shows sync status on submission detail view

---

## Files to Modify

| File                                           | Change                              |
| ---------------------------------------------- | ----------------------------------- |
| `apps/cms/src/collections/index.ts`            | Add crm_integrations, crm_sync_logs |
| `apps/cms/src/collections/form/index.ts`       | Add crmIntegrations field array     |
| `apps/cms/src/collections/form/submissions.ts` | Add afterChange hook for CRM queue  |
| `apps/cms/src/jobs/index.ts`                   | Add crm-sync task                   |
| `apps/cms/src/trpc/routers/index.ts`           | Add CRM router                      |

---

## Implementation Phases

### Phase 1: Foundation

- [ ] Create `/lib/encryption.ts` (AES-256-GCM)
- [ ] Create `crm_integrations` collection with fields and hooks
- [ ] Create `crm_sync_logs` collection
- [ ] Register collections in `/collections/index.ts`

### Phase 2: Adapter Framework

- [ ] Define types in `/lib/crm/types.ts`
- [ ] Create `BaseCRMAdapter` class
- [ ] Create adapter registry/factory
- [ ] Implement HubSpot adapter (good docs, popular)
- [ ] Implement Pipedrive adapter (simpler API for testing)

### Phase 3: Form Integration

- [ ] Add `crmIntegrations` field to form collection
- [ ] Create field mapping utility functions
- [ ] Add `afterChange` hook to submissions for job queuing
- [ ] Add `crm-sync` task to jobs config

### Phase 4: Admin UI

- [ ] Create EncryptedTextField component
- [ ] Create FormFieldSelector component
- [ ] Create CRMFieldSelector component
- [ ] Create IntegrationTestButton component
- [ ] Create SubmissionCRMStatus component
- [ ] Add tRPC router for CRM operations

### Phase 5: Remaining Adapters

- [ ] Salesforce adapter
- [ ] Zoho adapter
- [ ] Microsoft Dynamics 365 adapter
- [ ] ActiveCampaign adapter
- [ ] Freshsales adapter
- [ ] SugarCRM adapter
- [ ] Insightly adapter
- [ ] Capsule CRM adapter

---

## Verification

1. **Unit tests**: Test encryption, field mapping, condition evaluation
2. **Integration tests**: Test each CRM adapter with mock API responses
3. **Manual testing**:
   - Create a CRM integration (e.g., HubSpot sandbox)
   - Test connection button works
   - Create a form with CRM integration and field mapping
   - Submit form and verify record created in CRM
   - Check sync logs show correct status
   - Test failure scenarios (invalid API key, network error)
   - Verify retries work correctly
