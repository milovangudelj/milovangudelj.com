import { NextRequest, NextResponse } from "next/server";

import { getCaseStudyPaths } from "~/sanity/lib/client";

export async function GET(req: NextRequest) {
	const csURLs = await getCaseStudyPaths();

	return new NextResponse(JSON.stringify(csURLs), {
		status: 200,
		headers: {
			"Content-Type": "application/json",
		},
	});
}
