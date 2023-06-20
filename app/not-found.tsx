import Image from "next/image";
import Link from "next/link";

import { Navbar } from "~/components";

import { getDictionary } from "~/utils/getDictionary";

import confusedTravolta from "~images/johntravolta.webp";

export default async function NotFound() {
	const dictionary = await getDictionary("en");

	const links: {
		id: string;
		label: string;
		href: string | URL;
	}[] = [
		{
			id: "about",
			href: "/about",
			label: dictionary.Navbar.about,
		},
		{
			id: "work",
			href: "/work",
			label: dictionary.Navbar.work,
		},
		{
			id: "portfolio",
			href: "/portfolio",
			label: dictionary.Navbar.portfolio,
		},
		{
			id: "contact",
			href: "/contact",
			label: dictionary.Navbar.contact,
		},
	];

	return (
		<div className="min-h-[100dvh] bg-black bg-noise bg-repeat [background-size:100px]">
			<Navbar lang="en" links={links} />

			<div className="flex h-[calc(100dvh-72.39px)] flex-col items-center justify-center gap-16">
				<Image
					src={confusedTravolta}
					quality={100}
					alt="Confused John Travolta from the movie Pulp Fiction"
					className="aspect-[293/300] w-[293px] object-cover opacity-50 grayscale"
				/>
				<h1 className="text-sub-heading-mobile text-white xl:text-sub-heading">
					That page doesn&apos;t exist...
				</h1>
			</div>
		</div>
	);
}
