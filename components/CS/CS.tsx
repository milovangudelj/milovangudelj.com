import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

import { Content } from "./Content";
import { Header } from "./Header";

export const CS = ({ children, className }: ComponentProps<"main">) => {
	return (
		<main
			className={twMerge(
				"mx-auto grid max-w-8xl grid-cols-6 space-y-16 py-16 px-8 md:relative md:space-y-0 md:py-32 md:px-16",
				className
			)}
		>
			{children}
		</main>
	);
};

CS.Header = Header;
CS.Content = Content;
