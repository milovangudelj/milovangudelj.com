"use client";

import { Link } from "next-intl";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { Button } from "../../components";
import { NavLink } from "./NavLink";

export const MobileNav = ({
	links,
	className,
}: {
	links: {
		id: string;
		label: string;
		href: string | URL;
	}[];
	className?: string;
}) => {
	const [menuOpen, setMenuOpen] = useState<boolean>(false);
	const [navHeight, setNavHeight] = useState<number>(0);
	const [navWidth, setNavWidth] = useState<number>(0);
	const [windowHeight, setWindowHeight] = useState<number>(window.innerHeight);

	useEffect(() => {
		const nav = document.getElementById("navbar");

		if (nav) {
			setNavWidth(nav.clientWidth);
			setNavHeight(nav.clientHeight);
		}
	}, []);

	useEffect(() => {
		const onResize = () => {
			setWindowHeight(window.innerHeight);
		};

		window.addEventListener("resize", onResize);

		return () => {
			window.removeEventListener("resize", onResize);
		};
	}, []);

	useEffect(() => {
		document.documentElement.style.setProperty(
			"--nav-height",
			`${windowHeight - navHeight}px`
		);
		document.documentElement.style.setProperty(
			"--nav-width",
			`${navWidth}px`
		);
	}, [navWidth, navHeight, windowHeight]);

	const toggleMenu = () => {
		setMenuOpen((s) => !s);
	};

	return (
		<div className="md:pointer-events-none md:invisible md:hidden md:select-none">
			<div
				onClick={toggleMenu}
				className="relative z-10 space-y-1.5 p-4 md:hidden"
			>
				<span
					className={`block h-0.5 w-8 origin-center bg-current transition-all will-change-transform ${
						menuOpen ? "translate-y-2 rotate-45" : "transform"
					}`}
				></span>
				<span
					className={`block h-0.5 w-8 bg-current transition ${
						menuOpen && "opacity-0"
					}`}
				></span>
				<span
					className={`block h-0.5 w-8 origin-center bg-current transition-all will-change-transform ${
						menuOpen ? "-translate-y-2 -rotate-45" : "transform"
					}`}
				></span>
			</div>
			<ul
				className={twMerge(
					`absolute ${
						menuOpen ? "flex" : "hidden"
					} top-full left-0 h-[var(--nav-height)] w-[var(--nav-width)] flex-col items-end justify-center bg-yellow px-8 py-2 text-black`,
					className
				)}
			>
				{links.map((link) => (
					<li key={link.id}>
						<NavLink href={link.href} label={link.label} />
					</li>
				))}
				<li>
					<Button
						as={Link}
						href={"/music-stats"}
						className="mr-4 mt-4 md:pointer-events-none md:invisible md:hidden md:select-none"
					>
						Music-Stats ↗
					</Button>
				</li>
			</ul>
		</div>
	);
};
