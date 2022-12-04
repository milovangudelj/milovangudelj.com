import Image from "next/legacy/image";
import { useEffect } from "react";

import {
	Artists,
	Container,
	HeadMeta,
	Layout,
	NowPlaying,
	Section,
	Tracks as TopTracks,
} from "../components";
import { AboutSection } from "../components/sections";

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
		color: "bg-spotify-brand",
	},
	{
		id: "tg_02",
		label: "Pop",
		color: "bg-spotify-orange",
	},
	{
		id: "tg_03",
		label: "Italian hip hop",
		color: "bg-spotify-pink",
	},
	{
		id: "tg_04",
		label: "Modern Rock",
		color: "bg-spotify-yellow",
	},
	{
		id: "tg_05",
		label: "Alternative R&B",
		color: "bg-spotify-purple",
	},
];

const About = () => {
	useEffect(() => {
		const r = 656 / 2;
		const a = Math.PI / 8;
		const offsetA = (5 * Math.PI) / 8;

		for (let i = 1; i <= 5; i++) {
			const angle = 2 * Math.PI - (offsetA + a * i);
			const x = r * Math.cos(angle);
			const y = r * Math.sin(angle);
			console.log({ a: ((offsetA + a * i) * 180) / Math.PI });

			document.documentElement.style.setProperty(`--planet${i}-x`, `${x}px`);
			document.documentElement.style.setProperty(`--planet${i}-y`, `${y}px`);
		}
	}, []);

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
					</div>
					<div className="relative">
						<NowPlaying />
						<Artists className="mt-16" />
						<div className="absolute left-full top-1/2 -translate-x-1/2 -translate-y-1/2">
							<div className="-mr-16 flex h-[656px] w-[656px] items-center justify-center rounded-full border-2 border-black/20 md:-mr-32">
								<div className="flex h-[496px] w-[496px] items-center justify-center rounded-full border-2 border-black bg-spotify-orange">
									<h3 className="mr-8 max-w-[12ch] -translate-x-1/2 text-right text-sub-heading-mobile text-black">
										My genres' solar system
									</h3>
								</div>
								{topGenres.map((genre, idx) => (
									<div
										key={genre.id}
										className={`absolute h-8 w-8 rounded-full border-2 border-black ${genre.color}`}
										style={{
											translate: `var(--planet${
												idx + 1
											}-x) var(--planet${idx + 1}-y)`,
										}}
									>
										<span className="absolute right-full top-1/2 mr-6 inline-block w-max -translate-y-1/2 text-sub-heading-mobile">
											<span className="text-salmon">{idx + 1}.</span>{" "}
											{genre.label}
										</span>
									</div>
								))}
							</div>
						</div>
					</div>
				</Container>
			</Section>
		</Layout>
	);
};

export default About;
