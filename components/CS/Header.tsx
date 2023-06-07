import NextImage from "next/image";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";
import { getLuminance, TEXT_LUMINANCE_TRESHOLD } from "~/utils/getLuminance";
import { PortableText } from "@portabletext/react";
import { urlForImage } from "~/sanity/lib/image";
import { CaseStudyPayload } from "~/sanity/types";

export const Header = ({
	title,
	color,
	subtitle,
	intro,
	cover,
	className,
}: ComponentProps<"header"> & {
	title: CaseStudyPayload["title"];
	color: CaseStudyPayload["color"];
	subtitle: CaseStudyPayload["subtitle"];
	intro: CaseStudyPayload["intro"];
	cover: CaseStudyPayload["cover"];
}) => {
	return (
		<header
			className={twMerge(
				"relative col-span-5 py-16 md:py-32 xl:col-span-3 xl:col-start-2 xl:py-16",
				className
			)}
		>
			<h1
				className={`mb-8 inline-block px-4 py-2 text-sub-heading-mobile xl:text-sub-heading`}
				style={{
					backgroundColor: color,
					color:
						getLuminance(color || "#FFFFFF") > TEXT_LUMINANCE_TRESHOLD
							? "black"
							: "white",
				}}
			>
				{title}
			</h1>
			<span className="mb-8 block text-d2-mobile md:text-d2">
				{subtitle}
			</span>
			<PortableText
				value={intro!}
				components={{
					block: {
						normal: ({ children }) => (
							<p className="mb-8 whitespace-pre-line text-sub-heading-mobile text-white/80 xl:text-sub-heading">
								{children}
							</p>
						),
					},
				}}
			/>
			<figure className="relative -mx-8 mt-16 h-56 md:-mx-16 md:mt-32 md:h-64 xl:-mx-[33.3%] xl:mt-16 xl:h-96">
				<NextImage
					src={urlForImage(cover.image).url()}
					alt={cover.image.alt ?? cover.image.caption}
					title={cover.image.alt}
					quality={100}
					sizes="1440px"
					placeholder={"blur"}
					blurDataURL={cover.lqip}
					priority
					className="h-full w-full object-cover"
					width={cover.width}
					height={cover.height}
				/>
				<figcaption className="absolute top-full left-8 text-label-md text-white/60 md:left-16 xl:left-0">
					{cover.image.caption ?? cover.image.alt ?? ""}
				</figcaption>
			</figure>
		</header>
	);
};
