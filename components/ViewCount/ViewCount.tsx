"use client";

import useSWR from "swr";

import fetcher from "~/lib/fetcher";
import { ViewCountSkeleton } from "./ViewCountSkeleton";
import { Eye } from "@phosphor-icons/react";

export const ViewCount = ({ message }: { message: string }) => {
	const { data, isLoading } = useSWR<{ count: number; error?: string }>(
		"/api/viewCount",
		fetcher
	);

	if (isLoading) return <ViewCountSkeleton />;

	if (!data) return null;

	return (
		<div className="ml-auto inline-flex items-center gap-1 self-stretch overflow-hidden">
			<div className="relative inline max-w-full truncate text-yellow/70">
				{data.count}
				<span className="absolute h-px w-px whitespace-pre border-none opacity-0 [clip:rect(0,_0,_0,_0)]">
					{` ${message}`}
				</span>
			</div>
			<Eye size={16} className="mb-0.5 flex-none" />
		</div>
	);
};
