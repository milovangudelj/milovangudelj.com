import Image from "next/image";

import dummy from "../../public/dummy.png";

type ProjectCardProps = {
	title: string;
	href: string;
	link: string;
	image: string;
};

export const ProjectCard = ({ title, href, link, image }: ProjectCardProps) => {
	return (
		<div>
			<span className="relative bg-black border-2 inline-block w-[266.5px] h-[150px] [filter:drop-shadow(4px_4px_0_black)]">
				<Image src={image} layout="fill" alt="Dummy project card image" />
			</span>
			<div className="flex flex-col mt-8">
				<span className="text-sub-heading-mobile font-medium">
					{title} →
				</span>
				<span className="text-body-sm text-dark-me">{link}</span>
			</div>
		</div>
	);
};
