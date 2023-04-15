import { ShowResponse } from "moviedb-promise";

export type SearchResultShow = { name: string; posterURL: string; year: string; description: string; url: string };

export default async function search(query: string): Promise<SearchResultShow[]> {
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

	const originalNamesSet = new Set();
	const shows: SearchResultShow[] = data.results.flatMap((show: ShowResponse) => {
		if (
			originalNamesSet.has(show.original_name) ||
			!show.name ||
			!show.poster_path ||
			!show.first_air_date ||
			!show.overview ||
			!show.original_name
		)
			return [];
		originalNamesSet.add(show.original_name);

		return [
			{
				name: show.name || "?",
				posterURL: show.poster_path ? `https://image.tmdb.org/t/p/w342${show.poster_path}` : "",
				year: show.first_air_date ? show.first_air_date.split("-")[0] : "?",
				description: show.overview || "?",
				url: show.original_name ? `/${encodeURIComponent(show.original_name.toLowerCase())}` : "",
			},
		];
	});
	return shows;
}
