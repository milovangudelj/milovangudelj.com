"use client";

import { Link } from "next-intl";
import { RefCallback, useCallback, useRef, useState } from "react";
import { Button } from "../../components/Button";
import { LanguageSwitch } from "./LanguageSwitch";
import { MobileNav } from "./MobileNav";
import { NewNavLinks } from "./NewNavLinks";

const links: {
	id: string;
	label: string;
	href: string | URL;
}[] = [
	{
		id: "about",
		href: "/about",
		label: "about",
	},
	{
		id: "work",
		href: "/work",
		label: "work",
	},
	{
		id: "contact",
		href: "/contact",
		label: "contact",
	},
];

export const NewNavbar = () => {
	const [rect, navRef] = useClientRect();

	return (
		<div
			ref={navRef}
			className="sticky top-0 z-10 bg-yellow transition duration-300"
		>
			<div className="relative mx-auto flex w-full max-w-8xl items-center justify-between bg-yellow px-8 py-2 text-black md:py-1 2xl:px-0">
				<Link href="/" className="relative text-sub-heading">
					Milo
				</Link>
				<div className="flex items-center gap-4">
					<NewNavLinks
						links={links}
						className="max-md:pointer-events-none max-md:invisible max-md:hidden max-md:select-none"
					/>
					<Button
						as={Link}
						href={"/music-stats"}
						className="max-md:pointer-events-none max-md:invisible max-md:hidden max-md:select-none"
					>
						Music-Stats ↗
					</Button>
					<LanguageSwitch />
					<MobileNav navRect={rect} links={links} />
				</div>
			</div>
		</div>
	);
};

function useClientRect(): [
	DOMRect | undefined,
	(instance: HTMLElement | null) => void
] {
	const [rect, setRect] = useState<DOMRect>();

	const ref: RefCallback<HTMLElement> = useCallback((node) => {
		if (node !== null) {
			setRect(node.getBoundingClientRect());
		}
	}, []);

	return [rect, ref];
}
