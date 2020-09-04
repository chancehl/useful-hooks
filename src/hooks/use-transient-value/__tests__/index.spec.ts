import { renderHook, act } from '@testing-library/react-hooks'

import { useTransientValue } from '../index'

const TEST_VALUES = {
	DEFAULT: 'DEFAULT',
	NEW: 'NEW'
}

describe('use-transient-value', () => {
	test('returns the default value on init', () => {
		const { result } = renderHook(() => useTransientValue(TEST_VALUES.DEFAULT))

		expect(result.current[0]).toEqual(TEST_VALUES.DEFAULT)
	})

	test('returns the new value once the trigger is called', () => {
		const { result } = renderHook(() => useTransientValue(TEST_VALUES.DEFAULT))

		expect(result.current[0]).toEqual(TEST_VALUES.DEFAULT)

		act(() => {
			const trigger = result.current[1]

			trigger(TEST_VALUES.NEW)
		})

		console.log("RESULT.CURRENT", result.current)
		expect(result.current[0]).toEqual(TEST_VALUES.NEW)
	})
})
