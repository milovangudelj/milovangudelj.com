"use client";

import Image from "next/legacy/image";

import { Project } from "../../app/[locale]/work/page";
import Link from "next/link";
import { RichText } from "@graphcms/rich-text-react-renderer";
import { Button } from "../Button";
import { colorMap } from "../../lib/hygraph";
import { useIsDesktop, useIsMobile } from "../../lib/useMediaQuery";

interface ProjectShowcaseProps extends Omit<Project, "id"> {
	messages: {
		brief: string;
		visit: string;
		readCS: string;
		category: {
			uiDesign: string;
			webDesign: string;
			webDev: string;
			frontEnd: string;
			fullStack: string;
		};
	};
}

const categoryMap: { [key: string]: string } = {
	ui_design: "uiDesign",
	web_design: "webDesign",
	frontend_development: "webDev",
	full_stack_development: "frontEnd",
	web_development: "fullStack",
};

export const ProjectShowcase = ({
	messages,
	description,
	href,
	caseStudy,
	image,
	link,
	title,
	year,
	categories,
	color,
}: ProjectShowcaseProps) => {
	const isDesktop = useIsDesktop();

	return (
		<section className="space-y-8 md:space-y-16 xl:grid xl:grid-cols-8 xl:gap-16 xl:space-y-0">
			{isDesktop && (
				<div className="order-last h-full xl:col-span-3">
					<ProjectDetails
						title={title}
						link={link}
						href={href}
						categories={categories}
						catNames={messages.category}
						visitText={messages.visit}
						color={color}
					/>
				</div>
			)}
			<div className="space-y-12 md:space-y-16 xl:col-span-5">
				{!isDesktop ? (
					<div className="flex flex-col md:grid md:h-max md:grid-cols-5 md:space-y-0 xl:w-full xl:space-y-8">
						<ProjectDetails
							title={title}
							link={link}
							href={href}
							categories={categories}
							catNames={messages.category}
							visitText={messages.visit}
							color={color}
						/>
						<ProjectImage
							year={year}
							image={image}
							title={title}
							href={href}
							visitText={messages.visit}
						/>
					</div>
				) : (
					<ProjectImage
						year={year}
						image={image}
						title={title}
						href={href}
						visitText={messages.visit}
					/>
				)}
				<ProjectDescription
					description={description}
					caseStudy={caseStudy}
					briefText={messages.brief}
					readCSText={messages.readCS}
				/>
			</div>
		</section>
	);
};
export default ProjectShowcase;

const ProjectDetails = ({
	title,
	link,
	href,
	categories,
	catNames,
	visitText,
	color,
}: {
	title: Project["title"];
	link: Project["link"];
	href: Project["href"];
	categories: Project["categories"];
	catNames: { [key: string]: string };
	visitText: string;
	color: Project["color"];
}) => {
	const isMobile = useIsMobile();

	return (
		<div
			className={`relative z-[1] space-y-4 border-2 border-t border-dashed ${
				colorMap[color] ?? "bg-lilla"
			} p-4 drop-shadow-brutal max-md:[border-top:1px_solid_black] md:z-auto md:col-span-2 md:space-y-6 md:border-t-2 md:drop-shadow-brutal-lg md:max-lg:[border-right:1px_solid_black] xl:sticky xl:top-[152px] xl:border-r-2 xl:p-8`}
		>
			<h3 className="text-h4-mobile md:text-sub-heading xl:text-h4">
				{title}
			</h3>
			<span className="inline-block max-w-full overflow-hidden truncate text-ellipsis text-body text-dark-me">
				{link}
			</span>
			<div className="md:space-y-6 xl:flex xl:items-end xl:justify-between xl:space-y-0">
				<ul className="list-inside list-disc">
					{categories.map((category, idx) => (
						<li key={`cat_${idx}`}>{catNames[categoryMap[category]]}</li>
					))}
				</ul>
				{!isMobile && <VisitButton href={href} text={visitText} />}
			</div>
		</div>
	);
};

const VisitButton = ({
	href,
	text,
}: {
	href: Project["href"];
	text: string;
}) => {
	return (
		<Button as="a" href={href} target={"_blank"} rel={"noreferrer"}>
			{text} ↗
		</Button>
	);
};

const ProjectDescription = ({
	description,
	caseStudy,
	briefText,
	readCSText,
}: {
	description: Project["description"];
	caseStudy: Project["caseStudy"];
	briefText: string;
	readCSText: string;
}) => {
	return (
		<div className="prose prose-lg prose-p:text-black">
			<h4 className="text-h5-mobile text-black">{briefText}</h4>
			<RichText
				content={description.json}
				references={description.references}
			/>
			{caseStudy && (
				<Button
					as={Link}
					href={`/work/${caseStudy.slug}`}
					className="text-black"
				>
					{readCSText} ↗
				</Button>
			)}
		</div>
	);
};

const ProjectImage = ({
	year,
	image,
	title,
	href,
	visitText,
}: {
	year: Project["year"];
	image: Project["image"];
	title: Project["title"];
	href: Project["href"];
	visitText: string;
}) => {
	const isMobile = useIsMobile();

	return (
		<div className="relative order-first md:order-none md:col-span-3 md:mb-0 md:h-full xl:h-auto xl:w-full">
			<span className="absolute top-0 left-0 w-min -translate-y-full bg-black text-body text-white max-md:px-2 md:-translate-x-full md:-translate-y-0 md:scale-[-1] md:py-2 md:[writing-mode:vertical-lr]">
				{year}
			</span>
			{isMobile && (
				<span className="absolute bottom-0 right-0 z-[1]">
					<VisitButton href={href} text={visitText} />
				</span>
			)}
			<span className="md:aspect-none relative flex aspect-video w-full items-center justify-center border-2 border-b bg-black drop-shadow-brutal md:h-full md:border-b-2 md:border-l md:drop-shadow-brutal-lg xl:aspect-video xl:h-auto xl:border-l-2">
				<Image
					src={image}
					layout={"fill"}
					objectFit={"cover"}
					quality={100}
					alt={`${title} website screenshot`}
					title={`${title} website screenshot`}
				/>
				<span className="font-space text-body text-white" aria-hidden>
					Loading...
				</span>
			</span>
		</div>
	);
};
