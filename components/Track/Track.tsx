import { type Track as TrackType } from "../../lib/types";

export const Track = (track: TrackType & { ranking: number }) => {
	return (
		<div className="border-gray-200 dark:border-gray-800 mt-8 flex w-full max-w-3xl flex-row items-baseline border-b">
			<p className="text-gray-400 dark:text-gray-600 text-sm font-bold">
				{track.ranking}
			</p>
			<div className="flex flex-col pl-3">
				<a
					className="text-gray-900 dark:text-gray-100 w-60 truncate font-medium sm:w-96 md:w-full"
					href={track.trackUrl}
					target="_blank"
					rel="noopener noreferrer"
				>
					{track.title}
				</a>
				<p
					className="text-gray-500 mb-4 w-60 truncate sm:w-96 md:w-full"
					color="gray.500"
				>
					{track.artist}
				</p>
			</div>
		</div>
	);
};
