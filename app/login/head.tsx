import { HeadMeta } from "../../components/HeadMeta";
import DefaultTags from "../DefaultTags";

const meta = {
	title: "Milovan Gudelj - Login",
	description:
		"Login to your account to see your top artists, tracks and download your Music-Stats poster.",
	url: "https://www.milovangudelj.com/login",
	image: "https://www.milovangudelj.com/images/og-image.png",
};

export default function LoginHead() {
	return (
		<>
			<DefaultTags />
			<HeadMeta metadata={meta} />
		</>
	);
}
