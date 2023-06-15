"use client";

import Link from "next/link";
import { ComponentProps, RefCallback, useCallback, useState } from "react";
import { Button } from "~components/Button";
import { MobileNav } from "~components/MobileNav";
import { NavLinks } from "~components/NavLinks";
import { LanguageSwitch } from "~components/LanguageSwitch";
import { Locale } from "~/i18n.config";

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
			className="sticky top-0 z-10 border-b border-white/[0.06] bg-black bg-noise bg-repeat shadow-2xl backdrop-blur-sm transition duration-300 [background-size:100px]"
		>
			<div className="relative mx-auto flex w-full max-w-7xl items-center justify-between py-4">
				<Link href={`/${lang}`} className="relative text-sub-heading">
					Milo
				</Link>
				<div className="flex items-center">
					<NavLinks
						links={links}
						lang={lang as Locale}
						className="max-md:pointer-events-none max-md:invisible max-md:hidden max-md:select-none"
					/>
					<span className="inline-block h-6 w-px bg-yellow max-md:invisible max-md:hidden"></span>
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
