import { ComponentPropsWithRef } from "react";

import { Navbar } from "../";
import { useScroll } from "../../lib/scrollContext";

interface LayoutProps extends ComponentPropsWithRef<"div"> {}

export const Layout = ({ children, ...props }: LayoutProps) => {
	const [scrollable] = useScroll();

	return (
		<div
			className={`absolute inset-0 ${
				scrollable ? "overflow-y-scroll" : "overflow-hidden"
			} bg-black text-white`}
			{...props}
		>
			<Navbar />
			{children}
		</div>
	);
};
