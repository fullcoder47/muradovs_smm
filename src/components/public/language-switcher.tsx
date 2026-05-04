"use client";

import { useTransition } from "react";
import { usePathname } from "next/navigation";
import { localeLabels, locales, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({ current }: { current: Locale }) {
  const pathname = usePathname();
  const [pending, startTransition] = useTransition();

  function setLocale(locale: Locale) {
    startTransition(() => {
      window.location.href = `/api/locale?locale=${locale}&next=${encodeURIComponent(pathname)}`;
    });
  }

  return (
    <div className="flex rounded-full border border-white/10 bg-white/[0.04] p-1">
      {locales.map((locale) => (
        <button
          key={locale}
          disabled={pending}
          onClick={() => setLocale(locale)}
          className={cn(
            "rounded-full px-3 py-1.5 text-xs font-black text-slate-400 transition hover:text-white disabled:opacity-60",
            current === locale && "bg-white text-black",
          )}
        >
          {localeLabels[locale]}
        </button>
      ))}
    </div>
  );
}
