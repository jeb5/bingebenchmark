import { RatingData, ShowDetails } from "../tv_show/types";
import generateSummary from "./summary";
import { generateTrendlines } from "./trendlines";
import { Analysis } from "./types";
import generateVerdict from "./verdict";

export function generateAnalysis(ratingData: RatingData, showDetails: ShowDetails): Analysis {
	const trendlines = generateTrendlines(ratingData);
	const verdict = generateVerdict(ratingData, trendlines, showDetails);
	const summary = generateSummary(ratingData, trendlines, verdict, showDetails);

	return {
		trendlines,
		verdict,
		summary,
	};
}
