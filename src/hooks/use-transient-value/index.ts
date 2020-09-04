import { useState, useMemo, useCallback } from 'react'

const DEFAULT_DURATION = 5000

type HookReturnType<T> = [T | undefined, (value?: T) => void]

/**
 * A simple hook for creating transient values
 *
 * @param defaultValue The value that will render immediately and after the timer has expired
 * @param duration The duration before the value is set back to default
 */
const useTransientValue = <T>(defaultValue: T, duration: number = DEFAULT_DURATION): HookReturnType<T> => {
	const [value, setValue] = useState<T | undefined>(defaultValue)

	const trigger = useCallback((newValue?: T) => {
		setValue(newValue)

		setTimeout(() => setValue(defaultValue), duration)
	}, [defaultValue, duration])

	return useMemo(() => [value, trigger], [value, trigger])
}

export {
	useTransientValue as default,
	useTransientValue
}
