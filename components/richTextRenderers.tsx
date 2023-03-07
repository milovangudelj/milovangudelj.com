import { NodeRendererType } from "@graphcms/rich-text-react-renderer";
import { Route } from "next";
import Image from "next/legacy/image";
import Link from "next/link";
import React from "react";

const commonRenderers: NodeRendererType = {
	a: ({ children, openInNewTab = false, href, ...rest }) => {
		if (href?.match(/^https?:\/\/|^\/\//i)) {
			return (
				<a href={href} target="_blank" rel="noreferrer" {...rest}>
					{children}
				</a>
			);
		}

		return (
			<Link href={(href ?? "") as Route} {...rest}>
				{children}
			</Link>
		);
	},
};

const csIntroRenderers: NodeRendererType = {
	p: ({ children }) => (
		<p className="mb-8 whitespace-pre-line text-sub-heading-mobile text-white/80 xl:text-sub-heading">
			{children}
		</p>
	),
};

const csBodyRenderers: NodeRendererType = {
	class: ({ children, className }) => (
		<>
			{React.Children.map(children, (child) => {
				if (React.isValidElement<HTMLElement>(child)) {
					return React.cloneElement(child, {
						className: `${child.props.className} ${className}`,
					});
				}
			})}
		</>
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
	p: ({ children }) => (
		<p className="col-span-5 mb-8 text-body xl:col-span-3 xl:col-start-2">
			{children}
		</p>
	),
	Asset: {
		image: ({ url, alt, caption, width, height, blurDataUrl }) => {
			return (
				<figure className="relative col-span-5 -mx-8 mt-8 mb-16 h-60 md:-mx-16 md:mt-16 md:mb-32 md:h-64 xl:col-span-3 xl:col-start-2 xl:-mx-[33.3%] xl:mt-8 xl:mb-16 xl:h-96">
					<Image
						src={url}
						alt={alt}
						title={alt}
						layout="fill"
						objectFit="cover"
						quality={100}
						sizes="1440px"
						placeholder={blurDataUrl ? "blur" : "empty"}
						blurDataURL={blurDataUrl}
					/>
					<figcaption className="absolute top-full left-8 text-label-md text-white/60 md:left-16 xl:left-0">
						{caption ?? alt}
					</figcaption>
				</figure>
			);
		},
	},
	embed: {
		CsOverline: ({ content }) => (
			<span className="col-span-5 mb-8 inline-block text-sub-heading-mobile text-yellow xl:col-span-3 xl:col-start-2">
				{content}
			</span>
		),
	},
};

export const renderers = (
	type: "project" | "csBody" | "csIntro"
): NodeRendererType => {
	switch (type) {
		case "project":
			return commonRenderers;
		case "csIntro":
			return { ...commonRenderers, ...csIntroRenderers };
		case "csBody":
			return { ...commonRenderers, ...csBodyRenderers };
		default:
			return commonRenderers;
	}
};
