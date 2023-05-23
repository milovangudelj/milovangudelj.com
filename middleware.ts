import { NextRequest, NextResponse } from "next/server";

import { generateSiteMap } from "@lib/sitemap";

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

	return NextResponse.next();
};

export const config = {
	// Skip all paths that aren't pages that you'd like to internationalize
	matcher: ["/((?!api|_next|favicon.ico|fonts|images).*)"],
};
