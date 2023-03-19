import { SearchResultShow } from "../../pages/api/search";
import ShowSearchResult from "./ShowSearchResult";
import styles from "./ShowSearchScroll.module.css";

export default function ShowSearchScroll({ shows }: { shows: SearchResultShow[] }) {
	return (
		<div className={styles.scrollDiv}>
			{shows.map((show, index) => (
				<ShowSearchResult show={show} index={index} key={index} />
			))}
		</div>
	);
}
