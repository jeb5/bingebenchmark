import knex from "./database";
import { MovieDb, ShowResponse, TvExternalIdsResponse } from "moviedb-promise";

interface tmdbDBShowInfo {
	id: string;
	original_name: string;
	popularity: number;
}

export async function fetchTmdbIdByOriginalName(originalShowName: string) {
	const result = await knex<tmdbDBShowInfo>("tmdb")
		.where("original_name", originalShowName.toLowerCase())
		.first()
		.timeout(1000, { cancel: true });

	return result?.id ?? null;
}

const tmdb = new MovieDb(process.env.TMDB_API_KEY!);

export async function fetchTmdbDetails(tmdbID: string) {
	const result = await tmdb.tvInfo({ id: tmdbID, append_to_response: "external_ids" });
	return result as ShowResponse & { external_ids: TvExternalIdsResponse };
}
