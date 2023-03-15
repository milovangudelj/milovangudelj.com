import { Link } from "next-intl";

import { Hamburger, NavLinks } from "../";
import { useIsMobile } from "../../lib/useMediaQuery";

export const Navbar = () => {
	const isMobile = useIsMobile();

	return (
		<div className="sticky top-0 z-10 bg-yellow">
			<div className="relative mx-auto flex w-full max-w-8xl items-center justify-between px-8 py-4 text-black md:p-0 md:pl-16 2xl:pl-0">
				<Link href="/" className="text-sub-heading">
					Milo
				</Link>

				<Hamburger aria-hidden={!isMobile} />
				<NavLinks className="hidden md:block" aria-hidden={!isMobile} />
			</div>
		</div>
	);
};
