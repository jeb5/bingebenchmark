import SearchBox from "../search/SearchBox";
import styles from "./HeaderBar.module.css";
import Logo from "../../assets/brand/LongLogo.svg";

export default function HeaderBar() {
	return (
		<nav className={styles.headerBar}>
			<Logo className={styles.logo} />
			<SearchBox />
		</nav>
	);
}
