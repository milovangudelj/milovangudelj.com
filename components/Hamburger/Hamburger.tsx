import { ComponentProps, MouseEventHandler, useRef, useState } from "react";
import { Transition } from "@headlessui/react";
import { twMerge } from "tailwind-merge";

import { NavLinks } from "../";
import { useScroll } from "../../lib/scrollContext";

export const Hamburger = ({ className, ...props }: ComponentProps<"div">) => {
	const [visible, setVisible] = useState<boolean>(false);
	const { setScrollable } = useScroll();
	const linksRef = useRef<HTMLElement>(null);

	const toggleMenu = () => {
		setVisible((s) => !s);
		setScrollable((s) => !s);
	};

	const menuClicked: MouseEventHandler<HTMLDivElement> = (e) => {
		if (linksRef.current && !linksRef.current.contains(e.target as Node))
			toggleMenu();
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
			<Transition
				show={visible}
				enterFrom="bg-dark-me/0"
				enterTo="bg-dark-me"
				leaveFrom="bg-dark-me"
				leaveTo="bg-dark-me/0"
				className="absolute top-full right-0 h-[calc(var(--innerHeight)-65.69px)] w-full transition"
				onClick={menuClicked}
			>
				<Transition.Child
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
					as={NavLinks}
					ref={linksRef}
					className="transition"
				/>
			</Transition>
		</div>
	);
};
