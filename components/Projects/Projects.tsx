"use client";

import { ComponentProps, useRef } from "react";
import { useScrollContainer } from "react-indiana-drag-scroll";

import { ProjectCard } from "./ProjectCard";
import { SlimProjectPayload } from "~/sanity/types";

interface ProjectsProps extends ComponentProps<"div"> {
	projects: SlimProjectPayload[];
}

export const Projects = ({ projects }: ProjectsProps) => {
	const scrollContainer = useScrollContainer({
		mouseScroll: {
			rubberBand: false,
			inertia: false,
		},
	});

	return (
		<div className="relative w-full pt-16">
			<ul
				ref={scrollContainer.ref}
				className="scrollbar-hidden -mx-8 flex gap-8 overflow-y-hidden overflow-x-scroll px-8 xl:-mx-[calc((100vw-min(1280px,_100vw))/2)] xl:gap-16 xl:px-[calc((100vw-min(1280px,_100vw))/2)]"
			>
				{projects.map(({ slug, ...props }) => (
					<li key={slug} className="relative flex-none">
						<ProjectCard {...props} />
					</li>
				))}
			</ul>
			<span className="absolute -left-8 bottom-0 top-0 w-8 bg-transparent backdrop-blur-sm md:-left-[calc((100vw-min(1280px,_100vw))/2)] md:w-[calc((100vw-min(1280px,_100vw))/2)]"></span>
			<span className="absolute bottom-0 left-full top-0 w-8 bg-transparent backdrop-blur-sm md:w-[calc((100vw-min(1280px,_100vw))/2)]"></span>
		</div>
	);
};
