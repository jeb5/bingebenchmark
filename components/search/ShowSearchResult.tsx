import Image from "next/image";
import { SearchResultShow } from "../../pages/api/search";
import styles from "./ShowSearchResult.module.css";
export default function ShowSearchResult({ show, index }: { show: SearchResultShow; index: number }) {
	const posterWidth = index == 0 ? 90 : 50;

	return (
		<a href={show.url}>
			<div
				className={`${styles.resultDiv}${index == 0 ? ` ${styles.topResult}` : ""}${
					index % 2 == 1 ? ` ${styles.odd}` : ""
				}`}>
				<Image
					src={show.posterURL}
					// alt={`${show.name} poster`}
					//Prevents broken image icon from showing when page redirects:
					alt=""
					className={`${styles.poster} showPoster`}
					width={posterWidth}
					height={posterWidth * (3 / 2)}
					priority
				/>
				<div className={styles.resultInfoDiv}>
					<h2 className={styles.title}>{show.name}</h2>
					<h3 className={styles.year}>{show.year}</h3>
					{index == 0 && <p className={styles.description}>{show.description}</p>}
				</div>
			</div>
		</a>
	);
}
