import { useRouter } from "next/router";
import { ComponentProps, useState } from "react";
import { twMerge } from "tailwind-merge";

import { NavLinks } from "../";
import { useScroll } from "../../lib/scrollContext";

export const Hamburger = ({ className, ...props }: ComponentProps<"div">) => {
	const [visible, setVisible] = useState<boolean>(false);
	const { setScrollable } = useScroll();

	const toggleMenu = () => {
		setVisible((s) => !s);
		setScrollable((s) => !s);
	};

	return (
		<div className={twMerge("md:hidden", className)} {...props}>
			<div onClick={toggleMenu} className="space-y-1.5">
				<span
					className={`block h-0.5 w-8 origin-center bg-black transition-all will-change-transform ${
						visible ? "translate-y-2 rotate-45" : "transform"
					}`}
				></span>
				<span
					className={`block h-0.5 w-8 bg-black transition ${
						visible && "opacity-0"
					}`}
				></span>
				<span
					className={`block h-0.5 w-8 origin-center bg-black transition-all will-change-transform ${
						visible ? "-translate-y-2 -rotate-45" : "transform"
					}`}
				></span>
			</div>
			<div
				className={`${
					visible ? "block" : "hidden"
				} absolute top-full right-0 h-[calc(var(--innerHeight)-65.69px)] w-full bg-dark-me`}
			>
				<NavLinks />
			</div>
		</div>
	);
};
