import type { NextPage } from "next";
import HeaderBar from "../components/header/HeaderBar";
import styles from "../styles/index.module.css";
import Image from "next/image";
import discover from "../lib/find_shows/discover";
import { ShowBrief } from "../lib/find_shows/findHelper";
import SearchBox from "../components/search/SearchBox";

type FrontPageShows = {
	name: string;
	shows: ShowBrief[];
}[];

const BANNER_MAX_POSTER_WIDTH = 105;
const BANNER_MIN_POSTER_WIDTH = 105;
export async function getStaticProps() {
	const frontPageShows: FrontPageShows = [
		{ name: "Airing this week", shows: await discover("airing_this_week") },
		{ name: "Popular", shows: await discover("popular") },
		{ name: "Top rated", shows: await discover("top_rated") },
	];
	const posterShows = frontPageShows[2].shows.slice(0, 4);
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
	return (
		<div className={styles.backingDiv}>
			<HeaderBar homeVersion />
			<div className={styles.topBanner}>
				<Image className={styles.backingImage} src="/banner.jpg" alt="Banner" priority fill />
				<div className={styles.topBannerContent}>
					<div className={styles.title}>
						<h1>{"Don't waste your time on bad TV."}</h1>
						<p>Does it get better? Find out with a glance at the ratings graph.</p>
					</div>
					<div className={styles.searchBox}>
						<SearchBox homeVersion />
					</div>
					<div className={styles.bannerPosters}>
						<div>
							{posterShows.reverse().map((show, index) => {
								const posterWidth =
									BANNER_MIN_POSTER_WIDTH +
									(BANNER_MAX_POSTER_WIDTH - BANNER_MIN_POSTER_WIDTH) * (index / (posterShows.length - 1));
								const angle = ((posterShows.length - 1 - index) / (posterShows.length - 1)) * -20 + 20 * 0.5;
								return (
									<a
										href={show.name.toLowerCase()}
										key={index}
										className={styles.poster}
										style={{ "--angle": `${angle}deg` } as React.CSSProperties}>
										<Image
											src={show.posterURL}
											// alt={`${show.name} poster`}
											//Prevents broken image icon from showing when page redirects:
											alt=""
											className={"showPoster"}
											width={posterWidth}
											height={posterWidth * (3 / 2)}
											priority
										/>
									</a>
								);
							})}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
