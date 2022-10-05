import Head from "next/head";

type HeadMetadata = {
	title: string;
	description: string;
	url: string;
	image: string;
};

export const HeadMeta = ({ metadata: meta }: { metadata: HeadMetadata }) => {
	return (
		<Head>
			<title>{meta.title}</title>
			<meta name="title" content={meta.title} />
			<meta name="description" content={meta.description} />

			<meta property="og:type" content="website" />
			<meta property="og:url" content={meta.url} />
			<meta property="og:title" content={meta.title} />
			<meta property="og:description" content={meta.description} />
			<meta property="og:image" content={meta.image} />

			<meta property="twitter:card" content="summary_large_image" />
			<meta property="twitter:url" content={meta.url} />
			<meta property="twitter:title" content={meta.title} />
			<meta property="twitter:description" content={meta.description} />
			<meta property="twitter:image" content={meta.image} />
		</Head>
	);
};
