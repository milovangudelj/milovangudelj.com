import Link from "next/link";

import { Hamburger, NavLinks } from "../";
import { useWindowSize } from "../../lib/windowSizeContext";

export const Navbar = () => {
	const { mobile } = useWindowSize();

	return (
		<div className="sticky top-0 z-10 bg-primary">
			<div className="relative mx-auto flex w-full max-w-8xl items-center justify-between px-8 py-4 text-black md:p-0 md:pl-16 2xl:pl-0">
				<Link href="/" className="text-sub-heading">
					milo
				</Link>

				<Hamburger aria-hidden={!mobile} />
				<NavLinks className="hidden md:block" aria-hidden={!mobile} />
			</div>
		</div>
	);
};
