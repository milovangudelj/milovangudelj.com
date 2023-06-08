import { Section } from "~components/Section";
import { Container } from "~components/Container";
import ProjectShowcase from "~components/ProjectShowcase/ProjectShowcase";
import { Smiley } from "~components/Smiley";

import { Locale } from "~/i18n.config";
import { getDictionary } from "~/utils/getDictionary";
import { getProjects } from "~/sanity/lib/client";

const getProjcts = async () => {
	const projects = await getProjects();

	return projects;
};

export const metadata = {
	title: "Milovan Gudelj - My work",
	description: "A collection of past project I've worked on an am proud of.",
	alternates: {
		canonical: "https://www.milovangudelj.com/en/work",
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
				{projects.map((project) => (
					<li key={project.slug}>
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
									{...project}
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
