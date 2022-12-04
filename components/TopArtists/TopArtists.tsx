import Image from "next/image";
import Link from "next/link";
import { ComponentProps } from "react";
import useSWRImmutable from "swr/immutable";
import { twMerge } from "tailwind-merge";

import fetcher from "../../lib/fetcher";
import { TopArtists } from "../../lib/types";

const hexToRgb = (hex: string) => {
	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result
		? [
				parseInt(result[1], 16),
				parseInt(result[2], 16),
				parseInt(result[3], 16),
		  ]
		: [0, 0, 0];
};

export const Artists = ({ className }: ComponentProps<"div">) => {
	const { data } = useSWRImmutable<TopArtists>("/api/top-artists", fetcher);

	if (!data) {
		return null;
	}

	return (
		<div className={twMerge("max-w-[448px]", className)}>
			<h3 className="mb-4 text-sub-heading-mobile">My top artists:</h3>
			<ol className="bg-black drop-shadow-brutal">
				{data.artists.map((artist, index) => {
					let tempColor: number[] = [];

					hexToRgb(artist.image.color).forEach((c, idx) => {
						c = c / 255.0;
						if (c <= 0.04045) {
							c = c / 12.92;
						} else {
							c = ((c + 0.055) / 1.055) ** 2.4;
						}

						tempColor[idx] = c;
					});

					const colorLuminance =
						0.2126 * tempColor[0] +
						0.7152 * tempColor[1] +
						0.0722 * tempColor[2];

					const lightText = colorLuminance <= 0.179;

					return (
						<li
							key={artist.artistUrl}
							className="flex"
							style={
								index == 0
									? { backgroundColor: artist.image.color }
									: undefined
							}
						>
							<div
								className={`relative h-16 w-16 flex-none ${
									index == 0 ? "p-0" : "p-1"
								}`}
								style={
									index != 0
										? { backgroundColor: artist.image.color }
										: undefined
								}
								title={`${artist.name}'s profile picture`}
							>
								<Image
									className="pointer-events-none aspect-square h-full w-full object-cover"
									sizes={`${artist.image.width}px`}
									quality={100}
									src={artist.image.url}
									alt={`${artist.name}'s profile picture`}
									width={artist.image.width}
									height={artist.image.height}
								/>
							</div>
							<div
								className={`${
									index == 0
										? lightText
											? "text-white"
											: "text-black"
										: "border-b-2 border-r-2 border-white/10 text-white"
								} w-full`}
							>
								<Link
									href={artist.artistUrl}
									rel="noreferrer noopener"
									target="_blank"
									className={`${
										index == 0
											? lightText
												? "text-sub-heading"
												: "text-sub-heading"
											: "text-sub-heading-mobile"
									} group flex h-full max-w-full items-center justify-between truncate px-4`}
								>
									<div>
										<span title={artist.name}>{artist.name}</span>
										<span className="pointer-events-none ml-4 opacity-0 transition-opacity group-hover:pointer-events-auto group-hover:opacity-100">
											↗
										</span>
									</div>
									<span
										className={`${
											index == 0 ? "text-[46.04px]" : "text-[22.4px]"
										} text-sub-heading leading-none opacity-40`}
									>
										{index + 1}
									</span>
								</Link>
							</div>
						</li>
					);
				})}
			</ol>
		</div>
	);
};
