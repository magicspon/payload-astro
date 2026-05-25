export function getContrastYIQ(hexColor: string): string {
	// Remove the hash at the start if it's there
	hexColor = hexColor.replace(/^#/, '')

	// Parse the r, g, b values
	const r = parseInt(hexColor.substring(0, 2), 16)
	const g = parseInt(hexColor.substring(2, 4), 16)
	const b = parseInt(hexColor.substring(4, 6), 16)

	// Calculate the YIQ value
	const yiq = (r * 299 + g * 587 + b * 114) / 1000

	// Return black for light colors, white for dark colors
	return yiq >= 128 ? 'black' : 'white'
}
