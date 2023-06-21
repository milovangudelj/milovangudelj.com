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
		<div className="space-y-8 w-[calc(150px*16/9)] md:w-[calc(300px*16/9)] md:space-y-[26px]">
			<Link
				href={site}
				className="relative inline-block aspect-video h-[150px] cursor-pointer overflow-hidden rounded-lg md:rounded-2xl md:h-[300px]"
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
			</Link>
			<div className="flex w-full flex-col">
				<Link
					href={site}
					className="group w-fit text-sub-heading-mobile font-medium md:text-sub-heading"
				>
					{title}{" "}
					<span className="inline-block text-white group-hover:text-yellow transition will-change-transform group-hover:translate-x-1">
						→
					</span>
				</Link>
				<span className="text-label-md max-w-full inline-block truncate text-light-me">{site}</span>
			</div>
		</div>
	);
};
