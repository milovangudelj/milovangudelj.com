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
		<div className="space-y-8 md:space-y-[26px]">
			<Link
				href={site}
				className="relative inline-block aspect-video h-[150px] cursor-pointer border-2 bg-black drop-shadow-brutal md:h-[300px] xl:drop-shadow-brutal-lg"
			>
				<Image
					src={urlForImage(cover.image).url()}
					quality={100}
					alt={cover.image.alt ?? cover.image.caption ?? title}
					title={cover.image.alt ?? cover.image.caption ?? title}
					width={cover.width}
					height={cover.height}
					placeholder="blur"
					blurDataURL={cover.lqip}
					className="object-cover w-full h-full"
				/>
			</Link>
			<div className="flex flex-col">
				<Link
					href={site}
					className="group w-fit text-sub-heading-mobile font-medium md:text-sub-heading"
				>
					{title}{" "}
					<span className="inline-block transition will-change-transform group-hover:translate-x-1">
						→
					</span>
				</Link>
				<span className="text-label-md text-dark-me">{site}</span>
			</div>
		</div>
	);
};
