import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { Container } from "../../components/Container";
import { Section } from "../../components/Section";
import { LoginButton } from "./LoginButton";

const LoginPage = async () => {
	const session = await getServerSession();
	if (session) {
		redirect("/music-stats");
	}

	return (
		<Section className="bg-green">
			<Container>
				<h1 className="mb-8 text-sub-heading-mobile md:text-sub-heading xl:text-h5">
					Login with Spotify
				</h1>
				<p className="text-body xl:max-w-[680px]">
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
