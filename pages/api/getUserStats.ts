import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { shuffle } from "../../utils/shuffle";

import { spotifyApi } from "../../lib/spotify";
import { authOptions, ExtendedSession } from "./auth/[...nextauth]";
import { spotifyColors } from "../../utils/getColors";

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

	const period = (req.query.period ?? "medium_term") as
		| "long_term"
		| "medium_term"
		| "short_term";

	spotifyApi.setAccessToken(session.user.accessToken);
	spotifyApi.setRefreshToken(session.user.refreshToken);

	const {
		body: { items: artists },
	} = await spotifyApi.getMyTopArtists({
		limit: 5,
		time_range: period,
	});
	let colors = shuffle(spotifyColors);
	const topArtists = await Promise.all(
		artists.map(async (artist, idx) => {
			return {
				name: artist.name,
				url: artist.external_urls.spotify,
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
		time_range: period,
	});
	colors = shuffle(spotifyColors);
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
					color: colors[idx],
				},
			};
		})
	);

	res.status(200);
	res.setHeader("Content-Type", "application/json");
	res.setHeader(
		"Cache-Control",
		"public, s-maxage=86400, stale-while-revalidate=43200"
	);
	res.send({ topArtists, topTracks });
}
