import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { getServerSession } from "next-auth/next";
import { Analytics } from "@vercel/analytics/react";
import localFont from "next/font/local";

import "@styles/globals.css";

import { SessionProvider } from "@lib/sessionProvider";
import { Navbar } from "@components/Navbar";
import { Footer } from "@components/Footer";

const inter = localFont({
	src: "../../public/fonts/Inter-Var.woff2",
	display: "swap",
	preload: true,
	weight: "100 900",
	style: "oblique -10deg 0deg",
	variable: "--font-inter",
});
const spaceGrotesk = localFont({
	src: "../../public/fonts/SpaceGrotesk-Var.woff2",
	display: "swap",
	preload: true,
	weight: "300 700",
	style: "normal",
	variable: "--font-space",
});

export const metadata = {
	title: "Milovan Gudelj - Web developer / UI designer",
	description:
		"I design and develop engaging websites and delightful digital experiences.",
	metadataBase: new URL("https://www.milovangudelj.com"),
	alternates: {
		canonical: "/",
		languages: { "it-IT": "/it" },
	},
	openGraph: {
		images: {
			url: "/images/og-image.png",
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
	params,
}: {
	children: React.ReactNode;
	params: {
		locale: string;
	};
}) {
	const session = await getServerSession();

	const locale = await getLocale();

	// Show a 404 error if the user requests an unknown locale
	if (params.locale !== locale) {
		notFound();
	}

	const t = await getTranslations("Navbar");

	const links: {
		id: string;
		label: string;
		href: string | URL;
	}[] = [
		{
			id: "about",
			href: "/about",
			label: t("about"),
		},
		{
			id: "work",
			href: "/work",
			label: t("work"),
		},
		{
			id: "portfolio",
			href: "/portfolio",
			label: t("portfolio"),
		},
		{
			id: "contact",
			href: "/contact",
			label: t("contact"),
		},
	];

	return (
		<html
			lang={locale}
			className={`${inter.variable} ${spaceGrotesk.variable}`}
		>
			<body className="h-fill scroll-smooth bg-black font-sans text-white">
				<SessionProvider session={session}>
					<Navbar links={links} />
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
