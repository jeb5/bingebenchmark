import { EpisodeRating, RatingData, ShowDetails } from "../tv/types";
import generateSummary from "./summary";
import { generateTrendlines, Trendline } from "./trendlines";
import { Analysis, Trendlines, Verdict } from "./types";
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
