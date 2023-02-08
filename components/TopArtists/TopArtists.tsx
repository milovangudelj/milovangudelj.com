"use client";

import { ComponentProps } from "react";
import useSWRImmutable from "swr/immutable";
import { twMerge } from "tailwind-merge";

import fetcher from "../../lib/fetcher";
import { TopArtists } from "../../lib/types";
import { getPalette } from "../../utils/getPalette";
import WrappedList from "../WrappedList/WrappedList";

export const Artists = ({ className }: ComponentProps<"div">) => {
	const { data } = useSWRImmutable<TopArtists>("/api/top-artists", fetcher);

	if (!data) {
		return null;
	}

	return (
		<div className={twMerge("max-w-[448px]", className)}>
			<h3 className="mb-4 text-sub-heading-mobile">My top artists:</h3>
			<WrappedList
				of="artists"
				items={data.artists}
				palette={getPalette("lavender")}
			/>
		</div>
	);
};

export default Artists;
