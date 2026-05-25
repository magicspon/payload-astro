import * as Fn from './wrap'
import { expect, test } from 'vitest'

// @author: https://github.com/Popmotion/popmotion/blob/master/packages/popmotion/src/utils/__tests__/wrap.test.ts

test('wrap', () => {
	expect(Fn.wrap(-100, 100, -100)).toBe(-100)
	expect(Fn.wrap(-100, 100, 0)).toBe(0)
	expect(Fn.wrap(-100, 100, -200)).toBe(0)
	expect(Fn.wrap(-100, 100, 101)).toBe(-99)
})
