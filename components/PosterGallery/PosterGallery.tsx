"use client";

import Image, { StaticImageData } from "next/image";
import { ComponentProps, useRef } from "react";
import { useScrollContainer } from "react-indiana-drag-scroll";

import { urlForImage } from '~/sanity/lib/image';
import { PosterPayload } from '~/sanity/types';

interface GalleryProps extends ComponentProps<"div"> {
	posters: PosterPayload[];
	dragText?: string;
}

export const PosterGallery = ({
	posters,
	dragText = "Drag or scroll",
	...porps
}: GalleryProps) => {
	const imagesRef = useRef<HTMLUListElement>(null);
	const scrollContainer = useScrollContainer({
		mouseScroll: {
			rubberBand: false,
			inertia: false,
		},
	});

	const handleScroll: React.UIEventHandler<HTMLUListElement> = (e) => {
		const scrollOffset = e.currentTarget.scrollLeft;

		if (imagesRef.current)
			imagesRef.current.style.transform = `translateX(-${scrollOffset}px)`;
	};

	return (
		<div className="relative w-full overflow-visible">
			<ul
				ref={imagesRef}
				className="pointer-events-none absolute top-0 left-0 flex w-max gap-16 pb-8"
			>
				{posters.map((poster) => (
					<li
						key={`postereveryday_${poster.day}`}
						className="xl:w-[375px] xl:h-[500px] w-[225px] h-[300px] relative rounded-lg xl:rounded-2xl overflow-hidden"
					>
						<span
							aria-hidden
							className="absolute inset-0 flex items-center justify-center bg-white/20 text-sub-heading-mobile text-black"
						>
							Loading...
						</span>
						<Image
							src={urlForImage(poster.image.image).url()}
							alt={`${poster.title} - ${poster.image.image.alt}`}
							title={`${poster.title} - ${poster.image.image.caption}`}
							quality={100}
							width={375}
							height={500}
							placeholder="blur"
							blurDataURL={poster.image.lqip}
							className="relative object-cover h-full w-full"
						/>
					</li>
				))}
			</ul>
			<ul
				onScroll={handleScroll}
				ref={scrollContainer.ref}
				className="scrollbar-hidden flex cursor-move gap-16 overflow-x-scroll"
			>
				{posters.map((poster) => (
					<li
						key={`postereveryday_${poster.day}`}
						className="flex-none bg-transparent overflow-hidden xl:w-[375px] xl:h-[500px] w-[225px] h-[300px] relative rounded-lg xl:rounded-2xl"
					></li>
				))}
			</ul>
				<span className="absolute -top-2 -left-8 xl:-left-[calc((100vw-min(1280px,_100vw))/2)] bottom-[calc(23.4px+32px-8px)] w-8 xl:w-[calc((100vw-min(1280px,_100vw))/2)] backdrop-blur-sm xl:block"></span>
				<span className="absolute -top-2 -right-8 xl:-right-[calc((100vw-min(1280px,_100vw))/2)] bottom-[calc(23.4px+32px-8px)] w-8 xl:w-[calc((100vw-min(1280px,_100vw))/2)] backdrop-blur-sm xl:block"></span>
			<span className="mt-8 inline-block text-button">
				{dragText} <span className="text-yellow">→</span>
			</span>
		</div>
	);
};
