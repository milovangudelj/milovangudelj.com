import Image from "next/image";
import Link from "next/link";

import { urlForImage } from "~/sanity/lib/image";
import { SlimProjectPayload } from "~/sanity/types";

type ProjectCardProps = {
	title: string;
	site: string;
	cover: SlimProjectPayload["cover"];
};

export const ProjectCard = ({ title, site, cover }: ProjectCardProps) => {
	return (
		<div className="w-[calc(150px*16/9)] space-y-8 md:w-[calc(300px*16/9)] md:space-y-[26px]">
			<a
				target="_blank"
				rel="noreferrer noopener"
				href={site}
				className="relative inline-block aspect-video h-[150px] cursor-pointer overflow-hidden rounded-lg md:h-[300px] md:rounded-2xl"
			>
				<Image
					src={urlForImage(cover.image).url()}
					alt={cover.image.alt ?? cover.image.caption ?? title}
					title={cover.image.alt ?? cover.image.caption ?? title}
					width={Math.floor((300 * 16) / 9)}
					height={300}
					placeholder="blur"
					blurDataURL={cover.lqip}
					className="h-full w-full object-cover"
				/>
			</a>
			<div className="flex w-full flex-col">
				<a
					target="_blank"
					rel="noreferrer noopener"
					href={site}
					className="group w-fit text-sub-heading-mobile font-medium md:text-sub-heading"
				>
					{title}{" "}
					<span className="inline-block text-white transition will-change-transform group-hover:translate-x-1 group-hover:text-yellow">
						→
					</span>
				</a>
				<span className="inline-block max-w-full truncate text-label-md text-light-me">
					{site}
				</span>
			</div>
		</div>
	);
};
