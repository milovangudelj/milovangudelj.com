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
				destination: "/mini-wrapped",
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
					<Button
						onClick={() =>
							signIn("spotify", { callbackUrl: "/mini-wrapped" })
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
