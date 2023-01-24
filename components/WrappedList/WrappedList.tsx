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
	poster?: boolean;
}

export const WrappedList = ({
	className,
	items,
	poster = false,
	...props
}: ComponentProps<"ol"> & WrappedListProps) => {
	return (
		<ol
			className={twMerge(
				`bg-black drop-shadow-brutal`,
				className
			)}
			{...props}
		>
			{items.map((item, idx) => (
				<WrappedListItem
					item={item}
					isFirst={idx === 0}
					rank={idx + 1}
					poster={poster}
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
	poster,
	className,
	...props
}: ComponentProps<"li"> & {
	item: Track | Artist;
	isFirst: boolean;
	rank: number;
	poster: boolean;
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
				className={`${
					poster ? "h-[100.31px] w-[100.31px]" : "h-16 w-16"
				} flex-none select-none ${
					isFirst ? "p-0" : poster ? "p-[6.27px]" : "p-1"
				}`}
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
					loading={poster ? "eager" : "lazy"}
				/>
			</div>
			<div
				className={`${
					isFirst
						? lightText
							? "text-white"
							: "text-black"
						: `${
								poster
									? "border-b-[3.13px] border-r-[3.13px]"
									: "border-b-2 border-r-2"
						  } border-white/10 text-white`
				} min-w-0 flex-1`}
			>
				<Link
					href={item.url}
					rel="noreferrer noopener"
					target="_blank"
					className={`${
						isFirst
							? poster
								? "font-space text-[36.11px] font-medium leading-[1.5]"
								: "text-sub-heading"
							: poster
							? "font-space text-[30.09px] font-medium leading-[1.5]"
							: "text-sub-heading-mobile"
					} group flex h-full w-full items-center ${
						poster ? "px-[25.08px]" : "px-4"
					}`}
					title={`${rank}. ${isArtist ? item.name : item.title}`}
				>
					<span
						className={`${
							isFirst
								? poster
									? "text-[71.65px]"
									: "text-[46.04px]"
								: poster
								? "text-[35.12px]"
								: "text-[22.4px]"
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
