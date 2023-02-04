import Link from "next/link";
import { NavLinks } from "../components/NavLinks";

export const Navbar = () => {
	return (
		<div className="sticky top-0 z-10 bg-yellow">
			<div className="relative mx-auto flex w-full max-w-8xl items-center justify-between px-8 py-4 text-black md:p-0 md:pl-16 2xl:pl-0">
				<Link href="/" className="text-sub-heading">
					Milo
				</Link>
				<NavLinks className="hidden md:block" />
			</div>
		</div>
	);
};
