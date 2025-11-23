"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import HeaderBar from "@/components/header/HeaderBar";
import ShowCarousel from "@/components/ShowCarousel";
import ChevronIcon from "@/assets/icons/chevron.svg";

import useIntersectionEntry from "@/utilities/useIntersectionEntry";
import useSearch from "@/components/search/useSearch";
import HomeSearchField from "@/components/home_search/HomeSearchField";
import HomeSearchResults from "@/components/home_search/HomeSearchResults";
import Loading from "@/components/elements/Loading";
import Footer from "@/components/footer/Footer";
import BackingImage from "@/assets/banner.png";
import { FrontPageShows } from "./page";
import { ShowBrief } from "@/lib/find_shows/findHelper";
import Poster from "@/components/elements/Poster";
import Link from "next/link";
import { clsx } from "clsx";

export default function HomepageContent({ frontPageShows, posterShows }: { frontPageShows: FrontPageShows; posterShows: ShowBrief[] }) {
  const searchBoxRef = useRef<HTMLDivElement | null>(null);
  const intersectionEntry = useIntersectionEntry(searchBoxRef);
  const searchBoxVisible = intersectionEntry?.isIntersecting ?? false;

  const [searchFocusedRaw, setSearchFocused] = useState<boolean>(false);
  const { searchQueryValue, setSearchQueryValue, showQuery, searchQueryDebouncedValue } = useSearch();
  const searchFocused = searchFocusedRaw && searchQueryValue !== "";

  const someResults = showQuery.isSuccess && showQuery.data.length !== 0;

  const onFieldSubmit = () => {
    if (!showQuery.isSuccess || showQuery.data.length === 0) return;
    (window as Window).location = showQuery.data[0].url;
  };
  return (
    <>
      <HeaderBar hideSearch={searchBoxVisible} />
      <Image
        className="object-cover object-bottom-center filter brightness-50 absolute z-0 h-screen w-screen"
        src={BackingImage}
        alt=""
        priority
      />
      <div className="w-full flex justify-center mt-[260px] relative z-1">
        <div className="grid grid-cols-[400px_max-content] grid-rows-[1fr_auto]">
          <div className="col-start-1 row-start-1 mb-5">
            <h1 className="text-[32px] font-bold leading-[1.2]">{"Don't waste your time on bad TV."}</h1>
            <p className="my-4">Does it get better? Find out with a glance at the ratings graph.</p>
          </div>
          <div className="col-start-1 row-start-2" ref={searchBoxRef}>
            <HomeSearchField
              value={searchQueryValue}
              onChange={setSearchQueryValue}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => {
                if (searchQueryValue === "") setSearchFocused(false);
              }}
              onSubmit={onFieldSubmit}
              focused={searchFocused}
            />
          </div>
          <div className="col-start-2 row-start-1 row-span-2 flex items-center ml-15 h-full">
            <div>
              {posterShows.reverse().map((show, index) => {
                const angle = ((posterShows.length - 1 - index) / (posterShows.length - 1)) * -20 + 20 * 0.5;
                return (
                  <Link
                    href={show.url}
                    key={index}
                    className="group origin-bottom transition-transform duration-200 inline-block -ml-15 first:ml-0 rotate-(--angle) hover:scale-115"
                    style={{ "--angle": `${angle}deg` } as React.CSSProperties}
                  >
                    <Poster
                      posterURL={show.posterURL}
                      posterWidth={110}
                      className="shadow-[0_0_5px_0_#000a] transition-shadow group-hover:shadow-[0_0_10px_0_black]"
                    />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      {/* <div className={cn(styles.searchResultsContainer, showQuery.isSuccess && showQuery.data.length !== 0 && styles.someResults)}> */}
      <div
        className={clsx(
          "relative z-1 h-40 mx-55 mt-22 opacity-0 transition-[height,opacity] duration-200 not-empty:h-45 not-empty:opacity-100 overflow-hidden",
          { "not-empty:h-70": someResults }
        )}
      >
        {searchQueryDebouncedValue !== "" &&
          (showQuery.isLoading ? (
            <div className="opacity-80 flex items-center justify-center">
              <Loading className="w-10" />
            </div>
          ) : showQuery.isError ? (
            <div className="flex items-center justify-center">Oops, something went wrong. Please try again.</div>
          ) : someResults ? (
            <div className="animate-fadeIn">
              <HomeSearchResults shows={showQuery.data} />
            </div>
          ) : (
            searchQueryDebouncedValue !== "" && (
              <div className="flex items-center justify-center">
                <div>
                  No results found for query {'"'}
                  <i>{searchQueryDebouncedValue}</i>
                  {'"'}
                </div>
              </div>
            )
          ))}
      </div>
      <div className="relative z-1 mx-55 mt-5 mb-50">
        {frontPageShows.map((section, index) => (
          <div key={index}>
            <h2 className="font-bold mb-6 mt-12 flex items-center">
              {section.name}
              <ChevronIcon className="stroke-(--signature-offwhite) h-[1.2ex] ml-[5px] mt-px" />
            </h2>
            <ShowCarousel shows={section.shows} />
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
}
