import Image from "next/legacy/image";
import { ComponentProps } from "react";

import { Section } from "../../Section";
import { Container } from "../../Container";
import { Hourglass } from "../../Hourglass";
import NowPlaying from "../../NowPlaying/NowPlaying";

import me from "../../../public/images/poly-me.png";

export const AboutSection = ({
	standAlone = false,
	...props
}: ComponentProps<typeof Section> & { standAlone?: boolean }) => {
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
							About me
						</h2>
						<p className="text-body xl:max-w-[680px]">
							As a computer science student, I have a strong passion for
							web development and UI/UX design. I am driven by the
							creation of user-centered interfaces and experiences that
							are both aesthetically pleasing and empowering.
						</p>

						<p className="text-body xl:max-w-[680px]">
							With five years of experience in building websites, I have
							honed my skills in both the technical and creative aspects
							of web development. My interest in graphic design and
							poster-making has also allowed me to bring a unique
							perspective to my work in UI/UX design.
						</p>
					</div>
					{!standAlone && <NowPlaying />}
				</div>
			</Container>
		</Section>
	);
};
