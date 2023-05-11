"use client";

import Image, { StaticImageData } from "next/image";
import { ComponentProps, useRef } from "react";
import { useScrollContainer } from "react-indiana-drag-scroll";

interface GalleryProps extends ComponentProps<"div"> {
	images: { src: string | StaticImageData; alt: string }[];
	imageWidth?: number;
	imageHeight?: number;
}

export const PosterGallery = ({
	images,
	imageWidth,
	imageHeight,
	...porps
}: GalleryProps) => {
	const imagesRef = useRef<HTMLUListElement>(null);
	const scrollContainer = useScrollContainer();

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
				{images.map((image, index) => (
					<li
						key={`gallery_image_${index}`}
						style={{ width: imageWidth, height: imageHeight }}
					>
						<Image
							src={image.src}
							alt={image.alt}
							width={imageWidth}
							height={imageHeight}
						/>
					</li>
				))}
			</ul>
			<ul
				onScroll={handleScroll}
				ref={scrollContainer.ref}
				className="scrollbar-hidden flex cursor-move gap-16 overflow-x-scroll"
			>
				{images.map((image, index) => (
					<li
						key={`gallery_image_clone_${index}`}
						style={{ width: imageWidth, height: imageHeight }}
						className="flex-none bg-[#fefefe]/0"
					></li>
				))}
			</ul>
			<span className="mt-8 inline-block text-button">
				Drag or Scroll <span className="text-yellow">→</span>
			</span>
		</div>
	);
};
