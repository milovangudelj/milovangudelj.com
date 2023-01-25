import { GetServerSideProps } from "next";
import {
	forwardRef,
	RefCallback,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";
import { useForm } from "react-hook-form";

import {
	BigAssStar,
	Button,
	Container,
	HeadMeta,
	Layout,
	PosterProps,
	Section,
	WrappedList,
} from "../components";
const DynamicPoster = dynamic(
	() => import("../components").then((mod) => mod.Poster),
	{
		ssr: false,
	}
);
const Poster = forwardRef<HTMLDivElement, PosterProps>((props, ref) => (
	<DynamicPoster {...props} forwardedRef={ref} />
));
Poster.displayName = "Poster";

import { Artist, Track } from "../lib/types";
import { BASE_URL } from "../lib/constants";
import { useWindowSize } from "../lib/windowSizeContext";
import html2canvas from "html2canvas";
import { getPalette, Palette } from "../utils/getPalette";
import dynamic from "next/dynamic";

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

	const userData = await(
		await fetch(`${BASE_URL}/api/getUser`, {
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
			user: {
				displayName: userData.displayName,
				images: userData.images,
			},
			palette: getPalette("green"),
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
	user,
	palette,
}: {
	topArtists: Artist[];
	topTracks: Track[];
	user: {
		displayName: string;
		images: SpotifyApi.ImageObject[];
	};
	palette: Palette;
}) => {
	const [generatingPoster, setGeneratingPoster] = useState(true);
	const [posterLoaded, setPosterLoaded] = useState(false);
	const posterRef = useRef<HTMLDivElement | null>(null);
	const setRef: RefCallback<HTMLDivElement> = useCallback((node) => {
		if (node !== null) {
			setPosterLoaded(true);
			posterRef.current = node;
		}
	}, []);
	const downloadRef = useRef<HTMLAnchorElement>(null);

	const { mobile } = useWindowSize();

	const [artists, setArtists] = useState<Artist[]>(topArtists);
	const [tracks, setTracks] = useState<Track[]>(topTracks);
	const [posterPalette, setPosterPalette] = useState<Palette>(getPalette());

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

	useEffect(() => {
		setGeneratingPoster(true);

		setPosterPalette((current) => {
			const newPalette = getPalette();
			return newPalette;
		});
	}, [artists, tracks]);

	useEffect(() => {
		if (!posterRef.current) return;

		const generatePoster = async () => {
			const canvas = await html2canvas(posterRef.current as HTMLDivElement, {
				useCORS: true,
			});

			const dataUrl = canvas
				.toDataURL("image/png")
				.replace(/^data:image\/[^;]/, "data:application/octet-stream");

			downloadRef.current?.setAttribute("href", dataUrl);

			setGeneratingPoster(false);
		};

		generatePoster();
	}, [posterPalette, posterLoaded]);

	return (
		<Layout>
			<HeadMeta metadata={meta} />
			<div
				className="absolute top-0 left-0 -z-10 h-0 w-0 overflow-hidden [tab-index:-1]"
				aria-hidden
			>
				<Poster
					primary="bg-light-cyan"
					accent="text-yellow"
					artists={artists}
					picture={user.images[0].url}
					tracks={tracks}
					username={user.displayName}
					year={new Date().getFullYear()}
					period={watchPeriod}
					palette={posterPalette}
					ref={setRef}
				/>
			</div>
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
					<Button
						as="a"
						ref={downloadRef}
						download={`Mini-Wrapped-@${user.displayName}.png`}
						fullWidth={mobile}
						className={`${
							generatingPoster ? "pointer-events-none opacity-80" : ""
						} transition-all`}
						href="#"
					>
						{generatingPoster ? "Generating..." : "Download poster"}
					</Button>
				</Container>
			</Section>
			<Section className="relative bg-green">
				<div
					aria-hidden
					className="pointer-events-none absolute top-0 bottom-0 right-0 left-1/2 bg-[url('/images/notes-tile.png')] bg-repeat opacity-10"
				>
					<div className="absolute inset-0 bg-gradient-to-r from-green"></div>
				</div>
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
								<div className="mt-12 md:mt-16 lg:flex lg:gap-16">
									<WrappedList
										items={artists}
										className="max-w-[587px] flex-1 max-md:mb-10"
										palette={palette}
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
								<div className="mt-12 md:mt-16 lg:flex lg:gap-16">
									<WrappedList
										items={tracks}
										className="max-w-[587px] flex-1 max-md:mb-10"
										palette={palette}
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
			</Section>
		</Layout>
	);
};
MiniWrapped.displayName = "MiniWrapped";

export default MiniWrapped;
