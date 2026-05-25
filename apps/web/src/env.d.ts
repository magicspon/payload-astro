/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
	readonly CMS_URL: string
	readonly PAYLOAD_BEARER_TOKEN: string
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}
