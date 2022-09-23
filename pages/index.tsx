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

const Home: NextPage<{ posts: any }> = ({ posts }) => {
	return (
		<Layout>
			<section className="">
				<main className="max-w-7xl mx-auto py-16 px-8 space-y-16">
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
				<div className="max-w-7xl mx-auto py-16 px-8 space-y-16">
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
				<div className="max-w-7xl mx-auto py-16 px-8 space-y-16">
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
					<ul className="flex">
						<li>
							<ProjectCard />
						</li>
					</ul>
				</div>
			</section>
		</Layout>
	);
};

export default Home;
