import { Analysis } from "../analysis/types";

export type EpisodeRating = {
	season: number;
	episode: number;
	absolute_episode: number;
	average_rating: number | null;
	num_votes: number | null;
};

export type RatingData = {
	episode_ratings: EpisodeRating[];
	show_average_rating: number;
	show_num_votes: number;
};

export type ShowDetails = {
	name: string;
	overview: string;
	first_air_year: string;
	last_air_year: string | null;
	poster_url: string;
	genres: string[];
	number_of_episodes: number;
	status: string;

	tmdb_id: string;
	imdb_id: string | null;
	external_links: {
		tmdb_link: string;
		imdb_link: string | null;
		twitter_link: string | null;
	};
};
export type TVShow = ShowDetails & {
	rating_data: RatingData | null;
	analysis: Analysis | null;
};
