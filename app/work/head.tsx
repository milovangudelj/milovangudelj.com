import { HeadMeta } from "../../components/HeadMeta";
import DefaultTags from "../DefaultTags";

const meta = {
	title: "Milovan Gudelj - My work",
	description: "A collection of past project I've worked on an am proud of.",
	url: "https://milovangudelj.com/work",
	image: "https://milovangudelj.com/images/og-image.png",
};

const WorkHead = () => {
	return (
		<>
			<DefaultTags />
			<HeadMeta metadata={meta} />
		</>
	);
};

export default WorkHead;
