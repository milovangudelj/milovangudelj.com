import { Link } from "next-intl";
import { getTranslations } from "next-intl/server";

import { AboutSection } from "~components/sections/About";
import Artists from "~components/TopArtists/TopArtists";
import { Button } from "~components/Button";
import { Container } from "~components/Container";
import NowPlaying from "~components/NowPlaying/NowPlaying";
import { Section } from "~components/Section";

import { GenreSolarSystem } from "./GenreSolarSystem";

export const metadata = {
	title: "Milovan Gudelj - About me",
	alternates: {
		canonical: "https://www.milovangudelj.com/about",
		languages: { "it-IT": "https://www.milovangudelj.com/it/about" },
	},
};

const AboutPage = async () => {
	const t = await getTranslations("About");
	const artistsListT = await getTranslations("WrappedList");

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
							{t("music.title")}
						</h2>
						<p className="text-body">{t("music.p1")}</p>
						<p className="text-body">
							{t.rich("music.p2", {
								link: (chunks) =>
									(
										<a
											href="https://www.spotify.com/wrapped"
											rel="noopener noreferrer"
											target={"_blank"}
											className="underline underline-offset-2 hover:no-underline"
										>
											{chunks}
										</a>
									) as unknown as string,
							})}
						</p>
						<Button as={Link} href="/music-stats">
							{t("music.cta")}
						</Button>
					</div>
					<div className="relative">
						<NowPlaying
							title={t("nowPlaying.title")}
							notPlayingMessage={t("nowPlaying.notPlaying")}
						/>
						<Artists
							className="mt-16"
							title={t("topArtists.title")}
							itemAltText={{
								artist: artistsListT("alt.artist"),
								track: artistsListT("alt.track"),
							}}
							itemOpenText={artistsListT("open")}
							itemListenText={artistsListT("listen")}
						/>
						<GenreSolarSystem title={t("genreSolarSystem.title")} />
					</div>
				</Container>
			</Section>
		</>
	);
};

export default AboutPage;
