import { supabase } from "./supabase";

const spotify_authorization = process.env.SPOTIFY_AUTHORIZATION!;

const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const TOP_ARTISTS_ENDPOINT = `https://api.spotify.com/v1/me/top/artists`;
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

const getAccessToken = async () => {
	const { data, error } = await supabase
		.from("spotify_access_token")
		.select("*")
		.limit(1)
		.single();

	if (!data) return null;

	let access_token: string = data.value;

	if (new Date(data.expires_at!).getTime() < Date.now()) {
		const new_access_token = await refreshAccessToken();
		if (!new_access_token) return null;
		access_token = new_access_token;
	}

	return access_token;
};

const refreshAccessToken = async () => {
	const { data: refresh_token } = await supabase
		.from("spotify_refresh_token")
		.select("*")
		.order("created_at", { ascending: false })
		.limit(1)
		.single();

	if (!refresh_token) return null;

	const timestamp = new Date(Date.now() + 3600 * 1000).toISOString();
	const response = await fetch(TOKEN_ENDPOINT, {
		method: "POST",
		headers: {
			Authorization: `Basic ${spotify_authorization}`,
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: new URLSearchParams({
			grant_type: "refresh_token",
			refresh_token: refresh_token.value,
		}),
		next: {
			revalidate: 0,
		},
	});

	const data = await response.json();

	if (!response.ok || !data.access_token) return null;

	const access_token = data.access_token as string;

	const { data: old_access_token } = await supabase
		.from("spotify_access_token")
		.select("*")
		.order("created_at", { ascending: false })
		.limit(1)
		.single();

	if (!old_access_token) return access_token;

	const { status } = await supabase
		.from("spotify_access_token")
		.update({ value: access_token, expires_at: timestamp })
		.match({ id: old_access_token.id })
		.single();

	return access_token;
};

export const getNowPlaying = async () => {
	const access_token = await getAccessToken();

	const res = await fetch(NOW_PLAYING_ENDPOINT, {
		headers: {
			Authorization: `Bearer ${access_token}`,
		},
		next: {
			revalidate: 0,
		},
	});

	const data = await res.json();

	return data;
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

	const res = await fetch(
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

	const data = await res.json();

	return data;
};
