import { GetStaticProps, NextPage } from "next";
import { gql } from "graphql-request";

import { hygraph } from "../../lib/hygraph";
import { HeadMeta, Layout, ProjectShowcase, Smiley } from "../../components";

export interface Project {
	id: string;
	title: string;
	year: number;
	href: string;
	link: string;
	image: string;
	categories: string[];
	description: { json: any; [key: string]: any };
	caseStudy?: { slug: string };
}

const QUERY = gql`
	{
		projects {
			id
			title
			year
			href
			link
			image
			description {
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
			categories
			caseStudy {
				slug
			}
		}
	}
`;

export const getStaticProps: GetStaticProps = async () => {
	const { projects } = await hygraph.request(QUERY);

	return {
		props: {
			projects,
		},
	};
};

const meta = {
	title: "Milovan Gudelj - My work",
	description: "A collection of past project I've worked on an am proud of.",
	url: "https://milovangudelj.com/work",
	image: "https://milovangudelj.com/images/og-image.png",
};

const Work: NextPage<{ projects: Project[] }> = ({ projects }) => {
	return (
		<Layout>
			<HeadMeta metadata={meta} />
			<section className="scroll-mt-[72px] bg-green text-black md:scroll-mt-[88px]">
				<main className="mx-auto max-w-8xl space-y-16 py-16 px-8 md:space-y-32 md:py-32 md:px-16">
					<div className="relative space-y-8 md:space-y-0">
						<h2 className="text-h1-mobile md:mb-8 md:text-d2-mobile xl:text-d2">
							My work
						</h2>
						<p className="text-body xl:max-w-[680px]">
							In the past couple of years I&apos;ve had the opportunity
							to work on a few diverse projects and demonstrate my
							skills. Here are some of them.
						</p>
						<Smiley className="absolute -top-16 right-0 h-[64px] w-[65px] text-light-cyan md:h-[128px] md:w-[130px] xl:-top-0 xl:right-16 xl:h-[192.2px] xl:w-[196.23px]" />
					</div>
					<div className="">
						<ul className="space-y-32 xl:space-y-40">
							{projects.map(({ id, ...props }) => (
								<li key={id} className="">
									<ProjectShowcase {...props} />
								</li>
							))}
						</ul>
					</div>
				</main>
			</section>
		</Layout>
	);
};

export default Work;
