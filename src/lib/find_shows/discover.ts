import { SortOption } from "tmdb-ts";
import { ShowBrief, cleanupShows } from "./findHelper";
import { tmdb } from "@/lib/tv_show/tmdb";

const VOTE_COUNT_THRESHOLD = 500;

function dateString(date: Date) {
	return date
		.toLocaleDateString("en-NZ", { year: "numeric", month: "2-digit", day: "2-digit" })
		.split("/")
		.reverse()
		.join("-");
}

const discoverTypes = {
	airing_this_week: () => {
		const today = dateString(new Date());
		const nextWeek = dateString(new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000));
		return {
			sort_by: "popularity.desc" as SortOption,
			"vote_count.gte": VOTE_COUNT_THRESHOLD,
			"air_date.gte": today,
			"air_date.lte": nextWeek,
			timezone: "Pacific/Auckland",
		};
	},
	popular: () => ({
		sort_by: "popularity.desc" as SortOption,
		"vote_count.gte": VOTE_COUNT_THRESHOLD,
	}),
	top_rated: () => ({
		sort_by: "vote_average.desc" as SortOption,
		"vote_count.gte": VOTE_COUNT_THRESHOLD,
	}),
};

export default async function discover(type: keyof typeof discoverTypes): Promise<ShowBrief[]> {

	const searchResults = await tmdb.discover.tvShow({ language: "en-US", page: 1, ...discoverTypes[type]() });

	//TODO: remove "The D'Amelio Show" because it appears to have over-inflated ratings (which don't match IMDB)???

	return cleanupShows(searchResults.results);
}
