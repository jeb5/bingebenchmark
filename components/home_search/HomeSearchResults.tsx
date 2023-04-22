import { ShowBrief } from "../../lib/find_shows/findHelper";
import Image from "next/image";
import styles from "./HomeSearchResults.module.css";
import { cn } from "../../utilities/util";

const POSTER_WIDTH = 100;
const TOP_RESULT_POSTER_WIDTH = 130;

export default function HomeSearchResults({ shows }: { shows: ShowBrief[] }) {
	const [topShow, ...restShows] = shows;
	return (
		<div className={styles.searchCarousel}>
			<div className={cn(styles.show, styles.topResultShow)} key={topShow.url}>
				<a className={styles.show} href={topShow.url}>
					<Image
						src={topShow.posterURL}
						alt=""
						className={`${styles.poster} showPoster`}
						width={TOP_RESULT_POSTER_WIDTH}
						height={TOP_RESULT_POSTER_WIDTH * (3 / 2)}
					/>
					<div className={styles.showName}>{topShow.name}</div>
					<div className={styles.showYear}>{topShow.year}</div>
				</a>
			</div>
			<div className={styles.restOfShows}>
				{restShows.map((show, index) => {
					return (
						<div className={styles.show} key={show.url}>
							<a className={styles.show} href={show.url}>
								<Image
									src={show.posterURL}
									alt=""
									className={`${styles.poster} showPoster`}
									width={POSTER_WIDTH}
									height={POSTER_WIDTH * (3 / 2)}
								/>
								<div className={styles.showName}>{show.name}</div>
							</a>
						</div>
					);
				})}
			</div>
		</div>
	);
}
