export function cleanLink(input: (string | undefined | null)[]) {
	return `/${input.filter(Boolean).join('/')}`
}
