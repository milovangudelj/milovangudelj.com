import type { NextPage } from "next";
import { gql } from "graphql-request";
import { hygraph } from "../lib/hygraph";
import { Hourglass, Layout } from "../components";
import Image from "next/image";

import smiley from "../public/smiley.svg";
import { ProjectCard } from "../components/ProjectCard/ProjectCard";

// const QUERY = gql`
// 	{
// 		posts {
// 			id
// 			slug
// 			title
// 			subtitle
// 			body {
// 				markdown
// 				html
// 			}
// 		}
// 	}
// `;

// export async function getStaticProps() {
// 	const { posts } = await hygraph.request(QUERY);

// 	return {
// 		props: {
// 			posts,
// 		},
// 	};
// }

const projects = [
	{
		id: "pr_01",
		title: "Swim club Agordo",
		href: "https://piscinacomprensorialeagordina.it",
		link: "https://piscinacomprensorialeagordina.it",
		image: "/dummy.png",
	},
	{
		id: "pr_02",
		title: "DoYourThing",
		href: "https://doyourthing.dev",
		link: "https://doyourthing.dev",
		image: "/dummy.png",
	},
	{
		id: "pr_03",
		title: "UniOrari",
		href: "https://uniorari.it",
		link: "https://uniorari.it",
		image: "/dummy.png",
	},
];

const Home: NextPage<{ posts: any }> = ({ posts }) => {
	return (
		<Layout>
			<section className="">
				<main className="max-w-8xl mx-auto py-16 px-8 space-y-16">
					<h1 className="text-h3-mobile max-w-[8ch] md:max-w-full">
						Web developer <span className="text-primary">/</span> designer
					</h1>
					<p className="text-sub-heading-mobile">
						Hi, I&apos;m Milo. I design and develop engaging websites and
						delightful digital experiences.
					</p>
				</main>
			</section>
			<section className="text-black bg-orange">
				<div className="max-w-8xl mx-auto py-16 px-8 space-y-16">
					<div className="flex justify-center">
						<Hourglass>
							<span className="text-body-sm">photo of me</span>
						</Hourglass>
					</div>
					<div className="space-y-8">
						<h2 className="text-h3-mobile">About me</h2>
						<p className="text-body-lg">
							I&apos;m a computer science student really passionate about
							web development and UI/UX design. I love seeing a simple
							yet empowerig User Interface and a great User Experience.
						</p>
						<p className="text-body-lg">
							I started building websites about 4 years ago and I fell in
							love with it. At the same time I also began experimenting
							with graphic design and making posters.
						</p>
						<p className="text-body-lg">
							Slowly but surely I made my way into the wonderful world of
							web development and UI/UX design.
						</p>
					</div>
				</div>
			</section>
			<section className="text-black bg-green">
				<div className="max-w-8xl mx-auto py-16 px-8 space-y-16">
					<div className="space-y-8 relative">
						<h2 className="text-h3-mobile">My work</h2>
						<p className="text-body-lg">
							In the past couple of years I&apos;ve had the opportunity
							to work on a few diverse projects and demonstrate my
							skills. Here are some of them.
						</p>
						<span className="absolute top-[-64px] right-0">
							<Image
								src={smiley}
								width={65}
								height={64}
								alt="Smile emoji sticker"
							/>
						</span>
					</div>
					<ul className="-mx-8 px-8 flex flex-nowrap space-x-12 overflow-x-auto">
						{projects.map((project) => (
							<li key={project.id} className="flex-initial">
								<ProjectCard
									title={project.title}
									href={project.href}
									link={project.link}
									image={project.image}
								/>
							</li>
						))}
					</ul>
				</div>
			</section>
			<section className="bg-blue">
				<div className="max-w-8xl mx-auto py-16 px-8 space-y-16">
					<div className="space-y-8">
						<h2 className="text-h3-mobile">Let's work together</h2>
						<p className="text-body-lg">
							If you like what I do please feel free to contact me and
							who nkows, we might build the next big thing or just a cool
							looking website.
						</p>
					</div>
					<div className="flex space-x-4 py-0.5 items-center">
						<a
							href="mailto:milovan.gudelj@gmail.com"
							className="text-body-lg font-semibold"
						>
							milovan.gudelj@gmail.com
						</a>
						<span className="text-primary [filter:drop-shadow(4px_4px_0_black)]">
							<svg
								width="48"
								height="48"
								viewBox="0 0 49 49"
								fill="current-color"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M7.39128 48.9185L0.724609 42.2518L30.3437 12.6327L33.7722 10.1566L33.1056 8.72798L29.0103 9.68036H12.0579V0.918457H43.9627L48.8198 5.87084V37.6804H39.9627V20.6327L40.9151 16.4423L39.4865 15.8708L37.0103 19.2994L7.39128 48.9185Z"
									fill="#FFC700"
								/>
							</svg>
						</span>
					</div>
				</div>
			</section>
		</Layout>
	);
};

export default Home;
