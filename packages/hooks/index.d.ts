declare module '*.png'
declare module '*.webp'

export interface Window {
	webkitAudioContext: typeof AudioContext
}

declare module '*.svg' {
	import type * as React from 'react'

	const ReactComponent: React.FunctionComponent<{ title?: string }>

	export default ReactComponent
}
