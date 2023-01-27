import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

import {
	getLuminance,
	TEXT_LUMINANCE_TRESHOLD,
} from "../../utils/getLuminance";
import { Palette } from "../../utils/getPalette";

export interface StatsListProps {
	items: { name: string; image: string; url: string }[];
	of: "tracks" | "artists";
	palette: Palette;
}

export const StatsList = ({
	className,
	items,
	of,
	palette,
	...props
}: ComponentProps<"ol"> & StatsListProps) => {
	if (items.length === 0)
		return (
			<YoungAccount
				of={of}
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
					color={
						of === "artists" ? palette.artists[idx] : palette.tracks[idx]
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
	className,
	color,
	style,
	...props
}: ComponentProps<"li"> & {
	item: { name: string; image: string; url: string };
	isFirst: boolean;
	rank: number;
	color: string;
}) => {
	const lightText = getLuminance(color) <= TEXT_LUMINANCE_TRESHOLD;

	return (
		<li
			className={twMerge(`flex`, className)}
			style={{ ...style, backgroundColor: isFirst ? color : undefined }}
			{...props}
		>
			<div
				className={`h-[100.31px] w-[100.31px] flex-none select-none ${
					isFirst ? "p-0" : "p-[6.27px]"
				}`}
				style={{ backgroundColor: !isFirst ? color : undefined }}
			>
				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img
					className="pointer-events-none aspect-square h-full w-full object-cover"
					sizes={`200.62px`}
					src={item.image}
					width={200.62}
					height={200.62}
					loading={"eager"}
				/>
			</div>
			<div
				className={`${
					isFirst
						? lightText
							? "text-white"
							: "text-black"
						: `border-b-[3.13px] border-r-[3.13px] ${
								style?.color === "#FFFFFF"
									? "border-white/10 text-white"
									: "border-black/10 text-black"
						  }`
				} min-w-0 flex-1`}
			>
				<a
					href={item.url}
					rel="noreferrer noopener"
					target="_blank"
					className={`${
						isFirst ? " text-[36.11px]" : "text-[30.09px]"
					} group flex h-full w-full items-center px-[25.08px] font-space font-medium leading-[1.5]`}
				>
					<span
						className={`${
							isFirst ? "text-[71.65px]" : "text-[35.12px]"
						} order-last ml-auto flex-none text-sub-heading leading-none opacity-40 transition group-hover:opacity-80`}
					>
						{rank}
					</span>
					<div className="max-w-fill overflow-hidden truncate">
						<span>{item.name}</span>
						{false && <span
							className={`leading-none block opacity-40 ${
								isFirst ? "text-[23.5px]" : "text-[19.58px]"
							}`}
						>
							{item.url.replace("https://", "")}
						</span>}
					</div>
				</a>
			</div>
		</li>
	);
};

const YoungAccount = ({
	of,
	className,
	...props
}: ComponentProps<"div"> & { of: "tracks" | "artists" }) => {
	return (
		<div className={twMerge(className, `h-[calc(100.31px*5)]`)} {...props}>
			My account is too young
		</div>
	);
};
