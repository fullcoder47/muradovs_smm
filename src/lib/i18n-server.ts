import { cookies } from "next/headers";
import { locales, type Locale } from "@/lib/i18n";

export async function getLocale(): Promise<Locale> {
  const value = (await cookies()).get("locale")?.value;
  return locales.includes(value as Locale) ? (value as Locale) : "uz";
}
