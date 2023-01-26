import Image from "next/image";
import Link from "next/link";
import { ComponentProps, CSSProperties } from "react";
import { twMerge } from "tailwind-merge";

import { Artist, Track } from "../../lib/types";
import {
	getLuminance,
	TEXT_LUMINANCE_TRESHOLD,
} from "../../utils/getLuminance";
import { Palette } from "../../utils/getPalette";

export interface StatsListProps {
	items: Track[] | Artist[];
	of: "tracks" | "artists";
	poster?: boolean;
	palette?: Palette;
	className?: string;
	style?: CSSProperties;
}

export const StatsList = ({
	className,
	items,
	of,
	poster = false,
	palette,
	style,
	...props
}: ComponentProps<"ol"> & StatsListProps) => {
	if (items.length === 0)
		return (
			<YoungAccount
				of={of}
				poster={poster}
				className={twMerge(`drop-shadow-brutal`, className)}
				style={{
					color: palette?.white ?? "#FFFFFF",
					backgroundColor: palette?.black ?? "#000000",
				}}
			/>
		);

	return (
		<ol
			className={twMerge(`drop-shadow-brutal`, className)}
			style={{
				color: palette?.white ?? "#FFFFFF",
				backgroundColor: palette?.black ?? "#000000",
			}}
			{...props}
		>
			{items.map((item, idx) => (
				<StatsListItem
					item={item}
					isFirst={idx === 0}
					rank={idx + 1}
					poster={poster}
					color={
						palette
							? "name" in item
								? palette.artists[idx]
								: palette.tracks[idx]
							: item.image.color
					}
					style={{
						color: palette?.white ?? "#FFFFFF",
					}}
					key={item.url}
				/>
			))}
		</ol>
	);
};

const StatsListItem = ({
	item,
	isFirst,
	rank,
	poster,
	className,
	color,
	style,
	...props
}: ComponentProps<"li"> & {
	item: Track | Artist;
	isFirst: boolean;
	rank: number;
	poster: boolean;
	color: string;
}) => {
	const lightText = getLuminance(color) <= TEXT_LUMINANCE_TRESHOLD;
	const isArtist = "name" in item;

	return (
		<li
			className={twMerge(`flex`, className)}
			style={{ ...style, backgroundColor: isFirst ? color : undefined }}
			{...props}
		>
			<div
				className={`${
					poster ? "h-[100.31px] w-[100.31px]" : "h-16 w-16"
				} flex-none select-none ${
					isFirst ? "p-0" : poster ? "p-[6.27px]" : "p-1"
				}`}
				style={{ backgroundColor: !isFirst ? color : undefined }}
				title={`${
					isArtist ? item.name + "'s profile" : item.title + "'s album"
				} picture`}
			>
				{poster ? (
					<>
						{/* eslint-disable-next-line @next/next/no-img-element */}
						<img
							className="pointer-events-none aspect-square h-full w-full object-cover"
							sizes={`200.62px`}
							src={item.image.url}
							alt={`${
								isArtist
									? item.name + "'s profile"
									: item.title + "'s album"
							} picture`}
							width={200.62}
							height={200.62}
							loading={poster ? "eager" : "lazy"}
						/>
					</>
				) : (
					<Image
						className="pointer-events-none aspect-square h-full w-full object-cover"
						sizes={`64px`}
						quality={100}
						src={item.image.url}
						alt={`${
							isArtist
								? item.name + "'s profile"
								: item.title + "'s album"
						} picture`}
						width={64}
						height={64}
						loading={poster ? "eager" : "lazy"}
					/>
				)}
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
						  } ${
								style?.color === "#FFFFFF"
									? "border-white/10 text-white"
									: "border-black/10 text-black"
						  }`
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
						} order-last ml-auto flex-none text-sub-heading leading-none opacity-40 transition group-hover:opacity-80`}
					>
						{rank}
					</span>
					<div className="max-w-fill flex-shrink overflow-hidden truncate">
						<span>{isArtist ? item.name : item.title}</span>
						{poster ? (
							<span
								className={`block leading-none opacity-40 ${
									isFirst ? "text-[23.5px]" : "text-[19.58px]"
								}`}
							>
								{item.url.replace("https://", "")}
							</span>
						) : (
							<span className="block select-none text-label-sm leading-none opacity-40 transition group-hover:opacity-80">
								{"name" in item
									? "Open on Spotify"
									: "Listen on Spotify"}{" "}
								↗
							</span>
						)}
					</div>
					{false && (
						<span className="pointer-events-none mx-4 inline-block flex-none select-none opacity-0 transition-opacity group-hover:pointer-events-auto group-hover:opacity-100">
							↗
						</span>
					)}
				</Link>
			</div>
		</li>
	);
};

const YoungAccount = ({
	of,
	poster,
	className,
	...props
}: ComponentProps<"div"> & { of: "tracks" | "artists"; poster: boolean }) => {
	return (
		<div
			className={twMerge(
				className,
				`${poster ? "h-[calc(100.31px*5)]" : "h-80"}`
			)}
			{...props}
		>
			{poster ? "My account is too young" : "Your account is too Young"}
		</div>
	);
};
