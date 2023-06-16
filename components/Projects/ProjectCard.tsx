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
				className="relative inline-block aspect-video h-[150px] cursor-pointer overflow-hidden rounded-2xl md:h-[300px]"
			>
				<Image
					src={urlForImage(cover.image)
						.width(Math.floor((600 * 16) / 9))
						.height(600)
						.quality(100)
						.url()}
					alt={cover.image.alt ?? cover.image.caption ?? title}
					title={cover.image.alt ?? cover.image.caption ?? title}
					width={Math.floor((300 * 16) / 9)}
					height={300}
					placeholder="blur"
					blurDataURL={cover.lqip}
					className="h-full w-full object-cover"
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
				<span className="text-label-md text-light-me">{site}</span>
			</div>
		</div>
	);
};
