import { NodeRendererType } from "@graphcms/rich-text-react-renderer";
import Image from "next/image";
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
			<Link href={href ?? ""} passHref>
				<a {...rest}>{children}</a>
			</Link>
		);
	},
};

const caseStudyRenderers: NodeRendererType = {
	Asset: {
		image: ({ url, alt, caption, width, height, blurDataUrl }) => {
			return (
				<div className="h-64 relative -mx-8 md:-mx-16">
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
