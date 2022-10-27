import Image from "next/image";
import styles from "./ShowDetails.module.css";
import CalendarIcon from "../../assets/icons/date.svg";
import StarIcon from "../../assets/icons/star.svg";
import { TVShow } from "../../lib/transformTVShow";

export default function ShowDetails({ showDetails, className }: { showDetails: TVShow; className: string }) {
	const dateText = `${showDetails.first_air_year} - ${showDetails.status === "Ended" ? showDetails.last_air_year : ""}`;

	return (
		<div className={[className, styles.showDetails].join(" ")}>
			<Image
				src={showDetails.poster_url}
				alt={`${showDetails!.name} poster`}
				className={styles.poster}
				width={133}
				height={200}
				priority
			/>
			<h2 className={styles.title}>{showDetails.name}</h2>
			<div className={styles.tags}>{showDetails.genres.join(", ")}</div>
			<div className={styles.stats}>
				<div className={styles.detailsRow}>
					<CalendarIcon className={styles.calendarIcon} />
					<span>{dateText}</span>
				</div>
				<div className={styles.detailsRow}>
					<StarIcon className={styles.starIcon} />
					<span>{showDetails.rating_data!.show_average_rating}</span>
					<span>/10</span>
				</div>
			</div>
		</div>
	);
}
