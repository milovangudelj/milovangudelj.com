import { ComponentPropsWithRef, useState } from "react";

import { Navbar, Footer } from "../";
import { useScroll } from "../../lib/scrollContext";
import { useIsomorphicLayoutEffect } from "../../utils/useIsomorphicLayoutEffect";

interface LayoutProps extends ComponentPropsWithRef<"div"> {}

export const Layout = ({ children, ...props }: LayoutProps) => {
	const { scrollable } = useScroll();
	const [height, setHeight] = useState<number>();

	useIsomorphicLayoutEffect(() => {
		const resized = () => {
			setHeight(window.innerHeight);
			document.documentElement.style.setProperty(
				"--innerHeight",
				`${window.innerHeight}px`
			);
		};
		resized();

		window.addEventListener("resize", resized);
		() => {
			window.removeEventListener("resize", resized);
		};
	}, []);

	return (
		<div
			className={`h-fill min-h-[var(--innerHeight)] scroll-smooth ${
				scrollable
					? "overflow-x-hidden overflow-y-scroll"
					: "overflow-hidden"
			} bg-black text-white`}
			{...props}
		>
			<Navbar />
			<div className="relative z-[1] mb-[58.25px] bg-black">{children}</div>
			<Footer />
		</div>
	);
};
