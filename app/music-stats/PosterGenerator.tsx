"use client";

import html2canvas from "html2canvas";
import { useCallback, useEffect, useRef, useState } from "react";
import { Poster } from "../../components/Poster";
import { FormData } from "./ControlsBar";
import { UserStats } from "./page";

export const PosterGenerator = ({
	user,
	userStats,
	period,
	onPngDataChange,
}: {
	user: {
		displayName: string;
		images: SpotifyApi.ImageObject[];
	};
	userStats: UserStats;
	period: FormData["period"];
	onPngDataChange: (posterData: string) => void;
}) => {
	const posterRef = useRef<HTMLDivElement>(null);

	const year = new Date().getFullYear();

	const [posterData, setPosterData] = useState<string | null>(null);

	const generatePoster = useCallback(async () => {
		if (!posterRef.current) return;

		const posterCanvas = await html2canvas(
			posterRef.current as HTMLDivElement,
			{
				useCORS: true,
			}
		);

		const posterDataUrl = posterCanvas.toDataURL("image/png");

		setPosterData(posterDataUrl);
	}, []);

	useEffect(() => {
		generatePoster();
	}, [userStats, user, period, generatePoster]);

	useEffect(() => {
		if (!posterData) return;

		onPngDataChange(posterData);
	}, [posterData, onPngDataChange]);

	return (
		<div
			className="absolute top-0 left-0 -z-10 h-0 w-0 overflow-hidden [tab-index:-1]"
			aria-hidden
		>
			<Poster
				username={user.displayName}
				picture={user.images[0]?.url || undefined}
				artists={userStats.stats.topArtists.map((artist) => {
					return {
						name: artist.name,
						image: artist.image.url,
						url: artist.url,
					};
				})}
				tracks={userStats.stats.topTracks.map((track) => {
					return {
						name: track.title,
						image: track.image.url,
						url: track.url,
					};
				})}
				year={year}
				period={period}
				palette={userStats.palette}
				ref={posterRef}
			/>
		</div>
	);
};
