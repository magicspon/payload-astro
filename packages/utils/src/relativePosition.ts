export function relativePositionPxToPercent(
	x: number,
	y: number,
	containerWidth: number,
	containerHeight: number,
) {
	const newX = (x / containerWidth) * 100
	const newY = (y / containerHeight) * 100
	return [newX, newY]
	// return [x, y]
}
export function relativePositionPercentToPx(
	x: number,
	y: number,
	containerWidth: number,
	containerHeight: number,
) {
	const newX = (x / 100) * containerWidth
	const newY = (y / 100) * containerHeight
	return [newX, newY]
	// return [x, y]
}
