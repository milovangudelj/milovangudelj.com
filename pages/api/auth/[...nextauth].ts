import NextAuth, { AuthOptions, Account, Session, User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import { JWT } from "next-auth/jwt";
import SpotifyProvider from "next-auth/providers/spotify";
import { spotifyApi, SPOTIFY_AUTH_URL } from "../../../lib/spotify";

export interface ExtendedToken extends JWT {
	accessToken?: Account["access_token"];
	refreshToken?: Account["refresh_token"];
	username?: Account["providerAccountId"];
	tokenExpiresAt?: Account["expires_at"];
	error?: string;
}

export interface ExtendedSession extends Session {
	user?: Session["user"] & {
		accessToken?: Account["access_token"];
		refreshToken?: Account["refresh_token"];
		username?: Account["providerAccountId"];
	};
}

const refreshAccessToken = async (
	token: ExtendedToken
): Promise<ExtendedToken> => {
	try {
		if (!token.accessToken || !token.refreshToken)
			throw "Refresh access token error.";
		spotifyApi.setAccessToken(token.accessToken);
		spotifyApi.setRefreshToken(token.refreshToken);

		const { body } = await spotifyApi.refreshAccessToken();

		return {
			...token,
			accessToken: body.access_token,
			tokenExpiresAt: Date.now() + body.expires_in * 1000,
			refreshToken: body.refresh_token ?? token.refreshToken,
		};
	} catch (error) {
		console.error(error);

		return {
			...token,
			error: "Refresh access token error.",
		};
	}
};

export const authOptions: AuthOptions = {
	providers: [
		SpotifyProvider({
			clientId: process.env.SPOTIFY_CLIENT_ID as string,
			clientSecret: process.env.SPOTIFY_CLIENT_SECRET as string,
			authorization: SPOTIFY_AUTH_URL,
		}),
	],
	secret: process.env.JWT_SECRET,
	pages: {
		signIn: "/login",
	},
	callbacks: {
		async jwt({ token, account, user }) {
			if (account && user) {
				const extendedToken: ExtendedToken = {
					...token,
					accessToken: account.access_token,
					refreshToken: account.refresh_token,
					username: account.providerAccountId,
					tokenExpiresAt: account.expires_at
						? account.expires_at * 1000
						: Date.now() + 3600 * 1000,
				};

				return extendedToken;
			}

			if (Date.now() < ((token as ExtendedToken).tokenExpiresAt ?? 0)) {
				return token;
			}

			return await refreshAccessToken(token);
		},
		async session({
			session,
			token,
			user,
		}: {
			session: ExtendedSession;
			token: ExtendedToken;
			user: User | AdapterUser;
		}) {
			if (!session.user) return session;

			session.user.accessToken = token.accessToken;
			session.user.refreshToken = token.refreshToken;
			session.user.username = token.username;

			return session;
		},
	},
};

export default NextAuth(authOptions);
