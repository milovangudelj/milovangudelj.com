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
			<Link href={href} passHref>
				<a className="relative h-[150px] aspect-video md:h-[300px] cursor-pointer bg-black border-2 inline-block drop-shadow-brutal drop-shadow-brutal-lg">
					<Image
						src={image}
						layout={"fill"}
						quality={100}
						alt="Dummy project card image"
					/>
				</a>
			</Link>
			<div className="flex flex-col">
				<span className="text-sub-heading-mobile md:text-sub-heading font-medium">
					{title} →
				</span>
				<span className="text-body-sm text-dark-me">{link}</span>
			</div>
		</div>
	);
};
