import { NodeRendererType } from "@graphcms/rich-text-react-renderer";
import Image from "next/legacy/image";
import Link from "next/link";

const commonRenderers: NodeRendererType = {
	a: ({ children, openInNewTab, href, rel, ...rest }) => {
		if (href?.match(/^https?:\/\/|^\/\//i)) {
			return (
				<a
					href={href}
					target={openInNewTab ? "_blank" : "_self"}
					rel={rel || "noopener noreferrer"}
					{...rest}
				>
					{children}
				</a>
			);
		}

		return (
			<Link href={href ?? ""} {...rest}>
				{children}
			</Link>
		);
	},
};

const caseStudyRenderers: NodeRendererType = {
	class: ({ children, className }) => (
		<div className={`col-span-4 col-start-2 ${className}`}>{children}</div>
	),
	h1: ({ children }) => (
		<h1 className="col-span-4 col-start-2 text-h1-mobile xl:text-h1">
			{children}
		</h1>
	),
	h2: ({ children }) => (
		<h2 className="col-span-4 col-start-2 text-h2-mobile xl:text-h2">
			{children}
		</h2>
	),
	h3: ({ children }) => (
		<h3 className="col-span-4 col-start-2 text-h3-mobile xl:text-h3">
			{children}
		</h3>
	),
	h4: ({ children }) => (
		<h4 className="col-span-4 col-start-2 text-h4-mobile xl:text-h4">
			{children}
		</h4>
	),
	h5: ({ children }) => (
		<h5 className="col-span-4 col-start-2 text-h5-mobile xl:text-h5">
			{children}
		</h5>
	),
	h6: ({ children }) => (
		<h6 className="col-span-4 col-start-2 text-h6-mobile xl:text-h6">
			{children}
		</h6>
	),
	p: ({ children }) => (
		<p className="col-span-4 col-start-2 text-body">{children}</p>
	),
	Asset: {
		image: ({ url, alt, caption, width, height, blurDataUrl }) => {
			return (
				<div className="h-80 relative col-span-6">
					<Image
						src={url}
						alt={alt}
						title={alt}
						layout="fill"
						objectFit="cover"
						quality={100}
						placeholder={blurDataUrl ? "blur" : "empty"}
						blurDataURL={blurDataUrl}
					/>
					<span>{caption ?? alt}</span>
				</div>
			);
		},
	},
};

export const renderers = (type: "project" | "caseStudy"): NodeRendererType => {
	switch (type) {
		case "project":
			return commonRenderers;
		case "caseStudy":
			return { ...commonRenderers, ...caseStudyRenderers };
		default:
			return commonRenderers;
	}
};
