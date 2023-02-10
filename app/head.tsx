import { HeadMeta } from "../components/HeadMeta";
import DefaultTags from "./DefaultTags";

const meta = {
	title: "Milovan Gudelj - Web developer / UI designer",
	description:
		"I design and develop engaging websites and delightful digital experiences.",
	url: "https://www.milovangudelj.com",
	image: "https://www.milovangudelj.com/images/og-image.png",
};

export default function RootHead() {
	return (
		<>
			<DefaultTags />
			<HeadMeta metadata={meta} />
		</>
	);
}
