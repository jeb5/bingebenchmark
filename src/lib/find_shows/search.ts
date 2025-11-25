import { ShowBrief, cleanupShows } from "./findHelper";
import { tmdb } from "@/lib/tv_show/tmdb";

export default async function search(query: string): Promise<ShowBrief[]> {
	const NUM_PAGES = 1;
	//Gets NUM_PAGES pages of search results, and combines them into a single results array
	const results = (await Promise.all([...Array(NUM_PAGES)].map((_, i) => getSearchResults(query, i + 1)))).reduce(
		(acc, val) => acc.concat(val),
		[]
	);
	const shows = cleanupShows(results);

	return shows;
}

async function getSearchResults(query: string, page: number) {
	const searchResults = await tmdb.search.tvShows({ query, language: "en-US", page, include_adult: false });
	return searchResults.results;
}
