"use client";

import { useEffect, useRef } from "react";
import { useForm, UseFormRegister } from "react-hook-form";

import { Section } from "../../components/Section";
import { Container } from "../../components/Container";
import { Button } from "../../components/Button";
import { useIsMobile } from "../../lib/useMediaQuery";

export interface FormData {
	filter: "all" | "artists" | "tracks";
	period: "long_term" | "medium_term" | "short_term";
}

export const ControlsBar = ({
	username,
	generatingPoster,
	downloadableData,
	periodChangeHandler,
	filterChangeHandler,
}: {
	username: string;
	generatingPoster: boolean;
	downloadableData: string | null;
	periodChangeHandler: (newPeriod: FormData["period"]) => void;
	filterChangeHandler: (newFilter: FormData["filter"]) => void;
}) => {
	const downloadRef = useRef<HTMLAnchorElement>(null);
	const isMobile = useIsMobile();

	const {
		register,
		watch,
		formState: { errors },
	} = useForm<FormData>({
		defaultValues: {
			period: "medium_term",
			filter: "all",
		},
	});
	const watchFilter = watch("filter", "all");
	const watchPeriod = watch("period", "medium_term");

	useEffect(() => {
		periodChangeHandler(watchPeriod);
	}, [watchPeriod, periodChangeHandler]);

	useEffect(() => {
		filterChangeHandler(watchFilter);
	}, [watchFilter, filterChangeHandler]);

	return (
		<Section className="bg-black text-white">
			<Container className="flex flex-wrap items-center justify-between gap-[30px] space-y-0 py-[30px] md:py-[30px]">
				<form className="flex flex-wrap items-center gap-x-8 gap-y-4">
					<div className="flex items-center">
						<span className="mr-4 block text-label-md text-white/80 md:inline-block">
							Filter:
						</span>
						<div className="mr-2">
							<input
								type={"radio"}
								id="filter-all"
								{...register("filter")}
								className="peer hidden"
								value={"all"}
								checked={watchFilter === "all"}
							/>
							<label
								htmlFor="filter-all"
								className="cursor-pointer select-none border-2 bg-transparent py-1 px-2.5 text-button-md text-green transition peer-checked:border-0 peer-checked:bg-green peer-checked:py-1.5 peer-checked:px-3 peer-checked:text-black"
							>
								All
							</label>
						</div>
						<div className="mr-2">
							<input
								type={"radio"}
								id="filter-artists"
								{...register("filter")}
								className="peer hidden"
								value={"artists"}
								checked={watchFilter === "artists"}
							/>
							<label
								htmlFor="filter-artists"
								className="cursor-pointer select-none border-2 bg-transparent py-1 px-2.5 text-button-md text-green transition peer-checked:border-0 peer-checked:bg-green peer-checked:py-1.5 peer-checked:px-3 peer-checked:text-black"
							>
								Artists
							</label>
						</div>
						<div>
							<input
								type={"radio"}
								id="filter-tracks"
								{...register("filter")}
								className="peer hidden"
								value={"tracks"}
								checked={watchFilter === "tracks"}
							/>
							<label
								htmlFor="filter-tracks"
								className="cursor-pointer select-none border-2 bg-transparent py-1 px-2.5 text-button-md text-green transition peer-checked:border-0 peer-checked:bg-green peer-checked:py-1.5 peer-checked:px-3 peer-checked:text-black"
							>
								Tracks
							</label>
						</div>
					</div>
					<div className="flex items-center space-x-4">
						<label
							htmlFor="period"
							className="block text-label-md text-white/80 md:inline-block"
						>
							Period:
						</label>
						<select
							{...register("period")}
							className="form-select border-transparent bg-green bg-chevron-down px-3 py-1.5 pr-[34px] text-button-md text-black [background-size:_18px_18px] focus:border-transparent focus:ring-0"
						>
							<option value="medium_term">Last 6 mo</option>
							<option value="short_term">Last 3 mo</option>
							<option value="long_term">All time</option>
						</select>
					</div>
				</form>
				<Button
					as="a"
					type={"image/png"}
					ref={downloadRef}
					download={
						downloadableData && downloadableData !== "#"
							? `Music-Stats-@${username}.png`
							: undefined
					}
					title={`Music-Stats-@${username}.png`}
					fullWidth={isMobile}
					className={`${
						generatingPoster ? "pointer-events-none opacity-80" : ""
					} transition-all`}
					href={
						downloadableData && downloadableData !== "#"
							? downloadableData
							: undefined
					}
				>
					{generatingPoster ? "Generating..." : "Download poster"}
				</Button>
			</Container>
		</Section>
	);
};
