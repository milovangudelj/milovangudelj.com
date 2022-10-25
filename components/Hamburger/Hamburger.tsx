import { useRouter } from "next/router";
import { useState } from "react";

import { NavLinks } from "../";
import { useScroll } from "../../lib/scrollContext";

export const Hamburger = () => {
	const [visible, setVisible] = useState<boolean>(false);
	const { setScrollable } = useScroll();

	const toggleMenu = () => {
		setVisible((s) => !s);
		setScrollable((s) => !s);
	};

	return (
		<div className="">
			<div onClick={toggleMenu} className="space-y-1.5">
				<span
					className={`block w-8 h-0.5 bg-black origin-center will-change-transform transition-all ${
						visible ? "rotate-45 translate-y-2" : "transform"
					}`}
				></span>
				<span
					className={`block w-8 h-0.5 bg-black transition ${
						visible && "opacity-0"
					}`}
				></span>
				<span
					className={`block w-8 h-0.5 bg-black origin-center will-change-transform transition-all ${
						visible ? "-rotate-45 -translate-y-2" : "transform"
					}`}
				></span>
			</div>
			<div
				className={`${
					visible ? "block" : "hidden"
				} absolute top-full right-0 w-full h-[calc(100vh-72px)] bg-dark-me`}
			>
				<NavLinks />
			</div>
		</div>
	);
};
