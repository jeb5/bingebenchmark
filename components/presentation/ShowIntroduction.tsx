import styles from "./ShowIntroduction.module.css";
import TickIcon from "../../assets/icons/checkmark.svg";

export default function ShowIntroduction({
	className,
	showName,
	showConsensus,
	consensusExplanation,
}: {
	className: string;
	showName: string;
	showConsensus: "yes" | "no" | "maybe";
	consensusExplanation: string;
}) {
	return (
		<div className={className}>
			<h1 className={styles.heading}>
				Does <strong>{showName}</strong> get better?
			</h1>
			<div className={styles.subheading}>
				<TickIcon className={styles.tickIcon} />
				<div>
					<span className={styles.consensus}>Yes.</span>{" "}
					<span className={styles.consensusClarifier}>(According to IMDb ratings)</span>
				</div>
			</div>
			<div className={styles.explanatoryText}>{consensusExplanation}</div>
		</div>
	);
}
