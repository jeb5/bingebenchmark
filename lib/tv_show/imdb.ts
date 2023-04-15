import knex from "./database";

type ShowRating = {
	show_id: string;
	average_rating: number;
	num_votes: number;
};

type imdbEpisode = {
	episode_id: string;
	show_id: string;
	season: number;
	absolute_episode: number;
	episode: number;
	average_rating: number | null;
	num_votes: number | null;
};

export async function fetchRatingDataByIMDBID(imdbId: string) {
	//show_id in the table will be lowercase. Using LOWER() significantly slows down the query.
	const episodeRatingQuery = knex<imdbEpisode>("imdb_episodes")
		.select("season", "episode", "average_rating", "num_votes", "absolute_episode")
		.where("show_id", imdbId.toLowerCase())
		.timeout(1000, { cancel: true });
	const showRatingQuery = knex<ShowRating>("imdb_shows")
		.select("average_rating", "num_votes")
		.where("show_id", imdbId.toLowerCase())
		.timeout(1000, { cancel: true });

	const [episodeRatingResult, showRatingResult] = await Promise.all([episodeRatingQuery, showRatingQuery]);
	if (episodeRatingResult.length === 0 || showRatingResult.length === 0) return null;

	const episodeRatings = episodeRatingResult.slice(
		0,
		episodeRatingResult.findLastIndex(({ average_rating }) => average_rating !== null) + 1
	); //Removes trailing unrated episodes (unreleased seasons)

	return {
		episode_ratings: episodeRatings,
		show_average_rating: showRatingResult[0].average_rating,
		show_num_votes: showRatingResult[0].num_votes,
	};
}
