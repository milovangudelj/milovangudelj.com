import { ComponentPropsWithRef, useEffect } from "react";

import { Navbar, Footer } from "../";
import { useScroll } from "../../lib/scrollContext";

interface LayoutProps extends ComponentPropsWithRef<"div"> {}

export const Layout = ({ children, ...props }: LayoutProps) => {
	const { scrollable, scrollY } = useScroll();

	useEffect(() => {
		let scrollHeight = document.body.scrollHeight;
		let viewportHeight = window.innerHeight;

		console.log({ scrollY });
	}, [scrollY]);

	return (
		<div
			className={`h-screen w-screen scroll-smooth ${
				scrollable ? "overflow-y-scroll" : "overflow-hidden"
			} bg-black text-white`}
			{...props}
		>
			<div className="bg-black relative z-[1] mb-[52px]">
				<Navbar />
				<div className="mx-[var(--scroll-margin-x)]">{children}</div>
			</div>
			<Footer />
		</div>
	);
};
