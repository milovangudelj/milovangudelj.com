import { getServerSession } from "next-auth/next";

import "../styles/globals.css";

import { SessionProvider } from "../lib/sessionProvider";
import { Navbar } from "./Navbar";
import { Footer } from "../components/Footer";
import { Analytics } from "./Analytics";

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await getServerSession();

	return (
		<html lang="en">
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
