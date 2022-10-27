import styles from "./HeaderBar.module.css";
export default function HeaderBar() {
	return (
		<nav className={styles.headerBar}>
			<h2 className={styles.siteName}>Website Name</h2>
			<div className={styles.searchBar}></div>
		</nav>
	);
}
