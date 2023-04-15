import { ShowBrief } from "../../lib/find_shows/findHelper";
import ShowSearchResult from "./ShowSearchResult";
import styles from "./ShowSearchScroll.module.css";

export default function ShowSearchScroll({ shows }: { shows: ShowBrief[] }) {
	return (
		<div className={styles.scrollDiv}>
			{shows.map((show, index) => (
				<ShowSearchResult show={show} index={index} key={index} />
			))}
		</div>
	);
}
