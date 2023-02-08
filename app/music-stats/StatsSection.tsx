"use client";

import { useCallback, useState } from "react";

import { WrappedList } from "../../components/WrappedList";
import { Container } from "../../components/Container";
import { Section } from "../../components/Section";
import { ControlsBar, FormData } from "./ControlsBar";
import { UserStats } from "./page";
import { PosterGenerator } from "./PosterGenerator";

export const StatsSection = ({
	user,
	periodData,
}: {
	user: {
		displayName: string;
		images: SpotifyApi.ImageObject[];
	};
	periodData: { [K in FormData["period"]]: UserStats };
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
		long_term: "Since you created your account",
		medium_term: "In the last 6 months",
		short_term: "In the last 3 months",
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
								Top <span className="text-spotify-purple">artists</span>
							</h2>
							<p className="text-body xl:max-w-[448px]">
								{periodStrings[period]} these have been your most
								beloved artists.
							</p>
							{periodData[period].stats.topArtists ? (
								<div className="mt-12 md:mt-16 lg:flex lg:gap-16">
									<WrappedList
										items={periodData[period].stats.topArtists}
										of="artists"
										className="max-w-[587px] flex-1 max-md:mb-10"
										palette={periodData[period].palette}
									/>
									<div className="max-w-[587px] flex-1">
										<h3 className="mb-4 text-sub-heading-mobile md:text-sub-heading">
											How do you get the data?
										</h3>
										<p className="mb-4 text-body opacity-80">
											Spotify provides a developer API (application
											programming interface) trough which you can
											request access to your data as long as you have
											the right access keys.
										</p>
										<p className="text-body opacity-80">
											Those special keys are being sent over when you
											log in and are then used to request your data
											when the page loads.
										</p>
									</div>
								</div>
							) : (
								<span>Loading...</span>
							)}
						</div>
					)}
					{(filter === "tracks" || filter === "all") && (
						<div>
							<h2 className="mb-4 text-h2-mobile md:mb-8 xl:text-h2">
								Top <span className="text-yellow">tracks</span>
							</h2>
							<p className="text-body xl:max-w-[448px]">
								{periodStrings[period]} you couldn&apos;t stop listening
								to these five tracks.
							</p>
							{periodData[period].stats.topTracks ? (
								<div className="mt-12 md:mt-16 lg:flex lg:gap-16">
									<WrappedList
										items={periodData[period].stats.topTracks}
										of="tracks"
										className="max-w-[587px] flex-1 max-md:mb-10"
										palette={periodData[period].palette}
									/>
									<div className="max-w-[587px] flex-1">
										<h3 className="mb-4 text-sub-heading-mobile md:text-sub-heading">
											Why is it different from my Wrapped?
										</h3>
										<p className="mb-4 text-body opacity-80">
											Spotify Wrapped gathers the data that it then
											shows you throughout the entire year while I am
											able to query only data relative to the last
											3/6 months or since the creation of your
											account.
										</p>
										<p className="text-body opacity-80">
											That&apos;s why you can select only those three
											options in the filter bar above. Spotify&apos;s
											API is much more limited but the data it
											provides is always up to date and you
											don&apos;t have to wait a full year to get it.
										</p>
									</div>
								</div>
							) : (
								<span>Loading...</span>
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
							Notice
						</span>
						: I am not endorsed or sponsored by Spotify or any of their
						associates.
					</div>
				</Container>
			</Section>
		</>
	);
};
