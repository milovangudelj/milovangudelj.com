"use client";

import { ComponentProps, useRef } from "react";
import { useScrollContainer } from "react-indiana-drag-scroll";

import { ProjectCard } from "./ProjectCard";
import { SlimProjectPayload } from "~/sanity/types";

interface ProjectsProps extends ComponentProps<"div"> {
	projects: SlimProjectPayload[];
}

export const Projects = ({ projects }: ProjectsProps) => {
	const cloneRef = useRef<HTMLUListElement>(null);
	const scrollContainer = useScrollContainer({
		mouseScroll: {
			rubberBand: false,
			inertia: false,
		},
	});

	const handleScroll: React.UIEventHandler<HTMLUListElement> = (e) => {
		const scrollOffset = e.currentTarget.scrollLeft;

		if (cloneRef.current)
			cloneRef.current.style.transform = `translateX(-${scrollOffset}px)`;
	};

	return (
		<div className="relative pt-16">
			<ul
				ref={cloneRef}
				className="scrollbar-hidden pointer-events-none absolute -left-[calc((100vw-min(1280px,_100vw))/2)] flex w-screen overflow-x-visible px-[calc((100vw-1280px)/2)]"
			>
				{projects.map(({ slug, ...props }) => (
					<li
						key={slug}
						className="relative flex-initial pr-8 last:pr-0 md:pr-16 md:last:pr-0"
					>
						<ProjectCard {...props} />
					</li>
				))}
			</ul>
			<span className="absolute -left-8 w-8 md:-left-[calc((100vw-min(1280px,_100vw))/2)] bottom-0 top-0 md:w-[calc((100vw-min(1280px,_100vw))/2)] bg-transparent backdrop-blur-sm"></span>
			<span className="absolute bottom-0 left-full top-0 w-8 md:w-[calc((100vw-min(1280px,_100vw))/2)] bg-transparent backdrop-blur-sm"></span>
			<ul
				onScroll={handleScroll}
				ref={scrollContainer.ref}
				className="scrollbar-hidden bg-black bg-noise bg-repeat [background-size:100px] relative flex cursor-move overflow-x-scroll max-md:opacity-0"
			>
				{projects.map(({ slug, ...props }) => (
					<li
						key={slug}
						className="relative flex-initial pr-8 last:pr-0 md:pr-16 md:last:pr-0"
					>
						<ProjectCard {...props} />
					</li>
				))}
			</ul>
		</div>
	);
};
