import type { GetStaticProps, NextPage } from "next";
import { gql } from "graphql-request";

import {
	Container,
	HeadMeta,
	Layout,
	ProjectCard,
	Section,
	Smiley,
	Star,
} from "../components";
import { hygraph } from "../lib/hygraph";

import { Project } from "./work";
import { AboutSection, CTA } from "../components/sections";
import { useEffect, useState } from "react";

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

export const getStaticProps: GetStaticProps = async () => {
	const { projects } = await hygraph.request(QUERY);

	return {
		props: {
			projects,
		},
	};
};

const meta = {
	title: "Milovan Gudelj - Web developer / UI designer",
	description:
		"I design and develop engaging websites and delightful digital experiences.",
	url: "https://milovangudelj.com/",
	image: "https://milovangudelj.com/images/og-image.png",
};

const Home: NextPage<{ projects: Omit<Project, "description">[] }> = ({
	projects,
}) => {
	const [animateS0, setAnimateS0] = useState(false);
	const [animateS1, setAnimateS1] = useState(false);
	const [animateS2, setAnimateS2] = useState(false);

	useEffect(() => {
		const wiggle = () => {
			const star = Math.floor(Math.random() * 3);
			switch (star) {
				case 0:
					setAnimateS0(true);
					break;
				case 1:
					setAnimateS1(true);
					break;
				case 2:
					setAnimateS2(true);
					break;
			}
		};

		const interval = setInterval(wiggle, 1000);

		return () => {
			clearInterval(interval);
		};
	}, []);

	return (
		<Layout>
			<HeadMeta metadata={meta} />
			<section className="">
				<main className="relative mx-auto max-w-8xl py-16 px-8 md:py-32 md:px-16">
					<h1 className="mb-16 text-h1-mobile md:text-d1-mobile xl:text-d1">
						Web developer <br className="hidden md:inline" />
						<span className="text-yellow">/</span> UI designer
					</h1>
					<p className="text-sub-heading-mobile md:text-sub-heading xl:max-w-[36ch]">
						Hi, I&apos;m Milo. I design and develop engaging websites and
						delightful digital experiences.
					</p>
					<div className="absolute top-0 right-0 mt-9 mr-20 h-[180px] w-[117px] -translate-y-1/3 scale-50 md:top-1/2 md:mr-16 md:mt-0 md:-translate-y-1/2 md:scale-75 xl:mr-48 xl:scale-100">
						<Star
							delay={0.3}
							animate={animateS0}
							onAnimationEnd={() => setAnimateS0(false)}
							className="absolute top-[99px] left-[99px]"
						/>
						<Star
							width={36}
							height={60}
							delay={0.6}
							animate={animateS1}
							onAnimationEnd={() => setAnimateS1(false)}
							animation="inverse"
							className="absolute top-0 left-[63px]"
						/>
						<Star
							width={54}
							height={90}
							animate={animateS2}
							onAnimationEnd={() => setAnimateS2(false)}
							className="absolute top-[90px] left-0"
						/>
					</div>
				</main>
			</section>
			<AboutSection />
			<Section className="bg-green">
				<Container className="md:space-y-32">
					<div className="relative space-y-8 md:space-y-0">
						<h2 className="text-h2-mobile md:mb-8 md:text-d2-mobile xl:text-d2">
							My work
						</h2>
						<p className="text-body xl:max-w-[680px]">
							In the past couple of years I&apos;ve had the opportunity
							to work on a few diverse projects and demonstrate my
							skills. Here are some of them.
						</p>
						<Smiley className="absolute -top-16 right-0 h-[64px] w-[65px] text-light-cyan md:h-[128px] md:w-[130px] xl:-top-0 xl:right-16 xl:h-[192.2px] xl:w-[196.23px]" />
					</div>
					<div className="relative">
						<ul className="scrollbar-hidden snap -mx-8 flex snap-x flex-nowrap overflow-x-auto md:-mx-16 xl:mx-0 xl:space-x-16">
							{projects.map(({ id, ...props }) => (
								<li
									key={id}
									className="flex-initial snap-start pl-8 last:pr-8 md:pl-16 md:last:pr-16 xl:p-0"
								>
									<ProjectCard {...props} />
								</li>
							))}
						</ul>
						<span className="absolute top-0 right-0 bottom-0 hidden w-32 bg-gradient-to-r from-green/0 to-green xl:block"></span>
					</div>
				</Container>
			</Section>
			<CTA />
		</Layout>
	);
};

export default Home;
