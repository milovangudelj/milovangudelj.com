import {
	ComponentProps,
	ComponentPropsWithoutRef,
	ComponentPropsWithRef,
	forwardRef,
} from "react";
import { StatsList } from "..";
import { Artist, Track } from "../../lib/types";
import { Palette } from "../../utils/getPalette";

export interface PosterProps extends ComponentPropsWithoutRef<"div"> {
	username: string;
	picture: string;
	artists: { name: string; image: string; url: string }[];
	tracks: { name: string; image: string; url: string }[];
	year: number;
	period: "long_term" | "medium_term" | "short_term";
	palette: Palette;
}

const periodStrings: { [K in PosterProps["period"]]: string } = {
	long_term: "all time",
	medium_term: "last 6 months",
	short_term: "last 3 months",
};

export const Poster = forwardRef<HTMLDivElement, PosterProps>(
	(
		{ username, picture, artists, tracks, year, period, palette, ...props },
		ref
	) => {
		return (
			<div
				ref={ref}
				className={`relative top-0 left-0 flex h-[1920px] w-[1080px] origin-top-left flex-col justify-between p-20 pb-10 leading-none`}
				style={{
					color: palette.black,
					backgroundColor: palette.bg,
				}}
				{...props}
			>
				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img
					src={
						palette.white === "#FFFFFF"
							? "/images/notes-bg.png"
							: "/images/notes-bg-light.png"
					}
					loading="eager"
					alt="Notes background"
					width={1080}
					height={1920}
					aria-hidden
					className={`pointer-events-none absolute inset-0 ${
						palette.white === "#FFFFFF" ? "opacity-10" : "opacity-5"
					}`}
				/>
				<span className="absolute -top-[164.77px] right-0 origin-bottom-left translate-x-[calc(100%-148.77px)] rotate-90 font-space text-[164.77px] font-bold leading-none opacity-20">
					{year}
				</span>
				<div>
					<h1 className="text-d1-mobile">
						<span style={{ color: palette.fg }}>Music</span>
						-Stats
					</h1>
					<div className="flex items-center">
						{/* eslint-disable-next-line @next/next/no-img-element */}
						<img
							src={picture}
							alt={`${username}'s profile picture`}
							className="mr-4 h-14 w-14 rounded-full object-cover object-center"
							loading="eager"
						/>
						<span className="text-sub-heading opacity-80">
							@{username}
						</span>
					</div>
					<div className="relative mt-20">
						<h2 className="mb-10 text-h2-mobile">
							Top artists{" "}
							<span className="text-h4-mobile opacity-40">
								- {periodStrings[period]}
							</span>
						</h2>
						<div className="flex flex-col items-end">
							<div className="relative mb-6 w-full flex-1">
								<div
									className="absolute top-[6.27px] left-[6.27px] h-full w-full"
									style={{
										backgroundColor: palette.black,
									}}
								></div>
								<StatsList
									items={artists}
									of="artists"
									palette={palette}
									className="relative"
								/>
							</div>
							<ListenOn isLight={palette.white === "#FFFFFF"} />
						</div>
					</div>
					<div className="relative mt-20">
						<h2 className="mb-10 text-h2-mobile">
							Top tracks{" "}
							<span className="text-h4-mobile opacity-40">
								- {periodStrings[period]}
							</span>
						</h2>
						<div className="flex flex-col items-end">
							<div className="relative mb-6 w-full flex-1">
								<div
									className="absolute top-[6.27px] left-[6.27px] h-full w-full"
									style={{
										backgroundColor: palette.black,
									}}
								></div>
								<StatsList
									items={tracks}
									of="tracks"
									palette={palette}
									className="relative"
								/>
							</div>
							<ListenOn isLight={palette.white === "#FFFFFF"} />
						</div>
					</div>
				</div>
				<div className="flex items-end justify-between text-h4-mobile">
					<p>
						<span className="opacity-40">Get your own at</span> <br />
						milovangudelj.com
						<span style={{ color: palette.fg }}>/music-stats</span>
					</p>
				</div>
			</div>
		);
	}
);

Poster.displayName = "Poster";

const ListenOn = ({ isLight }: { isLight: boolean }) => {
	return (
		<div className="flex flex-1 items-center">
			<span className="mr-5 text-h4-mobile opacity-40">Listen on</span>
			{/* eslint-disable-next-line @next/next/no-img-element */}
			<img
				src={
					isLight
						? "/images/Spotify_Logo_Black.png"
						: "/images/Spotify_Logo_White.png"
				}
				className="inline-block aspect-[1181/354] h-10 w-auto opacity-100"
				alt="Spotify Logo"
				width={(40 * 1181) / 354}
				height={40}
				loading="eager"
			/>
		</div>
	);
};