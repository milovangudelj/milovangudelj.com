import { HeadMeta } from "../../components/HeadMeta";
import DefaultTags from "../DefaultTags";

const meta = {
	title: "Milovan Gudelj - Music-Stats",
	description: "Get your cool Spotify Music-Stats poster now",
	url: "https://milovangudelj.com/music-stats",
	image: "https://milovangudelj.com/images/og-image-ms.png",
};

const MusicStatsHead = () => {
	return (
		<>
			<DefaultTags />
			<HeadMeta metadata={meta} />
		</>
	);
};

export default MusicStatsHead;