"use client";
import { useState } from "react";
import { TVShow } from "@/lib/tv_show/types";
import Button from "@/components/elements/Button";
import CheckboxWithLabel from "../elements/CheckboxWithLabel";
import ShowChart from "@/components/ShowChart";

export default function ShowChartContainer({ showDetails }: { showDetails: TVShow }) {
  const handleViewLargerClick = () => {
    //TODO: Implement this
    alert("Feature not implemented yet");
  };
  const showVerdictKnown =
    showDetails.analysis != null &&
    showDetails.analysis.verdict != "unknown" &&
    showDetails.analysis.verdict.improvementVerdict != "unknown";
  const [showSeasonTrendlines, setShowSeasonTrendlines] = useState(showVerdictKnown);
  const [showOverallTrendline, setShowOverallTrendline] = useState(showVerdictKnown);
  return (
    <div className="h-full flex flex-col">
      <ShowChart showDetails={showDetails} className="grow" {...{ showOverallTrendline, showSeasonTrendlines }} />
      <div className="mt-7.5 flex gap-2.5">
        <CheckboxWithLabel label="Show Season Trendlines" checked={showSeasonTrendlines} setChecked={setShowSeasonTrendlines} />
        <CheckboxWithLabel label="Show Overall Trendline" checked={showOverallTrendline} setChecked={setShowOverallTrendline} />
        <Button className="ml-auto" text="View larger" onClick={handleViewLargerClick} />
      </div>
    </div>
  );
}
