import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url);
	const code = searchParams.get("code");

	if (!code) {
		return new NextResponse(JSON.stringify({ error: "Access denied" }), {
			status: 400,
			headers: {
				"Content-Type": "application/json",
			},
		});
	}

	return new NextResponse(JSON.stringify("Success!"), {
		status: 200,
		headers: {
			"Content-Type": "application/json",
		},
	});
}
