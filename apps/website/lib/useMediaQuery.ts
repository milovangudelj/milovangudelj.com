"use client";

import { useEffect, useState } from "react";

export const useMediaQuery = (query: string) => {
	const [matches, setMatches] = useState<boolean>(false);

	useEffect(() => {
		const media = window.matchMedia(query);

		if (media.matches !== matches) {
			setMatches(media.matches);
		}

		const listener = () => {
			setMatches(media.matches);
		};

		media.addEventListener("change", listener);
		return () => media.removeEventListener("change", listener);
	}, [matches, query]);

	return matches;
};

export const useIsMobile = () => useMediaQuery("(max-width: 768px)");
export const useIsTablet = () =>
	useMediaQuery("(min-width: 768px) and (max-width: 1024px)");
export const useIsDesktop = () => useMediaQuery("(min-width: 1024px)");
export const useIsWide = () => useMediaQuery("(min-width: 1280px)");
export const useIsWider = () => useMediaQuery("(min-width: 1440px)");
export const useIsWidest = () => useMediaQuery("(min-width: 1920px)");
