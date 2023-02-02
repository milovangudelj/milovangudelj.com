import { Analytics } from "@vercel/analytics/react";
import { SessionProvider } from "next-auth/react";
import { getServerSession } from "next-auth/next";

import "../styles/globals.css";

import { ScrollProvider } from "../lib/scrollContext";
import { WindowSizeProvider } from "../lib/windowSizeContext";

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await getServerSession();

	return (
		<html className="h-fill" lang="en">
			<body className="h-fill">
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
								{children}
								{process.env.NODE_ENV === "production" && <Analytics />}
							</div>
						</ScrollProvider>
					</WindowSizeProvider>
				</SessionProvider>
			</body>
		</html>
	);
}
