import * as Fn from './clamp'
import { expect, test } from 'vitest'

// @author: https://github.com/Popmotion/popmotion/blob/master/packages/popmotion/src/utils/__tests__/clamp.test.ts

test('clamp', () => {
	expect(Fn.clamp(100, 200, 99)).toBe(100)
	expect(Fn.clamp(100, 200, 201)).toBe(200)
	expect(Fn.clamp(100, 200, 150)).toBe(150)
})
