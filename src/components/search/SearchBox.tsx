import { useState } from "react";
import SearchField from "./SearchField";
import ShowSearchScroll from "./ShowSearchScroll";
import useSearch from "./useSearch";
import clsx from "clsx";
import Loading from "../elements/Loading";

const SearchBox = function SearchBox() {
  const [focused_raw, setFocused] = useState<boolean>(false);
  const { searchQueryValue, setSearchQueryValue, showQuery, searchQueryDebouncedValue } = useSearch();
  const focused = focused_raw && searchQueryValue !== "";

  const onFieldSubmit = () => {
    if (!showQuery.isSuccess || showQuery.data.length === 0) return;
    (window as Window).location = showQuery.data[0].url;
  };

  return (
    <>
      {focused && <div className="fixed top-0 bottom-0 left-0 right-0 w-screen h-screen z-10" onClick={(e) => setFocused(false)} />}
      <div className={clsx("w-[200px] flex flex-col", { "w-[380px]": focused })}>
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
        {focused && (
          <div className="relative">
            <div className="absolute w-full bg-(--weak-foreground) max-h-[400px] overflow-y-scroll z-11 rounded-b-sm">
              {showQuery.isLoading || (focused && searchQueryDebouncedValue == "") ? (
                <div className={"text-lg flex items-center justify-center h-[100px] text-center"}>
                  <Loading className="w-8" />
                </div>
              ) : showQuery.isError ? (
                <div className="flex items-center justify-center h-[100px] text-center">Oops, something went wrong. Please try again.</div>
              ) : showQuery.isSuccess && showQuery.data.length !== 0 ? (
                <ShowSearchScroll shows={showQuery.data} />
              ) : (
                searchQueryDebouncedValue !== "" && (
                  <div className="flex items-center justify-center h-[100px] text-center">
                    <div className="max-w-[90%] text-ellipsis overflow-hidden">
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
};
export default SearchBox;
