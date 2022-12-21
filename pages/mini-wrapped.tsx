import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toPng } from "html-to-image";

import {
	BigAssStar,
	Button,
	Container,
	HeadMeta,
	Layout,
	Section,
	WrappedList,
} from "../components";

import { Artist, Track } from "../lib/types";
import { BASE_URL } from "../lib/constants";
import { useWindowSize } from "../lib/windowSizeContext";

const meta = {
	title: "Milovan Gudelj - Mini-Wrapped",
	description: "Get your cool Spotify Mini-Wrapped poster now",
	url: "https://milovangudelj.com/mini-wrapped",
	image: "https://milovangudelj.com/images/og-image.png",
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
	const data = await (
		await fetch(`${BASE_URL}/api/getUserStats?period=medium_term`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Cookie: req.headers.cookie as string,
			},
		})
	).json();

	if (data.error)
		return {
			redirect: {
				destination: "/login",
				permanent: false,
			},
		};

	return {
		props: {
			...data,
		},
	};
};

type FormData = {
	filter: "all" | "artists" | "tracks";
	period: "long_term" | "medium_term" | "short_term";
};

const MiniWrapped = ({
	topArtists,
	topTracks,
}: {
	topArtists: Artist[];
	topTracks: Track[];
}) => {
	const { mobile } = useWindowSize();

	const [artists, setArtists] = useState<Artist[]>(topArtists);
	const [tracks, setTracks] = useState<Track[]>(topTracks);

	const {
		register,
		watch,
		formState: { errors },
	} = useForm<FormData>({
		defaultValues: {
			period: "medium_term",
			filter: "all",
		},
	});
	const watchFilter = watch("filter", "all");
	const watchPeriod = watch("period", "medium_term");
	const periodStrings: { [K in FormData["period"]]: string } = {
		long_term: "Since you created your account",
		medium_term: "In the last 6 months",
		short_term: "In the last 3 months",
	};

	useEffect(() => {
		const refetch = async () => {
			const newData = await (
				await fetch(`${BASE_URL}/api/getUserStats?period=${watchPeriod}`)
			).json();

			setArtists(newData.topArtists);
			setTracks(newData.topTracks);
		};
		refetch();
	}, [watchPeriod]);

	return (
		<Layout>
			<HeadMeta metadata={meta} />
			<Section className="bg-purple">
				<Container className="space-y-8">
					<h1 className="relative z-[1] text-h1-mobile md:text-d2-mobile xl:text-d2">
						<span className="text-yellow">Mini</span>-Wrapped
					</h1>
					<p className="relative z-[1] text-sub-heading-mobile md:text-sub-heading xl:max-w-[30ch]">
						An up to date miniature version of your{" "}
						<span>{new Date().getFullYear()}</span> Spotify Wrapped.
					</p>
					<BigAssStar className="absolute -top-16 -right-16 z-0 h-64 w-64 text-lilla lg:-top-8 lg:right-16 lg:h-[360px] lg:w-[360px]" />
				</Container>
			</Section>
			<Section className="bg-black text-white">
				<Container className="flex flex-wrap items-center justify-between gap-[30px] space-y-0 py-[30px] md:py-[30px]">
					<form className="flex flex-wrap items-center gap-x-8 gap-y-4">
						<div className="flex items-center">
							<span className="mr-4 block text-label-md text-white/80 md:inline-block">
								Filter:
							</span>
							<div className="mr-2">
								<input
									type={"radio"}
									id="filter-all"
									{...register("filter")}
									className="peer hidden"
									value={"all"}
									checked={watchFilter === "all"}
								/>
								<label
									htmlFor="filter-all"
									className="cursor-pointer select-none border-2 bg-transparent py-1 px-2.5 text-button-md text-green transition peer-checked:border-0 peer-checked:bg-green peer-checked:py-1.5 peer-checked:px-3 peer-checked:text-black"
								>
									All
								</label>
							</div>
							<div className="mr-2">
								<input
									type={"radio"}
									id="filter-artists"
									{...register("filter")}
									className="peer hidden"
									value={"artists"}
									checked={watchFilter === "artists"}
								/>
								<label
									htmlFor="filter-artists"
									className="cursor-pointer select-none border-2 bg-transparent py-1 px-2.5 text-button-md text-green transition peer-checked:border-0 peer-checked:bg-green peer-checked:py-1.5 peer-checked:px-3 peer-checked:text-black"
								>
									Artists
								</label>
							</div>
							<div>
								<input
									type={"radio"}
									id="filter-tracks"
									{...register("filter")}
									className="peer hidden"
									value={"tracks"}
									checked={watchFilter === "tracks"}
								/>
								<label
									htmlFor="filter-tracks"
									className="cursor-pointer select-none border-2 bg-transparent py-1 px-2.5 text-button-md text-green transition peer-checked:border-0 peer-checked:bg-green peer-checked:py-1.5 peer-checked:px-3 peer-checked:text-black"
								>
									Tracks
								</label>
							</div>
						</div>
						<div className="flex items-center space-x-4">
							<label
								htmlFor="period"
								className="block text-label-md text-white/80 md:inline-block"
							>
								Period:
							</label>
							<select
								{...register("period")}
								className="form-select border-transparent bg-green bg-chevron-down px-3 py-1.5 pr-[34px] text-button-md text-black [background-size:_18px_18px] focus:border-transparent focus:ring-0"
							>
								<option value="medium_term">Last 6 mo</option>
								<option value="short_term">Last 3 mo</option>
								<option value="long_term">All time</option>
							</select>
						</div>
					</form>
					<Button fullWidth={mobile}>Download poster</Button>
				</Container>
			</Section>
			<Section className="bg-green">
				<Container>
					{(watchFilter === "artists" || watchFilter === "all") && (
						<div
							className={`${
								watchFilter === "all" ? "mb-8 md:mb-16 xl:mb-32" : ""
							}`}
						>
							<h2 className="mb-4 text-h2-mobile md:mb-8 xl:text-h2">
								Top <span className="text-spotify-purple">artists</span>
							</h2>
							<p className="text-body xl:max-w-[448px]">
								{periodStrings[watchPeriod]} these have been your most
								beloved artists.
							</p>
							{artists ? (
								<WrappedList
									items={artists}
									className="mt-8 max-w-[448px] md:mt-16"
								/>
							) : (
								<span>Loading...</span>
							)}
						</div>
					)}
					{(watchFilter === "tracks" || watchFilter === "all") && (
						<div>
							<h2 className="mb-4 text-h2-mobile md:mb-8 xl:text-h2">
								Top <span className="text-yellow">tracks</span>
							</h2>
							<p className="text-body xl:max-w-[448px]">
								{periodStrings[watchPeriod]} you couldn&apos;t stop
								listening to these five tracks.
							</p>
							{tracks ? (
								<WrappedList
									items={tracks}
									className="mt-8 max-w-[448px] md:mt-16"
								/>
							) : (
								<span>Loading...</span>
							)}
						</div>
					)}
				</Container>
			</Section>
		</Layout>
	);
};

export default MiniWrapped;
