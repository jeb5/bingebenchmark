import { useRef, useState } from "react";
import { useQuery } from "react-query";
import { SearchResponse } from "../../pages/api/search";
import SearchField from "./SearchField";
import ShowSearchScroll from "./ShowSearchScroll";
import styles from "./SearchBox.module.css";
import useDebouncedValue from "../../utilities/useDebouncedValue";

export default function SearchBox() {
	const [searchQueryValue, setSearchQueryValue] = useState<string>("");
	const [focused_raw, setFocused] = useState<boolean>(false);
	const focused = focused_raw && searchQueryValue !== "";

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

	const onFieldSubmit = () => {};

	return (
		<>
			{focused && <div className={styles.backgroundBlock} onClick={e => setFocused(false)} />}
			<div className={`${styles.searchContainer} ${focused ? styles.focusedState : ""}`}>
				<SearchField
					value={searchQueryValue}
					onChange={setSearchQueryValue}
					onFocus={() => setFocused(true)}
					onBlur={() => {
						if (searchQueryValue === "") setFocused(false);
					}}
					onSubmit={onFieldSubmit}
					focused={focused}
				/>
				{focused &&
					(showQuery.isLoading ? (
						<div className={`${styles.exceptionBox} ${styles.loadingBox}`}>...</div>
					) : showQuery.isError ? (
						<div className={styles.exceptionBox}>Oops, something went wrong. Please try again.</div>
					) : showQuery.isSuccess && showQuery.data.length !== 0 ? (
						<ShowSearchScroll shows={showQuery.data} />
					) : (
						searchQueryDebouncedValue !== "" && (
							<div className={styles.exceptionBox}>
								No results found for query {'"'}
								<i>{searchQueryValue}</i>
								{'"'}
							</div>
						)
					))}
			</div>
		</>
	);
}
