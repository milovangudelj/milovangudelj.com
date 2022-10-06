import Image from "next/image";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";

import { Project } from "../../pages/work";
import { useWindowSize } from "../../lib/windowSizeContext";

type ProjectShowcaseProps = Omit<Project, "id">;

export const ProjectShowcase = ({
	description,
	href,
	image,
	link,
	title,
	year,
}: ProjectShowcaseProps) => {
	const { desktop } = useWindowSize();

	return (
		<section className="xl:grid xl:grid-cols-8 xl:gap-16 space-y-8 md:space-y-16 xl:space-y-0">
			<div className="xl:col-span-5 space-y-8 md:space-y-16">
				{!desktop ? (
					<div className="flex flex-col xl:w-full md:space-y-0 xl:space-y-8 md:grid md:grid-cols-5 md:h-max">
						<ProjectDetails title={title} link={link} href={href} />
						<ProjectImage
							year={year}
							image={image}
							title={title}
							href={href}
						/>
					</div>
				) : (
					<ProjectImage
						year={year}
						image={image}
						title={title}
						href={href}
					/>
				)}
				<ProjectDescription description={description} />
			</div>
			{desktop && (
				<div className="h-full xl:col-span-3">
					<ProjectDetails title={title} link={link} href={href} />
				</div>
			)}
		</section>
	);
};

const ProjectDetails = ({
	title,
	link,
	href,
}: {
	title: Project["title"];
	link: Project["link"];
	href: Project["href"];
}) => {
	const { mobile } = useWindowSize();
	return (
		<div className="xl:sticky xl:top-[152px] md:p-4 xl:p-8 md:col-span-2 md:border-2 md:border-r xl:border-r-2 space-y-4 md:space-y-6 md:bg-lavender md:drop-shadow-brutal-lg">
			<h3 className="text-h4-mobile md:text-sub-heading xl:text-h4">
				{title}
			</h3>
			<span className="text-body inline-block text-dark-me truncate text-ellipsis overflow-hidden">
				{link}
			</span>
			<div className="xl:flex xl:items-end xl:justify-between md:space-y-6 xl:space-y-0">
				<ul className="list-disc list-inside">
					<li>Web development</li>
					<li>Design</li>
				</ul>
				{!mobile && <VisitButton href={href} />}
			</div>
		</div>
	);
};

const VisitButton = ({ href }: { href: Project["href"] }) => {
	return (
		<a
			href={href}
			target={"_blank"}
			rel={"noreferrer"}
			className="inline-block"
		>
			<button className="py-2 px-4 border-2 bg-salmon hover:drop-shadow-brutal transition-all text-body-md font-bold tracking-wide">
				Visit ↗
			</button>
		</a>
	);
};

const ProjectDescription = ({
	description,
}: {
	description: Project["description"];
}) => {
	return (
		<div className="prose prose-lg prose-p:text-black">
			<MDXRemote {...description} />
		</div>
	);
};

const ProjectImage = ({
	year,
	image,
	title,
	href,
}: {
	year: Project["year"];
	image: Project["image"];
	title: Project["title"];
	href: Project["href"];
}) => {
	const { mobile } = useWindowSize();
	return (
		<div className="relative mb-8 md:mb-0 xl:w-full order-first md:col-span-3 md:h-full xl:h-auto md:order-none">
			<span className="md:block hidden absolute top-0 left-0 [writing-mode:vertical-lr] scale-[-1] -translate-x-full w-min py-2 bg-black text-white text-body-lg">
				{year}
			</span>
			{mobile && (
				<span className="absolute bottom-0 right-0 z-[1]">
					<VisitButton href={href} />
				</span>
			)}
			<span className="block w-full md:h-full xl:h-auto aspect-video md:aspect-none xl:aspect-video relative bg-black border-2 md:border-l xl:border-l-2 drop-shadow-brutal md:drop-shadow-brutal-lg">
				<Image
					src={image}
					layout={"fill"}
					objectFit={"cover"}
					quality={100}
					alt={`${title} website screenshot`}
					title={`${title} website screenshot`}
				/>
			</span>
		</div>
	);
};
