import { NextRequest, NextResponse } from "next/server";
import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

import { generateSiteMap } from "~lib/sitemap";

import { i18n } from "~/i18n.config";

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
	const pathname = request.nextUrl.pathname;

	// Generates sitemap.xml if path is /sitemap.xml
	if (request.nextUrl.pathname.localeCompare("/sitemap.xml") === 0) {
		const sitemap = await generateSiteMap();

		return new NextResponse(sitemap, {
			status: 200,
			headers: { "Content-Type": "text/xml" },
		});
	}

	// Ignore requests to the Studio
	if (request.nextUrl.pathname.startsWith("/studio")) {
		return NextResponse.next();
	}

	// `/_next/` and `/api/` are ignored by the watcher, but we need to ignore files in `public` manually.
	// If you have one
	if (
		["/fonts", "/images"].some(
			(value) => pathname.startsWith(`${value}/`) || pathname === value
		)
	)
		return NextResponse.next();
	}

	const privatePathnameRegex = RegExp(
		`^((${locales
			.map((locale) => `/${locale}`)
			.join("|")}))?(${privatePages.join("|")})/?.*$`,
		"i"
	);
	const isPrivatePage = privatePathnameRegex.test(request.nextUrl.pathname);

	if (isPrivatePage) {
		return (authMiddleware as any)(request);
	} else {
		return intlMiddleware(request);
	}
};

export const config = {
	// Matcher ignoring `/_next/` and `/api/`
	matcher: ["/((?!api|_next/static|_next/image|images|fonts).*)"],
};
