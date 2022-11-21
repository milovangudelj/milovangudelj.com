import Image from "next/legacy/image";

import { HeadMeta, Layout, Tracks as TopTracks } from "../components";
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
		</Layout>
	);
};

export default About;
