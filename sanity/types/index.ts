import type { PortableTextBlock } from "@portabletext/types";
import type { Image } from "sanity";

export interface ShowcaseProject {
	_type: string;
	coverImage?: Image;
	overview?: PortableTextBlock[];
	slug?: string;
	tags?: string[];
	title?: string;
}

export interface ProjectPayload {
	client?: string;
	coverImage?: Image;
	description?: PortableTextBlock[];
	duration?: {
		start?: string;
		end?: string;
	};
	overview?: PortableTextBlock[];
	site?: string;
	slug: string;
	tags?: string[];
	title?: string;
}

export interface CaseStudyPayload {
	title?: string;
	subtitle?: string;
	intro?: PortableTextBlock[];
	content?: PortableTextBlock[];
	color?: string;
	coverImage?: Image;
}