import { getServerSession } from "next-auth";
import { ReactNode } from "react";

import { asyncComponent } from "@/lib/asyncComponent";
import { SessionProvider } from "@/lib/sessionProvider";

export const NextSession = asyncComponent(
	async ({ children }: { children: ReactNode }) => {
		const session = await getServerSession();

		return <SessionProvider session={session}>{children}</SessionProvider>;
	}
);
