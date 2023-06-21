import localFont from "next/font/local";

import "~styles/globals.css";

const inter = localFont({
	src: "../public/fonts/Inter-Var.woff2",
	display: "swap",
	preload: true,
	weight: "100 900",
	style: "oblique -10deg 0deg",
	variable: "--font-inter",
});
const spaceGrotesk = localFont({
	src: "../public/fonts/SpaceGrotesk-Var.woff2",
	display: "swap",
	preload: true,
	weight: "300 700",
	style: "normal",
	variable: "--font-space",
});

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html
			lang="en"
			className={`${inter.variable} ${spaceGrotesk.variable} bg-black text-white`}
		>
			<body>{children}</body>
		</html>
	);
}
