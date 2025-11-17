import { ForwardedRef, forwardRef, useState } from "react";
import { useQuery } from "react-query";
import { SearchResponse } from "../../pages/api/search";
import SearchField from "./SearchField";
import ShowSearchScroll from "./ShowSearchScroll";
import styles from "./SearchBox.module.css";
import useDebouncedValue from "../../utilities/useDebouncedValue";
import useSearch from "./useSearch";

const SearchBox = forwardRef(function SearchBox(
	{ homeVersion }: { homeVersion?: boolean },
	ref: ForwardedRef<HTMLDivElement>
) {
	const [focused_raw, setFocused] = useState<boolean>(false);
	const { searchQueryValue, setSearchQueryValue, showQuery, searchQueryDebouncedValue } = useSearch();
	const focused = focused_raw && searchQueryValue !== "";

	const onFieldSubmit = () => {
		if (!showQuery.isSuccess || showQuery.data.length === 0) return;
		(window as Window).location = showQuery.data[0].url;
	};

	return (
		<>
			{focused && <div className={styles.backgroundBlock} onClick={e => setFocused(false)} />}
			<div
				className={`${styles.searchContainer} ${focused ? styles.focusedState : ""} ${
					homeVersion ? styles.homeVersion : ""
				}`}
				ref={ref}>
				<SearchField
					value={searchQueryValue}
					onChange={setSearchQueryValue}
					onFocus={() => setFocused(true)}
					onBlur={() => {
						if (searchQueryValue === "") setFocused(false);
					}}
					onSubmit={onFieldSubmit}
					focused={focused}
					homeVersion={homeVersion}
				/>
				{focused && (
					<div className={styles.boxContainerContainer}>
						<div className={styles.boxContainer}>
							{showQuery.isLoading ? (
								<div className={`${styles.exceptionBox} ${styles.loadingBox}`}>...</div>
							) : showQuery.isError ? (
								<div className={styles.exceptionBox}>Oops, something went wrong. Please try again.</div>
							) : showQuery.isSuccess && showQuery.data.length !== 0 ? (
								<ShowSearchScroll shows={showQuery.data} />
							) : (
								searchQueryDebouncedValue !== "" && (
									<div className={styles.exceptionBox}>
										<div>
											No results found for query {'"'}
											<i>{searchQueryDebouncedValue}</i>
											{'"'}
										</div>
									</div>
								)
							)}
						</div>
					</div>
				)}
			</div>
		</>
	);
});
export default SearchBox;
