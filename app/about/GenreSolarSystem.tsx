"use client";

import { useEffect } from "react";

import { useIsDesktop } from "../../lib/useMediaQuery";
import { colors } from "../../utils/getColors";
import {
	getLuminance,
	TEXT_LUMINANCE_TRESHOLD,
} from "../../utils/getLuminance";

const topGenres = [
	{
		id: "tg_01",
		label: "Rap",
		color: colors["green"],
	},
	{
		id: "tg_02",
		label: "Pop",
		color: colors["sp-orange"],
	},
	{
		id: "tg_03",
		label: "Italian hip hop",
		color: colors["sp-pink"],
	},
	{
		id: "tg_04",
		label: "Modern Rock",
		color: colors["sp-yellow"],
	},
	{
		id: "tg_05",
		label: "Alternative R&B",
		color: colors["sp-purple"],
	},
];

export const GenreSolarSystem = () => {
	const isDesktop = useIsDesktop();

	useEffect(() => {
		const d = isDesktop ? 656 : 624;
		const r = d / 2;
		const a = Math.PI / 8;
		const offsetA = (5 * Math.PI) / 8;

		for (let i = 1; i <= 5; i++) {
			const angle = 2 * Math.PI - (offsetA + a * i);
			const x = r * Math.cos(angle);
			const y = r * Math.sin(angle);

			document.documentElement.style.setProperty(`--planet${i}-x`, `${x}px`);
			document.documentElement.style.setProperty(`--planet${i}-y`, `${y}px`);
		}
	}, [isDesktop]);

	return (
		<div className="relative left-full mt-16 w-min -translate-x-1/2 lg:absolute lg:top-1/2 lg:mt-0 lg:-translate-y-1/2">
			<div className="-mr-16 flex h-[624px] w-[624px] items-center justify-center rounded-full border-2 border-black/20 lg:-mr-32 lg:h-[656px] lg:w-[656px]">
				<div className="flex h-[432px] w-[432px] items-center justify-center rounded-full border-2 border-black bg-spotify-orange lg:h-[496px] lg:w-[496px]">
					<h3 className="mr-8 max-w-[6ch] -translate-x-1/2 text-right text-sub-heading-mobile text-black">
						My top genres
					</h3>
				</div>
				{topGenres.map((genre, idx) => {
					const lightText =
						getLuminance(genre.color) <= TEXT_LUMINANCE_TRESHOLD;

					return (
						<div
							key={genre.id}
							className={`absolute h-8 w-8 rounded-full border-2 border-black`}
							style={{
								translate: `var(--planet${idx + 1}-x) var(--planet${
									idx + 1
								}-y)`,
								backgroundColor: genre.color,
							}}
						>
							<span className="absolute right-auto left-1/2 top-full mt-3 inline-block w-max -translate-x-1/2 text-button lg:top-1/2 lg:right-full lg:left-auto lg:mt-0 lg:mr-6 lg:-translate-y-1/2 lg:translate-x-0 lg:text-sub-heading-mobile">
								<span
									className={`text-salmon max-lg:absolute max-lg:left-1/2 max-lg:-top-7 max-lg:mt-0.5 max-lg:-translate-x-1/2 max-lg:-translate-y-1/2 max-lg:text-button-md ${
										lightText
											? "max-lg:text-white"
											: "max-lg:text-black"
									}`}
								>
									{idx + 1}.
								</span>{" "}
								{genre.label}
							</span>
						</div>
					);
				})}
			</div>
		</div>
	);
};
