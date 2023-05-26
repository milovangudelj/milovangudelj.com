import Image from "next/image";

import { CTA } from "~components/sections/CTA";
import { getTranslations } from "next-intl/server";

import { Container } from "~components/Container";
import { Section } from "~components/Section";
import { PosterGallery } from "~components/PosterGallery";

import squiggle from "~images/squiggle.svg";
import arrow from "~images/arrow.svg";

import figma from "~images/logos/logo_figma.svg";
import illustrator from "~images/logos/logo_illustrator.svg";
import lightroom from "~images/logos/logo_lightroom.svg";
import photoshop from "~images/logos/logo_photoshop.svg";

import nextjs from "~images/logos/logo_nextjs.svg";
import vercel from "~images/logos/logo_vercel.svg";
import tailwindcss from "~images/logos/logo_tailwindcss.svg";
import webflow from "~images/logos/logo_webflow.svg";

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

	return (
		<>
			<Section className="relative scroll-mt-[72px] overflow-hidden bg-salmon md:scroll-mt-[88px]">
				<main className="relative mx-auto flex max-w-7xl items-center justify-between px-8 2xl:px-0">
					<div className="space-y-8">
						<h1 className="text-d2-mobile xl:text-d2">
							{dictionary.Portfolio.title}
						</h1>
						<p className="text-sub-heading">
							{dictionary.Portfolio.description}
						</p>
					</div>
					<div className="absolute -bottom-20 -right-[360px] sm:-top-2 md:-right-64 xl:-right-16">
						<Image
							src={squiggle}
							alt="Black squiggly line"
							width={528}
							height={80}
						/>
					</div>
				</main>
				<div className="absolute -right-12 aspect-square w-[96px] rounded-full border-[16px] border-black max-sm:top-8 sm:bottom-0 sm:left-1/2 sm:translate-y-1/2 sm:-translate-x-1/2 md:w-[182px]"></div>
			</Section>
			<Section className="bg-black py-16 text-white md:py-32 md:px-16">
				<Container>
					<h2 className="text-h2-mobile md:text-h2">
						{dictionary.Portfolio.experience.title}
					</h2>
					<div className="relative space-y-8 text-body md:flex md:space-y-0">
						<div className="flex-1 space-y-8 md:mr-32">
							<p>{dictionary.Portfolio.experience.p1}</p>
							<p>{dictionary.Portfolio.experience.p2}</p>
						</div>
						<div className="absolute top-1/2 left-1/2 mt-[18px] hidden flex-none -translate-x-1/2 -translate-y-1/2 md:block">
							<Image
								src={arrow}
								alt={
									"Yellow arrow pointing from the second paragraph to the third"
								}
								width={82}
								height={85}
							/>
						</div>
						<div className="flex-1 space-y-8 md:ml-32">
							<p>{dictionary.Portfolio.experience.p3}</p>
							<p>{dictionary.Portfolio.experience.p4}</p>
						</div>
					</div>
				</Container>
			</Section>
			<Section className="bg-black py-16 text-white md:py-32 md:px-16">
				<Container>
					<h2 className="text-h2-mobile md:text-h2">
						{dictionary.Portfolio.software.title}
					</h2>
					<p className="mt-16 text-sub-heading-mobile md:text-sub-heading">
						{dictionary.Portfolio.software.description}
					</p>
					<div className="space-y-8">
						<h3 className="text-sub-heading-mobile text-yellow md:text-sub-heading">
							{dictionary.Portfolio.software.design.title}
						</h3>
						<div className="items-center gap-32 space-y-16 xl:flex xl:space-y-0">
							<div className="flex-1 space-y-8">
								<p className="text-body">
									{dictionary.Portfolio.software.design.p1}
								</p>
							</div>
							<ul className="flex flex-1 items-center justify-center gap-8 md:gap-16">
								<li>
									<Image
										src={figma}
										alt="Figma logo"
										width={53.34}
										height={80}
										className="aspect-[5.334/8] h-[40px] object-contain sm:h-[60px] md:h-[70px] xl:h-[80px]"
									/>
								</li>
								<li>
									<Image
										src={photoshop}
										alt="Photoshop logo"
										width={96}
										height={96}
										className="aspect-square w-[48px] object-contain sm:w-[68px] md:w-[80px] xl:w-[96px]"
									/>
								</li>
								<li>
									<Image
										src={illustrator}
										alt="Illustrator logo"
										width={96}
										height={96}
										className="aspect-square w-[48px] object-contain sm:w-[68px] md:w-[80px] xl:w-[96px]"
									/>
								</li>
								<li>
									<Image
										src={lightroom}
										alt="Lightroom logo"
										width={96}
										height={96}
										className="aspect-square w-[48px] object-contain sm:w-[68px] md:w-[80px] xl:w-[96px]"
									/>
								</li>
							</ul>
						</div>
					</div>
					<div className="space-y-8">
						<h3 className="text-sub-heading-mobile text-yellow md:text-sub-heading">
							{dictionary.Portfolio.software.web.title}
						</h3>
						<div className="items-center gap-32 space-y-16 xl:flex xl:space-y-0">
							<div className="flex-1 space-y-8">
								<p className="text-body">
									{dictionary.Portfolio.software.web.p1}
								</p>
								<p className="text-body">
									{dictionary.Portfolio.software.web.p2}
								</p>
							</div>
							<ul className="flex flex-1 items-center justify-center gap-8 md:gap-16">
								<li>
									<Image
										src={nextjs}
										alt="Next.js logo"
										width={96}
										height={96}
										className="aspect-square w-[48px] object-contain sm:w-[68px] md:w-[80px] xl:w-[96px]"
									/>
								</li>
								<li>
									<Image
										src={tailwindcss}
										alt="TailwindCSS logo"
										width={96}
										height={57.25}
										className="aspect-[9.6/5.725] w-[48px] object-contain sm:w-[68px] md:w-[80px] xl:w-[96px]"
									/>
								</li>
								<li>
									<Image
										src={vercel}
										alt="Vercel logo"
										width={76}
										height={65}
										className="aspect-[7.6/6.5] w-[28px] object-contain sm:w-[48px] md:w-[60px] xl:w-[76px]"
									/>
								</li>
								<li>
									<Image
										src={webflow}
										alt="Webflow logo"
										width={96}
										height={96}
										className="aspect-square w-[38px] object-contain sm:w-[58px] md:w-[70px] xl:w-[80px]"
									/>
								</li>
							</ul>
						</div>
					</div>
				</Container>
			</Section>
			<Section className="overflow-hidden bg-black py-16 text-white md:py-32 md:px-16">
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
						images={[
							{
								src: "/images/posters/poster_01.png",
								alt: "#postereveryday design - Day 50",
							},
							{
								src: "/images/posters/poster_02.png",
								alt: "#postereveryday design - Day 49",
							},
							{
								src: "/images/posters/poster_03.png",
								alt: "#postereveryday design - Day 47",
							},
							{
								src: "/images/posters/poster_04.png",
								alt: "#postereveryday design - Day 25",
							},
						]}
						imageWidth={400}
						imageHeight={533}
						dragText={dictionary.Portfolio.poster.drag}
					/>
					<PosterGallery
						images={[
							{
								src: "/images/posters/poster_05.png",
								alt: "#postereveryday design - Day 46",
							},
							{
								src: "/images/posters/poster_06.png",
								alt: "#postereveryday design - Day 21",
							},
							{
								src: "/images/posters/poster_07.png",
								alt: "#postereveryday design - Day 45",
							},
							{
								src: "/images/posters/poster_08.png",
								alt: "#postereveryday design - Day 30",
							},
						]}
						imageWidth={400}
						imageHeight={533}
						dragText={dictionary.Portfolio.poster.drag}
					/>
				</Container>
			</Section>
			<CTA
				title={dictionary.Portfolio.cta.title}
				description={dictionary.Portfolio.cta.description}
			/>
		</>
	);
};

export default PortfolioPage;
