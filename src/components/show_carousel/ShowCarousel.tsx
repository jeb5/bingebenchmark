import { ShowBrief } from "../../lib/find_shows/findHelper";
import Poster from "../elements/Poster";
export default function ShowCarousel({ shows }: { shows: ShowBrief[] }) {
  return (
    <div className="overflow-x-scroll flex flex-nowrap snap-x snap-proximity">
      {shows.map((show, index) => (
        <a className="snap-start w-min mr-6" key={index} href={show.url}>
          <Poster posterURL={show.posterURL} posterWidth={100} />
          <div className="text-xs mt-2.5 leading-[1.2] line-clamp-2">{show.name}</div>
        </a>
      ))}
    </div>
  );
}
