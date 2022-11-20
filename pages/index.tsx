import type { GetStaticProps, NextPage } from "next";
import { gql } from "graphql-request";
import Image from "next/legacy/image";

import {
	Container,
	HeadMeta,
	Hourglass,
	Layout,
	ProjectCard,
	Section,
} from "../components";
import { hygraph } from "../lib/hygraph";

import me from "../public/images/poly-me.png";
import smiley from "../public/images/smiley.svg";

import { Project } from "./work";
import { CTA } from "../components/sections";

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
	return (
		<Layout>
			<HeadMeta metadata={meta} />
			<section className="">
				<main className="mx-auto max-w-8xl space-y-16 py-16 px-8 md:py-32 md:px-16">
					<h1 className="text-d2-mobile md:text-d1-mobile xl:text-d1">
						Web developer <br />
						<span className="text-yellow">/</span> UI designer
					</h1>
					<p className="text-sub-heading-mobile md:text-sub-heading xl:max-w-[36ch]">
						Hi, I&apos;m Milo. I design and develop engaging websites and
						delightful digital experiences.
					</p>
				</main>
			</section>
			<Section>
				<Container className="md:relative md:space-y-0">
					<div className="flex justify-center md:absolute md:-top-16 md:right-16 xl:right-32">
						<Hourglass>
							<span className="absolute inset-0 left-4 overflow-hidden border-b-2">
								<Image
									src={me}
									layout={"fill"}
									objectPosition={"top left"}
									objectFit={"cover"}
									alt={"My profile picture"}
								/>
							</span>
						</Hourglass>
					</div>
					<div className="space-y-8">
						<h2 className="text-h1-mobile md:text-d2-mobile xl:text-d2">
							About me
						</h2>
						<p className="text-body xl:max-w-[680px]">
							I&apos;m a computer science student really passionate about
							web development and UI/UX design. I love seeing a simple
							yet empowerig User Interface and a great User Experience.
						</p>
						<p className="text-body xl:max-w-[680px]">
							I started building websites about 4 years ago and I fell in
							love with it. At the same time I also began experimenting
							with graphic design and making posters.
						</p>
						<p className="text-body xl:max-w-[680px]">
							Slowly but surely I made my way into the wonderful world of
							web development and UI/UX design.
						</p>
					</div>
				</Container>
			</Section>
			<Section className="bg-green">
				<Container className="md:space-y-32">
					<div className="relative space-y-8 md:space-y-0">
						<h2 className="text-h1-mobile md:mb-8 md:text-d2-mobile xl:text-d2">
							My work
						</h2>
						<p className="text-body xl:max-w-[680px]">
							In the past couple of years I&apos;ve had the opportunity
							to work on a few diverse projects and demonstrate my
							skills. Here are some of them.
						</p>
						<span className="absolute -top-16 right-0 h-[64px] w-[65px] md:h-[128px] md:w-[130px] xl:-top-0 xl:right-16 xl:h-[192.2px] xl:w-[196.23px]">
							<Image
								src={smiley}
								layout={"fill"}
								objectFit={"cover"}
								alt="Smile emoji sticker"
							/>
						</span>
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
