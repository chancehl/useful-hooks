import { renderHook, act } from '@testing-library/react-hooks'

import { useTransientValue } from '../index'

const TEST_VALUES = {
	DEFAULT: 'DEFAULT',
	NEW: 'NEW',
	DURATION: 100,
}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

describe('use-transient-value', () => {
	beforeAll(() => jest.setTimeout(10000))
	afterAll(() => jest.setTimeout(5000))

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

		expect(result.current[0]).toEqual(TEST_VALUES.NEW)
	})

	test('returns the default value once the duration has expired', async () => {
		const { result } = renderHook(() => useTransientValue(TEST_VALUES.DEFAULT, TEST_VALUES.DURATION))

		expect(result.current[0]).toEqual(TEST_VALUES.DEFAULT)

		act(() => {
			const trigger = result.current[1]

			trigger(TEST_VALUES.NEW)
		})

		expect(result.current[0]).toEqual(TEST_VALUES.NEW)

		await act(async () => {
			await sleep(TEST_VALUES.DURATION)
		})

		expect(result.current[0]).toEqual(TEST_VALUES.DEFAULT)
	})
})
