import knex from "./database";
import { ExternalIds, TMDB, TvShowDetails } from "tmdb-ts";
import { ShowDetails } from "./types";

type tmdbDBShowInfo = {
	id: string;
	original_name: string;
	popularity: number;
};


type ValidTMDBShow = {
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
	number_of_episodes: number;
	external_ids: {
		imdb_id: string | null;
		twitter_id: string | null;
	};
};

export async function fetchTmdbIdByOriginalName(originalShowName: string) {
	const result = await knex<tmdbDBShowInfo>("tmdb")
		.where("original_name", originalShowName.toLowerCase())
		.first()
		.timeout(1000, { cancel: true });

	return result?.id ?? null;
}

export const tmdb = new TMDB(process.env.TMDB_READ_ACCESS_TOKEN!);

export async function fetchTmdbDetails(tmdbID: string) {

	const tmdbShow: TvShowDetails & { external_ids: Omit<ExternalIds, "id">; } = await tmdb.tvShows.details(Number(tmdbID), ["external_ids"]);

	return transformTMDBShow(tmdbShow);
}

function transformTMDBShow(tmdbShow: TvShowDetails & { external_ids: Omit<ExternalIds, "id">; }): ShowDetails {
	return {
		tmdb_id: tmdbShow.id.toString(),
		imdb_id: tmdbShow.external_ids.imdb_id,
		name: tmdbShow.name,
		// rating_data: tmdbShow.rating_data,
		overview: tmdbShow.overview,
		first_air_year: new Date(tmdbShow.first_air_date).getFullYear().toString(),
		last_air_year: tmdbShow.last_air_date ? new Date(tmdbShow.last_air_date).getFullYear().toString() : null,
		status: tmdbShow.status,
		poster_url: `https://image.tmdb.org/t/p/w500${tmdbShow.poster_path}`,
		genres: tmdbShow.genres.map(genre => genre.name),
		number_of_episodes: tmdbShow.number_of_episodes,
		external_links: {
			tmdb_link: `https://www.themoviedb.org/tv/${tmdbShow.id}`,
			imdb_link: tmdbShow.external_ids.imdb_id ? `https://www.imdb.com/title/${tmdbShow.external_ids.imdb_id}` : null,
			twitter_link: tmdbShow.external_ids.imdb_id ? `https://twitter.com/${tmdbShow.external_ids.twitter_id}` : null,
		},
	};
}