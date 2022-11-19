import Image from "next/legacy/image";
import Link from "next/link";

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
				className="relative inline-block aspect-video h-[150px] cursor-pointer border-2 bg-black drop-shadow-brutal drop-shadow-brutal-lg md:h-[300px]"
			>
				<Image
					src={image}
					layout={"fill"}
					quality={100}
					alt="Dummy project card image"
				/>
			</Link>
			<div className="flex flex-col">
				<span className="text-sub-heading-mobile font-medium md:text-sub-heading">
					{title} →
				</span>
				<span className="text-body-sm text-dark-me">{link}</span>
			</div>
		</div>
	);
};
