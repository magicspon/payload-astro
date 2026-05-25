import type { Page as PageType } from '@spon/payload-types'
import { Templates } from '~/types'
import { DangerouslyExpandRelations } from './typeHelpers'

export function parseTemplateProps(
	data: DangerouslyExpandRelations<PageType>,
): Templates | null {
	if (data.template === 'default') {
		return { template: data.template, blocks: data.blocks }
	}
	if (data.template === 'listing') {
		return {
			template: data.template,
			blocks: data.blocks,
			footer: data.listing?.footer,
		}
	}
	if (data.template === 'contact') {
		return { template: data.template, blocks: data.contact?.blocks }
	}
	if (data.template === 'article') {
		return { template: data.template, blocks: data.article?.blocks }
	}

	return null
}
