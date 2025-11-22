import { ShowBrief } from "../../lib/find_shows/findHelper";
import Link from "next/link";
import Poster from "../elements/Poster";
import clsx from "clsx";
export default function ShowSearchResult({ show, index }: { show: ShowBrief; index: number }) {
  const posterWidth = index == 0 ? 90 : 50;

  return (
    <Link href={show.url}>
      <div className={clsx("flex box-border px-8 py-1", { "py-4": index == 0, "bg-[#00000025]": index % 2 == 1 })}>
        <Poster posterURL={show.posterURL} showName={show.name} posterWidth={posterWidth} className="mr-3.5" />
        <div className="flex flex-col my-1">
          <h2 className="text-base font-medium">{show.name}</h2>
          <h3 className="text-sm mt-1">{show.year}</h3>
          {index == 0 && <p className="line-clamp-4 mt-auto text-xs">{show.description}</p>}
        </div>
      </div>
    </Link>
  );
}
