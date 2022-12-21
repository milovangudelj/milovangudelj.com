import Image from "next/image";
import Link from "next/link";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

import { Artist, Track } from "../../lib/types";
import {
	getLuminance,
	TEXT_LUMINANCE_TRESHOLD,
} from "../../utils/getLuminance";

export interface WrappedListProps {
	items: Track[] | Artist[];
}

export const WrappedList = ({
	className,
	items,
	...props
}: ComponentProps<"ol"> & WrappedListProps) => {
	return (
		<ol
			className={twMerge("bg-black drop-shadow-brutal", className)}
			{...props}
		>
			{items.map((item, idx) => (
				<WrappedListItem
					item={item}
					isFirst={idx === 0}
					rank={idx + 1}
					key={item.url}
				/>
			))}
		</ol>
	);
};

const WrappedListItem = ({
	item,
	isFirst,
	rank,
	className,
	...props
}: ComponentProps<"li"> & {
	item: Track | Artist;
	isFirst: boolean;
	rank: number;
}) => {
	const lightText = getLuminance(item.image.color) <= TEXT_LUMINANCE_TRESHOLD;
	const isArtist = "name" in item;

	return (
		<li
			className={twMerge(`flex`, className)}
			style={isFirst ? { backgroundColor: item.image.color } : undefined}
			{...props}
		>
			<div
				className={`h-16 w-16 flex-none ${isFirst ? "p-0" : "p-1"}`}
				style={!isFirst ? { backgroundColor: item.image.color } : undefined}
				title={`${
					isArtist ? item.name + "'s profile" : item.title + "'s album"
				} picture`}
			>
				<Image
					className="pointer-events-none aspect-square h-full w-full object-cover"
					sizes={`${item.image.width}px`}
					quality={100}
					src={item.image.url}
					alt={`${
						isArtist ? item.name + "'s profile" : item.title + "'s album"
					} picture`}
					width={item.image.width}
					height={item.image.height}
				/>
			</div>
			<div
				className={`${
					isFirst
						? lightText
							? "text-white"
							: "text-black"
						: "border-b-2 border-r-2 border-white/10 text-white"
				} min-w-0 flex-1`}
			>
				<Link
					href={item.url}
					rel="noreferrer noopener"
					target="_blank"
					className={`${
						isFirst
							? lightText
								? "text-sub-heading"
								: "text-sub-heading"
							: "text-sub-heading-mobile"
					} group flex h-full w-full items-center px-4`}
					title={`${rank}. ${isArtist ? item.name : item.title}`}
				>
					<span
						className={`${
							isFirst ? "text-[46.04px]" : "text-[22.4px]"
						} order-last ml-auto flex-none text-sub-heading leading-none opacity-40`}
					>
						{rank}
					</span>
					<div className="max-w-fill flex-shrink overflow-hidden truncate">
						{isArtist ? item.name : item.title}
					</div>
					<span className="pointer-events-none mx-4 inline-block flex-none select-none opacity-0 transition-opacity group-hover:pointer-events-auto group-hover:opacity-100">
						↗
					</span>
				</Link>
			</div>
		</li>
	);
};
