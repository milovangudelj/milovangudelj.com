import { twMerge } from "tailwind-merge";

import { NavLink } from "./NavLink";

export const NewNavLinks = ({
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
					<NavLink href={link.href} label={link.label} />
				</li>
			))}
		</ul>
	);
};
