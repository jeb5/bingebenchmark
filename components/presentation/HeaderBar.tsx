import styles from "./HeaderBar.module.css";
export default function HeaderBar() {
	return (
		<nav className={styles.headerBar}>
			<h2 className={styles.siteName}>Binge Benchmark</h2>
			<div className={styles.searchBar}></div>
		</nav>
	);
}
