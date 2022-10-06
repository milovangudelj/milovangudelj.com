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
	year,
}: ProjectShowcaseProps) => {
	return (
		<section className="grid grid-cols-8 gap-16">
			<div className="col-span-3 h-full order-last">
				<div className="sticky top-[136px] md:top-[152px] p-8 border-2 space-y-6 bg-lavender drop-shadow-brutal md:drop-shadow-brutal-lg">
					<h3 className="text-sub-heading-mobile md:text-sub-heading xl:text-h4">
						{title}
					</h3>
					<span className="text-body inline-block text-dark-me">
						{link}
					</span>
					<div className="flex items-end justify-between">
						<ul className="list-disc list-inside">
							<li>Web development</li>
							<li>Design</li>
						</ul>
						<a href={href} target={"_blank"} rel={"noreferrer"}>
							<button className="py-2 px-4 border-2 bg-salmon hover:drop-shadow-brutal transition-all text-body-md font-bold tracking-wide">
								Visit ↗
							</button>
						</a>
					</div>
				</div>
			</div>
			<div className="col-span-5">
				<div className="relative">
					<span className="block absolute top-0 left-0 [writing-mode:vertical-lr] scale-[-1] -translate-x-full w-min py-2 bg-black text-white text-body-lg">
						{year}
					</span>
					<span className="block w-full aspect-video relative mb-16 bg-black border-2 drop-shadow-brutal md:drop-shadow-brutal-lg">
						<Image
							src={image}
							layout={"fill"}
							quality={100}
							alt={`${title} website screenshot`}
							title={`${title} website screenshot`}
						/>
					</span>
				</div>

				<div className="prose prose-lg prose-p:text-black">
					<MDXRemote {...description} />
				</div>
			</div>
		</section>
	);
};
