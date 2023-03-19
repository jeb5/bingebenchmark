import { useState } from "react";
import { TVShow } from "../../lib/tv/types";
import Button from "../elements/Button";
import CheckboxWithLabel from "../elements/CheckboxWithLabel";
import ShowChart from "../ShowChart";
import styles from "./ShowChartContainer.module.css";

export default function ShowChartContainer({ showDetails }: { showDetails: TVShow }) {
	const handleViewLargerClick = () => {
		//TODO: Implement this
		alert("Feature not implemented yet");
	};
	const showVerdictKnown =
		showDetails.analysis != null &&
		showDetails.analysis.verdict != "unknown" &&
		showDetails.analysis.verdict.improvementVerdict != "unknown";
	const [showSeasonTrendlines, setShowSeasonTrendlines] = useState(showVerdictKnown);
	const [showOverallTrendline, setShowOverallTrendline] = useState(showVerdictKnown);
	return (
		<div className={styles.showChartContainer}>
			<ShowChart
				showDetails={showDetails}
				className={styles.chart}
				{...{ showOverallTrendline, showSeasonTrendlines }}
			/>
			<div className={styles.chartControls}>
				<CheckboxWithLabel
					label="Show Season Trendlines"
					checked={showSeasonTrendlines}
					setChecked={setShowSeasonTrendlines}
				/>
				<CheckboxWithLabel
					label="Show Overall Trendline"
					checked={showOverallTrendline}
					setChecked={setShowOverallTrendline}
				/>
				<Button className={styles.viewLargerBtn} text="View larger" onClick={handleViewLargerClick} />
			</div>
		</div>
	);
}
