import { renderHook, act } from '@testing-library/react-hooks'

import { useValueHistory } from '../index'

describe('use-value-history', () => {
  test('returns the default value on init', () => {
    const { result } = renderHook(() => useValueHistory('ABC'))

    expect(result.current[0]).toEqual('ABC')
  })

  test('can update the value', () => {
    const { result } = renderHook(() => useValueHistory('ABC'))

    act(() => {
      const setValue = result.current[1]

      setValue('XYZ')
    })

    expect(result.current[0]).toEqual('XYZ')
  })

  test('maintains a reference to the history after an update', () => {
    const { result } = renderHook(() => useValueHistory('ABC'))

    expect(result.current[0]).toEqual('ABC')

    act(() => {
      const setValue = result.current[1]

      setValue('LMN')
    })

    expect(result.current[0]).toEqual('LMN')

    act(() => {
      const setValue = result.current[1]

      setValue('XYZ')
    })

    expect(result.current[0]).toEqual('XYZ')

    expect(result.current[2]).toBeDefined()
    expect(result.current[2]).toHaveLength(3)
    expect(result.current[2].map(({ value }) => value)).toEqual([
      'ABC',
      'LMN',
      'XYZ',
    ])
  })
})
