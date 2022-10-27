import getTVShow from "./getTVShow";
import { ShowResponse, TvExternalIdsResponse } from "moviedb-promise";
import { fetchRatingDataByIMDBID } from "./imdb";

type TMDBShow = ShowResponse & { external_ids: TvExternalIdsResponse } & { tagline?: string };

interface ValidTMDBShow {
	id: number;
	name: string;
	overview: string;
	first_air_date: string;
	last_air_date: string | undefined;
	poster_path: string;
	genres: {
		name: string;
	}[];
	status: string;
	tagline: string | undefined;
	external_ids: {
		imdb_id: string | null;
		twitter_id: string | null;
	};
}

interface RatingData {
	episode_ratings: {
		season: number;
		episode: number;
		average_rating: number;
		num_votes: number;
	}[];
	show_average_rating: number;
	show_num_votes: number;
}

export interface TVShow {
	name: string;
	overview: string;
	first_air_year: string;
	last_air_year: string | null;
	poster_url: string;
	genres: string[];
	status: string;

	tmdb_id: string;
	external_links: {
		tmdb_link: string;
		imdb_link: string | null;
		twitter_link: string | null;
	};

	rating_data: RatingData | null;
}

export default function transformTVShow(tmdbShow: TMDBShow, rating: RatingData | null): TVShow {
	if (!isValidTMDBShow(tmdbShow)) {
		console.dir(tmdbShow);
		throw new Error("Invalid TMDB response");
	}
	return {
		tmdb_id: tmdbShow.id.toString(),
		name: tmdbShow.name,
		// rating_data: tmdbShow.rating_data,
		overview: tmdbShow.overview,
		first_air_year: new Date(tmdbShow.first_air_date).getFullYear().toString(),
		last_air_year: tmdbShow.last_air_date ? new Date(tmdbShow.last_air_date).getFullYear().toString() : null,
		status: tmdbShow.status,
		poster_url: `https://image.tmdb.org/t/p/original${tmdbShow.poster_path}`,
		genres: tmdbShow.genres.map(genre => genre.name),
		external_links: {
			tmdb_link: `https://www.themoviedb.org/tv/${tmdbShow.id}`,
			imdb_link: tmdbShow.external_ids.imdb_id ? `https://www.imdb.com/title/${tmdbShow.external_ids.imdb_id}` : null,
			twitter_link: tmdbShow.external_ids.imdb_id ? `https://twitter.com/${tmdbShow.external_ids.twitter_id}` : null,
		},
		rating_data: rating,
	};
}

function isValidTMDBShow(tmdbShow: TMDBShow): tmdbShow is ValidTMDBShow {
	return (
		typeof tmdbShow.id === "number" &&
		typeof tmdbShow.name === "string" &&
		typeof tmdbShow.overview === "string" &&
		typeof tmdbShow.first_air_date === "string" &&
		typeof tmdbShow.poster_path === "string" &&
		Array.isArray(tmdbShow.genres) &&
		typeof tmdbShow.status === "string" &&
		(tmdbShow.tagline === undefined || typeof tmdbShow.tagline === "string") &&
		(tmdbShow.external_ids.imdb_id === null || typeof tmdbShow.external_ids.imdb_id === "string") &&
		(tmdbShow.external_ids.twitter_id === null || typeof tmdbShow.external_ids.twitter_id === "string")
	);
}
