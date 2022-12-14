import Link from "next/link";
import { useEffect } from "react";

import {
	Artists,
	Button,
	Container,
	HeadMeta,
	Layout,
	NowPlaying,
	Section,
	Tracks as TopTracks,
} from "../components";
import { AboutSection } from "../components/sections";
import { useWindowSize } from "../lib/windowSizeContext";
import { getLuminance, TEXT_LUMINANCE_TRESHOLD } from "../utils/getLuminance";
import { spotifyColors } from "../utils/spotifyColors";

const meta = {
	title: "Milovan Gudelj - About me",
	description:
		"I design and develop engaging websites and delightful digital experiences.",
	url: "https://milovangudelj.com/about",
	image: "https://milovangudelj.com/images/og-image.png",
};

const topGenres = [
	{
		id: "tg_01",
		label: "Rap",
		color: spotifyColors["brand"],
	},
	{
		id: "tg_02",
		label: "Pop",
		color: spotifyColors["orange"],
	},
	{
		id: "tg_03",
		label: "Italian hip hop",
		color: spotifyColors["pink"],
	},
	{
		id: "tg_04",
		label: "Modern Rock",
		color: spotifyColors["yellow"],
	},
	{
		id: "tg_05",
		label: "Alternative R&B",
		color: spotifyColors["purple"],
	},
];

const About = () => {
	const { desktopSm, desktop } = useWindowSize();
	useEffect(() => {
		const d = desktopSm || desktop ? 656 : 624;
		const r = d / 2;
		const a = Math.PI / 8;
		const offsetA = (5 * Math.PI) / 8;

		for (let i = 1; i <= 5; i++) {
			const angle = 2 * Math.PI - (offsetA + a * i);
			const x = r * Math.cos(angle);
			const y = r * Math.sin(angle);

			document.documentElement.style.setProperty(`--planet${i}-x`, `${x}px`);
			document.documentElement.style.setProperty(`--planet${i}-y`, `${y}px`);
		}
	}, [desktopSm, desktop]);

	return (
		<Layout>
			<HeadMeta metadata={meta} />
			<AboutSection standAlone />
			<Section className="relative bg-lavender text-white">
				<div
					aria-hidden
					className="pointer-events-none absolute top-0 bottom-0 right-0 left-1/2 bg-[url('/images/notes-tile.png')] bg-repeat opacity-10"
				>
					<div className="absolute inset-0 bg-gradient-to-r from-lavender to-lavender/0"></div>
				</div>
				<Container className="relative">
					<div className="space-y-8">
						<h2 className="text-h2-mobile md:text-d2-mobile xl:text-d2">
							Oh, btw...
						</h2>
						<p className="text-body xl:max-w-[680px]">
							I looove music. So if you&apos;re interested here&apos;s a
							little bit of information about that.
						</p>
						<p className="text-body xl:max-w-[680px]">
							Plus if you want you can get a cool looking poster with
							your top artists and tracks, kind of like a{" "}
							<a
								href="https://www.spotify.com/wrapped"
								rel="noopener noreferrer"
								target={"_blank"}
								className="underline underline-offset-2 hover:no-underline"
							>
								Spotify Wrapped
							</a>{" "}
							but in miniature.
						</p>
						<Button as={Link} href="/mini-wrapped">
							Get your Mini-Wrapped
						</Button>
					</div>
					<div className="relative">
						<NowPlaying />
						<Artists className="mt-16" />
						<div className="relative left-full mt-16 w-min -translate-x-1/2 lg:absolute lg:top-1/2 lg:mt-0 lg:-translate-y-1/2">
							<div className="-mr-16 flex h-[624px] w-[624px] items-center justify-center rounded-full border-2 border-black/20 lg:-mr-32 lg:h-[656px] lg:w-[656px]">
								<div className="flex h-[432px] w-[432px] items-center justify-center rounded-full border-2 border-black bg-spotify-orange lg:h-[496px] lg:w-[496px]">
									<h3 className="mr-8 max-w-[6ch] -translate-x-1/2 text-right text-sub-heading-mobile text-black">
										My top genres
									</h3>
								</div>
								{topGenres.map((genre, idx) => {
									const lightText =
										getLuminance(genre.color) <=
										TEXT_LUMINANCE_TRESHOLD;

									return (
										<div
											key={genre.id}
											className={`absolute h-8 w-8 rounded-full border-2 border-black`}
											style={{
												translate: `var(--planet${
													idx + 1
												}-x) var(--planet${idx + 1}-y)`,
												backgroundColor: genre.color,
											}}
										>
											<span className="absolute right-auto left-1/2 top-full mt-3 inline-block w-max -translate-x-1/2 text-button lg:top-1/2 lg:right-full lg:left-auto lg:mt-0 lg:mr-6 lg:-translate-y-1/2 lg:translate-x-0 lg:text-sub-heading-mobile">
												<span
													className={`text-salmon max-lg:absolute max-lg:left-1/2 max-lg:-top-7 max-lg:mt-0.5 max-lg:-translate-x-1/2 max-lg:-translate-y-1/2 max-lg:text-button-md ${
														lightText
															? "max-lg:text-white"
															: "max-lg:text-black"
													}`}
												>
													{idx + 1}.
												</span>{" "}
												{genre.label}
											</span>
										</div>
									);
								})}
							</div>
						</div>
					</div>
				</Container>
			</Section>
		</Layout>
	);
};

export default About;
