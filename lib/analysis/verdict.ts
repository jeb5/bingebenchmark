import { EpisodeRating, RatingData, ShowDetails } from "../tv_show/types";
import { generateTrendline } from "./trendlines";
import { TrendDescriptor, Trendlines, Verdict } from "./types";

function determineFirstEpisodesToConsider(showDetails: ShowDetails) {
	const firstEpisodes = Math.min(
		Math.max(Math.round(showDetails.number_of_episodes * 0.2), 8),
		30,
		showDetails.number_of_episodes
	);
	return firstEpisodes;
}

function determineFirstEpisodesSlope(episodeDatapoints: CleanedEpisodeDatapoints, firstEpisodes: number) {
	let firstEpisodeDataPoints = episodeDatapoints.slice(0, firstEpisodes);

	const badEpisodesDiscounted = Math.floor(firstEpisodes / 5);
	//remove the lowest badEpisodesDiscounted episodes
	firstEpisodeDataPoints = firstEpisodeDataPoints
		.sort((a, b) => a.y - b.y)
		.slice(badEpisodesDiscounted, firstEpisodes)
		.sort((a, b) => a.x - b.x);

	//adjust the y values of firstEpisodeDataPoints such that values closer to 10 are spread out more
	const firstEpisodeDataPointsAdjusted = firstEpisodeDataPoints.map(episode => ({
		y: episode.y ** 2 / 10,
		x: episode.x,
	}));
	const firstEpisodesTrend = generateTrendline(firstEpisodeDataPointsAdjusted);
	const slope = firstEpisodesTrend != null ? firstEpisodesTrend.slope : 0;
	return slope;
}

function determineFirstEpisodesTrend(
	episodeDatapoints: CleanedEpisodeDatapoints,
	showDetails: ShowDetails
): Verdict["firstEpisodesTrend"] {
	const firstEpisodeCount = determineFirstEpisodesToConsider(showDetails);
	const slope = determineFirstEpisodesSlope(episodeDatapoints, firstEpisodeCount);
	let trend: TrendDescriptor = "flat";
	if (slope > 0.03) trend = "up";
	if (slope < -0.03) trend = "down";
	return {
		trend,
		episodesConsidered: firstEpisodeCount,
	};
}

function cleanAndAdjustEpisodeRatings(episode_ratings: EpisodeRating[]): CleanedEpisodeDatapoints {
	return episode_ratings
		.filter(episode => episode.average_rating !== null)
		.map(episode => ({
			y: episode.average_rating! ** 2 / 10,
			x: episode.absolute_episode,
			season: episode.season,
		}))
		.sort((a, b) => a.x - b.x);
}

function determineShowTrend(
	episodeDatapoints: CleanedEpisodeDatapoints,
	trendlines: Trendlines
): Verdict["showTrend"] | null {
	const {
		drawPoints: {
			start: { y: realStartRating },
			end: { y: realEndRating },
		},
	} = trendlines.show!;
	const {
		drawPoints: {
			start: { y: adjustedStartRating },
			end: { y: adjustedEndRating },
		},
	} = generateTrendline(episodeDatapoints)!;
	const change = adjustedEndRating - adjustedStartRating;
	let trend: TrendDescriptor = "flat";
	if (change > 0.3) trend = "up";
	if (change < -0.3) trend = "down";
	return { trend, start: realStartRating, end: realEndRating };
}

function determineSeasonsTrend(episodeDatapoints: CleanedEpisodeDatapoints): Verdict["seasonsTrend"] {
	const seasons = {} as { [season: number]: CleanedEpisodeDatapoints };
	for (const episode of episodeDatapoints) {
		if (seasons[episode.season] == null) seasons[episode.season] = [];
		seasons[episode.season].push(episode);
	}
	let seasonsTrendingUp = 0;
	let seasonsTrendingDown = 0;
	let seasonsTrendingFlat = 0;
	for (const season in seasons) {
		if (seasons[season].length <= 3) continue;
		seasons[season] = seasons[season].sort((a, b) => a.x - b.x);
		const seasonTrendline = generateTrendline(seasons[season]);
		const change = seasonTrendline!.drawPoints.end.y - seasonTrendline!.drawPoints.start.y;
		if (change > 0.3) seasonsTrendingUp++;
		if (change < -0.3) seasonsTrendingDown++;
		if (change >= -0.3 && change <= 0.3) seasonsTrendingFlat++;
	}
	let seasonsTrend: TrendDescriptor = "flat";
	const averageSeasonsUp =
		(seasonsTrendingUp - seasonsTrendingDown) / (seasonsTrendingUp + seasonsTrendingDown + seasonsTrendingFlat);
	if (averageSeasonsUp > 0.2) seasonsTrend = "up";
	if (averageSeasonsUp < -0.2) seasonsTrend = "down";
	return { trend: seasonsTrend, seasonsTrendingUp, seasonsTrendingDown, seasonsTrendingFlat };
}

type CleanedEpisodeDatapoints = { x: number; y: number; season: number }[];

export default function generateVerdict(
	ratingData: RatingData,
	trendlines: Trendlines,
	showDetails: ShowDetails
): Verdict {
	const cleanedEpisodeDatapoints = cleanAndAdjustEpisodeRatings(ratingData.episode_ratings);

	const firstEpisodesTrend = determineFirstEpisodesTrend(cleanedEpisodeDatapoints, showDetails);
	const showTrend = determineShowTrend(cleanedEpisodeDatapoints, trendlines)!;
	const seasonsTrend = determineSeasonsTrend(cleanedEpisodeDatapoints);

	const averageAdjustedRating =
		cleanedEpisodeDatapoints.reduce((sum, episode) => sum + episode.y, 0) / cleanedEpisodeDatapoints.length;
	const ratingStandardDeviation = Math.sqrt(
		cleanedEpisodeDatapoints.reduce((sum, episode) => {
			return sum + (episode.y - averageAdjustedRating) ** 2;
		}, 0) / cleanedEpisodeDatapoints.length
	);

	//BUG: This logic should not be duplicated across this file and summary.ts
	const positiveStartMetric = firstEpisodesTrend.trend === "up";
	const positiveShowMetric = showTrend.trend === "up";
	const positiveRatingsMetric = ratingData.show_average_rating >= 7.5;

	const positiveSeasons_not_a_metric = seasonsTrend.trend === "up";

	let improvementVerdict: Verdict["improvementVerdict"] = "unknown";
	// "yes": 2 or 3 positive metrics
	// "maybe": 1 or 2 positive metrics
	// "no": 0 or 1 positive metrics
	if (cleanedEpisodeDatapoints.length > 5) {
		if (positiveStartMetric && (positiveShowMetric || positiveRatingsMetric)) improvementVerdict = "yes"; // 2 or 3
		else if (positiveShowMetric && positiveRatingsMetric && positiveSeasons_not_a_metric)
			improvementVerdict = "yes"; // 2
		else if (positiveShowMetric && positiveRatingsMetric && !positiveSeasons_not_a_metric)
			improvementVerdict = "maybe"; // 2
		else if (positiveStartMetric) improvementVerdict = "maybe"; // 1
		else improvementVerdict = "no"; // 0 or 1
	}

	return {
		improvementVerdict,
		ratingsAreConsistent: ratingStandardDeviation < 0.3,
		showTrend,
		seasonsTrend,
		firstEpisodesTrend,
	};
}
export const exportedForTesting = {
	determineFirstEpisodesSlope,
	determineFirstEpisodesToConsider,
	determineFirstEpisodesTrend,
	cleanAndAdjustEpisodeRatings,
};
