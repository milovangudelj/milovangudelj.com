import { type NextRequest } from "next/server";

import { getTopArtists } from "../../lib/spotify";
import { spotifyColors } from "../../utils/spotifyColors";

export const config = {
	runtime: "experimental-edge",
};

export default async function handler(req: NextRequest) {
	const response = await getTopArtists({ limit: 5, range: "medium" });
	const { items } = await response.json();

	const artists = await Promise.all(
		items.map(async (artist: any) => {
			const colorKey =
				Object.keys(spotifyColors)[
					Math.floor(Math.random() * Object.keys(spotifyColors).length)
				];

			const color = spotifyColors[colorKey];

			delete spotifyColors[colorKey];

			return {
				name: artist.name,
				artistUrl: artist.external_urls.spotify,
				image: {
					...artist.images[0],
					color,
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
