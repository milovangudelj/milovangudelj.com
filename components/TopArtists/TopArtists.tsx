import { ComponentProps } from "react";
import useSWRImmutable from "swr/immutable";
import { twMerge } from "tailwind-merge";

import fetcher from "../../lib/fetcher";
import { TopArtists } from "../../lib/types";
import { StatsList } from "../StatsList";

export const Artists = ({ className }: ComponentProps<"div">) => {
	const { data } = useSWRImmutable<TopArtists>("/api/top-artists", fetcher);

	if (!data) {
		return null;
	}

	return (
		<div className={twMerge("max-w-[448px]", className)}>
			<h3 className="mb-4 text-sub-heading-mobile">My top artists:</h3>
			<StatsList of="artists" items={data.artists} />
		</div>
	);
};
