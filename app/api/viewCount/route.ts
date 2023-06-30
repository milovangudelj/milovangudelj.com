import { type NextRequest } from "next/server";
import { getViewCount } from "~/lib/viewCount";

export const runtime = "edge";

export async function GET(req: NextRequest) {
	const { count, error } = await getViewCount();

	if (error)
		return new Response(
			JSON.stringify({
				count: 0,
				error: "Couldn't fetch view count",
			}),
			{
				status: 200,
				headers: {
					"content-type": "application/json",
					"cache-control":
						"public, s-maxage=60, stale-while-revalidate=30",
				},
			}
		);

	return new Response(
		JSON.stringify({
			count,
		}),
		{
			status: 200,
			headers: {
				"content-type": "application/json",
				"cache-control": "public, s-maxage=60, stale-while-revalidate=30",
			},
		}
	);
}
