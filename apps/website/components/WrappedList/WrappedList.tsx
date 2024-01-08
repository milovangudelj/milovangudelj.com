import Image from "next/image";
import { ComponentProps, CSSProperties } from "react";
import { twMerge } from "tailwind-merge";

import { _Artist } from "~lib/types";
import { getLuminance, TEXT_LUMINANCE_TRESHOLD } from "~utils/getLuminance";
import { Palette } from "~utils/getPalette";

export interface WrappedListProps extends ComponentProps<"ol"> {
	items: _Artist[];
	altText?: string;
	openText?: string;
	palette: Palette;
	className?: string;
	style?: CSSProperties;
}

export const WrappedList = ({
	className,
	items,
	altText,
	openText,
	palette,
	style,
	...props
}: WrappedListProps) => {
	if (items.length === 0)
		return (
			<YoungAccount
				className={twMerge(
					`bg-black text-white drop-shadow-brutal`,
					className
				)}
			/>
		);

	return (
		<ol
			className={twMerge(
				`h-fit bg-black text-white drop-shadow-brutal`,
				className
			)}
			{...props}
		>
			{items.map((item, idx) => (
				<WrappedListItem
					item={item}
					isFirst={idx === 0}
					rank={idx + 1}
					altText={altText}
					openText={openText}
					color={palette.artists[idx]}
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
	altText = "'s profile picture",
	openText = "Open on Spotify",
	className,
	color,
	style,
	...props
}: ComponentProps<"li"> & {
	item: _Artist;
	isFirst: boolean;
	rank: number;
	altText?: string;
	openText?: string;
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
				className={`h-16 w-16 flex-none select-none ${
					isFirst ? "p-0" : "p-1"
				}`}
				style={{ backgroundColor: !isFirst ? color : undefined }}
				title={
					altText.startsWith("'")
						? `${item.name}${
								item.name.endsWith("s")
									? altText.replace("'s", "'")
									: altText
						  }`
						: `${altText} ${item.name}`
				}
			>
				<Image
					className="pointer-events-none aspect-square h-full w-full object-cover"
					sizes={`64px`}
					quality={100}
					src={item.image.url}
					alt={`${item.name + "'s profile"} picture`}
					width={64}
					height={64}
					loading={"lazy"}
				/>
			</div>
			<div
				className={`${
					isFirst
						? lightText
							? "text-white"
							: "text-black"
						: `border-b-2 border-r-2 border-white/10 text-white`
				} min-w-0 flex-1`}
			>
				<a
					href={item.url}
					rel="noreferrer noopener"
					target="_blank"
					className={`${
						isFirst ? "text-sub-heading" : "text-sub-heading-mobile"
					} group flex h-full w-full items-center px-4`}
					title={`${rank}. ${item.name}`}
				>
					<span
						className={`${
							isFirst ? "text-[46.04px]" : "text-[22.4px]"
						} order-last ml-auto flex-none leading-none opacity-40 transition group-hover:opacity-80`}
					>
						{rank}
					</span>
					<div className="max-w-fill flex-shrink overflow-hidden truncate">
						<span>{item.name}</span>
						<span className="block select-none text-label-sm leading-none opacity-40 transition group-hover:opacity-80">
							{openText} ↗
						</span>
					</div>
					{false && (
						<span className="pointer-events-none mx-4 inline-block flex-none select-none opacity-0 transition-opacity group-hover:pointer-events-auto group-hover:opacity-100">
							↗
						</span>
					)}
				</a>
			</div>
		</li>
	);
};

const YoungAccount = ({ className, ...props }: ComponentProps<"div">) => {
	return (
		<div className={twMerge(className, `h-80`)} {...props}>
			{"Your account is too Young"}
		</div>
	);
};

export default WrappedList;
