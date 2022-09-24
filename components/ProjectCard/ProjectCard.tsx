import Image from "next/future/image";
import Link from "next/link";

type ProjectCardProps = {
	title: string;
	href: string;
	link: string;
	image: string;
};

export const ProjectCard = ({ title, href, link, image }: ProjectCardProps) => {
	return (
		<div>
			<Link href={href}>
				<span className="relative cursor-pointer bg-black border-2 inline-block w-max [filter:drop-shadow(4px_4px_0_black)]">
					<Image
						src={image}
						height={150}
						width={(150 / 9) * 16}
						alt="Dummy project card image"
					/>
				</span>
			</Link>
			<div className="flex flex-col mt-8">
				<span className="text-sub-heading-mobile font-medium">
					{title} →
				</span>
				<span className="text-body-sm text-dark-me">{link}</span>
			</div>
		</div>
	);
};
