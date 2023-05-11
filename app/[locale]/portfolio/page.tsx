import Image from "next/image";

import { CTA } from "@components/sections/CTA";
import { getTranslations } from "next-intl/server";

import { Container } from "@components/Container";
import { Section } from "@components/Section";
import { PosterGallery } from "@components/PosterGallery";

import squiggle from "@images/squiggle.svg";
import arrow from "@images/arrow.svg";

import figma from "@images/logos/logo_figma.svg";
import illustrator from "@images/logos/logo_illustrator.svg";
import lightroom from "@images/logos/logo_lightroom.svg";
import photoshop from "@images/logos/logo_photoshop.svg";

import nextjs from "@images/logos/logo_nextjs.svg";
import vercel from "@images/logos/logo_vercel.svg";
import tailwindcss from "@images/logos/logo_tailwindcss.svg";
import webflow from "@images/logos/logo_webflow.svg";

export const metadata = {
	title: "Milovan Gudelj - Portfolio",
	description:
		"My portfolio! Feel free to reach out to me for any questions you might have.",
	alternates: {
		canonical: "https://www.milovangudelj.com/portfolio",
		languages: { "it-IT": "https://www.milovangudelj.com/it/portfolio" },
	},
};

const PortfolioPage = async () => {
	const t = await getTranslations("Contact");

	return (
		<>
			<Section className="relative scroll-mt-[72px] overflow-hidden bg-salmon md:scroll-mt-[88px]">
				<main className="relative mx-auto flex max-w-7xl items-center justify-between px-8 2xl:px-0">
					<div className="space-y-8">
						<h1 className="text-d2-mobile xl:text-d2">Portfolio</h1>
						<p className="text-sub-heading sm:max-w-[468px]">
							This is mainly a collection of poster designs I made, with
							a little bit of information about my past experiences.
						</p>
					</div>
					<div className="absolute -top-2 -right-96 md:-right-64 xl:-right-16">
						<Image
							src={squiggle}
							alt="Black squiggly line"
							width={528}
							height={80}
						/>
					</div>
				</main>
				<div className="absolute bottom-0 left-1/2 aspect-square w-[96px] translate-y-1/2 -translate-x-1/2 rounded-full border-[16px] border-black md:w-[182px]"></div>
			</Section>
			<Section className="bg-black py-16 text-white md:py-32 md:px-16">
				<Container>
					<h2 className="text-h2-mobile md:text-h2">Experience</h2>
					<div className="relative space-y-8 text-body md:flex md:space-y-0">
						<div className="flex-1 space-y-8 md:mr-32">
							<p>
								I&apos;m a computer science student at the University of
								Padua. In the past five years I gathered experience as a
								web developer and designer through various projects.
							</p>
							<p>
								I did everything going from a handful of different
								websites, to logo designs and some sick posters.
							</p>
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
							<p>
								My most successful endeavor so far has been my swimming
								club&apos;s website which regularly gets anywhere
								between 700 to 500 monthly visits.
							</p>
							<p>
								And of course there&apos;s the website you&apos;re
								staring at right now. This one was particularly fun to
								make.
							</p>
						</div>
					</div>
				</Container>
			</Section>
			<Section className="bg-black py-16 text-white md:py-32 md:px-16">
				<Container>
					<h2 className="text-h2-mobile md:text-h2">Software</h2>
					<p className="mt-16 max-w-[468px] text-sub-heading-mobile md:text-sub-heading">
						I&apos;m proficient with a range of different applications and
						tools.
					</p>
					<div className="space-y-8">
						<h3 className="text-sub-heading-mobile text-yellow md:text-sub-heading">
							Design
						</h3>
						<div className="items-center gap-32 space-y-8 xl:flex xl:space-y-0">
							<div className="flex-1 space-y-8">
								<p className="text-body">
									I used extensively Photoshop, Illustrator and
									Lightroom. I use Figma on a daily basis and I would
									say I have an advanced level of skill with it.
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
							Web
						</h3>
						<div className="items-center gap-32 space-y-8 xl:flex xl:space-y-0">
							<div className="flex-1 space-y-8">
								<p className="text-body">
									When developing websites I use primarily Next.js
									paired with TailwindCSS for styling and the Vercel
									platform for deployment.
								</p>
								<p className="text-body">
									In the past I&apos;ve used website builders like Wix,
									but I focused on Webflow since it gave me a deeper
									level of customization and control over the final
									product.
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
					<h2 className="text-h2-mobile md:text-h2">Poster</h2>
					<p className="mt-16 max-w-[468px] text-sub-heading-mobile md:text-sub-heading">
						In 2020 I started the{" "}
						<span className="text-yellow">#postereveryday</span>{" "}
						challenge. Here are some of the best ones
					</p>
					<PosterGallery
						images={[
							{
								src: "/images/posters/poster_01.png",
								alt: "poster1",
							},
							{
								src: "/images/posters/poster_02.png",
								alt: "poster2",
							},
							{
								src: "/images/posters/poster_03.png",
								alt: "poster3",
							},
							{
								src: "/images/posters/poster_04.png",
								alt: "poster4",
							},
						]}
						imageWidth={400}
						imageHeight={533}
					/>
					<PosterGallery
						images={[
							{
								src: "/images/posters/poster_05.png",
								alt: "poster5",
							},
							{
								src: "/images/posters/poster_06.png",
								alt: "poster6",
							},
							{
								src: "/images/posters/poster_07.png",
								alt: "poster7",
							},
							{
								src: "/images/posters/poster_08.png",
								alt: "poster8",
							},
						]}
						imageWidth={400}
						imageHeight={533}
					/>
				</Container>
			</Section>
			<CTA
				title={"Got a question?"}
				description={
					"Don’t hesitate to reach out if you have questions about anything you just read."
				}
			/>
		</>
	);
};

export default PortfolioPage;
