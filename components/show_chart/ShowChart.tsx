import { TVShow } from "../../lib/tv_show/types";
import { Scatter } from "react-chartjs-2";
import styles from "./ShowChart.module.css";
import {
	Chart as ChartJS,
	LineElement,
	PointElement,
	LinearScale,
	Title,
	CategoryScale,
	Tooltip,
	ChartOptions,
	Tick,
} from "chart.js";
import { createContext, useMemo } from "react";
import { Trendline } from "../../lib/analysis/trendlines";
//TODO: Refactor season colouring
//TODO: Display episode name as tooltip

ChartJS.register(LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip);

const seasonColors = ["005f73", "0a9396", "94d2bd", "e9d8a6", "ee9b00", "ca6702", "bb3e03", "ae2012", "9b2226"];

export default function ShowChart({
	showDetails,
	className,
	showSeasonTrendlines,
	showOverallTrendline,
}: {
	showDetails: TVShow;
	className?: string;
	showSeasonTrendlines: boolean;
	showOverallTrendline: boolean;
}) {
	const sortedRatings = useMemo(
		() =>
			[...showDetails.rating_data!.episode_ratings].sort((a, b) => {
				return a.absolute_episode - b.absolute_episode;
			}),
		[showDetails.rating_data]
	);

	const seasonTicks = useMemo(() => {
		const seasonCounts: { [seasonNumber: number]: number } = {};
		sortedRatings.forEach(episode => {
			if (seasonCounts[episode.season] === undefined) seasonCounts[episode.season] = 0;
			seasonCounts[episode.season]++;
		});
		const seasonCountsOrdered = Object.entries(seasonCounts)
			.map(([seasonNumber, episodeCount]) => [parseInt(seasonNumber), episodeCount])
			.sort((a, b) => a[0] - b[0]);
		const seasonTicks: {
			middleValue: number;
			edgeValue: number;
			label: string;
		}[] = [];
		for (let i = 0; i < seasonCountsOrdered.length; i++) {
			const [seasonNumber, episodeCount] = seasonCountsOrdered[i];
			const xadjust = i === 0 ? 0 : seasonTicks[i - 1].edgeValue + seasonCountsOrdered[i - 1][1];
			seasonTicks.push({
				middleValue: xadjust + episodeCount / 2,
				edgeValue: xadjust,
				label: `Season ${seasonNumber}`,
			});
		}
		return seasonTicks;
	}, [sortedRatings]);

	const options: ChartOptions<"scatter"> = {
		responsive: true,
		animation: {
			duration: 0,
		},
		maintainAspectRatio: false,
		interaction: {
			mode: "point", //trend line indexes don't match, so we can't use index, otherwise random trend line points will highlight on mouseover
		},
		plugins: {
			legend: {
				position: "top",
				labels: {
					color: "red",
				},
			},
			title: {
				display: true,
				text: `${showDetails.name} | IMDB Episode Ratings`,
				align: "start",
				padding: {
					bottom: 20,
					top: 0,
				},
			},
			tooltip: {
				displayColors: false,
				callbacks: {
					title: context => {
						const episodeData = sortedRatings[context[0].dataIndex];
						return `S${episodeData.season}E${episodeData.episode}`;
					},
					label: () => "",
				},
			},
		},
		elements: {
			point: {
				borderWidth: 0,
				backgroundColor: "#ff0000",
			},
			line: {
				borderWidth: 0,
			},
		},
		scales: {
			// xSeasonSeperators: {
			// 	type: "category",
			// 	grid: {
			// 		drawBorder: false,
			// 		drawOnChartArea: true,
			// 	},
			// 	ticks: {
			// 		display: false,
			// 	},
			// 	afterTickToLabelConversion: scale => {
			// 		scale.ticks = seasonTicks.map(tick => ({ value: tick.edgeValue }));
			// 	},
			// },
			xEpisodeNumbers: {
				grid: { display: false },
				type: "category",
				weight: 1,
				ticks: {
					maxTicksLimit: 20,
					maxRotation: 0,
				},
				// title: {
				// 	display: true,
				// 	text: "Episode",
				// 	align: "start",
				// },
			},
			xSeasonNames: {
				type: "category",
				weight: 2,
				grid: {
					display: false,
					drawBorder: false,
				},
				ticks: {
					color: seasonTicks.map((_, i) => `#${seasonColors[i % seasonColors.length]}`),
				},
				afterTickToLabelConversion: scale => {
					scale.ticks = seasonTicks.map(tick => ({ value: tick.middleValue, label: tick.label }));
				},
			},
			y: {
				// title: {
				// 	display: true,
				// 	text: "Average Rating",
				// 	align: "start",
				// 	padding: {
				// 		bottom: 0,
				// 		top: 0,
				// 	},
				// },
				grid: {
					display: false,
				},
			},
		},
	};

	const seasonTrendlineData = useMemo(
		() =>
			showDetails.analysis?.trendlines != null
				? (Object.entries(showDetails.analysis.trendlines.seasons)
						.sort((a, b) => parseInt(a[0]) - parseInt(b[0]))
						.map(([season, trendline]) => ({ season: parseInt(season), trendline }))
						.filter(({ trendline }) => trendline != null) as { season: number; trendline: Trendline }[])
				: null,
		[showDetails.analysis]
	);

	return (
		<div className={`${styles.chartHolder} ${className}`}>
			<Scatter
				options={options}
				data={{
					datasets: [
						{
							// Episode Ratings
							data: sortedRatings.map(episodeRating => ({
								x: episodeRating.absolute_episode,
								y: episodeRating.average_rating,
							})),
							borderColor: "#ff0000",
							pointBackgroundColor: sortedRatings.map(
								episodeRating => `#${seasonColors[(episodeRating.season - 1) % seasonColors.length]}`
							),
						},
						{
							// Season trendlines
							data:
								seasonTrendlineData?.reduce((cum, cur) => {
									const { start, end } = cur.trendline.drawPoints;
									return [...cum, start, end, { x: end.x, y: null }];
								}, [] as { x: number; y: number | null }[]) ?? [],
							showLine: showSeasonTrendlines,
							borderWidth: 4,
							borderCapStyle: "round",
							pointRadius: 0,
							pointHitRadius: 0, //with both a pointRadius and pointHitRadius of 0, the points are not hoverable
							segment: {
								borderColor: ctx => {
									const season = seasonTrendlineData?.[Math.floor(ctx.p0DataIndex / 3)].season;
									if (season == null) return "red";
									return `#${seasonColors[(season - 1) % seasonColors.length]}70`; //extra hex for alpha
								},
							},
						},
						{
							// Show trendline
							data: showDetails.analysis?.trendlines?.show
								? [
										showDetails.analysis.trendlines.show.drawPoints.start,
										showDetails.analysis.trendlines.show.drawPoints.end,
								  ]
								: [],
							showLine: showOverallTrendline,
							borderWidth: 4,
							borderCapStyle: "round",
							pointRadius: 0,
							pointHitRadius: 0, //with both a pointRadius and pointHitRadius of 0, the points are not hoverable
							borderColor: "#9e9b9070",
						},
					],
					labels: sortedRatings.map(episodeRating => episodeRating.absolute_episode),
				}}
			/>
		</div>
	);
}
