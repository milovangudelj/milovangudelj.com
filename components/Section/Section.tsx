import { ComponentProps, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export const Section = ({
	children,
	className = "",
}: ComponentProps<"section">) => {
	return (
		<section
			className={twMerge(
				"bg-orange py-16 text-black md:py-32 md:px-16",
				className
			)}
		>
			{children}
		</section>
	);
};
