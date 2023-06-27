import { type Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";

import { Locale } from "~/i18n.config";
import { getCaseStudyBySlug, getCaseStudyPaths } from "~/sanity/lib/client";
import { urlForImage } from "~/sanity/lib/image";
import { Container } from "~/components/Container";
import { CTA } from "~/components/sections/CTA";

export async function generateStaticParams() {
	const caseStudies = await getCaseStudyPaths();

	return caseStudies.map((caseStudy) => ({ slug: caseStudy }));
}

const getProjctData = async (slug: string) => {
	const altCaseStudy = await getCaseStudyBySlug({ slug });

	return altCaseStudy;
};

export async function generateMetadata({
	params: { slug, lang },
}: {
	params: { slug: string; lang: Locale };
}): Promise<Metadata> {
	const { title, color, subtitle, cover } = await getProjctData(slug);

	return {
		title: `${title} | Milovan Gudelj`,
		description: subtitle,
		alternates: {
			canonical: `https://www.milovangudelj.com/en/work/${slug}`,
			languages: {
				"it-IT": `https://www.milovangudelj.com/it/work/${slug}`,
			},
		},
		themeColor: color,
		openGraph: {
			images: {
				url: urlForImage(cover.image).url(),
				width: cover.width,
				height: cover.height,
			},
		},
	};
}

const ProjectPage = async ({
	params: { slug, lang },
}: {
	params: { slug: string; lang: Locale };
}) => {
	const { title, color, subtitle, intro, cover, body } = await getProjctData(
		slug
	);

	return (
		<>
			<Container as="main" className="relative max-xl:px-8">
				<header className="pb-16 max-xl:px-0 max-xl:pt-32 xl:p-32 xl:pb-16">
					<div className="mb-8 flex items-center space-x-3 text-button">
						<Link
							href={`/${lang}/work`}
							className="text-white/70 transition hover:text-white"
						>
							← Go Back
						</Link>
						<span className="inline-block h-6 w-px bg-white/[0.06]"></span>
						<h1 className="text-yellow">{title}</h1>
					</div>
					<span className="mb-16 block text-h1-mobile 2xl:text-h1">
						{subtitle}
					</span>
					<PortableText
						value={intro!}
						components={{
							block: {
								normal: ({ children }) => (
									<p className="mb-8 text-sub-heading-mobile text-white last:mb-0 2xl:text-sub-heading">
										{children}
									</p>
								),
							},
						}}
					/>
					<figure className="relative mt-32 xl:-mx-32">
						<Image
							src={urlForImage(cover.image).url()}
							alt={cover.image.alt ?? cover.image.caption}
							title={cover.image.alt}
							quality={100}
							sizes="1280px"
							placeholder={"blur"}
							blurDataURL={cover.lqip}
							priority
							className="w-full rounded-lg object-cover max-xl:aspect-video max-xl:max-h-[300px] xl:h-[400px] xl:rounded-2xl"
							width={cover.width}
							height={cover.height}
						/>
						<figcaption className="pt-1 text-label-md text-white/40 xl:pl-32">
							{cover.image.caption ?? cover.image.alt ?? ""}
						</figcaption>
					</figure>
				</header>
				<div className="pt-0 max-xl:pb-32 xl:p-32 xl:pt-0">
					<PortableText
						value={body}
						components={{
							types: {
								image: ({ value, isInline }) => {
									return (
										<figure className="relative my-32 xl:-mx-32">
											<Image
												src={value.asset.url}
												alt={value.alt ?? value.caption ?? ""}
												title={value.alt ?? value.caption ?? ""}
												quality={100}
												sizes="1280px"
												className="w-full rounded-lg object-cover max-xl:aspect-video max-xl:max-h-[300px] xl:h-[400px] xl:rounded-2xl"
												width={
													value.asset.metadata.dimensions.width
												}
												height={
													value.asset.metadata.dimensions.height
												}
												placeholder="blur"
												blurDataURL={value.asset.metadata.lqip}
											/>
											<figcaption className="pt-1 text-label-md text-white/40 xl:pl-32">
												{cover.image.caption ??
													cover.image.alt ??
													""}
											</figcaption>
										</figure>
									);
								},
							},
							marks: {
								// Ex. 1: custom renderer for the em / italics decorator
								strong: ({ children }) => (
									<span className="mb-8 inline-block text-sub-heading-mobile text-yellow last:mb-0">
										{children}
									</span>
								),

								// Ex. 2: rendering a custom `link` annotation
								link: ({ value, children }) => {
									const target = (value?.href || "").match(
										/^https?:\/\/|^\/\//i
									)
										? "_blank"
										: undefined;
									if (target === "_blank")
										return (
											<a
												href={value?.href}
												target={target}
												rel={
													target === "_blank"
														? "noindex nofollow noreferrer"
														: ""
												}
											>
												{children}
											</a>
										);

									return (
										<Link href={value?.href ?? ""}>{children}</Link>
									);
								},
							},
							block: {
								normal: ({ children }) => (
									<p className="mb-8 text-white/70 last:mb-0">
										{children}
									</p>
								),
								h1: ({ children }) => (
									<h1 className="mb-16 text-h1-mobile last:mb-0 2xl:text-h1">
										{children}
									</h1>
								),
								h2: ({ children }) => (
									<h2 className="mb-16 text-h2-mobile last:mb-0 2xl:text-h2">
										{children}
									</h2>
								),
								h3: ({ children }) => (
									<h3 className="mb-16 text-h3-mobile last:mb-0 2xl:text-h3">
										{children}
									</h3>
								),
								h4: ({ children }) => (
									<h4 className="mb-16 text-h4-mobile last:mb-0 2xl:text-h4">
										{children}
									</h4>
								),
								h5: ({ children }) => (
									<h5 className="mb-16 text-h5-mobile last:mb-0 2xl:text-h5">
										{children}
									</h5>
								),
								h6: ({ children }) => (
									<h6 className="mb-16 text-h6-mobile last:mb-0 2xl:text-h6">
										{children}
									</h6>
								),
							},
						}}
					/>
				</div>
			</Container>
			<CTA lang={lang} className="first-of-type:border-solid" />
		</>
	);
};

export default ProjectPage;
