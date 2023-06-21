import Link from "next/link";
import Image from "next/image";
import { ComponentProps } from "react";
import { PortableText } from "@portabletext/react";

import { urlForImage } from "~/sanity/lib/image";
import { ProjectPayload } from "~/sanity/types";
import { Locale } from "~/i18n.config";

import { Button } from "~components/Button";

interface ProjectShowcaseProps extends ComponentProps<"div"> {
	messages: {
		visit: string;
		read: string;
	};
	project: ProjectPayload;
	lang: Locale;
}

export const ProjectShowcase = async ({ messages, project, lang }: ProjectShowcaseProps) => {
	return (
		<>
			<div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between md:gap-0">
				<div className="flex flex-col items-baseline gap-8 md:flex-row md:gap-0">
					<h2 className="text-h2-mobile xl:text-h2">{project.title}</h2>
					<span className="mx-4 hidden text-sub-heading-mobile text-white/70 md:inline-block 2xl:text-sub-heading">
						-
					</span>
					<span className="text-sub-heading-mobile text-white/70 2xl:text-sub-heading">
						{project.year}
					</span>
				</div>
				<Button
					as="a"
					target="_blank"
					rel="noreferrer noopener"
					href={project.site}
				>
					{messages.visit} ↗
				</Button>
			</div>
			<Image
				src={urlForImage(project.cover.image).url()}
				className="pointer-events-none aspect-video w-full select-none rounded-lg object-cover xl:rounded-2xl"
				quality={100}
				alt={project.cover.image.alt ?? project.cover.image.caption}
				title={project.cover.image.alt ?? project.cover.image.caption}
				width={project.cover.width}
				height={project.cover.height}
				placeholder="blur"
				blurDataURL={project.cover.lqip}
			/>
			<div className="space-y-8">
				<PortableText
					value={project.overview}
					components={{
						block: {
							normal: ({ children }) => (
								<p className="text-white/70">{children}</p>
							),
						},
					}}
				/>
			</div>
			{project.caseStudy && (
				<Button as={Link} href={`/${lang}/work/${project.slug}`}>
					{messages.read} ↗
				</Button>
			)}
		</>
	);
};
