import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getServerSession } from "next-auth";

export async function middleware(request: NextRequest) {
	const session = await getServerSession();
	if (!session) NextResponse.redirect(new URL("/login", request.url));
}

export const config = {
	matcher: "/music-stats",
};
