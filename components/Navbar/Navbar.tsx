"use client";

import Link from "next/link";
import { ComponentProps, RefCallback, useCallback, useState } from "react";
import { Button } from "@components/Button";
import { MobileNav } from "@components/MobileNav";
import { NavLinks } from "@components/NavLinks";
import { LanguageSwitch } from "@components/LanguageSwitch";
import { Locale } from "@/i18n.config";

export const Navbar = ({
	links,
	lang,
}: ComponentProps<"div"> & {
	links: {
		id: string;
		label: string;
		href: string | URL;
	}[];
}) => {
	const [rect, navRef] = useClientRect();

	return (
		<div
			ref={navRef}
			className="sticky top-0 z-10 bg-yellow transition duration-300"
		>
			<div className="relative mx-auto flex w-full max-w-7xl items-center justify-between bg-yellow px-8 py-2 text-black md:py-1 2xl:px-0">
				<Link href={`/${lang}`} className="relative text-sub-heading">
					Milo
				</Link>
				<div className="flex items-center gap-4">
					<NavLinks
						links={links}
						lang={lang as Locale}
						className="max-md:pointer-events-none max-md:invisible max-md:hidden max-md:select-none"
					/>
					<Button
						as={Link}
						href={`/${lang}/music-stats`}
						className="max-md:pointer-events-none max-md:invisible max-md:hidden max-md:select-none"
					>
						Music-Stats ↗
					</Button>
					<LanguageSwitch />
					<MobileNav navRect={rect} lang={lang as Locale} links={links} />
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
