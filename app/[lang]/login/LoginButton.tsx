"use client";

import { signIn } from "next-auth/react";
import { Button, ButtonProps } from "~components/Button";

export const LoginButton = ({
	lang,
	onClick,
	...props
}: ButtonProps<"button">) => {
	return (
		<Button
			onClick={() =>
				signIn("spotify", { callbackUrl: `/${lang}/music-stats` })
			}
			{...props}
		>
			Log In
		</Button>
	);
};
