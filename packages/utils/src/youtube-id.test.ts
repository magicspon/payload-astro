import * as Fn from './youtube-id'
import { expect, test } from 'vitest'

test('youtube-id', () => {
	const ID = 'oZdrVo8ERyQ'
	expect(
		Fn.getYouTubeID('https://www.youtube.com/watch?v=oZdrVo8ERyQ&t=6s'),
	).toBe(ID)
	expect(
		Fn.getYouTubeID('https://youtu.be/oZdrVo8ERyQ?si=ZnzNl9Hlm96iFXZq'),
	).toBe(ID)
	expect(
		Fn.getYouTubeID(
			'https://www.youtube.com/embed/oZdrVo8ERyQ?si=ZnzNl9Hlm96iFXZq',
		),
	).toBe(ID)
})
