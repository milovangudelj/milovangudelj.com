import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { spotifyApi } from "~lib/spotify";
import {
	authOptions,
	ExtendedSession,
} from "~/app/api/auth/[...nextauth]/route";
import { FormData } from "~/app/[lang]/music-stats/ControlsBar";

export async function GET(req: NextRequest, res: NextResponse) {
	const session = (await getServerSession(authOptions)) as ExtendedSession;

	if (!session || !session.user?.accessToken || !session.user.refreshToken) {
		return new NextResponse(JSON.stringify({ error: "Unauthorised!" }), {
			status: 401,
			headers: {
				"Content-Type": "application/json",
			},
		});
	}

	spotifyApi.setAccessToken(session.user.accessToken);
	spotifyApi.setRefreshToken(session.user.refreshToken);

	const ltArtistsData = getTopArtists("long_term");
	const mtArtistsData = getTopArtists("medium_term");
	const stArtistsData = getTopArtists("short_term");

	const ltTracksData = getTopTracks("long_term");
	const mtTracksData = getTopTracks("medium_term");
	const stTracksData = getTopTracks("short_term");

	const [ltArtists, mtArtists, stArtists, ltTracks, mtTracks, stTracks] =
		await Promise.all([
			ltArtistsData,
			mtArtistsData,
			stArtistsData,
			ltTracksData,
			mtTracksData,
			stTracksData,
		]);

	const userStats = {
		long_term: {
			topArtists: ltArtists,
			topTracks: ltTracks,
		},
		medium_term: {
			topArtists: mtArtists,
			topTracks: mtTracks,
		},
		short_term: {
			topArtists: stArtists,
			topTracks: stTracks,
		},
	};

	return new NextResponse(JSON.stringify(userStats), {
		status: 200,
		headers: {
			"Content-Type": "application/json",
			"Cache-Control":
				"public, s-maxage=86400, stale-while-revalidate=43200",
		},
	});
}

const getTopArtists = async (period: FormData["period"]) => {
	const {
		body: { items: artists },
	} = await spotifyApi.getMyTopArtists({
		limit: 5,
		time_range: period,
	});

	const topArtists = await Promise.all(
		artists.map(async (artist, idx) => {
			return {
				name: artist.name,
				url: artist.external_urls.spotify,
				image: {
					...artist.images[0],
				},
			};
		})
	);

	return topArtists;
};

const getTopTracks = async (period: FormData["period"]) => {
	const {
		body: { items: tracks },
	} = await spotifyApi.getMyTopTracks({
		limit: 5,
		time_range: period,
	});

	const topTracks = await Promise.all(
		tracks.map(async (track, idx) => {
			return {
				title: track.name,
				artist: track.artists
					.map((_artist: any) => _artist.name)
					.join(", "),
				url: track.external_urls.spotify,
				image: {
					...track.album.images[0],
				},
			};
		})
	);

	return topTracks;
};
