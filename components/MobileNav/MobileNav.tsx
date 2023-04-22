"use client";

import { Link } from "next-intl";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { motion, type Variants } from "framer-motion";

import { Button } from "@components/Button";
import { NavLink } from "@components/NavLink";

export const MobileNav = ({
	links,
	navRect,
	className,
}: {
	links: {
		id: string;
		label: string;
		href: string | URL;
	}[];
	navRect: DOMRect | undefined;
	className?: string;
}) => {
	const [menuOpen, setMenuOpen] = useState<boolean>(false);

	const [navHeight, setNavHeight] = useState<number>(0);
	const [navWidth, setNavWidth] = useState<number>(0);

	const [windowHeight, setWindowHeight] = useState<number>(
		typeof window !== "undefined" ? window.innerHeight : 0
	);

	useEffect(() => {
		setNavWidth(navRect?.width ?? 0);
		setNavHeight(navRect?.height ?? 0);
	}, [navRect]);

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

	const list: Variants = {
		open: {
			display: "flex",
			opacity: 1,
			transition: {
				when: "beforeChildren",
				type: "tween",
				duration: 0.2,
				staggerChildren: 0.1,
			},
		},
		closed: {
			opacity: 0,
			transition: {
				when: "afterChildren",
				type: "tween",
				duration: 0.2,
			},
			transitionEnd: {
				display: "none",
			},
		},
	};

	const item: Variants = {
		open: {
			x: 0,
			opacity: 1,
			transition: { duration: 0.3, ease: "easeInOut" },
		},
		closed: {
			x: -24,
			opacity: 0,
			transition: { duration: 0.2, ease: "easeOut" },
		},
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
			<motion.ul
				initial={"closed"}
				animate={menuOpen ? "open" : "closed"}
				variants={list}
				className={twMerge(
					`absolute top-full left-0 h-[var(--nav-height)] w-[var(--nav-width)] flex-col items-end justify-center bg-yellow px-8 py-2 text-black`,
					className
				)}
			>
				{links.map((link) => (
					<motion.li variants={item} key={link.id}>
						<NavLink
							id={link.id}
							href={link.href}
							label={link.label}
							onClick={() => {
								setMenuOpen(false);
							}}
						/>
					</motion.li>
				))}
				<motion.li variants={item}>
					<Button
						as={Link}
						href={"/music-stats"}
						onClick={() => {
							setMenuOpen(false);
						}}
						className="mr-4 mt-4 md:pointer-events-none md:invisible md:hidden md:select-none"
					>
						Music-Stats ↗
					</Button>
				</motion.li>
			</motion.ul>
		</div>
	);
};
