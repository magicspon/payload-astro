export function getFirstOrNull<T>(entry?: T[] | null): T | null {
	if (Array.isArray(entry)) {
		return entry[0] ?? null
	}

	return null
}
