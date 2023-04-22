import { NextRequest, NextResponse } from "next/server";
import { gql } from "graphql-request";

import { hygraph } from "@lib/hygraph";

const GET_SLUGS = gql`
	{
		caseStudies {
			slug
		}
	}
`;

export async function GET(req: NextRequest) {
	const { caseStudies } = await hygraph.request<{
		caseStudies: { slug: string }[];
	}>(GET_SLUGS);

	const csUrls = caseStudies.map((caseStudy) => caseStudy.slug);

	return new NextResponse(JSON.stringify({ csUrls }), {
		status: 200,
		headers: {
			"Content-Type": "application/json",
		},
	});
}
