import { ComponentProps } from "react";
import Link from "next/link";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { twMerge } from "tailwind-merge";

import { CaseStudyPayload } from "~/sanity/types";

interface ContentProps extends ComponentProps<"div"> {
	body: CaseStudyPayload["body"];
}

export const Content = ({ body, className }: ContentProps) => {
	return (
		<div
			className={twMerge(
				"col-span-5 grid grid-cols-5 pb-8 xl:pb-0",
				className
			)}
		>
			<PortableText
				value={body}
				components={{
					types: {
						image: ({ value, isInline }) => {
							return (
								<figure className="relative col-span-5 -mx-8 mt-8 mb-16 h-60 md:-mx-16 md:mt-16 md:mb-32 md:h-64 xl:col-span-3 xl:col-start-2 xl:-mx-[33.3%] xl:mt-8 xl:mb-16 xl:h-96">
									<Image
										src={value.asset.url}
										alt={value.alt ?? value.caption ?? ""}
										title={value.alt ?? value.caption ?? ""}
										quality={100}
										sizes="1440px"
										className="h-full w-full object-cover"
										width={value.asset.metadata.dimensions.width}
										height={value.asset.metadata.dimensions.height}
										placeholder="blur"
										blurDataURL={value.asset.metadata.lqip}
									/>
									<figcaption className="absolute top-full left-8 text-label-md text-white/60 md:left-16 xl:left-0">
										{value.caption ?? value.alt ?? ""}
									</figcaption>
								</figure>
							);
						},
					},
					marks: {
						// Ex. 1: custom renderer for the em / italics decorator
						strong: ({ children }) => (
							<span className="col-span-5 mb-8 inline-block text-sub-heading-mobile text-yellow xl:col-span-3 xl:col-start-2">
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

							return <Link href={value?.href ?? ""}>{children}</Link>;
						},
					},
					block: {
						normal: ({ children }) => (
							<p className="col-span-5 mb-8 text-body xl:col-span-3 xl:col-start-2">
								{children}
							</p>
						),
						h1: ({ children }) => (
							<h1 className="col-span-5 mb-8 text-h1-mobile xl:col-span-3 xl:col-start-2 xl:text-h1">
								{children}
							</h1>
						),
						h2: ({ children }) => (
							<h2 className="col-span-5 mb-8 text-h2-mobile xl:col-span-3 xl:col-start-2 xl:text-h2">
								{children}
							</h2>
						),
						h3: ({ children }) => (
							<h3 className="col-span-5 mb-8 text-h3-mobile xl:col-span-3 xl:col-start-2 xl:text-h3">
								{children}
							</h3>
						),
						h4: ({ children }) => (
							<h4 className="col-span-5 mb-8 text-h4-mobile xl:col-span-3 xl:col-start-2 xl:text-h4">
								{children}
							</h4>
						),
						h5: ({ children }) => (
							<h5 className="col-span-5 mb-8 text-h5-mobile xl:col-span-3 xl:col-start-2 xl:text-h5">
								{children}
							</h5>
						),
						h6: ({ children }) => (
							<h6 className="col-span-5 mb-8 text-h6-mobile xl:col-span-3 xl:col-start-2 xl:text-h6">
								{children}
							</h6>
						),
					},
				}}
			/>
		</div>
	);
};
