import { RatingData, ShowDetails } from "../tv/types";
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
	const ratingsArePositive = ratingData.show_average_rating >= 7;
	const ratingsAreConsistent = verdict.ratingDeviation < 0.5;

	let summary = `${showDetails.name} has ${
		ratingsAreConsistent ? "consistently " : ""
	}${showRatingsWord} ratings throughout its run${
		verdict.showRatingsTrend.trend == "consistent"
			? ". It"
			: `, ${
					ratingsArePositive == ("up" == verdict.showRatingsTrend.trend)
						? `with average episode ratings ${{ up: "increasing", down: "decreasing" }[verdict.showRatingsTrend.trend]}`
						: `although average episode ratings do ${
								{ up: "increase", down: "decrease" }[verdict.showRatingsTrend.trend]
						  }`
			  } over the course of the show. The show`
	} starts off ${verdict.firstEpisodesTrend.trend}, early episodes being ${
		{
			slow: "rated lower than those that follow.",
			strong: "rated higher than those that follow.",
			steady: "rated similiarly to the rest of the show.",
		}[verdict.firstEpisodesTrend.trend]
	}`;

	summary += ` Ratings ${
		{ up: "tend to trend upwards", down: "tend to trend downwards", consistent: "have no consistent trend" }[
			verdict.seasonsRatingTrend.trend
		]
	} within each of the show's ${verdict.seasonsRatingTrend.numSeasons} seasons.`;
	return summary;
}
