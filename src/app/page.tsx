import discover from "@/lib/find_shows/discover";
import { ShowBrief } from "@/lib/find_shows/findHelper";
import HomepageContent from "./homepage_content";
import { shuffle } from "@/utilities/util";

export type FrontPageShows = {
  name: string;
  shows: ShowBrief[];
}[];

// TODO: Work out how to revalidate every hour

export default async function Home() {
  const frontPageShows: FrontPageShows = [
    { name: "Airing this week", shows: await discover("airing_this_week") },
    { name: "Popular", shows: await discover("popular") },
    { name: "Top rated", shows: await discover("top_rated") },
  ];

  const posterShows = shuffle(frontPageShows[2].shows).slice(0, 4);

  return <HomepageContent frontPageShows={frontPageShows} posterShows={posterShows} />;
}
