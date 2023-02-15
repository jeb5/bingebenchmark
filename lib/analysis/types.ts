import { Trendline } from "./trendlines";

export type Analysis = {
	trendlines: Trendlines | null;
	verdict: Verdict | "unknown";
	summary: Summary;
};
export type Trendlines = {
	show: Trendline | null;
	seasons: {
		[season: number]: Trendline | null;
	};
};
export type Verdict = {
	overall: OverallVerdict;
	ratingDeviation: number;
	showRatingsTrend: {
		positiveTrend: boolean;
		trend: TrendDescriptor;
		start: number;
		end: number;
	};
	seasonsRatingTrend: {
		positveTrend: boolean;
		trend: TrendDescriptor;
		numTrendingUp: number;
		numTrendingDown: number;
		numTrendingConsistent: number;
		numSeasons: number;
	};
	firstEpisodesTrend: {
		trend: FirstEpisodesVerdict;
		episodesConsidered: number;
		firstEpisodesAverageRating: number;
		followingEpisodesAverageRating: number;
	};
};
export type Summary = string;

export type OverallVerdict = "yes" | "maybe" | "no" | "unknown";
export type RatingsDescriptor = "great" | "high" | "average" | "low" | "abysmal";
export type FirstEpisodesVerdict = "slow" | "strong" | "steady";
export type TrendDescriptor = "up" | "down" | "consistent";
