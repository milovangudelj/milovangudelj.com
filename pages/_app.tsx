import { Inter, Space_Grotesk } from "@next/font/google";
import type { AppProps } from "next/app";

import "../styles/globals.css";

import { ScrollProvider } from "../lib/scrollContext";
import { WindowSizeProvider } from "../lib/windowSizeContext";

const inter = Inter({
	variable: "--font-inter",
	subsets: ["latin-ext"],
});
const spaceGrotesk = Space_Grotesk({
	variable: "--font-space-grotesk",
	subsets: ["latin-ext"],
});

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<WindowSizeProvider>
			<ScrollProvider>
				<div
					className={`${inter.variable} ${spaceGrotesk.variable} font-sans`}
				>
					<Component {...pageProps} />
				</div>
			</ScrollProvider>
		</WindowSizeProvider>
	);
}

export default MyApp;
