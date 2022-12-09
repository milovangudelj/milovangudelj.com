import SpotifyWebApi from "spotify-web-api-node";

const scopes = [
	"user-read-private",
	"user-read-currently-playing",
	"user-top-read",
].join(",");

const params = {
	scope: scopes,
};

const queryParams = new URLSearchParams(params);

export const SPOTIFY_AUTH_URL = `https://accounts.spotify.com/authorize?${queryParams.toString()}`;

export const spotifyApi = new SpotifyWebApi({
	clientId: process.env.SPOTIFY_CLIENT_ID,
	clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
});
