import styles from "./ShowPresentation.module.css";
import HeaderBar from "./HeaderBar";
import ShowIntroduction from "./ShowIntroduction";
import ShowDetails from "./ShowDetails";
import { TVShow } from "../../lib/tv/types";
import ShowChart from "../ShowChart";
import ShowChartContainer from "./ShowChartContainer";

export default function ShowPresentation({ showDetails }: { showDetails: TVShow }) {
	return (
		<div className={styles.presentation}>
			<HeaderBar />
			<div className={styles.mainContainer}>
				<main className={styles.main}>
					<ShowIntroduction
						className={styles.introduction}
						showName={showDetails.name}
						summary={
							showDetails.analysis?.summary ??
							`It looks like there is too little rating data to determine whether ${showDetails.name} gets better.`
						}
						showVerdict={
							showDetails.analysis == null
								? "unknown"
								: showDetails.analysis?.verdict == "unknown"
								? "unknown"
								: showDetails.analysis?.verdict.overall
						}
					/>
					<ShowDetails className={styles.details} showDetails={showDetails} />
					<div className={styles.chart}>
						{showDetails.rating_data !== null ? <ShowChartContainer showDetails={showDetails} /> : null}
					</div>
				</main>
			</div>
		</div>
	);
}
