import { ComponentProps, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export const Section = ({
	children,
	className = "",
}: ComponentProps<"section">) => {
	return (
		<section className={twMerge("bg-orange text-black", className)}>
			{children}
		</section>
	);
};
