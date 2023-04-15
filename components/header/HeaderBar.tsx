import SearchBox from "../search/SearchBox";
import styles from "./HeaderBar.module.css";
import Logo from "../../assets/brand/LongLogo.svg";
import Link from "next/link";

export default function HeaderBar({ homeVersion }: { homeVersion?: boolean }) {
	return (
		<nav className={styles.headerBar}>
			<Logo className={styles.logo} />
			{homeVersion ? (
				<Link href="/about" className={styles.link}>
					About
				</Link>
			) : (
				<SearchBox />
			)}
		</nav>
	);
}
