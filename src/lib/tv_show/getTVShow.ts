import { generateAnalysis } from "../analysis/analysis";
import { fetchRatingDataByIMDBID } from "./imdb";
import { fetchTmdbDetails, fetchTmdbIdByOriginalName } from "./tmdb";
import { TVShow } from "./types";

export default async function getTVShow(originalName: string): Promise<TVShow | null> {
	const tmdbId = await fetchTmdbIdByOriginalName(originalName);
	if (tmdbId === null) return null;

	const showDetails = await fetchTmdbDetails(tmdbId);

	const ratingData = showDetails.imdb_id != null ? await fetchRatingDataByIMDBID(showDetails.imdb_id) : null;
	const analysis = ratingData ? generateAnalysis(ratingData, showDetails) : null;
	return { ...showDetails, rating_data: ratingData, analysis };
	//TODO: Handle errors: tmdb api response and database errors
}
