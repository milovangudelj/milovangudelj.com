import { ComponentProps, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export const Section = ({
	children,
	className = "",
}: ComponentProps<"section">) => {
	return (
		<section
			className={`border-t border-white/[0.06] px-8 py-32 first-of-type:border-none ${className}`}
		>
			{children}
		</section>
	);
};
