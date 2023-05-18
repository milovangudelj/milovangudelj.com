import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";
import createIntlMiddleware from "next-intl/middleware";

import { generateSiteMap } from "@lib/sitemap";

const locales = ["en", "it"];
const privatePages = ["/music-stats"];

const intlMiddleware = createIntlMiddleware({
	// A list of all locales that are supported
	locales,

	// If this locale is matched, pathnames work without a prefix (e.g. `/about`)
	defaultLocale: "en",
	alternateLinks: false,
});

const authMiddleware = withAuth(
	// Note that this callback is only invoked if
	// the `authorized` callback has returned `true`
	// and not for pages listed in `pages`.
	function onSuccess(req) {
		return intlMiddleware(req);
	},
	{
		callbacks: {
			authorized: ({ token }) => token != null,
		},
		pages: {
			signIn: "/login",
		},
	}
);

export const middleware = async (
	request: NextRequest
): Promise<NextResponse> => {
	// Generates sitemap.xml if path is /sitemap.xml
	if (request.nextUrl.pathname.startsWith("/sitemap.xml")) {
		const sitemap = await generateSiteMap();

		return new NextResponse(sitemap, {
			status: 200,
			headers: { "Content-Type": "text/xml" },
		});
	}

	const privatePathnameRegex = RegExp(
		`^((${locales
			.map((locale) => `/${locale}`)
			.join("|")}))?(${privatePages.join("|")})/?.*$`,
		"i"
	);
	const isPrivatePage = privatePathnameRegex.test(request.nextUrl.pathname);

	if (isPrivatePage) {
		return (authMiddleware as any)(request);
	} else {
		return intlMiddleware(request);
	}
};

export const config = {
	// Skip all paths that aren't pages that you'd like to internationalize
	matcher: ["/((?!api|_next|favicon.ico|fonts|images).*)"],
};
