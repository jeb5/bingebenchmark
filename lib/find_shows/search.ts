import { ShowBrief, cleanupShows } from "./findHelper";

export default async function search(query: string): Promise<ShowBrief[]> {
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

	const shows = cleanupShows(data.results);

	return shows;
}
