import { gql } from "graphql-request";
import { getTranslations } from "next-intl/server";

import { hygraph } from "@lib/hygraph";

import { WigglyStars } from "@components/WigglyStars";
import { AboutSection } from "@components/sections/About";
import { CTA } from "@components/sections/CTA";
import { Section } from "@components/Section";
import { Container } from "@components/Container";
import { Projects } from "@components/Projects";
import { Smiley } from "@components/Smiley";
import { type Project } from "./work/page";

const QUERY = gql`
	{
		projects {
			id
			title
			href
			link
			image
		}
	}
`;

async function getProjects() {
	const { projects } = await hygraph.request<{
		projects: Omit<Project, "description">[];
	}>(QUERY);

	return projects;
}

const Home = async () => {
	const t = await getTranslations("Home");
	const workT = await getTranslations("Work");

	const projects = await getProjects();

	return (
		<>
			<Section className="bg-black text-white">
				<main className="relative mx-auto max-w-7xl px-8 2xl:px-0">
					<h1 className="mb-16 text-h1-mobile md:text-d1-mobile xl:text-d1">
						{t("heroTitle.webDev")} <br className="hidden md:inline" />
						<span className="text-yellow">/</span>{" "}
						{t("heroTitle.designer")}
					</h1>
					<p className="text-sub-heading-mobile md:text-sub-heading">
						{t("heroParagraph")}
					</p>
					<WigglyStars />
				</main>
			</Section>
			<AboutSection />
			<Section className="overflow-hidden bg-green">
				<Container className="md:space-y-32">
					<div className="relative space-y-8 md:space-y-0">
						<h2 className="text-h2-mobile md:mb-8 md:text-h2">
							{workT("title")}
						</h2>
						<p className="text-body">{workT("description")}</p>
						<Smiley className="absolute -top-16 right-0 h-[64px] w-[65px] text-light-cyan md:h-[128px] md:w-[130px] xl:-top-0 xl:right-16 xl:h-[192.2px] xl:w-[196.23px]" />
					</div>
					<Projects projects={projects} />
				</Container>
			</Section>
			<CTA />
		</>
	);
};

export default Home;
