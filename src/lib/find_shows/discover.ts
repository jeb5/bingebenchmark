import { ShowBrief, cleanupShows } from "./findHelper";

const VOTE_COUNT_THRESHOLD = "500";

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
			sort_by: "popularity.desc",
			"vote_count.gte": VOTE_COUNT_THRESHOLD,
			"air_date.gte": today,
			"air_date.lte": nextWeek,
			timezone: "Pacific/Auckland",
		};
	},
	popular: () => ({
		sort_by: "popularity.desc",
		"vote_count.gte": VOTE_COUNT_THRESHOLD,
	}),
	top_rated: () => ({
		sort_by: "vote_average.desc",
		"vote_count.gte": VOTE_COUNT_THRESHOLD,
	}),
};

export default async function discover(type: keyof typeof discoverTypes): Promise<ShowBrief[]> {
	const searchResults = await fetch(
		"https://api.themoviedb.org/3/discover/tv?" +
			new URLSearchParams({
				api_key: process.env.TMDB_API_KEY!,
				language: "en-US",
				page: "1",
				...discoverTypes[type](),
			})
	);
	if (!searchResults.ok) throw new Error("Search failed");
	const data = await searchResults.json();

	const filteredShows = data.results.filter((show: any) => {
		//Remove "The D'Amelio Show" because it appears to have over-inflated ratings (which don't match IMDB)
		return show.id != 130392;
	});

	return cleanupShows(filteredShows);
}
