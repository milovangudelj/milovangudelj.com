import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { shuffle } from "../../utils/shuffle";

import { spotifyApi } from "../../lib/spotify";
import { authOptions, ExtendedSession } from "./auth/[...nextauth]";
import { spotifyColors } from "../../utils/getColors";
import { FormData } from "../../app/music-stats/ControlsBar";

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

	const userStats = {
		long_term: {
			topArtists: await getTopArtists("long_term"),
			topTracks: await getTopTracks("long_term"),
		},
		medium_term: {
			topArtists: await getTopArtists("medium_term"),
			topTracks: await getTopTracks("medium_term"),
		},
		short_term: {
			topArtists: await getTopArtists("short_term"),
			topTracks: await getTopTracks("short_term"),
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
