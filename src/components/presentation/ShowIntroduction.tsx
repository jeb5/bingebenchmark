import CheckmarkIcon from "../../assets/icons/verdict_icons/checkmark.svg";
import CrossIcon from "../../assets/icons/verdict_icons/cross.svg";
import MaybeIcon from "../../assets/icons/verdict_icons/maybe.svg";
import QuestionIcon from "../../assets/icons/verdict_icons/question.svg";
import { OverallVerdict } from "../../lib/analysis/types";

export default function ShowIntroduction({
  className,
  showName,
  showVerdict,
  summary,
}: {
  className: string;
  showName: string;
  showVerdict: OverallVerdict;
  summary: string;
}) {
  return (
    <div className={className}>
      <h1 className="text-2xl mb-5">
        Does <strong>{showName}</strong> get better?
      </h1>
      <div className="mb-7.5 text-sm flex items-center">
        {
          {
            yes: <CheckmarkIcon className="mr-1 w-4 h-4 fill-(--checkmark-color)" />,
            no: <CrossIcon className="mr-1 w-4 h-4 fill-(--cross-color)" />,
            maybe: <MaybeIcon className="mr-1 w-4 h-4 fill-(--maybe-color)" />,
            unknown: <QuestionIcon className="mr-1 w-4 h-4 fill-(--unknown-color)" />,
          }[showVerdict]
        }
        <div>
          <span>{{ yes: "Yes", no: "No", maybe: "It depends.", unknown: "Too few ratings to tell." }[showVerdict]}</span>{" "}
          {["yes", "no"].includes(showVerdict) && <span className="text-xs">(According to IMDb ratings)</span>}
        </div>
      </div>
      <div className="text-sm">{summary}</div>
    </div>
  );
}
