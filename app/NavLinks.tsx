"use client";

import { ComponentProps, useEffect, useState } from "react";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { motion, type Variants } from "framer-motion";

import { Button } from "../components";
import { useIsMobile } from "../lib/useMediaQuery";

interface NavLinksProps extends ComponentProps<"div"> {
	callbackWhenOpen?: (menuOpen: boolean) => void;
}

const links = [
	{
		id: "about",
		href: "/about",
		label: "about",
		type: "link",
	},
	{
		id: "work",
		href: "/work",
		label: "work",
		type: "link",
	},
	{
		id: "contact",
		href: "/contact",
		label: "contact",
		type: "link",
	},
	{
		id: "music-stats",
		href: "/music-stats",
		label: "Music-Stats",
		type: "button",
	},
];

export const NavLinks = ({
	callbackWhenOpen,
	className,
	...props
}: NavLinksProps) => {
	const segment = useSelectedLayoutSegment();
	const isMobile = useIsMobile();
	const [menuOpen, setMenuOpen] = useState<boolean>(false);

	const list: Variants = isMobile
		? {
				open: {
					opacity: 1,
					transition: {
						type: "tween",
						duration: 0.2,
						staggerChildren: 0.1,
						delayChildren: 0.2,
					},
				},
				closed: {
					opacity: 0,
					transition: {
						type: "tween",
						duration: 0.2,
					},
				},
		  }
		: {
				open: {
					opacity: 1,
				},
				closed: {
					opacity: 1,
				},
		  };

	const item: Variants = isMobile
		? {
				open: {
					x: 0,
					opacity: 1,
					transition: { duration: 0.3, ease: "easeInOut" },
				},
				closed: {
					x: -24,
					opacity: 0,
					transition: { duration: 0.1, ease: "easeOut" },
				},
		  }
		: {
				open: {
					x: 0,
					opacity: 1,
				},
				closed: {
					x: 0,
					opacity: 1,
				},
		  };

	const toggleMenu = () => {
		setMenuOpen((s) => !s);
	};

	useEffect(() => {
		if (menuOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "unset";
		}

		callbackWhenOpen?.(menuOpen);

		return () => {
			document.body.style.overflow = "unset";
		};
	}, [menuOpen, callbackWhenOpen]);

	return (
		<div className={twMerge(`flex items-center gap-4`, className)} {...props}>
			<motion.ul
				initial={{
					opacity: 0,
				}}
				animate={menuOpen ? "open" : "closed"}
				variants={list}
				className={`flex bg-yellow text-black max-md:absolute max-md:top-0 max-md:left-0 max-md:right-0 max-md:-z-10 max-md:h-screen max-md:flex-col max-md:items-end max-md:justify-center max-md:space-y-4 max-md:px-4 max-md:py-8`}
			>
				{links.map((link) => {
					return link.type === "link" ? (
						<motion.li variants={item} key={link.id}>
							<Link
								href={link.href}
								className={`relative inline-block px-4 py-2 text-sub-heading ${
									link.label === segment ? "opacity-100" : "opacity-60"
								} transition hover:opacity-100`}
							>
								{link.label === segment && (
									<span className="absolute left-0 top-1/2 -ml-1 -translate-y-1/2 text-body">
										✦
									</span>
								)}
								{link.label}
							</Link>
						</motion.li>
					) : isMobile ? (
						<motion.li variants={item} key={link.id}>
							<Button as={Link} href={link.href} className="mr-4">
								{link.label} ↗
							</Button>
						</motion.li>
					) : null;
				})}
			</motion.ul>
			{(!menuOpen || !isMobile) && (
				<Button as={Link} href={"/music-stats"}>
					Music-Stats ↗
				</Button>
			)}
			<div
				onClick={toggleMenu}
				className="relative z-10 ml-4 space-y-1.5 py-4 md:hidden"
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
		</div>
	);
};
