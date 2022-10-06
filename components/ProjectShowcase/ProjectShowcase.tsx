import Image from "next/image";
import { MDXRemote } from "next-mdx-remote";

import { Project } from "../../pages/work";

type ProjectShowcaseProps = Omit<Project, "id">;

export const ProjectShowcase = ({
	description,
	href,
	image,
	link,
	title,
}: ProjectShowcaseProps) => {
	return (
		<section className="grid grid-cols-[3fr_2fr] gap-16">
			<div className="col-span-1">
				<span className="block w-full aspect-video relative mb-8 bg-black border-2 [filter:drop-shadow(4px_4px_0_black)] md:[filter:drop-shadow(8px_8px_0_black)]">
					<Image
						src={image}
						layout={"fill"}
						quality={100}
						alt={`${title} website screenshot`}
						title={`${title} website screenshot`}
					/>
				</span>
				<div>
					<MDXRemote {...description} />
				</div>
			</div>
			<div className="col-span-1 h-full">
				<div className="sticky top-[72px] md:top-[88px] py-8">
					<h2 className="text-h4-mobile md:text-h3-mobile xl:text-h3">
						{title}
					</h2>
					<span className="text-body-sm text-dark-me">{link}</span>
					<ul>
						<li>Web development</li>
						<li>Design</li>
					</ul>
					<a href={href} target={"_blank"} rel={"noreferrer"}>
						<button>Visit their website ↗</button>
					</a>
				</div>
			</div>
		</section>
	);
};
