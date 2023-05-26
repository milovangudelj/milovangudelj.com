"use client"; // Error components must be Client components

import { Button } from "@components/Button";
import { useEffect } from "react";

export default function Error({
	error,
	reset,
}: {
	error: Error;
	reset: () => void;
}) {
	useEffect(() => {
		// Log the error to an error reporting service
		console.error(error);
	}, [error]);

	return (
		<div className="flex h-full w-full flex-col items-center justify-center">
			<h1>There was an error: </h1>
			<pre className="text-[#ff0000]/70">{error.message}</pre>
			<pre>{error.stack}</pre>
			<h2>Try again later</h2>
			<Button
				variant="secondary"
				onClick={
					// Attempt to recover by trying to re-render the segment
					() => reset()
				}
				className="mt-2"
			>
				Try again
			</Button>
		</div>
	);
}
