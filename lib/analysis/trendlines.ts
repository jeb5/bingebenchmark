import { EpisodeRating, RatingData } from "../tv/types";
import { Trendlines } from "./types";

export type Trend = {
	slope: number;
	intercept: number;
};
export type DrawPoints = {
	start: { x: number; y: number };
	end: { x: number; y: number };
};
export type Trendline = Trend & {
	drawPoints: DrawPoints;
};

export function generateTrendline(dataPoints: { x: number; y: number | null }[]): Trendline | null {
	//remove null values
	const filteredDataPoints = dataPoints.filter(dataPoint => dataPoint.y != null) as { x: number; y: number }[];
	const x = filteredDataPoints.map(dataPoint => dataPoint.x);
	const y = filteredDataPoints.map(dataPoint => dataPoint.y);

	if (x.length <= 1) {
		return null;
	}

	//linear regression calculations
	const xSum = x.reduce((a, b) => a + b, 0);
	const ySum = y.reduce((a, b) => a + b, 0);
	const xSquaredSum = x.reduce((a, b) => a + b * b, 0);
	const xySum = x.reduce((a, b, i) => a + b * y[i], 0);
	const n = x.length;

	const slope = (n * xySum - xSum * ySum) / (n * xSquaredSum - xSum * xSum); // since x is sequential, no need to worry about denominator being 0
	const intercept = (ySum - slope * xSum) / n;
	const trend: Trend = { slope, intercept };
	return {
		...trend,
		drawPoints: getDrawPoints(filteredDataPoints[0].x, filteredDataPoints[filteredDataPoints.length - 1].x, trend),
	};
}

function getDrawPoints(firstx: number, lastx: number, trendline: Trend): DrawPoints {
	return {
		start: {
			x: firstx,
			y: firstx * trendline.slope + trendline.intercept,
		},
		end: {
			x: lastx,
			y: lastx * trendline.slope + trendline.intercept,
		},
	};
}

export function generateTrendlines(ratingData: RatingData): {
	show: Trendline | null;
	seasons: { [season: number]: Trendline | null };
} {
	const showDatapoints = ratingData.episode_ratings.map(episode => ({
		x: episode.absolute_episode,
		y: episode.average_rating,
	}));
	const showTrend = generateTrendline(showDatapoints);
	const seasons = ratingData.episode_ratings.reduce((cum, cur) => {
		return {
			...cum,
			[cur.season]: cum[cur.season] ? [...cum[cur.season], cur] : [cur],
		};
	}, {} as { [season: number]: EpisodeRating[] });

	const seasonTrends = Object.fromEntries(
		Object.entries(seasons).map(([season, episodes]) => {
			const seasonDatapoints = episodes.map(episode => ({
				x: episode.absolute_episode,
				y: episode.average_rating,
			}));
			return [season, generateTrendline(seasonDatapoints)];
		})
	);
	return { show: showTrend, seasons: seasonTrends } as Trendlines;
}
