"use client";

import { useCallback, useState } from "react";

import { WrappedList } from "~components/WrappedList";
import { Container } from "~components/Container";
import { Section } from "~components/Section";
import { ControlsBar, FormData } from "./ControlsBar";
import { UserStats } from "./page";
import { PosterGenerator } from "./PosterGenerator";
import { getPalette } from "~utils/getPalette";

export const StatsSection = ({
	user,
	periodData,
	messages,
}: {
	user: {
		displayName: string;
		images: SpotifyApi.ImageObject[];
	};
	periodData: { [K in FormData["period"]]: UserStats };
	messages: any;
}) => {
	const [period, setPeriod] = useState<FormData["period"]>("medium_term");
	const [filter, setFilter] = useState<FormData["filter"]>("all");
	const [generatingPoster, setGeneratingPoster] = useState(true);

	const [longTermPosterData, setLongTermPosterData] = useState<string | null>(
		null
	);
	const [mediumTermPosterData, setMediumTermPosterData] = useState<
		string | null
	>(null);
	const [shortTermPosterData, setShortTermPosterData] = useState<
		string | null
	>(null);

	const periodMap = {
		long_term: longTermPosterData,
		medium_term: mediumTermPosterData,
		short_term: shortTermPosterData,
	};

	const periodStrings: { [K in FormData["period"]]: string } = {
		long_term: "long",
		medium_term: "medium",
		short_term: "short",
	};

	const pngDataChangeHandler = useCallback(
		(pngData: string) => {
			const periodSetterMap = {
				long_term: setLongTermPosterData,
				medium_term: setMediumTermPosterData,
				short_term: setShortTermPosterData,
			};

			periodSetterMap[period](pngData);

			setGeneratingPoster(false);
		},
		[period]
	);

	const periodChangeHandler = useCallback((newPeriod: FormData["period"]) => {
		setGeneratingPoster(true);

		setPeriod((current) => (newPeriod !== current ? newPeriod : current));
	}, []);

	const filterChangeHandler = useCallback((newFilter: FormData["filter"]) => {
		setFilter((current) => (newFilter !== current ? newFilter : current));
	}, []);

	return (
		<>
			<PosterGenerator
				user={user}
				userStats={periodData[period]}
				period={period}
				onPngDataChange={pngDataChangeHandler}
			/>
			<ControlsBar
				downloadableData={periodMap[period]}
				generatingPoster={generatingPoster}
				username={user.displayName}
				periodChangeHandler={periodChangeHandler}
				filterChangeHandler={filterChangeHandler}
				messages={{
					filters: messages.filters,
					period: messages.period,
					download: messages.download,
				}}
			/>
			<Section className="relative bg-green">
				<div
					aria-hidden
					className="pointer-events-none absolute top-0 bottom-0 right-0 left-1/2 bg-[url('/images/notes-tile.png')] bg-repeat opacity-10"
				>
					<div className="absolute inset-0 bg-gradient-to-r from-green"></div>
				</div>
				<Container>
					{(filter === "artists" || filter === "all") && (
						<div
							className={`${
								filter === "all" ? "mb-8 md:mb-16 xl:mb-32" : ""
							}`}
						>
							<h2 className="mb-4 text-h2-mobile md:mb-8 xl:text-h2">
								{messages.artists.title.top}{" "}
								<span className="text-spotify-purple">
									{messages.artists.title.artists}
								</span>
							</h2>
							<p className="text-body xl:max-w-[448px]">
								{messages.artists.subtitle[periodStrings[period]]}
							</p>
							{periodData[period].stats.topArtists ? (
								<div className="mt-12 md:mt-16 lg:flex lg:gap-16">
									<WrappedList
										items={periodData[period].stats.topArtists}
										of="artists"
										className="max-w-[587px] flex-1 max-md:mb-10"
										palette={getPalette("green")}
										altText={messages.list.alt}
										openText={messages.list.open}
										listenText={messages.list.listen}
									/>
									<div className="max-w-[587px] flex-1">
										<h3 className="mb-4 text-sub-heading-mobile md:text-sub-heading">
											{messages.artists.description.title}
										</h3>
										<p className="mb-4 text-body opacity-80">
											{messages.artists.description.p1}
										</p>
										<p className="text-body opacity-80">
											{messages.artists.description.p2}
										</p>
									</div>
								</div>
							) : (
								<span>{messages.artists.description.loading}</span>
							)}
						</div>
					)}
					{(filter === "tracks" || filter === "all") && (
						<div>
							<h2 className="mb-4 text-h2-mobile md:mb-8 xl:text-h2">
								{messages.tracks.title.top}{" "}
								<span className="text-yellow">
									{messages.tracks.title.tracks}
								</span>
							</h2>
							<p className="text-body xl:max-w-[448px]">
								{messages.tracks.subtitle[periodStrings[period]]}
							</p>
							{periodData[period].stats.topTracks ? (
								<div className="mt-12 md:mt-16 lg:flex lg:gap-16">
									<WrappedList
										items={periodData[period].stats.topTracks}
										of="tracks"
										className="max-w-[587px] flex-1 max-md:mb-10"
										palette={getPalette("green")}
										altText={messages.list.alt}
										openText={messages.list.open}
										listenText={messages.list.listen}
									/>
									<div className="max-w-[587px] flex-1">
										<h3 className="mb-4 text-sub-heading-mobile md:text-sub-heading">
											{messages.tracks.description.title}
										</h3>
										<p className="mb-4 text-body opacity-80">
											{messages.tracks.description.p1}
										</p>
										<p className="text-body opacity-80">
											{messages.tracks.description.p2}
										</p>
									</div>
								</div>
							) : (
								<span>{messages.tracks.description.loading}</span>
							)}
						</div>
					)}
				</Container>
				<Container className="py-4 md:py-8">
					<div
						id="data-notice"
						className="text-label-md leading-none text-black/60"
					>
						<span className="inline-block bg-yellow px-1 py-0.5 font-medium text-black/80">
							{messages.notice.label}
						</span>
						: {messages.notice.text}
					</div>
				</Container>
			</Section>
		</>
	);
};
