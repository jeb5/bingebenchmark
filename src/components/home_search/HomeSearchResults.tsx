import Link from "next/link";
import { ShowBrief } from "@/lib/find_shows/findHelper";
import Poster from "@/components/elements/Poster";

const POSTER_WIDTH = 100;
const TOP_RESULT_POSTER_WIDTH = 130;

export default function HomeSearchResults({ shows }: { shows: ShowBrief[] }) {
  const [topShow, ...restShows] = shows;
  return (
    <div className="overflow-x-scroll flex flex-nowrap snap-x snap-proximity items-end">
      <div className="flex items-end">
        <div className="mr-6 w-min snap-start" key={topShow.url}>
          <Link className="mr-6 w-min snap-start" href={topShow.url}>
            <Poster posterURL={topShow.posterURL} posterWidth={TOP_RESULT_POSTER_WIDTH} />
            <div className="text-xs h-[15ex] overflow-hidden">
              <div className="text-sm font-bold mt-1 w-full overflow-hidden line-clamp-3">{topShow.name}</div>
              <div className="mt-1 w-full overflow-hidden line-clamp-2">{topShow.year}</div>
            </div>
          </Link>
        </div>
        {restShows.map((show) => {
          return (
            <div className="mr-6 w-min snap-start" key={show.url}>
              <Link className="mr-6 w-min snap-start" href={show.url}>
                <Poster posterURL={show.posterURL} posterWidth={POSTER_WIDTH} />
                <div className="text-xs h-[15ex] overflow-hidden">
                  <div className="mt-1 w-full overflow-hidden line-clamp-2">{show.name}</div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
