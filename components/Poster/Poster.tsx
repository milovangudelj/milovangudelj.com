import Image from "next/image";
import { forwardRef } from "react";
import { Artists, Tracks, WrappedList } from "..";
import { Artist, Track } from "../../lib/types";

interface PosterProps {
	accent: string;
	artists: Artist[];
	picture: string;
	primary: string;
	tracks: Track[];
	username: string;
	year: number;
	period: "long_term" | "medium_term" | "short_term";
}

const periodStrings: { [K in PosterProps["period"]]: string } = {
	long_term: "all time",
	medium_term: "last 6 months",
	short_term: "last 3 months",
};

export const Poster = forwardRef<HTMLDivElement, PosterProps>(
	(
		{ accent, artists, picture, primary, tracks, username, year, period },
		ref
	) => {
		return (
			<div
				ref={ref}
				className={`relative top-0 left-0 flex h-[1920px] w-[1080px] origin-top-left flex-col justify-between p-20 pb-10 leading-none text-black ${primary}`}
			>
				<span className="absolute -top-[164.77px] right-0 origin-bottom-left translate-x-[calc(100%-148.77px)] rotate-90 font-space text-[164.77px] font-bold leading-none opacity-20">
					{year}
				</span>
				<div>
					<h1 className="text-d1-mobile">
						<span className={accent}>Mini</span>-Wrapped
					</h1>
					<div className="flex items-center">
						<Image
							src={picture}
							alt={`${username}'s profile picture`}
							className="mr-4 h-14 w-14 rounded-full"
							width={56}
							height={56}
							loading="eager"
						/>
						<span className="text-sub-heading">@{username}</span>
					</div>
					<div className="relative mt-20">
						<h2 className="mb-10 text-h2-mobile">
							Top artists{" "}
							<span className="text-h4-mobile opacity-40">
								- {periodStrings[period]}
							</span>
						</h2>
						<div className="relative">
							<div className="absolute top-[6.27px] left-[6.27px] h-full w-full bg-black"></div>
							<WrappedList items={artists} poster className="relative" />
						</div>
					</div>
					<div className="relative mt-20">
						<h2 className="mb-10 text-h2-mobile">
							Top tracks{" "}
							<span className="text-h4-mobile opacity-40">
								- {periodStrings[period]}
							</span>
						</h2>
						<div className="relative">
							<div className="absolute top-[6.27px] left-[6.27px] h-full w-full bg-black"></div>
							<WrappedList items={tracks} poster className="relative" />
						</div>
					</div>
				</div>
				<div className="flex justify-between text-sub-heading opacity-60">
					<span>Design: @milovangudelj</span>
					<span>Mini-Wrapped {year}</span>
				</div>
			</div>
		);
	}
);
