import Image from "next/image";

import { HeadMeta, Layout } from "../components";

import igLogo from "../public/images/igLogo.png";
import twLogo from "../public/images/twLogo.svg";
import drLogo from "../public/images/drLogo.svg";
import { useWindowSize } from "../lib/windowSizeContext";
import { CTA } from "../components/sections";

const meta = {
	title: "Milovan Gudelj - Contact me",
	description:
		"Let's work together! Feel free to reach out to me for any questions you might have.",
	url: "https://milovangudelj.com/contact",
	image: "https://milovangudelj.com/images/og-image.png",
};

const Contact = () => {
	const { desktop } = useWindowSize();

	return (
		<Layout>
			<HeadMeta metadata={meta} />
			<section className="scroll-mt-[72px] md:scroll-mt-[88px]">
				<main className="mx-auto flex max-w-8xl items-center justify-between py-16 px-8 md:py-32 md:px-16">
					<div className="space-y-16">
						<div className="space-y-8">
							<h1 className="text-h1-mobile md:text-d1-mobile xl:text-d1">
								My @s
							</h1>
							<p className="text-body xl:max-w-[680px]">
								You can find me pretty much anywhere by typing in my
								name. But just in case here you can find a few links to
								my social platforms.
							</p>
						</div>
						<div className="flex items-center space-x-6 py-0.5 font-space md:space-x-12">
							<a
								href="https://instagram.com/milovangudelj"
								target="_blank"
								rel="noreferrer"
								className="text-body font-semibold transition hover:text-instagram md:text-sub-heading-mobile xl:text-sub-heading"
							>
								Instagram <span className="text-instagram">↗</span>
							</a>
							<a
								href="https://dribbble.com/milovangudelj"
								target="_blank"
								rel="noreferrer"
								className="text-body font-semibold transition hover:text-dribbble md:text-sub-heading-mobile xl:text-sub-heading"
							>
								Dribbble <span className="text-dribbble">↗</span>
							</a>
							<a
								href="https://twitter.com/milovangudelj"
								target="_blank"
								rel="noreferrer"
								className="text-body font-semibold transition hover:text-twitter md:text-sub-heading-mobile xl:text-sub-heading"
							>
								Twitter <span className="text-twitter">↗</span>
							</a>
						</div>
					</div>
					<div
						aria-hidden={!desktop}
						className="mr-8 hidden origin-center rotate-12 flex-col items-center space-y-20 xl:flex"
					>
						<Image
							alt="Dribbble logo"
							className="origin-center -rotate-12"
							src={drLogo}
							width={100}
							loading="eager"
						/>
						<div className="flex space-x-[100px]">
							<Image
								alt="Twitter logo"
								className="origin-center -rotate-12"
								src={twLogo}
								width={100}
								loading="eager"
							/>
							<Image
								alt="Instagram logo"
								className="origin-center -rotate-12"
								src={igLogo}
								width={100}
								loading="eager"
							/>
						</div>
					</div>
				</main>
			</section>
			<CTA />
		</Layout>
	);
};

export default Contact;
