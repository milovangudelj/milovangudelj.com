import { getServerSession } from "next-auth/next";
import { Inter, Space_Grotesk } from "next/font/google";

import "../styles/globals.css";

import { SessionProvider } from "../lib/sessionProvider";
import { Navbar } from "./Navbar";
import { Footer } from "../components/Footer";
import { Analytics } from "./Analytics";

const inter = Inter({
	preload: true,
	subsets: ["latin"],
});
const spaceGrotesk = Space_Grotesk({
	preload: true,
	subsets: ["latin"],
});

export const metadata = {
	title: "Milovan Gudelj - Web developer / UI designer",
	description:
		"I design and develop engaging websites and delightful digital experiences.",
	alternates: { canonical: "https://www.milovangudelj.com" },
	openGraph: {
		images: {
			url: "https://www.milovangudelj.com/images/og-image.png",
			width: 1280,
			height: 800,
		},
	},
	icons: {
		icon: {
			rel: "icon",
			type: "image/png",
			sizes: "32x32",
			url: "/images/favicon/favicon-32x32.png",
		},
		shortcut: "/images/favicon/favicon.ico",
		other: [
			{
				rel: "icon",
				type: "image/png",
				sizes: "16x16",
				url: "/images/favicon/favicon-16x16.png",
			},
			{
				rel: "mask-icon",
				url: "/images/favicon/safari-pinned-tab.svg",
			},
		],
		apple: {
			url: "/images/favicon/apple-touch-icon.png",
			rel: "apple-touch-icon",
			sizes: "180x180",
			type: "image/png",
		},
	},
	themeColor: "#000000",
	manifest: "/images/favicon/site.webmanifest",
	other: {
		"msapplication-TileColor": "#000000",
		"msapplication-config": "/images/favicon/browserconfig.xml",
	},
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await getServerSession();

	return (
		<html
			lang="en"
			className={`${inter.className} ${spaceGrotesk.className}`}
		>
			<body className="h-fill scroll-smooth bg-black font-sans text-white">
				<SessionProvider session={session}>
					{/* <style jsx global>
					{`
						#__next {
							height: -webkit-fill-available;
							height: -moz-available;
						}
					`}
				</style> */}
					<Navbar />
					<div className="relative z-[1] mb-[58.25px] bg-black">
						{children}
					</div>
					{process.env.NODE_ENV === "production" && <Analytics />}
					<Footer />
				</SessionProvider>
			</body>
		</html>
	);
}
