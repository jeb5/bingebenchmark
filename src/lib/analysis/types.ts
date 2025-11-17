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
	improvementVerdict: OverallVerdict;
	ratingsAreConsistent: boolean;
	showTrend: {
		trend: TrendDescriptor;
		start: number;
		end: number;
	};
	firstEpisodesTrend: {
		trend: TrendDescriptor;
		episodesConsidered: number;
	};
	seasonsTrend: {
		trend: TrendDescriptor;
		seasonsTrendingUp: number;
		seasonsTrendingDown: number;
		seasonsTrendingFlat: number;
	};
};
export type Summary = string;

export type OverallVerdict = "yes" | "maybe" | "no" | "unknown";
// export type RatingsDescriptor = "great" | "high" | "average" | "low" | "abysmal";
export type TrendDescriptor = "up" | "down" | "flat";
