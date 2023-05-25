import Image from "next/image";

import { Section } from "~components/Section";
import { CTA } from "~components/sections/CTA";

import igLogo from "~images/igLogo.png";
import twLogo from "~images/twLogo.svg";
import drLogo from "~images/drLogo.svg";
import { getTranslations } from "next-intl/server";

import { Locale } from "@/i18n.config";
import { getDictionary } from "@/utils/getDictionary";

export const metadata = {
	title: "Milovan Gudelj - Contact me",
	description:
		"Let's work together! Feel free to reach out to me for any questions you might have.",
	alternates: {
		canonical: "https://www.milovangudelj.com/en/contact",
		languages: { "it-IT": "https://www.milovangudelj.com/it/contact" },
	},
};

const ContactPage = async ({
	params: { lang = "en" },
}: {
	params: { lang: Locale };
}) => {
	const dictionary = await getDictionary(lang);

	return (
		<>
			<Section className="relative scroll-mt-[72px] overflow-hidden bg-black text-white md:scroll-mt-[88px]">
				<main className="mx-auto flex max-w-7xl items-center justify-between px-8 2xl:px-0">
					<div className="space-y-16">
						<div className="space-y-8">
							<h1 className="text-d2-mobile xl:text-d2">
								{dictionary.Contact.title}
							</h1>
							<p className="text-body">
								{dictionary.Contact.description}
							</p>
						</div>
						<div className="flex items-center space-x-6 py-0.5 font-space md:space-x-12">
							<a
								href="https://instagram.com/milovangudelj"
								target="_blank"
								rel="noreferrer"
								className="text-body font-semibold transition hover:text-instagram md:text-sub-heading-mobile xl:text-sub-heading"
							>
								Instagram <span className="text-instagram">↗</span>
							</a>
							<a
								href="https://dribbble.com/milovangudelj"
								target="_blank"
								rel="noreferrer"
								className="text-body font-semibold transition hover:text-dribbble md:text-sub-heading-mobile xl:text-sub-heading"
							>
								Dribbble <span className="text-dribbble">↗</span>
							</a>
							<a
								href="https://twitter.com/milovangudelj"
								target="_blank"
								rel="noreferrer"
								className="text-body font-semibold transition hover:text-twitter md:text-sub-heading-mobile xl:text-sub-heading"
							>
								Twitter <span className="text-twitter">↗</span>
							</a>
						</div>
					</div>
					<div className="mr-8 hidden origin-center rotate-12 flex-col items-center space-y-20 xl:flex">
						<Image
							alt="Dribbble logo"
							className="origin-center -rotate-12"
							src={drLogo}
							width={100}
							loading="eager"
						/>
						<div className="flex space-x-[100px]">
							<Image
								alt="Twitter logo"
								className="origin-center -rotate-12"
								src={twLogo}
								width={100}
								loading="eager"
							/>
							<Image
								alt="Instagram logo"
								className="origin-center -rotate-12"
								src={igLogo}
								width={100}
								loading="eager"
							/>
						</div>
					</div>
				</main>
			</Section>
			<CTA lang={lang as Locale} />
		</>
	);
};

export default ContactPage;
