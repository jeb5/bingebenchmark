import knex from "./database";

interface imdbEpisode {
	episode_id: string;
	show_id: string;
	season: number;
	episode: number;
	average_rating: number;
	num_votes: number;
}
interface showRating {
	show_id: string;
	average_rating: number;
	num_votes: number;
}

export async function fetchRatingDataByIMDBID(imdbId: string) {
	//show_id in the table will be lowercase. Using LOWER() significantly slows down the query.
	const episodeRatingQuery = knex<imdbEpisode>("imdb_episodes")
		.select("season", "episode", "average_rating", "num_votes")
		.where("show_id", imdbId.toLowerCase())
		.timeout(1000, { cancel: true });
	const showRatingQuery = knex<showRating>("imdb_shows")
		.select("average_rating", "num_votes")
		.where("show_id", imdbId.toLowerCase())
		.timeout(1000, { cancel: true });

	const [episodeRatingResult, showRatingResult] = await Promise.all([episodeRatingQuery, showRatingQuery]);
	if (episodeRatingResult.length === 0 || showRatingResult.length === 0) return null;
	return {
		episode_ratings: episodeRatingResult,
		show_average_rating: showRatingResult[0].average_rating,
		show_num_votes: showRatingResult[0].num_votes,
	};
}
