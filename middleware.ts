import { NextRequest, NextResponse } from "next/server";

import { generateSiteMap } from "~lib/sitemap";

export const middleware = async (
	request: NextRequest
): Promise<NextResponse> => {
	// Generates sitemap.xml if path is /sitemap.xml
	if (request.nextUrl.pathname.localeCompare("/sitemap.xml") === 0) {
		const sitemap = await generateSiteMap();

		return new NextResponse(sitemap, {
			status: 200,
			headers: { "Content-Type": "text/xml" },
		});
	}

	if (request.nextUrl.pathname.startsWith("/studio")) {
		return NextResponse.next();
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
