import { ShowBrief, cleanupShows } from "./findHelper";

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
	const searchResults = await fetch(
		"https://api.themoviedb.org/3/search/tv?" +
			new URLSearchParams({
				api_key: process.env.TMDB_API_KEY!,
				language: "en-US",
				page: "1",
				include_adult: "false",
				query,
			})
	);
	if (!searchResults.ok) throw new Error("Search failed");
	const data = await searchResults.json();
	return data.results;
}
