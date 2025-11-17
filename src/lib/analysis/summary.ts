import { RatingData, ShowDetails } from "../tv_show/types";
import { Summary, Trendlines, Verdict } from "./types";

//TODO: Rethink verdict summaries. They should be more conversational, less technical, more varied, and include phrases like "worth sticking with/out", "doesn't get much better", "gets good at episode 5" etc
//Maybe/Unknown verdicts should have a summary that suggests alternative ways of determining watch-worthiness

export default function generateSummary(
	ratingData: RatingData,
	trendlines: Trendlines,
	verdict: Verdict,
	showDetails: ShowDetails
): Summary {
	const showRatingsWord = ((rating: number) => {
		if (rating < 3) return "abysmal";
		if (rating < 5) return "low";
		if (rating < 7) return "average";
		if (rating < 8) return "decent";
		if (rating < 9) return "high";
		return "great";
	})(ratingData.show_average_rating);
	const ratingsPositive = ratingData.show_average_rating >= 7.5;
	const showVerdictPositive = verdict.showTrend.trend === "up";
	const startVerdictPositive = verdict.firstEpisodesTrend.trend === "up";

	const ratingsChunk = `${verdict.ratingsAreConsistent ? "consistently " : ""}${showRatingsWord} ratings`;
	const startChunk = `${
		{ up: "ratings climbing", down: "ratings declining", flat: "relatively flat ratings" }[
			verdict.firstEpisodesTrend.trend
		]
	} in the first ${verdict.firstEpisodesTrend.episodesConsidered} episodes`;
	const showChunk = `episode quality ${
		{ up: "improving", down: "falling", flat: "staying about the same" }[verdict.showTrend.trend]
	} over the course of the show`;
	const verdictChunk = {
		yes: `${showDetails.name} may be worth sticking out`,
		maybe: `it's hard to say whether ${showDetails.name} is worth sticking out`,
		no: `${showDetails.name} probably isn't worth continuing`,
		unknown: "????????",
	}[verdict.improvementVerdict];

	let summary = "";
	let positives: string[] = [];
	let negatives: string[] = [];

	(ratingsPositive ? positives : negatives).push(ratingsChunk);
	(showVerdictPositive ? positives : negatives).push(showChunk);
	(startVerdictPositive ? positives : negatives).push(startChunk);

	switch (verdict.improvementVerdict) {
		case "yes":
			if (ratingsPositive && showVerdictPositive && startVerdictPositive) {
				summary = `With ${positives[0]}, ${positives[1]}, and ${positives[2]}, ${verdictChunk}.`;
			} else {
				summary = `With ${positives[0]} and ${positives[1]}, ${verdictChunk}, despite ${negatives[0]}.`;
			}
			break;
		case "maybe": //2 positives, 1 negative, or 1 positive, 2 negatives
			if (positives.length === 2) {
				summary = `With ${positives[0]} and ${positives[1]}, despite ${negatives[0]}, ${verdictChunk}.`;
			} else if (negatives.length === 2) {
				summary = `With ${negatives[0]} and ${negatives[1]}, despite ${positives[0]}, ${verdictChunk}.`;
			}
			break;
		case "no":
			if (!(ratingsPositive || showVerdictPositive || startVerdictPositive)) {
				summary = `With ${negatives[0]}, ${negatives[1]} and ${negatives[2]}, ${verdictChunk}.`;
			} else {
				summary = `Despite ${positives[0]}, with ${negatives[0]} and ${negatives[1]}, ${verdictChunk}.`;
			}
			break;
		case "unknown":
			summary = "idk dude";
			break;
	}

	return summary;
}
