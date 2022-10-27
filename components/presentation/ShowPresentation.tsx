import styles from "./ShowPresentation.module.css";
import HeaderBar from "./HeaderBar";
import ShowIntroduction from "./ShowIntroduction";
import ShowDetails from "./ShowDetails";
import { TVShow } from "../../lib/transformTVShow";

export default function ShowPresentation({ showDetails }: { showDetails: TVShow }) {
	return (
		<div className={styles.presentation}>
			<HeaderBar />
			<div className={styles.mainContainer}>
				<main className={styles.main}>
					<ShowIntroduction
						className={styles.introduction}
						showName={showDetails.name}
						consensusExplanation={
							"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
						}
						showConsensus={"yes"}
					/>
					<ShowDetails className={styles.details} showDetails={showDetails} />
					<div className={styles.chart}></div>
				</main>
			</div>
		</div>
	);
}
