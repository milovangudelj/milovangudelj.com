import Link from "next/link";

import { Hamburger, NavLinks } from "../";
import { useWindowSize } from "../../lib/windowSizeContext";

export const Navbar = () => {
	const { mobile } = useWindowSize();

	return (
		<div className="bg-primary sticky top-0 z-10">
			<div className="max-w-8xl relative px-8 py-4  md:p-0 md:pl-16 2xl:pl-0 h-[72px] md:h-[88px] w-full text-black mx-auto flex justify-between items-center">
				<span className="text-sub-heading inline-block h-10">
					<Link href="/">milo</Link>
				</span>
				{mobile ? <Hamburger /> : <NavLinks className="hidden md:block" />}
			</div>
		</div>
	);
};
