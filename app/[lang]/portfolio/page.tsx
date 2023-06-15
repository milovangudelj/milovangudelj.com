import Image from "next/image";

import { Locale } from "~/i18n.config";
import { getDictionary } from "~/utils/getDictionary";
import { getPosters } from "~/sanity/lib/client";

import { CTA } from "~components/sections/CTA";

import { Container } from "~components/Container";
import { Section } from "~components/Section";
import { PosterGallery } from "~components/PosterGallery";
import { SoftwarePlanets } from "./SoftwarePlanets";

import squiggle from "~images/squiggly-line.svg";
import semicircle from "~images/semicircle.svg";

export const metadata = {
	title: "Milovan Gudelj - Portfolio",
	description:
		"My portfolio! Feel free to reach out to me for any questions you might have.",
	alternates: {
		canonical: "https://www.milovangudelj.com/en/portfolio",
		languages: { "it-IT": "https://www.milovangudelj.com/it/portfolio" },
	},
};

const PortfolioPage = async ({
	params: { lang = "en" },
}: {
	params: { lang: Locale };
}) => {
	const dictionary = await getDictionary(lang);
	const posters = await getPosters();

	const projects = [
		{
			id: "pr_01",
			title: "DoYourThing",
			year: 2022,
		},
		{
			id: "pr_02",
			title: "UniOrari",
			year: 2021,
		},
		{
			id: "pr_03",
			title: "Piscina di Agordo",
			year: 2019,
		},
	];

	return (
		<>
			<Section className="relative min-h-[calc(100vh-72.39px)]">
				<Container as="main" className="relative">
					<h1 className="text-d1-mobile 2xl:text-d1">
						{dictionary.Portfolio.title}
					</h1>
					<div className="space-y-8">
						<p className="text-sub-heading">
							{dictionary.Portfolio.description}
						</p>
						<p className="text-white/70">
							{dictionary.Portfolio.subtitle}
						</p>
					</div>
				</Container>
				<Image
					src={squiggle}
					alt="Decorative squiggly line"
					width={425}
					height={80}
					className="pointer-events-none absolute bottom-[256px] right-[calc((100%-1280px)/2)] select-none object-cover"
				/>
				<Image
					src={semicircle}
					alt="Decorative semicircle"
					width={182}
					height={91}
					className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 select-none object-cover"
				/>
			</Section>
			<Section>
				<Container className="relative space-y-0">
					<h2 className="text-h2-mobile md:text-h2">
						{dictionary.Portfolio.experience.title}
					</h2>
					<div className="space-y-8 pt-16 text-white/70">
						<p>{dictionary.Portfolio.experience.p1}</p>
						<p>{dictionary.Portfolio.experience.p2}</p>
						<p>{dictionary.Portfolio.experience.p3}</p>
						<p>{dictionary.Portfolio.experience.p4}</p>
					</div>
					<div className="absolute -bottom-[128px] -top-[128px] right-[128px]">
						<div className="absolute bottom-0 right-0 top-0 flex flex-col">
							<span className="repeat-none inline-block h-[128px] w-px bg-fading-dashes"></span>
							<span className="w-0 flex-1 border-[0.5px] border-white/40"></span>
							<span className="repeat-none inline-block h-[128px] w-px rotate-180 bg-fading-dashes"></span>
						</div>
						<div className="flex h-full flex-col items-end justify-center space-y-16">
							<div className="relative mr-8 w-fit rounded-lg border border-dashed border-yellow px-4 py-2 text-label-md text-yellow">
								<span>Your website?</span>
								<span className="mx-2 inline-block text-yellow/70">
									-
								</span>
								<span className="text-yellow/70">2023</span>
								<span className="absolute left-full top-1/2 inline-block h-px w-8 -translate-y-1/2 bg-gradient-to-r from-white/0 to-white/40"></span>
							</div>
							{projects.map((project) => (
								<div
									key={project.id}
									className="relative mr-8 w-fit rounded-lg bg-yellow px-4 py-2 text-label-md text-black"
								>
									<span>{project.title}</span>
									<span className="mx-2 inline-block text-black/70">
										-
									</span>
									<span className="text-black/70">{project.year}</span>
									<span className="absolute left-full top-1/2 inline-block h-px w-8 -translate-x-px -translate-y-1/2 bg-gradient-to-r from-white/0 to-white/40"></span>
								</div>
							))}
						</div>
					</div>
				</Container>
			</Section>
			<Section className="relative">
				<Container className="relative">
					<h2 className="text-h2-mobile 2xl:text-h2">
						{dictionary.Portfolio.software.title}
					</h2>
					<p className="text-sub-heading-mobile 2xl:text-sub-heading">
						{dictionary.Portfolio.software.description}
					</p>
					<div className="space-y-8">
						<h3 className="text-sub-heading-mobile text-yellow">
							{dictionary.Portfolio.software.design.title}
						</h3>
						<p className="text-body text-white/70">
							{dictionary.Portfolio.software.design.p1}
						</p>
						<h3 className="text-sub-heading-mobile text-yellow">
							{dictionary.Portfolio.software.web.title}
						</h3>
						<p className="text-body text-white/70">
							{dictionary.Portfolio.software.web.p1}
						</p>
						<p className="text-body text-white/70">
							{dictionary.Portfolio.software.web.p2}
						</p>
					</div>
					<SoftwarePlanets />
				</Container>
			</Section>
			<Section className="overflow-hidden">
				<Container>
					<h2 className="text-h2-mobile md:text-h2">
						{dictionary.Portfolio.poster.title}
					</h2>
					<p className="mt-16 text-sub-heading-mobile md:text-sub-heading">
						{dictionary.Portfolio.poster.description.pre}
						<span className="text-yellow">
							{dictionary.Portfolio.poster.description.hashtag}
						</span>
						{dictionary.Portfolio.poster.description.post}
					</p>
					<PosterGallery
						posters={posters.slice(0, 4)}
						dragText={dictionary.Portfolio.poster.drag}
					/>
					<PosterGallery
						posters={posters.slice(4)}
						dragText={dictionary.Portfolio.poster.drag}
					/>
				</Container>
			</Section>
			<CTA lang={lang} />
		</>
	);
};

export default PortfolioPage;
