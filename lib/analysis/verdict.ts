import { RatingData } from "../tv/types";
import { Trendlines, Verdict } from "./types";

export default function generateVerdict(ratingData: RatingData, trendlines: Trendlines): Verdict {
	// if (trendlines.show === null) return "maybe";
	// if (showTrend.slope > 0) return "better";
	// if (showTrend.slope < 0) return "worse";
	// return "same";

	//TODO: Replace this stand in
	return {
		overall: "unknown",
		ratingDeviation: 0.5,
		showRatingsTrend: {
			positiveTrend: true,
			trend: "up",
			start: 5,
			end: 8,
		},
		seasonsRatingTrend: {
			trend: "up",
			positveTrend: true,
			numTrendingUp: 5,
			numTrendingDown: 2,
			numTrendingConsistent: 1,
			numSeasons: 8,
		},
		firstEpisodesTrend: {
			trend: "slow",
			episodesConsidered: 3,
			firstEpisodesAverageRating: 7.6,
			followingEpisodesAverageRating: 8.2,
		},
	};
}
