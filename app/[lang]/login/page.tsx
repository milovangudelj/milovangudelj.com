import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { Container } from "~components/Container";
import { Section } from "~components/Section";
import { LoginButton } from "./LoginButton";

import { Locale } from "~/i18n.config";
import { getDictionary } from "~/utils/getDictionary";

export const metadata = {
	title: "Milovan Gudelj - Login",
	description:
		"Login to your account to see your top artists, tracks and download your Music-Stats poster.",
	alternates: {
		canonical: "https://www.milovangudelj.com/en/login",
		languages: { "it-IT": "https://www.milovangudelj.com/it/login" },
	},
};

const LoginPage = async ({
	params: { lang = "en" },
}: {
	params: { lang: Locale };
}) => {
	const session = await getServerSession();
	if (session) {
		redirect(`/${lang}/music-stats`);
	}

	const dictionary = await getDictionary(lang);

	return (
		<Section className="bg-green">
			<Container>
				<h1 className="mb-8 text-sub-heading-mobile md:text-sub-heading xl:text-h5">
					Login with Spotify
				</h1>
				<p className="text-body">
					Hold tight... I&apos;m still working on it. Check back tomorrow
					or keep an eye on my IG stories (
					<a
						className="underline underline-offset-2 hover:no-underline"
						href="https://instagram.com/milovangudelj"
						target={"_blank"}
						rel={"noreferrer noopener"}
					>
						@milovangudelj
					</a>
					) for when it will be available.
				</p>
				<LoginButton />
			</Container>
		</Section>
	);
};

export default LoginPage;
