import Link from "next/link";

import messages from "../../messages/en.json";

import { AboutSection } from "@components/sections/About";
import Artists from "@components/TopArtists/TopArtists";
import { Button } from "@components/Button";
import { Container } from "@components/Container";
import NowPlaying from "@components/NowPlaying/NowPlaying";
import { Section } from "@components/Section";

import { GenreSolarSystem } from "./GenreSolarSystem";

export const metadata = {
	title: "Milovan Gudelj - About me",
	alternates: {
		canonical: "https://www.milovangudelj.com/about",
		languages: { "it-IT": "https://www.milovangudelj.com/it/about" },
	},
};

const AboutPage = async () => {
	return (
		<>
			<AboutSection standAlone />
			<Section className="relative overflow-hidden bg-lavender text-white">
				<div
					aria-hidden
					className="pointer-events-none absolute top-0 bottom-0 right-0 left-1/2 bg-[url('/images/notes-tile.png')] bg-repeat opacity-10"
				>
					<div className="absolute inset-0 bg-gradient-to-r from-lavender to-lavender/0"></div>
				</div>
				<Container className="relative">
					<div className="space-y-8">
						<h2 className="text-h2-mobile md:text-h2">
							{messages.About.music.title}
						</h2>
						<p className="text-body">{messages.About.music.p1}</p>
						<p className="text-body">
							{/* TODO: Replace link with actual element */}
							{messages.About.music.p2}
						</p>
						<Button as={Link} href="/music-stats">
							{messages.About.music.cta}
						</Button>
					</div>
					<div className="relative">
						<NowPlaying
							title={messages.About.nowPlaying.title}
							notPlayingMessage={messages.About.nowPlaying.notPlaying}
						/>
						<Artists
							className="mt-16"
							title={messages.About.topArtists.title}
							itemAltText={{
								artist: messages.WrappedList.alt.artist,
								track: messages.WrappedList.alt.track,
							}}
							itemOpenText={messages.WrappedList.open}
							itemListenText={messages.WrappedList.listen}
						/>
						<GenreSolarSystem
							title={messages.About.genreSolarSystem.title}
						/>
					</div>
				</Container>
			</Section>
		</>
	);
};

export default AboutPage;
