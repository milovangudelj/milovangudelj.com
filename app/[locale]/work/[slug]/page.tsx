import { gql } from "graphql-request";
import { getPlaiceholder } from "plaiceholder";

import { hygraph } from "../../../../lib/hygraph";

import { CS } from "../../../../components/CS";
import { type Metadata } from "next";

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

export async function generateStaticParams() {
	const { caseStudies } = await hygraph.request<{
		caseStudies: { slug: string }[];
	}>(GET_SLUGS);

	return caseStudies.map((caseStudy) => ({ slug: caseStudy.slug }));
}

const getProjctData = async (slug: string) => {
	const { caseStudy } = await hygraph.request<{ caseStudy: any }>(GET_DATA, {
		slug,
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

	return caseStudy;
};

export async function generateMetadata({
	params,
}: {
	params: { slug: string };
}): Promise<Metadata> {
	const { title, color, subtitle, cover } = await getProjctData(params.slug);

	return {
		title: `${title} | Milovan Gudelj`,
		description: subtitle,
		alternates: {
			canonical: `https://www.milovangudelj.com/work/${params.slug}`,
		},
		themeColor: color,
		openGraph: {
			images: {
				url: cover.url,
				width: cover.width,
				height: cover.height,
			},
		},
	};
}

const ProjectPage = async ({ params }: { params: { slug: string } }) => {
	const { title, color, subtitle, intro, cover, content } =
		await getProjctData(params.slug);

	return (
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
	);
};

export const dynamic = "force-static";
export default ProjectPage;