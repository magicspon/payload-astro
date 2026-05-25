import type { Page as PageType } from '@spon/payload-types'
import { Listing } from '~/types'
import { DangerouslyExpandRelations } from './typeHelpers'

export function parseListing(
	data: Pick<
		NonNullable<DangerouslyExpandRelations<PageType>['listing']>,
		'items' | 'list'
	>,
): Listing | null {
	if (data.list === 'pages') {
		return { list: data.list, entries: data.items?.map((s) => s.value) }
	}
	if (data.list === 'posts') {
		return { list: data.list, entries: data.items?.map((s) => s.value) }
	}
	if (data.list === 'children') {
		return { list: data.list, entries: data.items?.map((s) => s.value) }
	}

	return null
}
