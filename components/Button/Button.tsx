import { ComponentProps } from "react";
import { cva, type VariantProps } from "cva";
import { twMerge } from "tailwind-merge";

export const Button = ({
	className,
	children,
	...props
}: ComponentProps<"button">) => {
	return (
		<button
			className={twMerge(
				"border-2 bg-salmon py-2 px-4 text-button transition-all will-change-[filter] hover:drop-shadow-brutal",
				className
			)}
			{...props}
		>
			{children}
		</button>
	);
};
