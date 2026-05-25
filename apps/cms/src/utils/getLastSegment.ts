export function getLastSegment(pathname: string): string {
	// Remove trailing slash if it exists
	const cleanPath = pathname.endsWith('/') ? pathname.slice(0, -1) : pathname

	// Split by '/' and get the last element
	const segments = cleanPath.split('/')
	return segments[segments.length - 1] || ''
}
