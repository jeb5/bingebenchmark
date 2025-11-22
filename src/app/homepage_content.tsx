"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import HeaderBar from "@/components/header/HeaderBar";
import styles from "@/styles/index.module.css";
import ShowCarousel from "@/components/ShowCarousel";
import ChevronIcon from "@/assets/icons/chevron.svg";

import useIntersectionEntry from "@/utilities/useIntersectionEntry";
import useSearch from "@/components/search/useSearch";
import HomeSearchField from "@/components/home_search/HomeSearchField";
import HomeSearchResults from "@/components/home_search/HomeSearchResults";
import Loading from "@/components/elements/Loading";
import Footer from "@/components/footer/Footer";
import BackingImage from "@/assets/banner.png";
import { cn } from "@/utilities/util";
import { FrontPageShows } from "./page";
import { ShowBrief } from "@/lib/find_shows/findHelper";
import Poster from "@/components/elements/Poster";
import Link from "next/link";

export default function HomepageContent({ frontPageShows, posterShows }: { frontPageShows: FrontPageShows; posterShows: ShowBrief[] }) {
  const searchBoxRef = useRef<HTMLDivElement | null>(null);
  const intersectionEntry = useIntersectionEntry(searchBoxRef);
  const searchBoxVisible = intersectionEntry?.isIntersecting ?? false;

  const [searchFocusedRaw, setSearchFocused] = useState<boolean>(false);
  const { searchQueryValue, setSearchQueryValue, showQuery, searchQueryDebouncedValue } = useSearch();
  const searchFocused = searchFocusedRaw && searchQueryValue !== "";

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
      <div className={styles.topBanner}>
        <div className={styles.topBannerContent}>
          <div className={styles.title}>
            <h1 className="text-[32px] font-bold leading-[1.2]">{"Don't waste your time on bad TV."}</h1>
            <p className="my-4">Does it get better? Find out with a glance at the ratings graph.</p>
          </div>
          <div className={styles.searchBox} ref={searchBoxRef}>
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
          <div className={styles.bannerPosters}>
            <div>
              {posterShows.reverse().map((show, index) => {
                const angle = ((posterShows.length - 1 - index) / (posterShows.length - 1)) * -20 + 20 * 0.5;
                return (
                  <Link
                    href={show.url}
                    key={index}
                    className={styles.poster}
                    style={{ "--angle": `${angle}deg`, animationDelay: `${index * 100 + 100}ms` } as React.CSSProperties}
                  >
                    <Poster posterURL={show.posterURL} posterWidth={110} />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className={cn(styles.searchResultsContainer, showQuery.isSuccess && showQuery.data.length !== 0 && styles.someResults)}>
        {searchQueryDebouncedValue !== "" &&
          (showQuery.isLoading ? (
            <div className={`${styles.exceptionBox} ${styles.loadingBox}`}>
              <Loading />
            </div>
          ) : showQuery.isError ? (
            <div className={styles.exceptionBox}>Oops, something went wrong. Please try again.</div>
          ) : showQuery.isSuccess && showQuery.data.length !== 0 ? (
            <div className={styles.searchResults}>
              <HomeSearchResults shows={showQuery.data} />
            </div>
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
          ))}
      </div>
      <div className={styles.mainContent}>
        {frontPageShows.map((section, index) => (
          <div key={index}>
            <h2 className="font-bold mb-6 mt-12 flex items-center">
              {section.name}
              <ChevronIcon className={styles.chevronIcon} />
            </h2>
            <ShowCarousel shows={section.shows} />
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
}
