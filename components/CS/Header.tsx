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
			className={twMerge("relative col-span-3 col-start-2 py-16", className)}
		>
			<h1
				className={`mb-8 inline-block px-4 py-2 text-sub-heading-mobile ${twMerge(
					"bg-yellow text-black",
					colorMap[color]
				)}`}
			>
				{title}
			</h1>
			<span className="mb-8 block text-h1-mobile xl:text-h1">
				{subtitle}
			</span>
			<RichText content={intro.raw} renderers={renderers("csIntro")} />
			<figure className="relative -mx-[33.3%] mt-16 h-96">
				<Image
					src={cover.url}
					alt={cover.alt}
					title={cover.alt}
					layout="fill"
					objectFit="cover"
					quality={100}
					placeholder={cover.blurDataUrl ? "blur" : "empty"}
					blurDataURL={cover.blurDataUrl}
				/>
				<figcaption className="absolute top-full left-0 text-label-md text-white/60">
					{cover.caption ?? cover.alt}
				</figcaption>
			</figure>
		</header>
	);
};
