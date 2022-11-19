import Image from "next/legacy/image";

import { HeadMeta, Hourglass, Layout } from "../components";

import me from "../public/images/poly-me.png";

const meta = {
	title: "Milovan Gudelj - About me",
	description:
		"I design and develop engaging websites and delightful digital experiences.",
	url: "https://milovangudelj.com/about",
	image: "https://milovangudelj.com/images/og-image.png",
};

const About = () => {
	return (
		<Layout>
			<HeadMeta metadata={meta} />
			<section className="text-black bg-orange scroll-mt-[72px] md:scroll-mt-[88px]">
				<main className="max-w-8xl mx-auto py-16 px-8 md:py-32 md:px-16 space-y-16 md:space-y-0 md:relative">
					<div className="flex justify-center md:absolute md:top-32 md:rotate-12 md:right-16 xl:right-32">
						<Hourglass>
							<span className="absolute inset-0 left-4 bottom-0.5 overflow-hidden">
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
						<h1 className="text-h3-mobile md:text-h2-mobile xl:text-h2">
							About me
						</h1>
						<p className="text-body-lg xl:max-w-[680px]">
							I&apos;m a computer science student really passionate about
							web development and UI/UX design. I love seeing a simple
							yet empowerig User Interface and a great User Experience.
						</p>
						<p className="text-body-lg xl:max-w-[680px]">
							I started building websites about 4 years ago and I fell in
							love with it. At the same time I also began experimenting
							with graphic design and making posters.
						</p>
						<p className="text-body-lg xl:max-w-[680px]">
							Slowly but surely I made my way into the wonderful world of
							web development and UI/UX design.
						</p>
					</div>
				</main>
			</section>
		</Layout>
	);
};

export default About;
