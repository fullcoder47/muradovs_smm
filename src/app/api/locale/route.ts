import { NextResponse } from "next/server";
import { locales, type Locale } from "@/lib/i18n";

export function GET(request: Request) {
  const url = new URL(request.url);
  const locale = url.searchParams.get("locale") as Locale;
  const next = url.searchParams.get("next") || "/";

  const response = NextResponse.redirect(new URL(next, url.origin));

  if (locales.includes(locale)) {
    response.cookies.set("locale", locale, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });
  }

  return response;
}
