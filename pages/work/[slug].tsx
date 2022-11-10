import { GetStaticPaths, GetStaticProps } from "next";
import { RichText } from "@graphcms/rich-text-react-renderer";
import { gql } from "graphql-request";

import { hygraph } from "../../lib/hygraph";
import Image from "next/image";
import { HeadMeta, Layout } from "../../components";

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
	const meta = {
		title: `${title} | Case Study`,
		description: `Case study for the project ${title}`,
		url: `https://milovangudelj.com/work/${slug}`,
		image: "https://milovangudelj.com/images/og-image.png",
	};

	return (
		<Layout>
			<HeadMeta metadata={meta} />
			<div className="h-80 relative">
				<Image
					src={cover.url}
					layout="fill"
					alt={`Case study cover image`}
					objectFit="cover"
				/>
				<div className="absolute left-0 right-0 bottom-0 h-20 md:h-28 xl:h-36 bg-gradient-to-t from-black to-black/0"></div>
			</div>
			<main className="max-w-8xl mx-auto pb-16 px-8 md:pb-32 md:px-16 space-y-16 md:space-y-0 md:relative">
				<div className="relative -mt-24">
					<h1 className="absolute -translate-y-full px-4 py-2 inline drop-shadow-brutal bg-orange text-body-lg xl:text-sub-heading-mobile">
						{title}
					</h1>
				</div>
				<div className="pb-16">
					<span className="text-h3-mobile block md:text-h2-mobile xl:text-h2">
						{subtitle}
					</span>
					<p className="font-medium text-body-lg text-white/75 max-w-[66ch] mb-4 mt-8">
						{intro}
					</p>
				</div>
				<RichText content={content.json} references={content.references} />
			</main>
		</Layout>
	);
};

export default CaseStudyPage;
