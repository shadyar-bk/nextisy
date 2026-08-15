import createMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { routing } from "@/i18n/routing";

const handleI18nRouting = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  const locale = request.headers.get("x-next-intl-locale");
  const { pathname } = request.nextUrl;

  if (
    routing.locales.some(
      (supportedLocale) =>
        locale === supportedLocale &&
        (pathname === `/${supportedLocale}` || pathname.startsWith(`/${supportedLocale}/`))
    )
  ) {
    return NextResponse.next();
  }

  return handleI18nRouting(request);
}

export const config = {
  matcher: "/((?!api|_next|apple-icon(?:/|$)|og(?:/|$)|.*\\..*).*)",
};
