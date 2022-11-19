import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

export const Header = ({
	title,
	subtitle,
	intro,
	className,
}: ComponentProps<"header"> & {
	title: string;
	subtitle: string;
	intro: string;
}) => {
	return (
		<header
			className={twMerge("relative col-span-4 col-start-2 pb-16", className)}
		>
			<h1 className="mb-4 inline-block bg-lavender px-4 py-2 text-sub-heading-mobile text-black">
				{title}
			</h1>
			<span className="block text-h1-mobile xl:text-h1">{subtitle}</span>
			<p className="mb-4 mt-8 max-w-[66ch] whitespace-pre-line text-sub-heading-mobile font-medium text-white/75">
				{intro}
			</p>
		</header>
	);
};
