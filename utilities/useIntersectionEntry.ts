import { RefObject, useEffect, useState } from "react";

export default function useIntersectionEntry(
	ref: RefObject<HTMLElement>,
	intersectionOptions?: IntersectionObserverInit
) {
	const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);

	const intersectionCallback = (entries: IntersectionObserverEntry[]) => {
		if (entries.length === 0) return;
		setEntry(entries[0]);
	};

	useEffect(() => {
		const observer = new IntersectionObserver(intersectionCallback, intersectionOptions);

		if (ref.current) observer.observe(ref.current);
		return () => observer.disconnect();
	}, [ref, intersectionOptions]); //Need to be careful that intersectionOptions is not a new object every render
	return entry;
}
