import Image from "next/image";

import { CTA } from "~components/sections/CTA";
import { TopArtists } from "~components/TopArtists";
import { Container } from "~components/Container";
import { Section } from "~components/Section";

import { Locale } from "~/i18n.config";
import { getDictionary } from "~/utils/getDictionary";

import heroImage from "~images/poly-me.png";
import { NowPlaying } from "~/components";

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
			<Section className="relative min-h-[calc(100vh-72.39px)]">
				<Container>
					<h1 className="text-d1-mobile 2xl:text-d1">
						{dictionary.About.main.title}
					</h1>
					<div className="space-y-8">
						<p className="max-w-[680px] text-sub-heading-mobile text-white 2xl:text-sub-heading">
							{dictionary.About.main.p1}
						</p>
						<p className="max-w-[680px] text-body text-white/70">
							{dictionary.About.main.p2}
						</p>
					</div>
				</Container>
				<Image
					src={heroImage}
					alt="A picture of me"
					width={402}
					height={535}
					placeholder="blur"
					className="pointer-events-none absolute bottom-0 right-[calc((100%-1280px)/2)] select-none object-cover"
				/>
			</Section>
			<Section className="relative">
				<Container>
					<h2 className="text-h2-mobile md:text-h2">Music</h2>
					<div className="flex">
						<div className="flex-1 space-y-8 text-white/70">
							<p>
								Music has been, and still is, a huge part of my life. I
								grew up listening to 70s, 80s and 90s music mixed with a
								healthy dose of Italian songwriters like Francesco
								Guccini and Fiorella Mannoia.
							</p>
							<p>
								Just imagine an Italian nine-year-old listening to Joe
								Cocker&apos;s “Unchain My Heart”, or maybe Cat
								Stevens&apos; “Father and Son”. Pretty cool I&apos;d
								say.
							</p>
							<p>
								As time went by my taste expanded and ventured off in
								the Hip-Hop land. There I discovered artists like The
								Notorious Big, The Game, Kendrick Lamar, J. Cole, Lil
								Wayne and Eminem just to name a few.
							</p>
							<p>
								Below you can see what I&apos;m listening to right now,
								and my top artists in the past year according to
								Spotify.
							</p>
						</div>
						<NowPlaying
							notPlayingMessage="Not playing"
							title="I'm listening to:"
						/>
					</div>
					<TopArtists
						className="mt-16"
						title={dictionary.About.topArtists.title}
						itemAltText={dictionary.WrappedList.artist}
						itemOpenText={dictionary.WrappedList.open}
					/>
				</Container>
			</Section>
			<CTA lang={lang} />
		</>
	);
};

export default AboutPage;
