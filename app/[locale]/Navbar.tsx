"use client";

import { Link } from "next-intl";
import { useCallback, useState } from "react";

import { NavLinks } from "./NavLinks";

export const Navbar = () => {
	const [backgroundColor, setBackgroundColor] = useState<string>("bg-yellow");
	const [textColor, setTextColor] = useState<string>("text-black");

	const invertBackgroundColor = useCallback((menuOpen: boolean) => {
		if (menuOpen) {
			setBackgroundColor("bg-black");
			setTextColor("text-white");
		} else {
			setBackgroundColor("bg-yellow");
			setTextColor("text-black");
		}
	}, []);

	return (
		<div
			className={`sticky top-0 z-10 ${backgroundColor} transition duration-300`}
		>
			<div
				className={`relative mx-auto ${backgroundColor} flex w-full max-w-8xl items-center justify-between px-8 py-2 ${textColor} md:py-1 2xl:px-0`}
			>
				<Link href="/" className="relative text-sub-heading">
					Milo
				</Link>
				<NavLinks callbackWhenOpen={invertBackgroundColor} />
			</div>
		</div>
	);
};
