import Image from "next/image";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

import { Section } from "~components/Section";
import { Container } from "~components/Container";
import { Hourglass } from "~components/Hourglass";
import NowPlaying from "~components/NowPlaying/NowPlaying";

import me from "~images/poly-me.png";
import { asyncComponent } from "~lib/asyncComponent";
import { getDictionary } from "~/utils/getDictionary";
import { Locale } from "~/i18n.config";

export const AboutSection = asyncComponent(
	async ({
		className,
		standAlone = false,
		lang,
		...props
	}: ComponentProps<typeof Section> & { standAlone?: boolean }) => {
		const dictionary = await getDictionary(lang as Locale);

		const experienceYears =
			new Date().getFullYear() - new Date(2018, 10).getFullYear();

		return (
			<Section
				className={twMerge(
					standAlone ? "bg-black text-white" : "",
					className
				)}
				{...props}
			>
				<Container className="md:relative md:space-y-0">
					<div
						className={`flex justify-center md:absolute md:right-16 xl:right-32 ${
							standAlone ? " md:top-16 md:rotate-12" : "md:-top-16"
						}`}
					>
						<Hourglass standAlone={standAlone}>
							<span
								className={`absolute inset-0 left-4 overflow-hidden border-b-2 ${
									standAlone ? "border-lilla" : "border-black"
								}`}
							>
								<Image
									src={me}
									quality={100}
									priority
									alt={"My profile picture"}
									className={`relative inset-0 object-cover object-left-top`}
								/>
							</span>
						</Hourglass>
					</div>
					<div>
						<div className={`space-y-8 ${standAlone ? "" : "mb-16"}`}>
							<h2
								className={
									standAlone
										? "text-d2-mobile xl:text-d2"
										: "text-h2-mobile md:text-h2"
								}
							>
								{dictionary.About.main.title}
							</h2>
							<p className="text-body">{dictionary.About.main.p1}</p>

							<p className="text-body">{dictionary.About.main.p2}</p>
						</div>
						{!standAlone && (
							<NowPlaying
								title={dictionary.About.nowPlaying.title}
								notPlayingMessage={
									dictionary.About.nowPlaying.notPlaying
								}
							/>
						)}
					</div>
				</Container>
			</Section>
		);
	}
);
