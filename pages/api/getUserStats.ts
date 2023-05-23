import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

import { spotifyApi } from "@lib/spotify";
import { authOptions, ExtendedSession } from "./auth/[...nextauth]";
import { FormData } from "@/app/music-stats/ControlsBar";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const session = (await getServerSession(
		req,
		res,
		authOptions
	)) as ExtendedSession;

	if (!session || !session.user?.accessToken || !session.user.refreshToken) {
		res.status(401);
		res.send({ error: "Unauthorised!" });
		return;
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

	res.status(200);
	res.setHeader("Content-Type", "application/json");
	res.setHeader(
		"Cache-Control",
		"public, s-maxage=86400, stale-while-revalidate=43200"
	);
	res.send(userStats);
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
