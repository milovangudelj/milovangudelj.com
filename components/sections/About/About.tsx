import Image from "next/legacy/image";
import { ComponentProps } from "react";

import { Section, Container, Hourglass, NowPlaying } from "../../";

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
					<div className={`space-y-8 ${standAlone ? "" : "mb-16"}"`}>
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
							I&apos;m a computer science student really passionate about
							web development and UI/UX design. I love seeing a simple
							yet empowerig User Interface and a great User Experience.
						</p>
						<p className="text-body xl:max-w-[680px]">
							I started building websites about {experienceYears} years
							ago and I fell in love with it. At the same time I also
							began experimenting with graphic design and making posters.
						</p>
						<p className="text-body xl:max-w-[680px]">
							Slowly but surely I made my way into the wonderful world of
							web development and UI/UX design.
						</p>
					</div>
					{!standAlone && <NowPlaying />}
				</div>
			</Container>
		</Section>
	);
};
