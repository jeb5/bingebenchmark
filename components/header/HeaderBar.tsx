import SearchBox from "../search/SearchBox";
import styles from "./HeaderBar.module.css";
import Logo from "../../assets/brand/LongLogo.svg";
import Link from "next/link";

export default function HeaderBar({ homeVersion }: { homeVersion?: boolean }) {
	return (
		<nav className={styles.headerBar}>
			{/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
			<a href="/">
				<Logo className={styles.logo} />
			</a>
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
