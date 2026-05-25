import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs'

export const nestedDocs = nestedDocsPlugin({
	collections: ['pages'],
	generateLabel: (_, doc) => (doc as any).title || 'Untitled',
	generateURL: (docs) => docs.reduce((url, doc) => `${url}/${doc.slug}`, ''),
	parentFieldSlug: 'parent',
	breadcrumbsFieldSlug: 'breadcrumbs',
})
