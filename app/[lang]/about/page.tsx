import Link from "next/link";

import messages from "@/dictionaries/en.json";

import { AboutSection } from "~components/sections/About";
import Artists from "~components/TopArtists/TopArtists";
import { Button } from "~components/Button";
import { Container } from "~components/Container";
import NowPlaying from "~components/NowPlaying/NowPlaying";
import { Section } from "~components/Section";

import { GenreSolarSystem } from "./GenreSolarSystem";

import { Locale } from "@/i18n.config";
import { getDictionary } from "@/utils/getDictionary";

export const metadata = {
	title: "Milovan Gudelj - About me",
	alternates: {
		canonical: "https://www.milovangudelj.com/en/about",
		languages: { "it-IT": "https://www.milovangudelj.com/it/about" },
	},
};

const AboutPage = async ({
	params: { lang = "en" },
}: {
	params: { lang: Locale };
}) => {
	const dictionary = await getDictionary(lang);

	return (
		<>
			<AboutSection standAlone lang={lang} />
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
							{dictionary.About.music.title}
						</h2>
						<p className="text-body">{dictionary.About.music.p1}</p>
						<p className="text-body">
							{/* TODO: Replace link with actual element */}
							{dictionary.About.music.p2}
						</p>
						<Button as={Link} href={`/${lang}/music-stats`}>
							{dictionary.About.music.cta}
						</Button>
					</div>
					<div className="relative">
						<NowPlaying
							title={dictionary.About.nowPlaying.title}
							notPlayingMessage={dictionary.About.nowPlaying.notPlaying}
						/>
						<Artists
							className="mt-16"
							title={dictionary.About.topArtists.title}
							itemAltText={{
								artist: dictionary.WrappedList.alt.artist,
								track: dictionary.WrappedList.alt.track,
							}}
							itemOpenText={dictionary.WrappedList.open}
							itemListenText={dictionary.WrappedList.listen}
						/>
						<GenreSolarSystem
							title={dictionary.About.genreSolarSystem.title}
						/>
					</div>
				</Container>
			</Section>
		</>
	);
};

export default AboutPage;
