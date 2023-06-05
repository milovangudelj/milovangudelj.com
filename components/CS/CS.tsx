import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

import { Content } from "./Content";
import { Header } from "./Header";

export const CS = ({ children, className }: ComponentProps<"main">) => {
	return (
		<main
			className={twMerge(
				"mx-auto grid max-w-7xl grid-cols-5 px-8 md:relative 2xl:px-0",
				className
			)}
		>
			{children}
		</main>
	);
};

CS.Header = Header;
CS.Content = Content;
