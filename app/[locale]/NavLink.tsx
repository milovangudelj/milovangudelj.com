"use client";

import { Link } from "next-intl";
import { useSelectedLayoutSegment } from "next/navigation";

export const NavLink = ({
	href,
	label,
}: {
	href: string | URL;
	label: string;
}) => {
	const segment = useSelectedLayoutSegment();

	return (
		<Link
			href={href}
			className={`relative inline-block px-4 py-2 text-sub-heading ${
				label === segment ? "opacity-100" : "opacity-60"
			} transition hover:opacity-100`}
		>
			{label === segment && (
				<span className="absolute left-0 top-0 bottom-0 -ml-1 mt-1 flex items-center text-label-md motion-safe:animate-spin-slow md:-ml-0.5 md:text-body">
					✦
				</span>
			)}
			{label}
		</Link>
	);
};
