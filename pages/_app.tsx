import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";

import "../styles/globals.css";

import { ScrollProvider } from "../lib/scrollContext";
import { WindowSizeProvider } from "../lib/windowSizeContext";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
	return (
		<SessionProvider session={session}>
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
		</SessionProvider>
	);
}

export default MyApp;
