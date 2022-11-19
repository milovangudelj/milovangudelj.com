import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";
import { Section, Container } from "../..";

const Pattern = ({ className }: ComponentProps<"svg">) => {
	return (
		<svg
			width="320"
			height="320"
			viewBox="0 0 321 321"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={twMerge("text-primary/30", className)}
		>
			<line y1="0.5" x2="320" y2="0.5" stroke="currentColor" />
			<line x1="320.5" y1="1" x2="320.5" y2="321" stroke="currentColor" />
			<line y1="64.5" x2="320" y2="64.5" stroke="currentColor" />
			<line x1="64.5" y1="1" x2="64.5" y2="321" stroke="currentColor" />
			<line y1="128.5" x2="320" y2="128.5" stroke="currentColor" />
			<line x1="128.5" y1="1" x2="128.5" y2="321" stroke="currentColor" />
			<line y1="192.5" x2="320" y2="192.5" stroke="currentColor" />
			<line x1="192.5" y1="1" x2="192.5" y2="321" stroke="currentColor" />
			<line y1="256.5" x2="320" y2="256.5" stroke="currentColor" />
			<line x1="256.5" y1="1" x2="256.5" y2="321" stroke="currentColor" />
		</svg>
	);
};

export const CTA = () => {
	return (
		<Section className="relative overflow-hidden bg-blue text-white">
			<div className="absolute top-0 right-0 left-0 xl:left-auto xl:h-[640px] xl:w-[640px]">
				<div className="absolute top-0 bottom-0 right-0 w-[320px] bg-gradient-to-r from-blue to-blue/0 xl:right-1/2"></div>
				<div className="grid grid-cols-1 place-items-end xl:grid-cols-2">
					<Pattern className="hidden xl:inline-block" />
					<Pattern className="hidden xl:inline-block" />
					<Pattern />
					<Pattern />
				</div>
			</div>
			<Container className="relative">
				<div className="space-y-8">
					<h2 className="text-h1-mobile md:text-d2-mobile xl:text-d2">
						Let&apos;s work together
					</h2>
					<p className="text-body xl:max-w-[680px]">
						If you like what I do please feel free to contact me and who
						knows, we might build the next big thing or just a cool
						looking website.
					</p>
				</div>
				<div className="flex items-center space-x-4 py-0.5">
					<a
						href="mailto:milovan.gudelj@gmail.com"
						target="_blank"
						rel="noreferrer"
						className="text-body font-semibold md:text-sub-heading-mobile xl:text-sub-heading"
					>
						milovan.gudelj@gmail.com
					</a>
					<span className="text-primary drop-shadow-brutal">
						<svg
							width="48"
							height="48"
							viewBox="0 0 49 49"
							fill="current-color"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M7.39128 48.9185L0.724609 42.2518L30.3437 12.6327L33.7722 10.1566L33.1056 8.72798L29.0103 9.68036H12.0579V0.918457H43.9627L48.8198 5.87084V37.6804H39.9627V20.6327L40.9151 16.4423L39.4865 15.8708L37.0103 19.2994L7.39128 48.9185Z"
								fill="#FFC700"
							/>
						</svg>
					</span>
				</div>
			</Container>
		</Section>
	);
};
