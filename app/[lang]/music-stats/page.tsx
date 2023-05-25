import Image from "next/image";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { Artist, Track } from "~lib/types";
import { getPalette, Palette } from "~utils/getPalette";

import { BigAssStar } from "~components/BigAssStar";
import { Container } from "~components/Container";
import { Section } from "~components/Section";

import { FormData } from "./ControlsBar";
import { StatsSection } from "./StatsSection";

export interface UserStats {
	stats: {
		topArtists: Artist[];
		topTracks: Track[];
	};
	palette: Palette;
}

const getUserStats = async (cookie: string | null) => {
	const data: { [K in FormData["period"]]: UserStats["stats"] } & {
		error?: string;
	} = await (
		await fetch(`${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/getUserStats`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Cookie: cookie as string,
			},
			next: { revalidate: 60 * 60 * 24 },
		})
	).json();

	return data;
};

const getData = async () => {
	const cookie = headers().get("cookie");

	const userStats = await getUserStats(cookie);

	if (userStats.error) redirect("/login");

	const data = {
		longTermStats: {
			stats: userStats.long_term,
			palette: getPalette(),
		},
		mediumTermStats: {
			stats: userStats.medium_term,
			palette: getPalette(),
		},
		shortTermStats: {
			stats: userStats.short_term,
			palette: getPalette(),
		},
	};

	const userData = await (
		await fetch(`${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/getUser`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Cookie: cookie as string,
			},
		})
	).json();

	return {
		...data,
		user: {
			displayName: userData.displayName as string,
			images: (userData?.images || []) as SpotifyApi.ImageObject[],
		},
	};
};

export const metadata = {
	title: "Milovan Gudelj - Music-Stats",
	description: "Get your cool Spotify Music-Stats poster now",
	alternates: {
		canonical: "https://www.milovangudelj.com/music-stats",
		languages: { "it-IT": "https://www.milovangudelj.com/it/music-stats" },
	},
	openGraph: {
		images: {
			url: "https://www.milovangudelj.com/images/og-image-ms.png",
			width: 1280,
			height: 800,
		},
	},
};

const MusicStatsPage = async () => {
	const { longTermStats, mediumTermStats, shortTermStats, user } =
		await getData();

	return (
		<>
			<Section className="relative overflow-hidden bg-purple">
				<Container className="space-y-8">
					<h1 className="relative z-[1] text-d2-mobile md:text-d2">
						<span className="text-yellow">Music</span>-Stats
					</h1>
					<p className="relative z-[1] text-sub-heading-mobile md:text-sub-heading">
						{/* TODO: Replace number with updated value */}
						{messages["Music-Stats"].p1}
					</p>
					<div className="text-body">
						<a href="#data-notice" className="text-dark-me">
							{messages["Music-Stats"].data}{" "}
							<span className="text-yellow">*</span>
						</a>
						<Image
							title="Spotify"
							src="/images/Spotify_Logo_Black.png"
							alt="Spotify's Black Logo"
							width={2362}
							height={708}
							loading="eager"
							className="ml-3 inline-block aspect-[2362/708] w-24"
						/>
					</div>
					<BigAssStar className="absolute -top-16 -right-16 z-0 h-64 w-64 text-lilla lg:-top-8 lg:right-16 lg:h-[360px] lg:w-[360px]" />
				</Container>
			</Section>
			<StatsSection
				user={user}
				periodData={{
					long_term: longTermStats,
					medium_term: mediumTermStats,
					short_term: shortTermStats,
				}}
				messages={{
					filters: {
						title: messages["Music-Stats"].filters.title,
						all: messages["Music-Stats"].filters.all,
						artists: messages["Music-Stats"].filters.artists,
						tracks: messages["Music-Stats"].filters.tracks,
					},
					period: {
						title: messages["Music-Stats"].period.title,
						short: messages["Music-Stats"].period.short,
						medium: messages["Music-Stats"].period.medium,
						long: messages["Music-Stats"].period.long,
					},
					download: {
						action: messages["Music-Stats"].download.action,
						generating: messages["Music-Stats"].download.generating,
					},
					artists: {
						title: {
							top: messages["Music-Stats"].artists.title.top,
							artists: messages["Music-Stats"].artists.title.artists,
						},
						subtitle: {
							short: messages["Music-Stats"].artists.subtitle.short,
							medium: messages["Music-Stats"].artists.subtitle.medium,
							long: messages["Music-Stats"].artists.subtitle.long,
						},
						description: {
							title: messages["Music-Stats"].artists.description.title,
							p1: messages["Music-Stats"].artists.description.p1,
							p2: messages["Music-Stats"].artists.description.p2,
						},
					},
					tracks: {
						title: {
							top: messages["Music-Stats"].tracks.title.top,
							tracks: messages["Music-Stats"].tracks.title.tracks,
						},
						subtitle: {
							short: messages["Music-Stats"].tracks.subtitle.short,
							medium: messages["Music-Stats"].tracks.subtitle.medium,
							long: messages["Music-Stats"].tracks.subtitle.long,
						},
						description: {
							title: messages["Music-Stats"].tracks.description.title,
							p1: messages["Music-Stats"].tracks.description.p1,
							p2: messages["Music-Stats"].tracks.description.p2,
						},
					},
					list: {
						alt: {
							artist: messages.WrappedList.alt.artist,
							track: messages.WrappedList.alt.track,
						},
						open: messages.WrappedList.open,
						listen: messages.WrappedList.listen,
					},
					notice: {
						label: messages["Music-Stats"].notice.label,
						text: messages["Music-Stats"].notice.text,
					},
				}}
			/>
		</>
	);
};

export default MusicStatsPage;
