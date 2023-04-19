import HeaderBar from "../components/header/HeaderBar";
import styles from "../styles/index.module.css";
import Image from "next/image";
import discover from "../lib/find_shows/discover";
import { ShowBrief } from "../lib/find_shows/findHelper";
import SearchBox from "../components/search/SearchBox";
import ShowCarousel from "../components/show_carousel/ShowCarousel";
import ChevronIcon from "../assets/icons/chevron.svg";
import { shuffle } from "../utilities/util";
import Head from "next/head";
import { useRef } from "react";
import useIntersectionEntry from "../utilities/useIntersectionEntry";

type FrontPageShows = {
	name: string;
	shows: ShowBrief[];
}[];

const POSTER_WIDTH = 105;

export async function getStaticProps() {
	const frontPageShows: FrontPageShows = [
		{ name: "Airing this week", shows: await discover("airing_this_week") },
		{ name: "Popular", shows: await discover("popular") },
		{ name: "Top rated", shows: await discover("top_rated") },
	];
	const posterShows = shuffle(frontPageShows[2].shows).slice(0, 4);

	return {
		props: { frontPageShows, posterShows },
		revalidate: 60,
	};
}

export default function Home({
	frontPageShows,
	posterShows,
}: {
	frontPageShows: FrontPageShows;
	posterShows: ShowBrief[];
}) {
	const searchBoxRef = useRef<HTMLDivElement>(null);
	const intersectionEntry = useIntersectionEntry(searchBoxRef);
	const searchBoxVisible = intersectionEntry?.isIntersecting ?? false;

	return (
		<>
			<Head>
				<title>Binge Benchmark</title>
			</Head>
			<HeaderBar hideSearch={searchBoxVisible} />
			<Image className={styles.backingImage} src="/banner.png" alt="Banner" priority fill />
			<div className={styles.topBanner}>
				<div className={styles.topBannerContent}>
					<div className={styles.title}>
						<h1>{"Don't waste your time on bad TV."}</h1>
						<p>Does it get better? Find out with a glance at the ratings graph.</p>
					</div>
					<div className={styles.searchBox}>
						<SearchBox homeVersion ref={searchBoxRef} />
					</div>
					<div className={styles.bannerPosters}>
						<div>
							{posterShows.reverse().map((show, index) => {
								const angle = ((posterShows.length - 1 - index) / (posterShows.length - 1)) * -20 + 20 * 0.5;
								return (
									<a
										href={show.url}
										key={index}
										className={styles.poster}
										style={
											{ "--angle": `${angle}deg`, animationDelay: `${index * 100 + 100}ms` } as React.CSSProperties
										}>
										<Image
											src={show.posterURL}
											// alt={`${show.name} poster`}
											//Prevents broken image icon from showing when page redirects:
											alt=""
											className={"showPoster"}
											width={POSTER_WIDTH}
											height={POSTER_WIDTH * (3 / 2)}
											priority
										/>
									</a>
								);
							})}
						</div>
					</div>
				</div>
			</div>
			<div className={styles.mainContent}>
				{frontPageShows.map((section, index) => (
					<div key={index}>
						<h2 className={styles.sectionTitle}>
							{section.name}
							<ChevronIcon className={styles.chevronIcon} />
						</h2>
						<ShowCarousel shows={section.shows} />
					</div>
				))}
			</div>
		</>
	);
}
