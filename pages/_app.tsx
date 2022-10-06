import type { AppProps } from "next/app";

import "../styles/globals.css";

import { ScrollProvider } from "../lib/scrollContext";
import { WindowSizeProvider } from "../lib/windowSizeContext";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<WindowSizeProvider>
			<ScrollProvider>
				<Component {...pageProps} />
			</ScrollProvider>
		</WindowSizeProvider>
	);
}

export default MyApp;
