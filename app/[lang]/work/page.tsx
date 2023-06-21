import { Section } from "~components/Section";
import { Container } from "~components/Container";
import { ProjectShowcase } from "~components/ProjectShowcase";

import { Locale } from "~/i18n.config";
import { getDictionary } from "~/utils/getDictionary";
import { getProjects } from "~/sanity/lib/client";
import { CTA } from "~/components/sections";

import heroImage from "~images/work-hero-image.webp";
import Image from "next/image";

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
			<Section className="relative xl:min-h-[var(--mobile-nav-height)]">
				<Container as="main">
					<h1 className="text-h1-mobile md:text-d1-mobile 2xl:text-d1">
						{dictionary.Work.title}
					</h1>
					<div className="space-y-8">
						<p className="text-sub-heading-mobile 2xl:text-sub-heading">
							{dictionary.Work.description}
						</p>
						<p className="text-body text-white/70">
							{dictionary.Work.subtitle}
						</p>
					</div>
					<span
						aria-hidden
						className="inline-block text-sub-heading text-yellow"
					>
						↓
					</span>
				</Container>
				<Image
					src={heroImage}
					alt="Isometric screenshot of DoYourThing's homepage"
					quality={100}
					sizes={"1280px"}
					width={1280}
					height={485}
					placeholder="blur"
					className="pointer-events-none absolute bottom-0 right-[var(--side-width)] w-[calc(100%-calc(var(--side-width)*2))] select-none object-cover"
				/>
			</Section>
			{projects.map((project) => (
				<Section key={project.slug}>
					<Container>
						<ProjectShowcase
							messages={{
								visit: dictionary.ProjectShowcase.visit,
								read: dictionary.ProjectShowcase.readCS,
							}}
							project={project}
							lang={lang}
						/>
					</Container>
				</Section>
			))}
			<CTA lang={lang} />
		</>
	);
};

export default WorkPage;
