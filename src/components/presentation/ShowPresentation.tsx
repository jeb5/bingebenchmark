import ShowIntroduction from "./ShowIntroduction";
import ShowDetails from "./ShowDetails";
import { TVShow } from "../../lib/tv_show/types";
import ShowChartContainer from "./ShowChartContainer";

export default function ShowPresentation({ showDetails }: { showDetails: TVShow }) {
  return (
    <div className="py-12 px-20 flex flex-col bg-(--weak-background) min-h-screen">
      <div className="mt-25 flex grow justify-center items-center">
        <main className="grid w-275 h-125 grid-rows-[1fr_auto_30px] grid-cols-[3fr_4fr]">
          <ShowIntroduction
            className="m-2.5 row-start-1 col-start-1"
            showName={showDetails.name}
            summary={
              showDetails.analysis?.summary ??
              `It looks like there is too little rating data to determine whether ${showDetails.name} gets better.`
            }
            showVerdict={
              showDetails.analysis == null
                ? "unknown"
                : showDetails.analysis?.verdict == "unknown"
                ? "unknown"
                : showDetails.analysis?.verdict.improvementVerdict
            }
          />
          <ShowDetails className="m-2.5 row-start-2 col-start-1" showDetails={showDetails} />
          <div className="m-2.5 row-start-1 row-span-3 col-start-2">
            {showDetails.rating_data !== null ? <ShowChartContainer showDetails={showDetails} /> : null}
          </div>
        </main>
      </div>
    </div>
  );
}
