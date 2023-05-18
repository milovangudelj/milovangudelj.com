import Image from "next/legacy/image";
import { Link } from "next-intl";

type ProjectCardProps = {
	title: string;
	href: string;
	link: string;
	image: string;
};

export const ProjectCard = ({ title, href, link, image }: ProjectCardProps) => {
	return (
		<div className="space-y-8 md:space-y-[26px]">
			<Link
				href={href}
				className="relative inline-block aspect-video h-[150px] cursor-pointer border-2 bg-black drop-shadow-brutal md:h-[300px] xl:drop-shadow-brutal-lg"
			>
				<Image
					src={image}
					layout={"fill"}
					quality={100}
					alt="Dummy project card image"
				/>
			</Link>
			<div className="flex flex-col bg-green">
				<Link
					href={href}
					className="group w-fit text-sub-heading-mobile font-medium md:text-sub-heading"
				>
					{title}{" "}
					<span className="inline-block transition will-change-transform group-hover:translate-x-1">
						→
					</span>
				</Link>
				<span className="text-label-md text-dark-me">{link}</span>
			</div>
		</div>
	);
};
