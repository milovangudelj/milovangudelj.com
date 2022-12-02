import Image from "next/legacy/image";

import {
	Artists,
	Container,
	HeadMeta,
	Layout,
	NowPlaying,
	Section,
	Tracks as TopTracks,
} from "../components";
import { AboutSection } from "../components/sections";

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
			<AboutSection standAlone />
			<Section className="relative bg-lavender text-white">
				<div
					aria-hidden
					className="pointer-events-none absolute top-0 bottom-0 right-0 left-1/2 bg-[url('/images/notes-tile.png')] bg-repeat opacity-10"
				>
					<div className="absolute inset-0 bg-gradient-to-r from-lavender to-lavender/0"></div>
				</div>
				<Container className="relative">
					<div className="space-y-8">
						<h2 className="text-h2-mobile md:text-d2-mobile xl:text-d2">
							Oh, btw...
						</h2>
						<p className="text-body xl:max-w-[680px]">
							I looove music. So if you&apos;re interested here&apos;s a
							little bit of information about that.
						</p>
					</div>
					<NowPlaying />
					<Artists />
				</Container>
			</Section>
		</Layout>
	);
};

export default About;
