import SearchBox from "../search/SearchBox";
import styles from "./HeaderBar.module.css";
import Logo from "../../assets/brand/LongLogo.svg";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import useIntersectionEntry from "../../utilities/useIntersectionEntry";

export default function HeaderBar({ hideSearch }: { hideSearch?: boolean }) {
	const navRef = useRef<HTMLElement>(null);

	const intersectionEntry = useIntersectionEntry(navRef, { threshold: [1] });
	const isStuck = (intersectionEntry?.intersectionRatio ?? 2) < 1;

	return (
		<nav className={`${styles.headerBar} ${isStuck ? styles.isStuck : ""}`} ref={navRef}>
			{/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
			<a href="/">
				<Logo className={styles.logo} />
			</a>
			{!hideSearch && <SearchBox />}
		</nav>
	);
}
