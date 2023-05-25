import { gql } from "graphql-request";

import { colorMap, hygraph } from "~lib/hygraph";

import { Section } from "~components/Section";
import { Container } from "~components/Container";
import ProjectShowcase from "~components/ProjectShowcase/ProjectShowcase";
import { Smiley } from "~components/Smiley";
import { getTranslations } from "next-intl/server";

export interface Project {
	id: string;
	title: string;
	year: number;
	href: string;
	link: string;
	image: string;
	categories: string[];
	description: { json: any; [key: string]: any };
	caseStudy?: { slug: string; color: string };
	color: string;
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
				color
			}
		}
	}
`;

const getProjcts = async () => {
	const { projects } = await hygraph.request<{ projects: Project[] }>(QUERY);

	let avColors = Object.keys(colorMap).filter(
		(el) =>
			![
				"yellow",
				"lavender",
				"lilla",
				"sad_orange",
				"orange",
				"green",
			].includes(el)
	);

	await Promise.all(
		projects.map(async (project) => {
			if (project.caseStudy?.color) {
				avColors = avColors.filter((el) => el !== project.caseStudy?.color);
				project.color = project.caseStudy.color;
				return;
			}
			const color = avColors[Math.floor(Math.random() * avColors.length)];
			project.color = color;

			avColors = avColors.filter((el) => el !== color);
		})
	);

	return projects;
};

export const metadata = {
	title: "Milovan Gudelj - My work",
	description: "A collection of past project I've worked on an am proud of.",
	alternates: {
		canonical: "https://www.milovangudelj.com/work",
		languages: { "it-IT": "https://www.milovangudelj.com/it/work" },
	},
};

const WorkPage = async ({
	params: { lang = "en" },
}: {
	params: { lang: Locale };
}) => {
	const dictionary = await getDictionary(lang);

	const projects = await getProjcts();

	return (
		<>
			<Section className="relative scroll-mt-[72px] overflow-hidden bg-black text-white md:scroll-mt-[88px]">
				<main className="mx-auto max-w-7xl space-y-16 px-8 md:space-y-32 2xl:px-0">
					<div className="relative space-y-8 md:space-y-0">
						<h1 className="text-d2-mobile md:mb-8 xl:text-d2">
							{dictionary.Work.title}
						</h1>
						<p className="text-body">{dictionary.Work.description}</p>
						<Smiley className="absolute -top-16 right-0 h-[64px] w-[65px] text-light-cyan md:h-[128px] md:w-[130px] xl:-top-0 xl:right-16 xl:h-[192.2px] xl:w-[196.23px]" />
					</div>
				</main>
			</Section>
			<ul>
				{projects.map(({ id, ...props }, i) => (
					<li key={id}>
						<Section className="bg-green">
							<Container>
								<ProjectShowcase
									messages={{
										brief: dictionary.ProjectShowcase.brief,
										visit: dictionary.ProjectShowcase.visit,
										readCS: dictionary.ProjectShowcase.readCS,
										category: {
											uiDesign:
												dictionary.ProjectShowcase.category
													.uiDesign,
											webDesign:
												dictionary.ProjectShowcase.category
													.webDesign,
											webDev:
												dictionary.ProjectShowcase.category.webDev,
											frontEnd:
												dictionary.ProjectShowcase.category
													.frontEnd,
											fullStack:
												dictionary.ProjectShowcase.category
													.fullStack,
										},
									}}
									{...props}
								/>
							</Container>
						</Section>
					</li>
				))}
			</ul>
		</>
	);
};

export default WorkPage;
