"use client";
import SearchBox from "../search/SearchBox";
import styles from "./HeaderBar.module.css";
import Logo from "@/assets/brand/LongLogo.svg";
import { useRef } from "react";
import useIntersectionEntry from "@/utilities/useIntersectionEntry";
import Link from "next/link";
import clsx from "clsx";

const intersectionEntryOptions = { threshold: [1] }; //Declared outside of component to prevent redeclaration on every render, as useEffect only compares object references

export default function HeaderBar({ hideSearch }: { hideSearch?: boolean }) {
  const navRef = useRef<HTMLElement>(null);

  const intersectionEntry = useIntersectionEntry(navRef, intersectionEntryOptions);
  const isStuck = (intersectionEntry?.intersectionRatio ?? 2) < 1;

  return (
    <div className="sticky -top-10 z-10">
      <nav
        className={clsx(
          "absolute flex justify-between items-center w-full py-5 px-22 transition-[backdrop-filter, background-color] duration-0 top-[39px]",
          { "backdrop-blur-md bg-[#17171760] duration-500": isStuck }
        )}
        ref={navRef}
      >
        <Link href="/">
          <Logo className="mt-[5px] w-[190px] h-auto" />
        </Link>
        {!hideSearch && <SearchBox />}
      </nav>
    </div>
  );
}
