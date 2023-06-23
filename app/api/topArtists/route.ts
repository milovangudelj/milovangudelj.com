import { type NextRequest } from "next/server";

import { getTopArtists } from "~lib/spotify";

export const runtime = "edge";

export async function GET(req: NextRequest) {
	const { items } = await getTopArtists({ limit: 5, range: "medium" });

	const artists = items.map((artist: any) => ({
		name: artist.name,
		url: artist.external_urls.spotify,
		image: {
			...artist.images[0],
		},
	}));

	return new Response(JSON.stringify({ artists }), {
		status: 200,
		headers: {
			"content-type": "application/json",
			"cache-control":
				"public, s-maxage=86400, stale-while-revalidate=43200",
		},
	});
}
