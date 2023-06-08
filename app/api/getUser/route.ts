import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { spotifyApi } from "~lib/spotify";
import {
	authOptions,
	ExtendedSession,
} from "~/app/api/auth/[...nextauth]/route";

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

	const {
		body: { display_name, images },
	} = await spotifyApi.getMe();

	return new NextResponse(
		JSON.stringify({ displayName: display_name, images }),
		{
			status: 200,
			headers: {
				"Content-Type": "application/json",
				"Cache-Control":
					"public, s-maxage=86400, stale-while-revalidate=43200",
			},
		}
	);
}
