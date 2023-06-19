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
				ref={scrollContainer.ref}
				className="scrollbar-hidden -mx-8 flex gap-16 overflow-y-hidden overflow-x-scroll px-8 pb-8 xl:-mx-[calc((100vw-min(1280px,_100vw))/2)] xl:px-[calc((100vw-min(1280px,_100vw))/2)]"
			>
				{posters.map((poster) => (
					<li
						key={`postereveryday_${poster.day}`}
						className="relative h-[300px] w-[225px] flex-none overflow-hidden rounded-lg xl:h-[500px] xl:w-[375px] xl:rounded-2xl"
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
							className="relative h-full w-full object-cover"
						/>
					</li>
				))}
			</ul>
			<span className="absolute -left-8 -top-2 bottom-[calc(23.4px+32px-8px)] w-8 backdrop-blur-sm xl:-left-[calc((100vw-min(1280px,_100vw))/2)] xl:block xl:w-[calc((100vw-min(1280px,_100vw))/2)]"></span>
			<span className="absolute -right-8 -top-2 bottom-[calc(23.4px+32px-8px)] w-8 backdrop-blur-sm xl:-right-[calc((100vw-min(1280px,_100vw))/2)] xl:block xl:w-[calc((100vw-min(1280px,_100vw))/2)]"></span>
			<span className="mt-8 inline-block text-button">
				{dragText} <span className="text-yellow">→</span>
			</span>
		</div>
	);
};
