import Image from "next/image";
import { ComponentProps } from "react";
import { getTranslations } from "next-intl/server";
import { twMerge } from "tailwind-merge";

import { Section } from "../../Section";
import { Container } from "../../Container";
import { Hourglass } from "../../Hourglass";
import NowPlaying from "../../NowPlaying/NowPlaying";

import me from "../../../public/images/poly-me.png";
import { asyncComponent } from "../../../lib/asyncComponent";

export const AboutSection = asyncComponent(
	async ({
		className,
		standAlone = false,
		...props
	}: ComponentProps<typeof Section> & { standAlone?: boolean }) => {
		const t = await getTranslations("About");

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
								{t("main.title")}
							</h2>
							<p className="text-body">{t("main.p1")}</p>

							<p className="text-body">{t("main.p2")}</p>
						</div>
						{!standAlone && (
							<NowPlaying
								title={t("nowPlaying.title")}
								notPlayingMessage={t("nowPlaying.notPlaying")}
							/>
						)}
					</div>
				</Container>
			</Section>
		);
	}
);
