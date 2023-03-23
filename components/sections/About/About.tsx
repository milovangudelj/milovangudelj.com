import Image from "next/legacy/image";
import { ComponentProps } from "react";
import { getTranslations } from "next-intl/server";

import { Section } from "../../Section";
import { Container } from "../../Container";
import { Hourglass } from "../../Hourglass";
import NowPlaying from "../../NowPlaying/NowPlaying";

import me from "../../../public/images/poly-me.png";
import { asyncComponent } from "../../../lib/asyncComponent";

export const AboutSection = asyncComponent(
	async ({
		standAlone = false,
		...props
	}: ComponentProps<typeof Section> & { standAlone?: boolean }) => {
		const t = await getTranslations("About");
		const nowPlayingT = await getTranslations("NowPlaying");

		const experienceYears =
			new Date().getFullYear() - new Date(2018, 10).getFullYear();

		return (
			<Section {...props}>
				<Container className="md:relative md:space-y-0">
					<div
						className={`flex justify-center md:absolute md:right-16 xl:right-32 ${
							standAlone ? " md:top-32 md:rotate-12" : "md:-top-16"
						}`}
					>
						<Hourglass>
							<span className="absolute inset-0 left-4 overflow-hidden border-b-2">
								<Image
									src={me}
									layout={"fill"}
									quality={100}
									priority
									objectPosition={"top left"}
									objectFit={"cover"}
									alt={"My profile picture"}
								/>
							</span>
						</Hourglass>
					</div>
					<div>
						<div className={`space-y-8 ${standAlone ? "" : "mb-16"}`}>
							<h2
								className={
									standAlone
										? "text-h1-mobile md:text-d1-mobile xl:text-d1"
										: "text-h2-mobile md:text-d2-mobile xl:text-d2"
								}
							>
								{t("title")}
							</h2>
							<p className="text-body xl:max-w-[680px]">{t("p1")}</p>

							<p className="text-body xl:max-w-[680px]">{t("p2")}</p>
						</div>
						{!standAlone && (
							<NowPlaying
								title={nowPlayingT("title")}
								notPlayingMessage={nowPlayingT("notPlaying")}
							/>
						)}
					</div>
				</Container>
			</Section>
		);
	}
);
