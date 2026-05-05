import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { LanguageSwitcher } from "@/components/public/language-switcher";
import { MobileMenu } from "@/components/public/mobile-menu";
import { t } from "@/lib/i18n";
import { getLocale } from "@/lib/i18n-server";

export async function Header() {
  const locale = await getLocale();
  const nav = [
    [t(locale, "services"), "/services"],
    [t(locale, "portfolio"), "/portfolio"],
    [t(locale, "pricing"), "/pricing"],
    [t(locale, "blog"), "/blog"],
    [t(locale, "about"), "/about"],
    [t(locale, "contact"), "/contact"],
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="shrink-0 text-lg font-black tracking-tight">
          Muradovs_<span className="text-blue-400">.smm</span>
        </Link>
        <nav className="hidden items-center gap-7 text-sm text-slate-300 lg:flex">
          {nav.map(([label, href]) => (
            <Link key={href} href={href} className="transition hover:text-white">
              {label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto hidden items-center gap-3 sm:flex">
          <LanguageSwitcher current={locale} />
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-black transition hover:bg-blue-200"
          >
            {t(locale, "consultation")} <ArrowRight size={16} />
          </Link>
        </div>
        <div className="sm:hidden">
          <LanguageSwitcher current={locale} />
        </div>
        <MobileMenu nav={nav as [string, string][]} consultationLabel={t(locale, "consultation")} />
      </div>
    </header>
  );
}
