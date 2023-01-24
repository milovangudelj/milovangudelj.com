import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";

import { spotifyApi } from "../../lib/spotify";
import { authOptions, ExtendedSession } from "./auth/[...nextauth]";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const session = (await unstable_getServerSession(
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

	const {
		body: { display_name, images },
	} = await spotifyApi.getMe();

	res.status(200);
	res.setHeader("Content-Type", "application/json");
	res.setHeader(
		"Cache-Control",
		"public, s-maxage=86400, stale-while-revalidate=43200"
	);
	res.send({ displayName: display_name, images });
}
