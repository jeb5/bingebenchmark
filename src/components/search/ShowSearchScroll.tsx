import { ShowBrief } from "../../lib/find_shows/findHelper";
import ShowSearchResult from "./ShowSearchResult";

export default function ShowSearchScroll({ shows }: { shows: ShowBrief[] }) {
  return (
    <div className="h-full">
      {shows.map((show, index) => (
        <ShowSearchResult show={show} index={index} key={index} />
      ))}
    </div>
  );
}
