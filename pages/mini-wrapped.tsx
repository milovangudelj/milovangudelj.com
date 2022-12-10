import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { unstable_getServerSession } from "next-auth";
import shuffle from "lodash/shuffle";
import { toPng } from "html-to-image";

import { Button, Container, HeadMeta, Layout, Section } from "../components";
import { spotifyApi } from "../lib/spotify";
import { spotifyColors } from "../utils/spotifyColors";
import { authOptions, ExtendedSession } from "./api/auth/[...nextauth]";
import { Artist, Track } from "../lib/types";
import { hexToRgb } from "../utils/hexToRgb";

const meta = {
	title: "Milovan Gudelj - Mini-Wrapped",
	description: "Get your cool Spotify Mini-Wrapped poster now",
	url: "https://milovangudelj.com/mini-wrapped",
	image: "https://milovangudelj.com/images/og-image.png",
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
	const session = (await unstable_getServerSession(
		req,
		res,
		authOptions
	)) as ExtendedSession;

	if (!session || !session.user?.accessToken || !session.user.refreshToken) {
		return {
			redirect: {
				destination: "/login",
				permanent: false,
			},
		};
	}

	spotifyApi.setAccessToken(session.user.accessToken);
	spotifyApi.setRefreshToken(session.user.refreshToken);

	const {
		body: { items: artists },
	} = await spotifyApi.getMyTopArtists({
		limit: 5,
		time_range: "medium_term",
	});
	let colors = shuffle(spotifyColors);
	const topArtists = await Promise.all(
		artists.map(async (artist, idx) => {
			return {
				name: artist.name,
				artistUrl: artist.external_urls.spotify,
				image: {
					...artist.images[0],
					color: colors[idx],
				},
			};
		})
	);

	const {
		body: { items: tracks },
	} = await spotifyApi.getMyTopTracks({
		limit: 5,
		time_range: "medium_term",
	});
	colors = shuffle(spotifyColors);
	const topTracks = await Promise.all(
		tracks.map(async (track, idx) => {
			return {
				title: track.name,
				artist: track.artists
					.map((_artist: any) => _artist.name)
					.join(", "),
				trackUrl: track.external_urls.spotify,
				image: {
					...track.album.images[0],
					color: colors[idx],
				},
			};
		})
	);

	return {
		props: {
			topArtists,
			topTracks,
		},
	};
};

const MiniWrapped = ({
	topArtists,
	topTracks,
}: {
	topArtists: Artist[];
	topTracks: Track[];
}) => {
	return (
		<Layout>
			<HeadMeta metadata={meta} />
			<Section className="bg-green">
				<Container>
					<h1 className="mb-16 text-h1-mobile md:text-d1-mobile xl:text-d1">
						<span className="text-yellow">Mini</span>-Wrapped
					</h1>
					<p className="text-sub-heading-mobile md:text-sub-heading xl:max-w-[30ch]">
						An up to date miniature version of your{" "}
						<span>{new Date().getFullYear()}</span> Spotify Wrapped.
					</p>
				</Container>
			</Section>
			<Section className="bg-purple">
				<Container>
					<div className="mb-32">
						<h2 className="text-h2-mobile md:mb-8 md:text-d2-mobile xl:text-d2">
							Top artists
						</h2>
						<p className="text-body xl:max-w-[680px]">
							In the last 6 months these have been your most beloved
							artists
						</p>
						<ol className="mt-16 max-w-[448px] bg-black drop-shadow-brutal">
							{topArtists.map((artist, index) => {
								let tempColor: number[] = [];

								hexToRgb(artist.image.color).forEach((c, idx) => {
									c = c / 255.0;
									if (c <= 0.04045) {
										c = c / 12.92;
									} else {
										c = ((c + 0.055) / 1.055) ** 2.4;
									}

									tempColor[idx] = c;
								});

								const colorLuminance =
									0.2126 * tempColor[0] +
									0.7152 * tempColor[1] +
									0.0722 * tempColor[2];

								const lightText = colorLuminance <= 0.179;

								return (
									<li
										key={artist.artistUrl}
										className="flex"
										style={
											index == 0
												? { backgroundColor: artist.image.color }
												: undefined
										}
									>
										<div
											className={`relative h-16 w-16 flex-none ${
												index == 0 ? "p-0" : "p-1"
											}`}
											style={
												index != 0
													? { backgroundColor: artist.image.color }
													: undefined
											}
											title={`${artist.name}'s profile picture`}
										>
											<Image
												className="pointer-events-none aspect-square h-full w-full object-cover"
												sizes={`${artist.image.width}px`}
												quality={100}
												src={artist.image.url}
												alt={`${artist.name}'s profile picture`}
												width={artist.image.width}
												height={artist.image.height}
											/>
										</div>
										<div
											className={`${
												index == 0
													? lightText
														? "text-white"
														: "text-black"
													: "border-b-2 border-r-2 border-white/10 text-white"
											} w-full`}
										>
											<Link
												href={artist.artistUrl}
												rel="noreferrer noopener"
												target="_blank"
												className={`${
													index == 0
														? lightText
															? "text-sub-heading"
															: "text-sub-heading"
														: "text-sub-heading-mobile"
												} group flex h-full max-w-full items-center justify-between truncate px-4`}
											>
												<div>
													<span title={artist.name}>
														{artist.name}
													</span>
													<span className="pointer-events-none ml-4 opacity-0 transition-opacity group-hover:pointer-events-auto group-hover:opacity-100">
														↗
													</span>
												</div>
												<span
													className={`${
														index == 0
															? "text-[46.04px]"
															: "text-[22.4px]"
													} text-sub-heading leading-none opacity-40`}
												>
													{index + 1}
												</span>
											</Link>
										</div>
									</li>
								);
							})}
						</ol>
					</div>
					<div>
						<h2 className="text-h2-mobile md:mb-8 md:text-d2-mobile xl:text-d2">
							Top tracks
						</h2>
						<p className="text-body xl:max-w-[680px]">
							In the same period you couldn't stop listening to these
							five tracks
						</p>
						<ol className="mt-16 max-w-[448px] bg-black drop-shadow-brutal">
							{topTracks.map((track, index) => {
								let tempColor: number[] = [];

								hexToRgb(track.image.color).forEach((c, idx) => {
									c = c / 255.0;
									if (c <= 0.04045) {
										c = c / 12.92;
									} else {
										c = ((c + 0.055) / 1.055) ** 2.4;
									}

									tempColor[idx] = c;
								});

								const colorLuminance =
									0.2126 * tempColor[0] +
									0.7152 * tempColor[1] +
									0.0722 * tempColor[2];

								const lightText = colorLuminance <= 0.179;

								return (
									<li
										key={track.trackUrl}
										className="flex"
										style={
											index == 0
												? { backgroundColor: track.image.color }
												: undefined
										}
									>
										<div
											className={`relative h-16 w-16 flex-none ${
												index == 0 ? "p-0" : "p-1"
											}`}
											style={
												index != 0
													? { backgroundColor: track.image.color }
													: undefined
											}
											title={`${track.title}'s profile picture`}
										>
											<Image
												className="pointer-events-none aspect-square h-full w-full object-cover"
												sizes={`${track.image.width}px`}
												quality={100}
												src={track.image.url}
												alt={`${track.title}'s album's cover art`}
												width={track.image.width}
												height={track.image.height}
											/>
										</div>
										<div
											className={`${
												index == 0
													? lightText
														? "text-white"
														: "text-black"
													: "border-b-2 border-r-2 border-white/10 text-white"
											} w-full`}
										>
											<Link
												href={track.trackUrl}
												rel="noreferrer noopener"
												target="_blank"
												className={`${
													index == 0
														? lightText
															? "text-sub-heading"
															: "text-sub-heading"
														: "text-sub-heading-mobile"
												} group flex h-full max-w-full items-center justify-between truncate px-4`}
											>
												<div>
													<span title={track.title}>
														{track.title}
													</span>
													<span className="pointer-events-none ml-4 opacity-0 transition-opacity group-hover:pointer-events-auto group-hover:opacity-100">
														↗
													</span>
												</div>
												<span
													className={`${
														index == 0
															? "text-[46.04px]"
															: "text-[22.4px]"
													} text-sub-heading leading-none opacity-40`}
												>
													{index + 1}
												</span>
											</Link>
										</div>
									</li>
								);
							})}
						</ol>
					</div>
				</Container>
			</Section>
		</Layout>
	);
};

export default MiniWrapped;
