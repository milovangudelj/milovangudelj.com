import { gql } from "graphql-request";

import { colorMap, hygraph } from "../../lib/hygraph";

import { Section } from "../../components/Section";
import { Container } from "../../components/Container";
import ProjectShowcase from "../../components/ProjectShowcase/ProjectShowcase";
import { Smiley } from "../../components/Smiley";

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
	const { projects }: { projects: Project[] } = await hygraph.request(QUERY);

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
	alternates: { canonical: "https://www.milovangudelj.com/work" },
};

const WorkPage = async () => {
	const projects = await getProjcts();

	return (
		<>
			<section className="scroll-mt-[72px] bg-black text-white md:scroll-mt-[88px]">
				<main className="mx-auto max-w-8xl space-y-16 py-16 px-8 md:space-y-32 md:py-32 md:px-16">
					<div className="relative space-y-8 md:space-y-0">
						<h2 className="text-h1-mobile md:mb-8 md:text-d1-mobile xl:text-d1">
							My work
						</h2>
						<p className="text-body xl:max-w-[680px]">
							In the past couple of years I&apos;ve had the opportunity
							to work on a few diverse projects and demonstrate my
							skills. Here are some of them.
						</p>
						<Smiley className="absolute -top-16 right-0 h-[64px] w-[65px] text-light-cyan md:h-[128px] md:w-[130px] xl:-top-0 xl:right-16 xl:h-[192.2px] xl:w-[196.23px]" />
					</div>
				</main>
			</section>
			<ul>
				{projects.map(({ id, ...props }, i) => (
					<li key={id}>
						<Section className="bg-green">
							<Container>
								<ProjectShowcase {...props} />
							</Container>
						</Section>
					</li>
				))}
			</ul>
		</>
	);
};

export default WorkPage;
