import Image from "next/image";
import styles from "./ShowDetails.module.css";
import CalendarIcon from "../../assets/icons/date.svg";
import StarIcon from "../../assets/icons/star.svg";
import { TVShow } from "../../lib/tv_show/types";

export default function ShowDetails({ showDetails, className }: { showDetails: TVShow; className: string }) {
	const dateText = `${showDetails.first_air_year}${
		showDetails.status === "Ended" ? " - " + showDetails.last_air_year : " ~"
	}`;

	return (
		<div className={[className, styles.showDetails].join(" ")}>
			<Image
				src={showDetails.poster_url}
				alt={`${showDetails!.name} poster`}
				className={`${styles.poster} showPoster`}
				width={140}
				height={210}
				priority
			/>
			<h2 className={styles.title}>{showDetails.name}</h2>
			<div className={styles.tags}>{showDetails.genres.join(", ")}</div>
			<div className={styles.stats}>
				<div className={styles.detailsRow}>
					<CalendarIcon className={styles.calendarIcon} />
					<div>
						<span>{showDetails.first_air_year}</span>
						{showDetails.status === "Ended" ? (
							showDetails.first_air_year === showDetails.last_air_year ? null : (
								<>
									<span> - </span>
									<span>{showDetails.last_air_year}</span>
								</>
							)
						) : (
							<span> ~</span>
						)}
					</div>
				</div>
				<div className={styles.detailsRow}>
					<StarIcon className={styles.starIcon} />
					<div className={styles.ratingContainer}>
						<span className={styles.ratingSpan}>{showDetails.rating_data?.show_average_rating}</span>
						<span className={styles.ratingOutOfSpan}>/10</span>
					</div>
				</div>
			</div>
		</div>
	);
}
