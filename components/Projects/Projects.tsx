"use client";

import { ComponentProps, useRef } from "react";
import { useScrollContainer } from "react-indiana-drag-scroll";

import { ProjectCard } from "~components/ProjectCard";
import { Project } from "../../app/[locale]/work/page";

interface ProjectsProps extends ComponentProps<"div"> {
	projects: Omit<Project, "description">[];
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
		<div className="relative">
			<ul
				ref={cloneRef}
				className="scrollbar-hidden pointer-events-none absolute -left-[calc((100vw-min(1280px,_100vw))/2)] flex w-screen overflow-x-visible px-[calc((100vw-1280px)/2)]"
			>
				{projects.map(({ id, ...props }) => (
					<li
						key={id}
						className="relative flex-initial pr-8 last:pr-0 md:pr-16 md:last:pr-0"
					>
						<ProjectCard {...props} />
					</li>
				))}
			</ul>
			<span className="absolute top-0 -left-[calc((100vw-min(1280px,_100vw))/2)] bottom-0 hidden w-[calc((100vw-min(1280px,_100vw))/2)] bg-gradient-to-l from-green/0 to-green xl:block"></span>
			<span className="absolute top-0 left-full bottom-0 hidden w-[calc((100vw-min(1280px,_100vw))/2)] bg-gradient-to-r from-green/0 to-green xl:block"></span>
			<ul
				onScroll={handleScroll}
				ref={scrollContainer.ref}
				className="scrollbar-hidden relative flex cursor-move overflow-x-scroll bg-green max-md:opacity-0"
			>
				{projects.map(({ id, ...props }) => (
					<li
						key={id}
						className="relative flex-initial pr-8 last:pr-0 md:pr-16 md:last:pr-0"
					>
						<ProjectCard {...props} />
					</li>
				))}
			</ul>
		</div>
	);
};
