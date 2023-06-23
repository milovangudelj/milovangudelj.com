import { NextRequest, NextResponse } from "next/server";
import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

import { generateSiteMap } from "~lib/sitemap";

import { i18n } from "~/i18n.config";

function getLocale(request: NextRequest): string | undefined {
	// Negotiator expects plain object so we need to transform headers
	const negotiatorHeaders: Record<string, string> = {};
	request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

	// @ts-ignore locales are readonly
	const locales: string[] = i18n.locales;

	// Use negotiator and intl-localematcher to get best locale
	let languages = new Negotiator({ headers: negotiatorHeaders }).languages(
		locales
	);

	const locale = matchLocale(languages, locales, i18n.defaultLocale);

	return locale;
}

export const middleware = async (request: NextRequest) => {
	const pathname = request.nextUrl.pathname;

	// Generates sitemap.xml if path is /sitemap.xml
	if (request.nextUrl.pathname.localeCompare("/sitemap.xml") === 0) {
		const sitemap = await generateSiteMap();

		return new NextResponse(sitemap, {
			status: 200,
			headers: { "Content-Type": "text/xml" },
		});
	}

	// `/_next/` and `/api/` are ignored by the watcher, but we need to ignore files in `public` manually.
	// If you have one
	if (
		["/fonts", "/images"].some(
			(value) =>
				pathname.startsWith(value) || pathname.localeCompare(value) === 0
		)
	) {
		return NextResponse.next();
	}

	// Check if the default locale is in the pathname
	if (
		pathname.startsWith(`/${i18n.defaultLocale}/`) ||
		pathname === `/${i18n.defaultLocale}`
	) {
		// e.g. incoming request is /en/products
		// The new URL is now /products
		return NextResponse.redirect(
			new URL(
				pathname.replace(
					`/${i18n.defaultLocale}`,
					pathname === `/${i18n.defaultLocale}` ? "/" : ""
				),
				request.url
			)
		);
	}

	// Check if there is any supported locale in the pathname
	const pathnameIsMissingLocale = i18n.locales.every(
		(locale) =>
			!pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
	);

	// Redirect if there is no locale
	if (pathnameIsMissingLocale) {
		const locale = getLocale(request);

		// e.g. incoming request is /products
		// The new URL is now /en-US/products
		if (locale === i18n.defaultLocale) {
			return NextResponse.rewrite(
				new URL(`/${locale}${pathname}`, request.url)
			);
		}

		return NextResponse.redirect(
			new URL(`/${locale}/${pathname}`, request.url)
		);
	}

	return NextResponse.next();
};

export const config = {
	// Matcher ignoring `/_next/` and `/api/`
	matcher: [
		"/((?!api|studio|robots.txt|_next/static|_next/image|images|fonts).*)",
	],
};