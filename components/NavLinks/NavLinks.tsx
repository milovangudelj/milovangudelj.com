import Link from "next/link";

const links = [
	{
		key: "li_01",
		label: "about",
		href: "/about",
		color: "bg-orange",
	},
	{
		key: "li_02",
		label: "work",
		href: "/work",
		color: "bg-green",
	},
	{
		key: "li_03",
		label: "contact",
		href: "/contact",
		color: "bg-blue",
	},
];

export const NavLinks = ({ className = "" }: { className?: string }) => {
	return (
		<nav className={className}>
			<ul className="md:flex">
				{links.map((link) => (
					<li
						key={link.key}
						className="border-t-2 border-black bg-black last:border-b-2 md:border-t-0 md:border-l-2 md:last:border-b-0 md:last:border-r-0 xl:last:border-r-2"
					>
						<Link
							href={link.href}
							className={`${link.color} inline-block w-full px-8 py-6 text-sub-heading text-white transition-all will-change-transform hover:-translate-x-1 hover:-translate-y-1 md:w-max`}
						>
							{link.label}
						</Link>
					</li>
				))}
			</ul>
		</nav>
	);
};
