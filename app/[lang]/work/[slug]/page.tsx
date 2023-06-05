import { CS } from "~components/CS";
import { type Metadata } from "next";
import { getCaseStudyBySlug, getCaseStudyPaths } from "~/sanity/lib/client";
import { urlForImage } from "~/sanity/lib/image";

export async function generateStaticParams() {
	const caseStudies = await getCaseStudyPaths();

	return caseStudies.map((caseStudy) => ({ slug: caseStudy }));
}

const getProjctData = async (slug: string) => {
	const altCaseStudy = await getCaseStudyBySlug({ slug });

	return altCaseStudy;
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
			canonical: `https://www.milovangudelj.com/en/work/${params.slug}`,
			languages: {
				"it-IT": `https://www.milovangudelj.com/it/work/${params.slug}`,
			},
		},
		themeColor: color,
		openGraph: {
			images: {
				url: urlForImage(cover.image).url(),
				width: cover.width,
				height: cover.height,
			},
		},
	};
}

const ProjectPage = async ({ params }: { params: { slug: string } }) => {
	const {
		title,
		color,
		subtitle,
		intro,
		cover,
		body,
	} = await getProjctData(params.slug);

	return (
		<CS>
			<CS.Header
				title={title}
				color={color}
				subtitle={subtitle}
				intro={intro}
				cover={cover}
			/>
			<CS.Content body={body} />
		</CS>
	);
};

export const dynamic = "force-static";
export default ProjectPage;
