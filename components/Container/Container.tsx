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
				"mx-auto max-w-7xl space-y-16 px-8 2xl:px-0",
				className
			)}
		>
			{children}
		</div>
	);
};
