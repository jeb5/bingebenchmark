"use client";
import SearchBox from "../search/SearchBox";
import styles from "./HeaderBar.module.css";
import Logo from "@/assets/brand/LongLogo.svg";
import { useRef } from "react";
import useIntersectionEntry from "@/utilities/useIntersectionEntry";
import Link from "next/link";

const intersectionEntryOptions = { threshold: [1] }; //Declared outside of component to prevent redeclaration on every render, as useEffect only compares object references

export default function HeaderBar({ hideSearch }: { hideSearch?: boolean }) {
  const navRef = useRef<HTMLElement>(null);

  const intersectionEntry = useIntersectionEntry(navRef, intersectionEntryOptions);
  const isStuck = (intersectionEntry?.intersectionRatio ?? 2) < 1;

  return (
    <div className={styles.headerBarContainer}>
      <nav className={`${styles.headerBar} ${isStuck ? styles.isStuck : ""}`} ref={navRef}>
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <Link href="/">
          <Logo className={styles.logo} />
        </Link>
        {!hideSearch && <SearchBox />}
      </nav>
    </div>
  );
}
