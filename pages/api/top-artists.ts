import { type NextRequest } from "next/server";
import shuffle from "lodash/shuffle";

import { getTopArtists } from "../../lib/mySpotify";
import { spotifyColors } from "../../utils/spotifyColors";

export const config = {
	runtime: "experimental-edge",
};

export default async function handler(req: NextRequest) {
	const response = await getTopArtists({ limit: 5, range: "medium" });
	const { items } = await response.json();

	let colors = shuffle(spotifyColors);
	const artists = await Promise.all(
		items.map(async (artist: any, idx: number) => {
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

	return new Response(JSON.stringify({ artists }), {
		status: 200,
		headers: {
			"content-type": "application/json",
			"cache-control":
				"public, s-maxage=86400, stale-while-revalidate=43200",
		},
	});
}
