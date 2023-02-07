import { HeadMeta } from "../components/HeadMeta";

const meta = {
	title: "Milovan Gudelj - Web developer / UI designer",
	description:
		"I design and develop engaging websites and delightful digital experiences.",
	url: "https://milovangudelj.com/",
	image: "https://milovangudelj.com/images/og-image.png",
};

export default function RootHead() {
	return (
		<>
			{/* Fonts */}
			<link
				rel="preload"
				href="/fonts/SpaceGrotesk-Var.woff2"
				crossOrigin="anonymous"
				as="font"
				type="font/woff2"
			/>
			<link
				rel="preload"
				href="/fonts/Inter-Var.woff2"
				crossOrigin="anonymous"
				as="font"
				type="font/woff2"
			/>
			{/* Favicon */}
			<link
				rel="apple-touch-icon"
				sizes="180x180"
				href="/images/favicon/apple-touch-icon.png"
			/>
			<link
				rel="icon"
				type="image/png"
				sizes="32x32"
				href="/images/favicon/favicon-32x32.png"
			/>
			<link
				rel="icon"
				type="image/png"
				sizes="16x16"
				href="/images/favicon/favicon-16x16.png"
			/>
			<link rel="manifest" href="/images/favicon/site.webmanifest" />
			<link
				rel="mask-icon"
				href="/images/favicon/safari-pinned-tab.svg"
				color="#ffc700"
			/>
			<link rel="shortcut icon" href="/images/favicon/favicon.ico" />
			<meta name="msapplication-TileColor" content="#000000" />
			<meta
				name="msapplication-config"
				content="/images/favicon/browserconfig.xml"
			/>
			<meta name="theme-color" content="#000000"></meta>
			<HeadMeta metadata={meta} />
		</>
	);
}
