import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export const Container = ({
	children,
	className = "",
}: {
	children: ReactNode;
	className?: string;
}) => {
	return (
		<div
			className={twMerge(
				"max-w-8xl mx-auto py-16 px-8 md:py-32 md:px-16 space-y-16",
				className
			)}
		>
			{children}
		</div>
	);
};
