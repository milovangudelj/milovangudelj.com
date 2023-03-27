import { NextApiRequest, NextApiResponse } from "next";
import { gql } from "graphql-request";

import { hygraph } from "@lib/hygraph";

const GET_SLUGS = gql`
	{
		caseStudies {
			slug
		}
	}
`;

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { caseStudies } = await hygraph.request<{
		caseStudies: { slug: string }[];
	}>(GET_SLUGS);

	const csUrls = caseStudies.map((caseStudy) => caseStudy.slug);

	res.status(200);
	res.setHeader("Content-Type", "application/json");
	res.send({ csUrls });
}
