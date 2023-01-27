import { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth";
import { signIn } from "next-auth/react";

import { Button, Container, Layout, Section } from "../components";
import { authOptions } from "./api/auth/[...nextauth]";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
	const session = await unstable_getServerSession(req, res, authOptions);

	if (session)
		return {
			redirect: {
				destination: "/music-stats",
				permanent: false,
			},
			props: {},
		};

	return { props: {} };
};

const Login = () => {
	return (
		<Layout>
			<Section className="bg-green">
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
		</Layout>
	);
};

export default Login;
