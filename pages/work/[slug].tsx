import { GetStaticPaths, GetStaticProps } from "next";
import { gql } from "graphql-request";
import { getPlaiceholder } from "plaiceholder";

import { hygraph } from "../../lib/hygraph";
import { CS, HeadMeta, Layout } from "../../components";

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
			color
			subtitle
			intro {
				raw
			}
			cover {
				id
				url
				width
				height
				alt
				caption
			}
			content {
				json
				references {
					... on Asset {
						mimeType
						id
						url
						width
						height
						alt
						caption
						__typename
					}
					... on CsOverline {
						id
						content
						__typename
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

	const images = caseStudy.content.references.filter(
		(asset: any) =>
			asset.__typename === "Asset" && asset.mimeType.includes("image")
	);

	await Promise.all(
		images.map(async (image: any) => {
			const { base64 } = await getPlaiceholder(image.url);
			image.blurDataUrl = base64;
		})
	);

	return {
		props: { ...caseStudy },
	};
};

const CaseStudyPage = ({
	slug,
	title,
	color,
	subtitle,
	intro,
	cover,
	content,
}: any) => {
	const meta = {
		title: `${title} | Case Study`,
		description: `Case study for the project ${title}`,
		url: `https://milovangudelj.com/work/${slug}`,
		image: "https://milovangudelj.com/images/og-image.png",
	};

	return (
		<Layout>
			<HeadMeta metadata={meta} />
			<CS>
				<CS.Header
					title={title}
					color={color}
					subtitle={subtitle}
					intro={intro}
					cover={cover}
				/>
				<CS.Content content={content} />
			</CS>
		</Layout>
	);
};

export default CaseStudyPage;
