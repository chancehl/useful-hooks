import { useState, useMemo, useCallback, useRef } from 'react'

type HookReturnType<T> = [
  T | undefined,
  (value?: T | undefined) => void,
  Array<{ value: T | undefined; time: string }>,
]

/**
 * A simple hook for maintaining a stateful history of a piece of data
 *
 * @param defaultValue The default value passed to React.setState()
 */
const useValueHistory = <T>(defaultValue?: T): HookReturnType<T> => {
  const history = useRef([
    { value: defaultValue, time: new Date().toISOString() },
  ])

  const [value, setValue] = useState<T>(defaultValue)

  const setStateAndUpdateHistory = useCallback((newValue?: T) => {
    setValue(newValue)

    history.current = [
      ...history.current,
      { value: newValue, time: new Date().toISOString() },
    ]
  }, [])

  return useMemo(() => [value, setStateAndUpdateHistory, history.current], [
    setStateAndUpdateHistory,
    value,
  ])
}

export { useValueHistory as default, useValueHistory }
