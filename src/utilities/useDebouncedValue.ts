import { useEffect, useState } from "react";

/**
 * Returns a debounced value from a value and a delay.
 * @param value The value to debounce.
 * @param delay The delay to debounce by.
 * @param debounceFalsy Whether to debounce falsy values or not.
 * @returns The debounced value.
 */
export default function useDebouncedValue<T>(
	value: T,
	delay: number,
	options: { debounceFalsy?: boolean; debounceOldValues?: boolean }
): T {
	const [debouncedValue, setDebouncedValue] = useState(value);
	const [oldValues, setOldValues] = useState<Set<T>>(new Set<T>([value]));
	useEffect(() => {
		const skipFalsy = !(options.debounceFalsy ?? true);
		if ((skipFalsy && !value) || (!options.debounceOldValues && oldValues.has(value))) return setDebouncedValue(value);
		const handler = setTimeout(() => {
			setDebouncedValue(value);
			setOldValues(oldValues => new Set(oldValues).add(value));
		}, delay);
		return () => {
			clearTimeout(handler);
		};
	}, [delay, oldValues, options.debounceOldValues, options.debounceFalsy, value]);
	return debouncedValue;
}
