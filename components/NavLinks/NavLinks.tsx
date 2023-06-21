import { twMerge } from "tailwind-merge";

import { NavLink } from "~components/NavLink/NavLink";
import { Locale } from "~/i18n.config";

export const NavLinks = ({
	links,
	className,
	lang,
}: {
	links: {
		id: string;
		label: string;
		href: string | URL;
	}[];
	className?: string;
	lang: Locale;
}) => {
	return (
		<ul className={twMerge("flex text-white", className)}>
			{links.map((link) => (
				<li key={link.id}>
					<NavLink
						id={link.id}
						href={`/${lang}${link.href}`}
						label={link.label}
					/>
				</li>
			))}
		</ul>
	);
};
