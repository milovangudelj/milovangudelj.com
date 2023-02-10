import DefaultTags from "../DefaultTags";
import { HeadMeta } from "../../components/HeadMeta";

const meta = {
	title: "Milovan Gudelj - Contact me",
	description:
		"Let's work together! Feel free to reach out to me for any questions you might have.",
	url: "https://www.milovangudelj.com/contact",
	image: "https://www.milovangudelj.com/images/og-image.png",
};

const ContactHead = () => {
	return (
		<>
			<DefaultTags />
			<HeadMeta metadata={meta} />
		</>
	);
};

export default ContactHead;
