import { WigglyStars } from "~components/WigglyStars";
import { AboutSection } from "~components/sections/About";
import { CTA } from "~components/sections/CTA";
import { Section } from "~components/Section";
import { Container } from "~components/Container";
import { Projects } from "~components/Projects";
import { Smiley } from "~components/Smiley";

import { getDictionary } from "~utils/getDictionary";
import { Locale } from "~/i18n.config";
import { getSlimProjects } from "~/sanity/lib/client";

async function getProjects() {
	const projects = await getSlimProjects();

	return projects;
}

const Home = async ({ params: { lang } }: { params: { lang: Locale } }) => {
	const projects = await getProjects();

	const dictionary = await getDictionary(lang);

	return (
		<>
			<Section className="bg-black text-white">
				<main className="relative mx-auto max-w-7xl px-8 2xl:px-0">
					<h1 className="mb-16 text-h1-mobile md:text-d1-mobile xl:text-d1">
						{dictionary.Home.heroTitle.webDev}{" "}
						<br className="hidden md:inline" />
						<span className="text-yellow">/</span>{" "}
						{dictionary.Home.heroTitle.designer}
					</h1>
					<p className="text-sub-heading-mobile md:text-sub-heading">
						{dictionary.Home.heroParagraph}
					</p>
					<WigglyStars />
				</main>
			</Section>
			<AboutSection lang={lang} />
			<Section className="overflow-hidden bg-green">
				<Container className="md:space-y-32">
					<div className="relative space-y-8 md:space-y-0">
						<h2 className="text-h2-mobile md:mb-8 md:text-h2">
							{dictionary.Work.title}
						</h2>
						<p className="text-body">{dictionary.Work.description}</p>
						<Smiley className="absolute -top-16 right-0 h-[64px] w-[65px] text-light-cyan md:h-[128px] md:w-[130px] xl:-top-0 xl:right-16 xl:h-[192.2px] xl:w-[196.23px]" />
					</div>
					<Projects projects={projects} />
				</Container>
			</Section>
			<CTA lang={lang} />
		</>
	);
};

export default Home;
