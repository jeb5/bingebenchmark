import { useQuery } from "react-query";
import useDebouncedValue from "../../utilities/useDebouncedValue";
import { useState } from "react";
import { SearchResponse } from "../../pages/api/search";

export default function useSearch() {
	const [searchQueryValue, setSearchQueryValue] = useState<string>("");

	const searchQueryDebouncedValue = useDebouncedValue(searchQueryValue, 500, {
		debounceFalsy: false,
		debounceOldValues: false,
	});

	const showQuery = useQuery(
		["search", searchQueryDebouncedValue],
		async () => {
			const response = await fetch(`/api/search?q=${searchQueryDebouncedValue}`);
			const data: SearchResponse = await response.json();
			if ("error" in data) throw new Error(data.error);
			return data.results;
		},
		{ staleTime: 1000 * 60 * 60, enabled: searchQueryDebouncedValue !== "" }
	);
	return { searchQueryValue, setSearchQueryValue, showQuery, searchQueryDebouncedValue };
}
