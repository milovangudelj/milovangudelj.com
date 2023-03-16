"use client";

import { useCallback } from "react";
import {
	usePathname,
	useSearchParams,
	useSelectedLayoutSegments,
} from "next/navigation";
import { Link } from "next-intl";
import { usePathname as useCleanPathname } from "next-intl/client";

interface Locale {
	value: "en" | "it";
	label: string;
}

const locales: Locale[] = [
	{ value: "en", label: "en" },
	{ value: "it", label: "it" },
];

export const LanguageSwitch = () => {
	const pathname = usePathname()!;
	const cleanPathname = useCleanPathname()!;
	const searchParams = useSearchParams()!;
	const segments = useSelectedLayoutSegments();

	const getQueryString = useCallback(() => {
		const params = new URLSearchParams(searchParams);
		const res = "?" + params.toString();

		return res.length === 1 ? "" : res;
	}, [searchParams]);

	const getCurrentLocale = useCallback(() => {
		const locale = pathname?.substring(1, 3);
		const res =
			locale.length === 0 ||
			locale !== "it" ||
			(locale === "it" && pathname.charAt(3) !== "/" && pathname.length > 3)
				? "en"
				: "it";

		return res;
	}, [pathname]);

	return (
		<>
			{locales.map((locale) =>
				getCurrentLocale() !== locale.value ? (
					<Link
						key={locale.value}
						href={cleanPathname + getQueryString()}
						locale={locale.value}
						title={
							locale.value === "it"
								? "Passa all'Italiano"
								: "Switch to English"
						}
						className={`relative inline-block px-4 py-2 text-button opacity-60 transition hover:opacity-100`}
					>
						{locale.label}
					</Link>
				) : null
			)}
		</>
	);
};
