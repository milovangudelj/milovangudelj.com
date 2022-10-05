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
		href: "/#work",
		color: "bg-green",
	},
	{
		key: "li_03",
		label: "contact",
		href: "/#contact",
		color: "bg-blue",
	},
];

export const NavLinks = () => {
	return (
		<nav>
			<ul className="md:flex">
				{links.map((link) => (
					<li
						key={link.key}
						className="border-t-2 last:border-b-2 md:border-t-0 md:last:border-b-0 md:last:border-r-0 md:border-l-2 xl:last:border-r-2 border-black bg-black"
					>
						<Link href={link.href} passHref>
							<a
								className={`${link.color} text-white w-full md:w-max px-8 py-6 inline-block text-sub-heading hover:-translate-x-1 hover:-translate-y-1 transition-all will-change-transform`}
							>
								{link.label}
							</a>
						</Link>
					</li>
				))}
			</ul>
		</nav>
	);
};
