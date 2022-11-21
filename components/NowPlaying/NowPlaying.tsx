import Image from "next/image";
import useSWR from "swr";
import { SpotifyLogo } from "phosphor-react";

import fetcher from "../../lib/fetcher";
import { NowPlayingSong } from "../../lib/types";

export const NowPlaying = () => {
	const { data } = useSWR<NowPlayingSong>("/api/now-playing", fetcher);

	return (
		<div>
			<p className="mb-4 text-sub-heading-mobile text-black">
				Currently listening to:
			</p>
			<div className="inline-flex max-w-[min(100%,_448px)] bg-black drop-shadow-brutal">
				{data?.songUrl ? (
					<div className="relative h-14 w-14 flex-none" title={data.album}>
						<Image
							src={data.albumImageUrl}
							alt={data.album}
							className="pointer-events-none absolute inset-0 object-cover"
							layout="fill"
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
				<div className="flex h-14 w-full items-center truncate bg-green py-2 px-4 text-sub-heading-mobile md:text-sub-heading">
					{data?.songUrl ? (
						<a
							className="flex-shrink truncate"
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
					<p
						className="flex-shrink truncate text-black/60"
						title={data?.artist}
					>
						{data?.artist ?? "Spotify"}
					</p>
				</div>
			</div>
		</div>
	);
};
