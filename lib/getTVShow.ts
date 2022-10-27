import { fetchRatingDataByIMDBID } from "./imdb";
import { fetchTmdbDetails, fetchTmdbIdByOriginalName } from "./tmdb";
import transformTVShow from "./transformTVShow";

export default async function getTVShow(originalName: string) {
	const tmdbId = await fetchTmdbIdByOriginalName(originalName);
	if (tmdbId === null) return null;

	const tmdbDetails = await fetchTmdbDetails(tmdbId);
	const imdbId = tmdbDetails.external_ids?.imdb_id ?? null;

	const ratingData = imdbId != null ? await fetchRatingDataByIMDBID(imdbId) : null;

	return transformTVShow(tmdbDetails, ratingData);
	//TODO: Handle errors: tmdb api response and database errors
}
