import { twMerge } from "tailwind-merge";

import { NavLink } from "@components/NavLink/NavLink";

export const NavLinks = ({
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
	return (
		<ul className={twMerge("flex bg-yellow text-black", className)}>
			{links.map((link) => (
				<li key={link.id}>
					<NavLink id={link.id} href={link.href} label={link.label} />
				</li>
			))}
		</ul>
	);
};
