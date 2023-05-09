import Image from "next/image";

import { CTA } from "@components/sections/CTA";
import { getTranslations } from "next-intl/server";

export const metadata = {
	title: "Milovan Gudelj - Portfolio",
	description:
		"My portfolio! Feel free to reach out to me for any questions you might have.",
	alternates: {
		canonical: "https://www.milovangudelj.com/portfolio",
		languages: { "it-IT": "https://www.milovangudelj.com/it/portfolio" },
	},
};

const PortfolioPage = async () => {
	const t = await getTranslations("Contact");

	return (
		<>
			<section className="scroll-mt-[72px] bg-salmon text-black md:scroll-mt-[88px]">
				<main className="mx-auto flex max-w-8xl items-center justify-between py-16 px-8 md:py-32 md:px-16">
					<div className="space-y-16">
						<div className="space-y-8">
							<h1 className="text-h2-mobile md:text-d2-mobile xl:text-d2">
								Portfolio
							</h1>
							<p className="text-sub-heading xl:max-w-[468px]">
								This is mainly a collection of poster designs I made,
								with a little bit of information about my past
								experiences.
							</p>
						</div>
					</div>
				</main>
			</section>
			<CTA />
		</>
	);
};

export default PortfolioPage;
