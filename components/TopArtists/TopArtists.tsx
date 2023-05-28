"use client";

import { ComponentProps } from "react";
import useSWRImmutable from "swr/immutable";
import { twMerge } from "tailwind-merge";

import fetcher from "~lib/fetcher";
import { TopArtists } from "~lib/types";
import { getPalette } from "~utils/getPalette";
import WrappedList from "~components/WrappedList/WrappedList";

interface ArtistsProps extends ComponentProps<"div"> {
	title: string;
	itemAltText?: {
		artist: string;
		track: string;
	};
	itemOpenText?: string;
	itemListenText?: string;
}

export const Artists = ({
	title,
	itemAltText,
	itemOpenText,
	itemListenText,
	className,
}: ArtistsProps) => {
	const { data } = useSWRImmutable<TopArtists>("/api/top-artists", fetcher);

	if (!data) {
		return null;
	}

	return (
		<div className={twMerge("max-w-[448px]", className)}>
			<h3 className="mb-4 text-sub-heading-mobile">{title}</h3>
			<WrappedList
				of="artists"
				items={data.artists}
				altText={itemAltText}
				openText={itemOpenText}
				listenText={itemListenText}
				palette={getPalette("lavender")}
			/>
		</div>
	);
};

export default Artists;
