import styles from "./ShowIntroduction.module.css";
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
			<h1 className={styles.heading}>
				Does <strong>{showName}</strong> get better?
			</h1>
			<div className={styles.subheading}>
				{
					{
						yes: <CheckmarkIcon className={`${styles.verdictIcon} ${styles.checkmarkIcon}`} />,
						no: <CrossIcon className={`${styles.verdictIcon} ${styles.crossIcon}`} />,
						maybe: <MaybeIcon className={`${styles.verdictIcon} ${styles.maybeIcon}`} />,
						unknown: <QuestionIcon className={`${styles.verdictIcon} ${styles.questionIcon}`} />,
					}[showVerdict]
				}
				<div>
					<span className={styles.verdict}>
						{{ yes: "Yes", no: "No", maybe: "It depends.", unknown: "Too few ratings to tell." }[showVerdict]}
					</span>{" "}
					{["yes", "no"].includes(showVerdict) && (
						<span className={styles.verdictClarifier}>(According to IMDb ratings)</span>
					)}
				</div>
			</div>
			<div className={styles.summary}>{summary}</div>
		</div>
	);
}
