import { ShowBrief } from "../../lib/find_shows/findHelper";
import Image from "next/image";
import styles from "./ShowCarousel.module.css";

const POSTER_WIDTH = 100;

export default function ShowCarousel({ shows }: { shows: ShowBrief[] }) {
	return (
		<div className={styles.carousel}>
			{shows.map((show, index) => (
				<a className={styles.show} key={index} href={show.url}>
					<Image
						src={show.posterURL}
						alt=""
						className={`${styles.poster} showPoster`}
						width={POSTER_WIDTH}
						height={POSTER_WIDTH * (3 / 2)}
					/>
					<div className={styles.showName}>{show.name}</div>
				</a>
			))}
		</div>
	);
}
