const spotify_code = process.env.SPOTIFY_CODE!;

const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const TOP_TRACKS_ENDPOINT = `https://api.spotify.com/v1/me/top/tracks`;
const TOP_ARTISTS_ENDPOINT = `https://api.spotify.com/v1/me/top/artists`;
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

const getAccessToken = async () => {
	const response = await fetch(TOKEN_ENDPOINT, {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: new URLSearchParams({
			grant_type: "authorization_code",
			code: spotify_code,
			redirect_uri: "http://localhost:3000/music-stats",
		}),
		next: {
			revalidate: 3600,
		},
	});

	const data = await response.json();

	return data.access_token as string;
};

export const getNowPlaying = async () => {
	const access_token = await getAccessToken();

	return fetch(NOW_PLAYING_ENDPOINT, {
		headers: {
			Authorization: `Bearer ${access_token}`,
		},
	});
};

export const getTopTracks = async () => {
	const access_token = await getAccessToken();

	return fetch(TOP_TRACKS_ENDPOINT, {
		headers: {
			Authorization: `Bearer ${access_token}`,
		},
	});
};

export const getTopArtists = async ({
	limit,
	range,
}: {
	limit: number;
	range: "short" | "medium" | "long";
}) => {
	const access_token = await getAccessToken();

	const tRange: { [key in typeof range]: string } = {
		short: "short_term",
		medium: "medium_term",
		long: "long_term",
	};

	return fetch(
		`${TOP_ARTISTS_ENDPOINT}?${new URLSearchParams({
			limit: `${limit}`,
			time_range: `${tRange[range]}`,
		})}`,
		{
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
		}
	);
};
