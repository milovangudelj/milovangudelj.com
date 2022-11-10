import Image from "next/image";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";

import { Project } from "../../pages/work";
import { useWindowSize } from "../../lib/windowSizeContext";
import Link from "next/link";
import { RichText } from "@graphcms/rich-text-react-renderer";

type ProjectShowcaseProps = Omit<Project, "id">;

const categoryMap: { [key: string]: string } = {
	ui_design: "UI Design",
	web_design: "Web Design",
	frontend_development: "FrotEnd Development",
	full_stack_development: "FullStack Development",
	web_development: "Web Development",
};

export const ProjectShowcase = ({
	description,
	href,
	caseStudy,
	image,
	link,
	title,
	year,
	categories,
}: ProjectShowcaseProps) => {
	const { desktop } = useWindowSize();

	return (
		<section className="xl:grid xl:grid-cols-8 xl:gap-16 space-y-8 md:space-y-16 xl:space-y-0">
			{desktop && (
				<div className="h-full order-last xl:col-span-3">
					<ProjectDetails
						title={title}
						link={link}
						href={href}
						categories={categories}
					/>
				</div>
			)}
			<div className="xl:col-span-5 space-y-12 md:space-y-16">
				{!desktop ? (
					<div className="flex flex-col xl:w-full md:space-y-0 xl:space-y-8 md:grid md:grid-cols-5 md:h-max">
						<ProjectDetails
							title={title}
							link={link}
							href={href}
							categories={categories}
						/>
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
				<ProjectDescription
					description={description}
					caseStudy={caseStudy}
				/>
			</div>
		</section>
	);
};

const ProjectDetails = ({
	title,
	link,
	href,
	categories,
}: {
	title: Project["title"];
	link: Project["link"];
	href: Project["href"];
	categories: Project["categories"];
}) => {
	const { mobile } = useWindowSize();
	return (
		<div className="relative z-[1] md:z-auto xl:sticky xl:top-[152px] p-4 xl:p-8 md:col-span-2 border-2 border-dashed border-t [border-top:1px_solid_black] md:border-dashed md:border-r md:border-t-2 xl:border-r-2 space-y-4 md:space-y-6 bg-lavender drop-shadow-brutal md:drop-shadow-brutal-lg">
			<h3 className="text-h4-mobile md:text-sub-heading xl:text-h4">
				{title}
			</h3>
			<span className="text-body inline-block text-dark-me truncate text-ellipsis overflow-hidden">
				{link}
			</span>
			<div className="xl:flex xl:items-end xl:justify-between md:space-y-6 xl:space-y-0">
				<ul className="list-disc list-inside">
					{categories.map((category, idx) => (
						<li key={`cat_${idx}`}>{categoryMap[category]}</li>
					))}
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
	caseStudy,
}: {
	description: Project["description"];
	caseStudy: Project["caseStudy"];
}) => {
	return (
		<div className="prose prose-lg prose-p:text-black">
			<h4 className="text-h5-mobile text-black">Brief</h4>
			<RichText
				content={description.json}
				references={description.references}
			/>
			{caseStudy && (
				<Link href={`/work/${caseStudy.slug}`} passHref>
					<a className="py-2 no-underline text-black px-4 inline-block border-2 bg-salmon hover:drop-shadow-brutal transition-all text-body-md font-bold tracking-wide">
						Read case study ↗
					</a>
				</Link>
			)}
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
		<div className="relative md:mb-0 xl:w-full order-first md:col-span-3 md:h-full xl:h-auto md:order-none">
			<span className="absolute top-0 left-0 [writing-mode:vertical-lr] scale-[-1] -translate-x-full w-min py-2 bg-black text-white text-body-lg">
				{year}
			</span>
			{mobile && (
				<span className="absolute bottom-0 right-0 z-[1]">
					<VisitButton href={href} />
				</span>
			)}
			<span className="flex items-center justify-center w-full md:h-full xl:h-auto aspect-video md:aspect-none xl:aspect-video relative bg-black border-2 border-b md:border-b-2 md:border-l xl:border-l-2 drop-shadow-brutal md:drop-shadow-brutal-lg">
				<Image
					src={image}
					layout={"fill"}
					objectFit={"cover"}
					quality={100}
					alt={`${title} website screenshot`}
					title={`${title} website screenshot`}
				/>
				<span className="font-space text-body-lg text-white" aria-hidden>
					Loading...
				</span>
			</span>
		</div>
	);
};
