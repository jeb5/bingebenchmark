import next from "next";
next({}); // instantiates Next.js to load .env files

import { exportedForTesting } from "../lib/analysis/verdict";
import { fetchRatingDataByIMDBID } from "../lib/tv/imdb";
import { fetchTmdbDetails, fetchTmdbIdByOriginalName } from "../lib/tv/tmdb";

function testFirstEpisodeTrend(name: string, expectedTrend: "up" | "down" | "flat") {
	it(`should find the firstEpisodeTrend for ${name}`, async () => {
		const tmdbId = await fetchTmdbIdByOriginalName(name);
		if (tmdbId === null) throw new Error("tmdbId is null");
		const showDetails = await fetchTmdbDetails(tmdbId);
		if (showDetails.imdb_id === null) throw new Error("imdb_id is null");
		const ratingData = await fetchRatingDataByIMDBID(showDetails.imdb_id);
		if (ratingData === null) throw new Error("ratingData is null");
		const cleanedEpisodeDatapoints = exportedForTesting.cleanAndAdjustEpisodeRatings(ratingData.episode_ratings);
		const firstEpisodesTrend = exportedForTesting.determineFirstEpisodesTrend(cleanedEpisodeDatapoints, showDetails);

		expect(firstEpisodesTrend.trend).toBe(expectedTrend);
	});
}

testFirstEpisodeTrend("the office", "up");
testFirstEpisodeTrend("silicon valley", "up");
// testFirstEpisodeTrend("game of thrones", "up");
testFirstEpisodeTrend("heroes", "flat");
testFirstEpisodeTrend("the marvelous mrs. maisel", "up");
testFirstEpisodeTrend("glee", "up");
testFirstEpisodeTrend("star wars: the clone wars", "up");
