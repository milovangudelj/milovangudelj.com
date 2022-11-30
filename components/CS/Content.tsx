import { RichText } from "@graphcms/rich-text-react-renderer";
import { EmbedReferences, RichTextContent } from "@graphcms/rich-text-types";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

import { renderers } from "../../components/richTextRenderers";

type CSContentTypeWithEmbeds = {
	json: RichTextContent;
	html: string;
	markdown: string;
	text: string;
	references: EmbedReferences;
};

export const Content = ({
	content,
	className,
}: ComponentProps<"div"> & { content: CSContentTypeWithEmbeds }) => {
	return (
		<div
			className={twMerge(
				"col-span-5 grid grid-cols-5 pb-8 xl:pb-0",
				className
			)}
		>
			<RichText
				content={content.json}
				references={content.references}
				renderers={renderers("csBody")}
			/>
		</div>
	);
};
