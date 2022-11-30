import type { AppProps } from "next/app";

import "../styles/globals.css";

import { ScrollProvider } from "../lib/scrollContext";
import { WindowSizeProvider } from "../lib/windowSizeContext";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<WindowSizeProvider>
			<ScrollProvider>
				<style jsx global>
					{`
						#__next {
							height: -webkit-fill-available;
							height: -moz-available;
						}
					`}
				</style>
				<div className={`h-fill font-sans`}>
					<Component {...pageProps} />
				</div>
			</ScrollProvider>
		</WindowSizeProvider>
	);
}

export default MyApp;
