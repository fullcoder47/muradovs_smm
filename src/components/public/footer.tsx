import Link from "next/link";
import { PhoneCall } from "lucide-react";
import { t } from "@/lib/i18n";
import { getLocale } from "@/lib/i18n-server";
import { getSettings } from "@/lib/public-data";

function InstagramIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
    </svg>
  );
}

function TelegramIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M21.6 4.3 18.3 20c-.2 1.1-.9 1.4-1.8.9l-5-3.7-2.4 2.3c-.3.3-.5.5-1 .5l.4-5.1 9.3-8.4c.4-.4-.1-.6-.6-.3L5.7 13.4.8 11.9c-1.1-.3-1.1-1.1.2-1.6L20.2 2.9c.9-.3 1.7.2 1.4 1.4Z"
        fill="currentColor"
      />
    </svg>
  );
}

export async function Footer() {
  const [locale, settings] = await Promise.all([getLocale(), getSettings()]);
  const siteName = settings.site_name ?? "Muradovs_.smm";
  const footerText = settings.site_description ?? t(locale, "footerText");
  const phone = settings.phone ?? "+998 90 000 00 00";
  const telegram = settings.telegram ?? "https://t.me/muradovs_smm";
  const instagram = settings.instagram ?? "https://instagram.com/muradovs_.smm";

  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-4 lg:px-8">
        <div className="md:col-span-2">
          <p className="text-xl font-black">{siteName}</p>
          <p className="mt-4 max-w-md text-sm leading-6 text-slate-400">{footerText}</p>
        </div>
        <div>
          <p className="font-semibold">{t(locale, "pages")}</p>
          <div className="mt-4 grid gap-2 text-sm text-slate-400">
            <Link href="/services">{t(locale, "services")}</Link>
            <Link href="/portfolio">{t(locale, "portfolio")}</Link>
            <Link href="/pricing">{t(locale, "pricing")}</Link>
            <Link href="/blog">{t(locale, "blog")}</Link>
          </div>
        </div>
        <div>
          <p className="font-semibold">{t(locale, "contact")}</p>
          <div className="mt-4 flex gap-3 text-slate-300">
            <Link href={instagram} aria-label="Instagram" className="transition hover:text-pink-300">
              <InstagramIcon size={20} />
            </Link>
            <Link href={telegram} aria-label="Telegram" className="transition hover:text-sky-300">
              <TelegramIcon size={20} />
            </Link>
            <Link href={`tel:${phone.replace(/\s/g, "")}`} aria-label="Telefon" className="transition hover:text-emerald-300">
              <PhoneCall size={20} />
            </Link>
          </div>
          <p className="mt-4 text-sm text-slate-500">{phone}</p>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-5 text-center text-xs text-slate-500">
        {"\u00A9"} {new Date().getFullYear()} {siteName}. {t(locale, "rights")}
      </div>
    </footer>
  );
}
