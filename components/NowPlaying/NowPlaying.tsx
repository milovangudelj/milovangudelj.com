"use client";

import { useState } from "react";
import Image from "next/image";
import useSWR from "swr";
import { SpotifyLogo } from "phosphor-react";

import fetcher from "../../lib/fetcher";
import { NowPlayingSong } from "../../lib/types";
import { useIsomorphicLayoutEffect } from "../../utils/useIsomorphicLayoutEffect";

export const NowPlaying = () => {
	const { data } = useSWR<NowPlayingSong>("/api/now-playing", fetcher);
	const [titleWidth, setTitleWidth] = useState(0);
	const [artistWidth, setArtistWidth] = useState(0);

	useIsomorphicLayoutEffect(() => {
		if (!data) return;

		setTitleWidth(data.title?.length ?? 0);
		setArtistWidth(data.artist?.length ?? 0);
	}, [data?.title, data?.artist]);

	return (
		<div>
			<h3 className="mb-4 text-sub-heading-mobile">
				Currently listening to:
			</h3>
			<div className="inline-flex max-w-[min(100%,_448px)] bg-black drop-shadow-brutal">
				{data?.songUrl ? (
					<div className="relative h-14 w-14 flex-none" title={data.album}>
						<Image
							src={data.albumImageUrl}
							alt={data.album}
							width={56}
							height={56}
							className="pointer-events-none inset-0 h-14 w-14 object-cover"
						/>
						<div
							aria-hidden
							className="absolute inset-0 flex items-center justify-center space-x-1.5 bg-black/50"
						>
							<span
								style={{ animationDelay: ".6s" }}
								className="h-6 w-1 animate-stretch bg-white will-change-transform"
							/>
							<span
								style={{ animationDelay: "1.2s" }}
								className="h-6 w-1 animate-stretch bg-white will-change-transform"
							/>
							<span className="h-6 w-1 animate-stretch bg-white will-change-transform" />
						</div>
					</div>
				) : (
					<div className="relative flex h-14 w-14 flex-none items-center justify-center text-white">
						<SpotifyLogo size={40} />
					</div>
				)}
				<div className="flex h-14 items-center overflow-hidden bg-green py-2 px-4 text-sub-heading-mobile text-black md:text-sub-heading">
					{data?.songUrl ? (
						<a
							className={`${
								titleWidth < artistWidth
									? "w-fit max-w-[50%] flex-none"
									: "flex-shrink"
							} truncate`}
							href={data.songUrl}
							target="_blank"
							rel="noopener noreferrer"
							title={data.title}
						>
							{data.title}
						</a>
					) : (
						<p>Not playing</p>
					)}
					<span className="mx-4 text-black/60">{" - "}</span>
					{data?.artist ? (
						<a
							className={`${
								artistWidth < titleWidth
									? "w-fit max-w-[50%] flex-none"
									: "flex-shrink"
							} truncate text-black/60`}
							href={`https://open.spotify.com/artist/${data.artistId}`}
							target="_blank"
							rel="noopener noreferrer"
							title={data.artist}
						>
							{data.artist}
						</a>
					) : (
						<p className="text-black/60">Spotify</p>
					)}
				</div>
			</div>
		</div>
	);
};

export default NowPlaying;
