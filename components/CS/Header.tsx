import { RichText } from "@graphcms/rich-text-react-renderer";
import { RichTextContent } from "@graphcms/rich-text-types";
import Image from "next/legacy/image";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";
import { colorMap } from "../../lib/hygraph";
import { renderers } from "../richTextRenderers";

type CSContentTypeWithoutEmbeds = {
	raw: RichTextContent;
	html: string;
	markdown: string;
	text: string;
};

export const Header = ({
	title,
	color,
	subtitle,
	intro,
	cover,
	className,
}: ComponentProps<"header"> & {
	title: string;
	color: string;
	subtitle: string;
	intro: CSContentTypeWithoutEmbeds;
	cover: any;
}) => {
	return (
		<header
			className={twMerge(
				"relative col-span-5 py-16 md:py-32 xl:col-span-3 xl:col-start-2 xl:py-16",
				className
			)}
		>
			<h1
				className={`mb-8 inline-block px-4 py-2 text-sub-heading-mobile xl:text-sub-heading ${twMerge(
					"bg-yellow text-black",
					colorMap[color]
				)}`}
			>
				{title}
			</h1>
			<span className="mb-8 block text-d2-mobile md:text-d2">
				{subtitle}
			</span>
			<RichText content={intro.raw} renderers={renderers("csIntro")} />
			<figure className="relative -mx-8 mt-16 h-56 md:-mx-16 md:mt-32 md:h-64 xl:-mx-[33.3%] xl:mt-16 xl:h-96">
				<Image
					src={cover.url}
					alt={cover.alt}
					title={cover.alt}
					layout="fill"
					objectFit="cover"
					quality={100}
					sizes="1440px"
					placeholder={cover.blurDataUrl ? "blur" : "empty"}
					blurDataURL={cover.blurDataUrl}
					priority
				/>
				<figcaption className="absolute top-full left-8 text-label-md text-white/60 md:left-16 xl:left-0">
					{cover.caption ?? cover.alt}
				</figcaption>
			</figure>
		</header>
	);
};
