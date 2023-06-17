import { NextRequest, NextResponse } from "next/server";
import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

import { generateSiteMap } from "~lib/sitemap";

import { i18n } from "~/i18n.config";
import { generateCSP } from "./utils/generateCSP";

function getLocale(request: NextRequest): string | undefined {
	// Negotiator expects plain object so we need to transform headers
	const negotiatorHeaders: Record<string, string> = {};
	request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

	// Use negotiator and intl-localematcher to get best locale
	let languages = new Negotiator({ headers: negotiatorHeaders }).languages();
	// @ts-ignore locales are readonly
	const locales: string[] = i18n.locales;
	return matchLocale(languages, locales, i18n.defaultLocale);
}

export const middleware = async (request: NextRequest) => {
	// generate CSP and nonce
	const { csp, nonce } = generateCSP();

	// Clone the request headers
	const requestHeaders = new Headers(request.headers);

	// set nonce request header to read in pages if needed
	requestHeaders.set("x-nonce", nonce);

	// set CSP header
	const headerKey = "content-security-policy";

	// Set the CSP header so that `app-render` can read it and generate tags with the nonce
	requestHeaders.set(headerKey, csp);

	const pathname = request.nextUrl.pathname;

	// Generates sitemap.xml if path is /sitemap.xml
	if (request.nextUrl.pathname.localeCompare("/sitemap.xml") === 0) {
		const sitemap = await generateSiteMap();

		const response = new NextResponse(sitemap, {
			status: 200,
			headers: { "Content-Type": "text/xml", ...requestHeaders },
		});

		response.headers.set(headerKey, csp);

		return response;
	}

	// `/_next/` and `/api/` are ignored by the watcher, but we need to ignore files in `public` manually.
	// If you have one
	if (
		["/fonts", "/images"].some(
			(value) =>
				pathname.startsWith(value) || pathname.localeCompare(value) === 0
		)
	) {
		// create new response
		const response = NextResponse.next({
			request: {
				// New request headers
				headers: requestHeaders,
			},
		});

		// Also set the CSP so that it is outputted to the browser
		response.headers.set(headerKey, csp);

		return response;
	}

	// Check if the default locale is in the pathname
	if (
		pathname.startsWith(`/${i18n.defaultLocale}/`) ||
		pathname === `/${i18n.defaultLocale}`
	) {
		// e.g. incoming request is /en/products
		// The new URL is now /products
		const response = NextResponse.redirect(
			new URL(
				pathname.replace(
					`/${i18n.defaultLocale}`,
					pathname === `/${i18n.defaultLocale}` ? "/" : ""
				),
				request.url
			),
			{
				headers: requestHeaders,
			}
		);

		response.headers.set(headerKey, csp);

		return response;
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
			const response = NextResponse.rewrite(
				new URL(`/${locale}${pathname}`, request.url),
				{
					headers: requestHeaders,
				}
			);

			response.headers.set(headerKey, csp);

			return response;
		}

		const response = NextResponse.redirect(
			new URL(`/${locale}/${pathname}`, request.url),
			{
				headers: requestHeaders,
			}
		);

		response.headers.set(headerKey, csp);

		return response;
	}

	// create new response
	const response = NextResponse.next({
		request: {
			// New request headers
			headers: requestHeaders,
		},
	});

	// Also set the CSP so that it is outputted to the browser
	response.headers.set(headerKey, csp);

	return response;
};

export const config = {
	// Matcher ignoring `/_next/` and `/api/`
	matcher: [
		"/((?!api|studio|robots.txt|_next/static|_next/image|images|fonts).*)",
	],
};
