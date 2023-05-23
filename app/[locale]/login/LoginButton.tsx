"use client";

import { signIn } from "next-auth/react";
import { Button } from "~components";

export const LoginButton = () => {
	return (
		<Button
			onClick={() => signIn("spotify", { callbackUrl: "/music-stats" })}
		>
			Log In
		</Button>
	);
};
