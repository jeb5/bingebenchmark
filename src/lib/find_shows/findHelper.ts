import { TV } from "tmdb-ts";

export type ShowBrief = { name: string; posterURL: string; year: string; description: string; url: string };

/**
 * Dedupes by original_name, removes shows with missing data
 */
export function cleanupShows(shows: TV[]): ShowBrief[] {
	const originalNamesSet = new Set();
	return shows.flatMap((show: TV) => {
		if (
			originalNamesSet.has(show.original_name) ||
			!show.name ||
			!show.poster_path ||
			!show.first_air_date ||
			!show.overview ||
			!show.original_name ||
			(show.vote_count ?? 0) < 10
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
}
