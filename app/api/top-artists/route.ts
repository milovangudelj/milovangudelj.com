import { type NextRequest } from "next/server";

import { getTopArtists } from "@lib/mySpotify";
import { shuffle } from "@utils/shuffle";
import { spotifyColors } from "@utils/getColors";

export const config = {
	runtime: "edge",
};

export async function GET(req: NextRequest) {
	const response = await getTopArtists({ limit: 5, range: "medium" });
	const { items } = await response.json();

	const colors = shuffle(spotifyColors);
	const artists = await Promise.all(
		items.map(async (artist: any, idx: number) => ({
			name: artist.name,
			url: artist.external_urls.spotify,
			image: {
				...artist.images[0],
				color: colors[idx],
			},
		}))
	);

	return new Response(JSON.stringify({ artists }), {
		status: 200,
		headers: {
			"content-type": "application/json",
			"cache-control":
				"public, s-maxage=86400, stale-while-revalidate=43200",
		},
	});
}
