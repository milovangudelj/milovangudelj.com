import { ComponentProps, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export const Section = ({
	children,
	className = "",
}: ComponentProps<"section">) => {
	return (
		<section
			className={twMerge(
				"text-black bg-orange scroll-mt-[72px] md:scroll-mt-[88px]",
				className
			)}
		>
			{children}
		</section>
	);
};
