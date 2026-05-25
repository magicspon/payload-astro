import * as Fn from './getFirstOrNull'
import { expect, test } from 'vitest'

// @author: https://github.com/Popmotion/popmotion/blob/master/packages/popmotion/src/utils/__tests__/wrap.test.ts

test('getFirstOrNull', () => {
	expect(Fn.getFirstOrNull(null)).toBe(null)
	expect(Fn.getFirstOrNull(undefined)).toBe(null)
	expect(Fn.getFirstOrNull([1, 2])).toBe(1)
})
