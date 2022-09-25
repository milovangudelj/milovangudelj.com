import { ComponentPropsWithRef } from "react";

import { Navbar, Footer } from "../";
import { useScroll } from "../../lib/scrollContext";

interface LayoutProps extends ComponentPropsWithRef<"div"> {}

export const Layout = ({ children, ...props }: LayoutProps) => {
	const [scrollable] = useScroll();

	return (
		<div
			className={`h-screen w-screen scroll-smooth ${
				scrollable ? "overflow-y-scroll" : "overflow-hidden"
			} bg-black text-white`}
			{...props}
		>
			<Navbar />
			{children}
			<Footer />
		</div>
	);
};
