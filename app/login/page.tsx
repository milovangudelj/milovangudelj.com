import { signIn } from "next-auth/react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { Button } from "../../components/Button";
import { Container } from "../../components/Container";
import { Section } from "../../components/Section";

const getSession = async () => {
	const cookie = headers().get("cookie") ?? "";

	try {
		const response = await fetch(
			`${process.env.WEBSITE_URL}/api/auth/session`,
			{
				headers: { cookie },
			}
		);

		const session = await response.json();

		return Object.keys(session).length > 0 ? session : null;
	} catch (err) {
		return null;
	}
};

const LoginPage = async () => {
	const session = await getSession();
	if (session) {
		redirect("/music-stats");
	}

	return <Section className="bg-green">
	<Container>
		<h1 className="mb-8 text-sub-heading-mobile md:text-sub-heading xl:text-h5">
			Login with Spotify
		</h1>
		<p className="text-body xl:max-w-[680px]">
			Hold tight... I&apos;m still working on it. Check back
			tomorrow or keep an eye on my IG stories (
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
		<Button
			onClick={() =>
				signIn("spotify", { callbackUrl: "/music-stats" })
			}
		>
			Log In
		</Button>
	</Container>
</Section>
}

export default LoginPage;