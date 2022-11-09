import { GetStaticPaths, GetStaticProps } from "next";
import { RichText } from "@graphcms/rich-text-react-renderer";
import { gql } from "graphql-request";

import { hygraph } from "../../lib/hygraph";
import Image from "next/image";

const GET_SLUGS = gql`
	{
		caseStudies {
			slug
		}
	}
`;

const GET_DATA = gql`
	query GetData($slug: String!) {
		caseStudy(where: { slug: $slug }) {
			title
			subtitle
			intro
			cover {
				id
				url
				width
				height
			}
			content {
				json
				references {
					... on Asset {
						id
						url
						mimeType
						width
						height
					}
				}
			}
		}
	}
`;

export const getStaticPaths: GetStaticPaths = async () => {
	const { caseStudies } = await hygraph.request(GET_SLUGS);

	return {
		paths: caseStudies.map((caseStudy: any) => ({
			params: { slug: caseStudy.slug },
		})),
		fallback: false,
	};
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const { caseStudy } = await hygraph.request(GET_DATA, {
		slug: params?.slug,
	});

	return {
		// Passed to the page component as props
		props: { ...caseStudy },
	};
};

const CaseStudyPage = ({
	slug,
	title,
	subtitle,
	intro,
	cover,
	content,
}: any) => {
	return (
		<div>
			<div className="h-64 relative">
				<Image
					src={cover.url}
					layout="fill"
					alt={`Case study cover image`}
					objectFit="cover"
				/>
			</div>
			<h1 className="text-h3-mobile md:text-h2-mobile xl:text-h2">
				{title}
			</h1>
			<div>
				<span>{subtitle}</span>
				<span>{intro}</span>
			</div>
			<RichText content={content.json} references={content.references} />
		</div>
	);
};

export default CaseStudyPage;
